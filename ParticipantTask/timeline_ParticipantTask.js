const jsPsych = initJsPsych({
  on_finish: () => {
    // No auto-save; data is handled per trial.
  }
});

let laboratoryId = "L-001";
let participantId = "P-001";
let participantAge = "";
let participantGender = "";
let participantGenderOther = "";
const creatureRecords = [1, 2, 3, 4].map(n => ({
  creature_number: n,
  draw: null,
  edit: null
}));
let finalAssessmentResponses = [];
let finalOutputDirHandle = null;
let outputDirPromptAttempted = false;
const PHASE_INVENT = "invent";
const PHASE_EDIT = "edit";

function normalizePhaseValue(phase) {
  const p = String(phase || "").trim().toLowerCase();
  if (p === PHASE_INVENT) return PHASE_INVENT;
  if (p === PHASE_EDIT) return PHASE_EDIT;
  return "";
}

function toInternalCreaturePhaseKey(phase) {
  const normalized = normalizePhaseValue(phase);
  if (normalized === PHASE_INVENT) return "draw";
  if (normalized === PHASE_EDIT) return "edit";
  return "";
}

const zoomBaselineDpr = window.devicePixelRatio || 1;
let zoomGateEl = null;
let fullscreenExitEl = null;
let returnFullscreenBtn = null;
let globalGateSetup = false;
let zoomWatchIntervalId = null;

function requestFullscreen() {
  const el = document.documentElement;
  if (el.requestFullscreen) return el.requestFullscreen();
  if (el.webkitRequestFullscreen) return el.webkitRequestFullscreen();
  return Promise.reject(new Error("Fullscreen not supported"));
}

function setGateVisible(el, visible) {
  if (!el) return;
  el.classList.toggle("fullscreen-hidden", !visible);
}

function getZoomScale() {
  const viewportScale = window.visualViewport && typeof window.visualViewport.scale === "number"
    ? window.visualViewport.scale
    : 1;
  const dpr = window.devicePixelRatio || 1;
  return (dpr / zoomBaselineDpr) * viewportScale;
}

function isZoomAt100() {
  return Math.abs(getZoomScale() - 1) < 0.02;
}

function ensureGlobalGates() {
  if (globalGateSetup && zoomGateEl && fullscreenExitEl && returnFullscreenBtn) return;
  if (!document.body) {
    window.addEventListener("DOMContentLoaded", ensureGlobalGates, { once: true });
    return;
  }

  zoomGateEl = document.getElementById("zoom-gate");
  fullscreenExitEl = document.getElementById("fullscreen-exit");
  returnFullscreenBtn = document.getElementById("return-fullscreen");

  if (!zoomGateEl) {
    zoomGateEl = document.createElement("div");
    zoomGateEl.id = "zoom-gate";
    zoomGateEl.className = "fullscreen-gate fullscreen-hidden";
    zoomGateEl.innerHTML = `
      <div class="fullscreen-card">
        <p>Ajusta el zoom del navegador a 100%.</p>
      </div>
    `;
    document.body.appendChild(zoomGateEl);
  }

  if (!fullscreenExitEl) {
    fullscreenExitEl = document.createElement("div");
    fullscreenExitEl.id = "fullscreen-exit";
    fullscreenExitEl.className = "fullscreen-gate fullscreen-hidden";
    fullscreenExitEl.innerHTML = `
      <div class="fullscreen-card">
        <h2>Full Screen Paused</h2>
        <p>Click to return to full screen to continue.</p>
        <div class="row">
          <button class="btn primary" id="return-fullscreen">Return</button>
        </div>
      </div>
    `;
    document.body.appendChild(fullscreenExitEl);
  }

  returnFullscreenBtn = document.getElementById("return-fullscreen");
  if (returnFullscreenBtn && !returnFullscreenBtn.dataset.bound) {
    returnFullscreenBtn.dataset.bound = "true";
    returnFullscreenBtn.addEventListener("click", async () => {
      try {
        await requestFullscreen();
      } catch (_) {
        // Ignore and allow participant to continue.
      }
    });
  }

  globalGateSetup = true;
}

function updateFullscreenUi() {
  const active = !!document.fullscreenElement || !!document.webkitFullscreenElement;
  setGateVisible(fullscreenExitEl, !active);
}

function updateZoomUi() {
  if (!zoomGateEl) return;
  if (!isZoomAt100()) {
    setGateVisible(zoomGateEl, true);
    window.drawingCreatorApi?.pauseForZoom?.();
  } else {
    setGateVisible(zoomGateEl, false);
    window.drawingCreatorApi?.resumeFromZoomPause?.();
  }
}

function initGlobalGates() {
  ensureGlobalGates();
  updateFullscreenUi();
  updateZoomUi();

  document.addEventListener("fullscreenchange", () => {
    updateFullscreenUi();
    updateZoomUi();
  });

  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", updateZoomUi);
  }
  window.addEventListener("resize", updateZoomUi);
  if (!zoomWatchIntervalId) {
    zoomWatchIntervalId = window.setInterval(() => {
      if (document.hidden) return;
      updateZoomUi();
    }, 350);
  }
}

initGlobalGates();

function csvEscape(v) {
  const s = String(v ?? "");
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function emergencyStorageKey() {
  return `ccc_emergency_${laboratoryId}_${participantId}`;
}

function saveEmergencySnapshotToStorage() {
  try {
    const payload = {
      laboratory_id: laboratoryId,
      participant_id: participantId,
      saved_at: new Date().toISOString(),
      creatures: creatureRecords.map(entry => ({
        creature_number: entry.creature_number,
        draw: entry.draw ? {
          summary: entry.draw.summary || {},
          actions: entry.draw.actions || [],
          drawing_svg: entry.draw.drawing_svg || ""
        } : null,
        edit: entry.edit ? {
          summary: entry.edit.summary || {},
          actions: entry.edit.actions || [],
          drawing_svg: entry.edit.drawing_svg || ""
        } : null
      })),
      legacy_creatures: creatureRecords.map(r => ({
        creature_number: r.creature_number,
        summary: (r.edit && r.edit.summary) || (r.draw && r.draw.summary) || {},
        actions: (r.edit && r.edit.actions) || (r.draw && r.draw.actions) || [],
        drawing_svg: (r.edit && r.edit.drawing_svg) || (r.draw && r.draw.drawing_svg) || ""
      })),
      final_assessment: finalAssessmentResponses
    };
    localStorage.setItem(emergencyStorageKey(), JSON.stringify(payload));
  } catch (_) {
    // Ignore localStorage limits/errors.
  }
}

function buildFinalAssessmentItems() {
  const items = [];
  [1, 2, 3].forEach(n => {
    const entry = getCreatureRecordByNumber(n);
    if (entry && entry.draw) {
      items.push({
        item_id: `creature${n}_draw`,
        creature_number: n,
        phase: PHASE_INVENT,
        label: `Criatura ${n} (dibujo inicial)`,
        drawing: entry.draw
      });
    }
    if (entry && entry.edit) {
      items.push({
        item_id: `creature${n}_edit`,
        creature_number: n,
        phase: "edit",
        label: `Criatura ${n} (edición)`,
        drawing: entry.edit
      });
    }
  });
  const fourth = getCreatureRecordByNumber(4);
  if (fourth && fourth.draw) {
    items.push({
      item_id: "creature4_draw",
      creature_number: 4,
      phase: PHASE_INVENT,
      label: "Criatura 4",
      drawing: fourth.draw
    });
  }
  return items;
}

function clearEmergencySnapshot() {
  try {
    localStorage.removeItem(emergencyStorageKey());
  } catch (_) {
    // Ignore localStorage errors.
  }
}

function getCreatureRecordByNumber(creatureNumber) {
  return creatureRecords.find(r => r.creature_number === creatureNumber) || null;
}

function cacheCreatureRecord(data, creatureNumber, phase) {
  const entry = getCreatureRecordByNumber(creatureNumber);
  const normalizedPhase = normalizePhaseValue(phase);
  const internalKey = toInternalCreaturePhaseKey(normalizedPhase);
  if (!entry || !internalKey) return;
  entry[internalKey] = {
    ...data,
    creature_number: creatureNumber,
    phase: normalizedPhase
  };
  saveEmergencySnapshotToStorage();
}

function getCreatureInitialParts(creatureNumber) {
  const entry = getCreatureRecordByNumber(creatureNumber);
  const parts = entry && entry.draw && Array.isArray(entry.draw.parts) ? entry.draw.parts : [];
  return JSON.parse(JSON.stringify(parts));
}

function getCreatureInitialDescription(creatureNumber) {
  const entry = getCreatureRecordByNumber(creatureNumber);
  if (!entry || !entry.draw || !entry.draw.summary) return "";
  return String(entry.draw.summary.description || "");
}

function getCreatureInitialName(creatureNumber) {
  const entry = getCreatureRecordByNumber(creatureNumber);
  if (!entry || !entry.draw || !entry.draw.summary) return "";
  return String(entry.draw.summary.creature_name || "");
}

function hasAllFinalData() {
  const firstThreeComplete = [1, 2, 3].every(n => {
    const entry = getCreatureRecordByNumber(n);
    return !!(entry && entry.draw && entry.edit);
  });
  const lastEntry = getCreatureRecordByNumber(4);
  const fourthComplete = !!(lastEntry && lastEntry.draw);
  const assessmentComplete = Array.isArray(finalAssessmentResponses) && finalAssessmentResponses.length === 7;
  return firstThreeComplete && fourthComplete && assessmentComplete;
}

window.addEventListener("beforeunload", () => {
  if (!hasAllFinalData()) {
    saveEmergencySnapshotToStorage();
  }
});

async function ensureOutputDirHandle() {
  if (!window.showDirectoryPicker) return null;
  if (finalOutputDirHandle) return finalOutputDirHandle;
  if (outputDirPromptAttempted) return null;
  outputDirPromptAttempted = true;
  try {
    finalOutputDirHandle = await window.showDirectoryPicker();
    return finalOutputDirHandle;
  } catch (_) {
    return null;
  }
}

async function writeBlobToDataSubfolder(blob, subfolder, fileName) {
  const root = await ensureOutputDirHandle();
  if (!root) return false;
  const dataDir = await root.getDirectoryHandle("Data", { create: true });
  const subDir = await dataDir.getDirectoryHandle(subfolder, { create: true });
  const fileHandle = await subDir.getFileHandle(fileName, { create: true });
  const writable = await fileHandle.createWritable();
  await writable.write(blob);
  await writable.close();
  return true;
}

function downloadBlob(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = fileName;
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
}

function buildSummaryCsv(entries) {
  const ordered = [...entries].sort((a, b) => a.creature_number - b.creature_number);
  const summaryKeys = [
    "nLayers",
    "nFeatures",
    "nStickers",
    "nShapes",
    "nDraws",
    "nDrawsCreated",
    "flexibility",
    "elaboration_total",
    "elaboration_avg_per_layer",
    "crops",
    "area",
    "overlap",
    "drawing_time",
    "nColors_final",
    "nColors_changed",
    "undos",
    "redos",
    "nDeleted",
    "creature_name",
    "description_time",
    "description"
  ];
  const assessmentKeys = [
    "Neyes",
    "Nears",
    "Nmouths",
    "Nnoses",
    "Nlegs",
    "Narms",
    "Nhorns",
    "Ntails",
    "symmetry",
    "self-creativity",
    "self-unusualness"
  ];
  const assessmentByCreaturePhase = new Map();
  (Array.isArray(finalAssessmentResponses) ? finalAssessmentResponses : []).forEach(r => {
    assessmentByCreaturePhase.set(`${r.creature_number}_${normalizePhaseValue(r.phase)}`, r);
  });

  const header = [
    "laboratory_id",
    "participant_id",
    "age",
    "gender",
    "gender_other",
    "creature",
    "phase",
    ...summaryKeys,
    ...assessmentKeys
  ];
  const lines = [header.map(csvEscape).join(",")];

  ordered.forEach(entry => {
    if (entry.draw) {
      const drawSummary = entry.draw.summary ? entry.draw.summary : {};
      const drawAssessment = assessmentByCreaturePhase.get(`${entry.creature_number}_${PHASE_INVENT}`) || null;
      const drawRow = [laboratoryId, participantId, participantAge, participantGender, participantGenderOther, entry.creature_number, PHASE_INVENT];
      summaryKeys.forEach(k => drawRow.push(drawSummary[k] ?? ""));
      drawRow.push(
        drawAssessment ? drawAssessment.n_ojos ?? "" : "",
        drawAssessment ? drawAssessment.n_orejas ?? "" : "",
        drawAssessment ? drawAssessment.n_bocas ?? "" : "",
        drawAssessment ? drawAssessment.n_narices ?? "" : "",
        drawAssessment ? drawAssessment.n_patas ?? "" : "",
        drawAssessment ? drawAssessment.n_brazos ?? "" : "",
        drawAssessment ? drawAssessment.n_cuernos ?? "" : "",
        drawAssessment ? drawAssessment.n_colas ?? "" : "",
        drawAssessment ? drawAssessment.simetria ?? "" : "",
        drawAssessment ? drawAssessment.creatividad ?? "" : "",
        drawAssessment ? drawAssessment.parecido_tierra ?? "" : ""
      );
      lines.push(drawRow.map(csvEscape).join(","));
    }

    if (entry.edit) {
      const editSummary = entry.edit.summary ? entry.edit.summary : {};
      const editAssessment = assessmentByCreaturePhase.get(`${entry.creature_number}_edit`) || null;
      const editRow = [laboratoryId, participantId, participantAge, participantGender, participantGenderOther, entry.creature_number, "edit"];
      summaryKeys.forEach(k => editRow.push(editSummary[k] ?? ""));
      editRow.push(
        editAssessment ? editAssessment.n_ojos ?? "" : "",
        editAssessment ? editAssessment.n_orejas ?? "" : "",
        editAssessment ? editAssessment.n_bocas ?? "" : "",
        editAssessment ? editAssessment.n_narices ?? "" : "",
        editAssessment ? editAssessment.n_patas ?? "" : "",
        editAssessment ? editAssessment.n_brazos ?? "" : "",
        editAssessment ? editAssessment.n_cuernos ?? "" : "",
        editAssessment ? editAssessment.n_colas ?? "" : "",
        editAssessment ? editAssessment.simetria ?? "" : "",
        editAssessment ? editAssessment.creatividad ?? "" : "",
        editAssessment ? editAssessment.parecido_tierra ?? "" : ""
      );
      lines.push(editRow.map(csvEscape).join(","));
    }
  });

  return lines.join("\n");
}

function buildActionsCsvForCreature(entry) {
  const drawActions = entry.draw && Array.isArray(entry.draw.actions) ? entry.draw.actions : [];
  const editActions = entry.edit && Array.isArray(entry.edit.actions) ? entry.edit.actions : [];
  const parseLayerNumber = key => {
    const match = /^Layer(\d+)_/.exec(String(key || ""));
    return match ? Number(match[1]) : null;
  };
  const remapLayerKeyWithOffset = (key, offset) => {
    const match = /^Layer(\d+)_(.+)$/.exec(String(key || ""));
    if (!match) return String(key || "");
    return `Layer${Number(match[1]) + offset}_${match[2]}`;
  };

  let drawLayerMax = 0;
  const drawParts = entry.draw && Array.isArray(entry.draw.parts) ? entry.draw.parts : [];
  drawParts.forEach(part => {
    const match = /^(?:Layer|Capa)\s+(\d+)$/i.exec(String(part && part.layerName || "").trim());
    if (match) drawLayerMax = Math.max(drawLayerMax, Number(match[1]));
  });
  drawActions.forEach(a => {
    Object.keys(a.layerActions || {}).forEach(col => {
      const n = parseLayerNumber(col);
      if (Number.isFinite(n)) drawLayerMax = Math.max(drawLayerMax, n);
    });
  });

  const remappedEditActions = editActions.map(a => {
    const sourceLayerActions = a && a.layerActions ? a.layerActions : {};
    const remappedLayerActions = {};
    Object.entries(sourceLayerActions).forEach(([col, val]) => {
      remappedLayerActions[remapLayerKeyWithOffset(col, drawLayerMax)] = val;
    });
    return { ...a, layerActions: remappedLayerActions };
  });

  const allActions = [
    ...drawActions.map(a => ({ ...a, phase: PHASE_INVENT })),
    ...remappedEditActions.map(a => ({ ...a, phase: PHASE_EDIT }))
  ];

  const colSet = new Set();
  allActions.forEach(a => {
    Object.keys(a.layerActions || {}).forEach(col => colSet.add(col));
  });
  const cols = [...colSet];
  const header = ["laboratory_id", "participant_id", "creature", "phase", "step", "timestamp_ms", "action_type", ...cols];
  const lines = [header.map(csvEscape).join(",")];

  allActions.forEach(a => {
    const row = [
      laboratoryId,
      participantId,
      entry.creature_number,
      a.phase || "",
      a.step ?? "",
      a.timestamp_ms ?? "",
      a.action_type || ""
    ];
    cols.forEach(c => row.push((a.layerActions && a.layerActions[c]) || "NA"));
    lines.push(row.map(csvEscape).join(","));
  });

  return lines.join("\n");
}

async function dataUrlToBlob(dataUrl) {
  const res = await fetch(dataUrl);
  return res.blob();
}

async function saveAllCreatureOutputs() {
  const ordered = [...creatureRecords].sort((a, b) => a.creature_number - b.creature_number);
  if (!hasAllFinalData()) {
    throw new Error("Missing invent/edit/description data for one or more creatures.");
  }

  const summaryCsv = buildSummaryCsv(ordered);
  const summaryBlob = new Blob([summaryCsv], { type: "text/csv;charset=utf-8" });
  const summaryFile = `${laboratoryId}_${participantId}_summary.csv`;
  const summarySaved = await writeBlobToDataSubfolder(summaryBlob, "CSVs", summaryFile);
  if (!summarySaved) downloadBlob(summaryBlob, summaryFile);

  for (const entry of ordered) {
    const n = entry.creature_number;
    const actionsCsv = buildActionsCsvForCreature(entry);
    const actionsBlob = new Blob([actionsCsv], { type: "text/csv;charset=utf-8" });
    const actionsFile = `${laboratoryId}_${participantId}_creature${n}_actions.csv`;
    const actionsSaved = await writeBlobToDataSubfolder(actionsBlob, "CSVs", actionsFile);
    if (!actionsSaved) downloadBlob(actionsBlob, actionsFile);
  }

  for (const entry of ordered) {
    const n = entry.creature_number;
    const drawPngDataUrl = entry.draw && entry.draw.drawing_png_data_url ? entry.draw.drawing_png_data_url : "";
    if (drawPngDataUrl) {
      const pngBlob = await dataUrlToBlob(drawPngDataUrl);
      const pngFile = `${laboratoryId}_${participantId}_creature${n}_draw.png`;
      const pngSaved = await writeBlobToDataSubfolder(pngBlob, "PNGs", pngFile);
      if (!pngSaved) downloadBlob(pngBlob, pngFile);
    }
  }

  for (const entry of ordered) {
    const n = entry.creature_number;
    const pngDataUrl = entry.edit && entry.edit.drawing_png_data_url ? entry.edit.drawing_png_data_url : "";
    if (pngDataUrl) {
      const pngBlob = await dataUrlToBlob(pngDataUrl);
      const pngFile = `${laboratoryId}_${participantId}_creature${n}_edit.png`;
      const pngSaved = await writeBlobToDataSubfolder(pngBlob, "PNGs", pngFile);
      if (!pngSaved) downloadBlob(pngBlob, pngFile);
    }
  }

  for (const entry of ordered) {
    const n = entry.creature_number;
    const phases = [
      { key: PHASE_INVENT, payload: entry.draw },
      { key: PHASE_EDIT, payload: entry.edit }
    ];
    for (const phaseInfo of phases) {
      const clips = Array.isArray(phaseInfo.payload && phaseInfo.payload.recorded_videos)
        ? phaseInfo.payload.recorded_videos
        : [];
      for (let i = 0; i < clips.length; i += 1) {
        const clip = clips[i];
        const blob = clip && clip.blob instanceof Blob ? clip.blob : null;
        if (!blob || !blob.size) continue;
        const videoSuffix = i === 0 ? "" : `_video${i + 1}`;
        const videoFile = `${laboratoryId}_${participantId}_creature${n}_${phaseInfo.key}${videoSuffix}.webm`;
        const videoSaved = await writeBlobToDataSubfolder(blob, "Videos", videoFile);
        if (!videoSaved) downloadBlob(blob, videoFile);
      }
    }
  }
}

const setupTrial = {
  type: jsPsychHtmlKeyboardResponse,
  choices: "NO_KEYS",
  stimulus: `
    <div id="setup-screen" class="screen active">
      <div class="screen-card narrow">
        <h2>Experiment setup (experimenter only)</h2>
        <p class="muted">Enter the laboratory and participant IDs before the session starts.</p>
        <div class="stack">
          <label>
            Laboratory ID
            <input type="text" id="lab-id" placeholder="e.g., L-001" value="L-001" />
          </label>
          <label>
            Participant ID
            <input type="text" id="participant-id" placeholder="e.g., P-001" />
          </label>
        </div>
        <div class="row" style="margin-top:12px;">
          <button class="btn primary" id="setup-continue">Continue</button>
        </div>
      </div>
    </div>
  `,
  on_load: () => {
    const labIdInput = document.getElementById("lab-id");
    const participantIdInput = document.getElementById("participant-id");
    const setupContinueBtn = document.getElementById("setup-continue");
    if (labIdInput) labIdInput.value = laboratoryId;
    ensureGlobalGates();
    updateFullscreenUi();
    updateZoomUi();

    const finishSetup = async () => {
      try {
        await requestFullscreen();
      } catch (_) {
        // Ignore and continue.
      }
      const lab = (labIdInput?.value || "").trim().toUpperCase();
      const pid = (participantIdInput?.value || "").trim().toUpperCase();
      const labOk = /^L-\d{3}$/.test(lab);
      const pidOk = /^P-\d{3}$/.test(pid);
      if (!labOk || !pidOk) {
        alert("Use format 'L-XXX' for laboratory and 'P-XXX' for participant (X = digit). For instance: L-001 and P-023.");
        return;
      }
      laboratoryId = lab;
      participantId = pid;
      jsPsych.finishTrial({ laboratory_id: lab, participant_id: pid });
    };

    setupContinueBtn?.addEventListener("click", finishSetup);
    [labIdInput, participantIdInput].forEach(el => {
      el?.addEventListener("keydown", e => {
        if (e.key === "Enter") finishSetup();
      });
    });
  },
  data: { screen: "setup" }
};

const welcomeTrial = {
  type: jsPsychHtmlKeyboardResponse,
  choices: "NO_KEYS",
  stimulus: `
    <div id="welcome-screen" class="screen active">
      <div class="screen-card">
        <p>Te damos la bienvenida a este experimento.</p>
        <p style="text-align:center;">Tendr&aacute; varias fases y durar&aacute; no m&aacute;s de 60 minutos</p>
        <div class="stack" style="margin-top:12px;">
          <label for="participant-age" style="text-align:center;">Edad</label>
          <input type="number" id="participant-age" min="1" max="120" step="1" placeholder="Edad" style="width:50%; margin:0 auto; display:block; background:#0b1220; color:var(--ink); border:1px solid var(--border); border-radius:10px; padding:8px 10px; font:inherit;" />
          <label for="participant-gender" style="text-align:center;">Género</label>
          <select id="participant-gender" style="width:50%; margin:0 auto; display:block; background:#0b1220; color:var(--ink); border:1px solid var(--border); border-radius:10px; padding:8px 10px; font:inherit;">
            <option value="">Selecciona una opción</option>
            <option value="Hombre">Hombre</option>
            <option value="Mujer">Mujer</option>
            <option value="Persona no binaria">Persona no binaria</option>
            <option value="Otro">Otro</option>
          </select>
          <input type="text" id="participant-gender-other" placeholder="Si quieres, especifica tu género" style="display:none; width:50%; margin:0 auto; background:#0b1220; color:var(--ink); border:1px solid var(--border); border-radius:10px; padding:8px 10px; font:inherit;" />
          <p id="welcome-demographics-warning" class="muted" style="display:none; color:#dc2626; margin:0;">Por favor, completa edad y género.</p>
        </div>
        <div class="row" style="margin-top:12px;">
          <button class="btn primary" id="welcome-continue">Continuar</button>
        </div>
      </div>
    </div>
  `,
  on_load: () => {
    const btn = document.getElementById("welcome-continue");
    const ageInput = document.getElementById("participant-age");
    const genderSelect = document.getElementById("participant-gender");
    const genderOtherInput = document.getElementById("participant-gender-other");
    const warning = document.getElementById("welcome-demographics-warning");

    const updateGenderOtherVisibility = () => {
      const isOther = (genderSelect && genderSelect.value === "Otro");
      if (!genderOtherInput) return;
      genderOtherInput.style.display = isOther ? "block" : "none";
      if (!isOther) genderOtherInput.value = "";
    };

    genderSelect?.addEventListener("change", updateGenderOtherVisibility);
    updateGenderOtherVisibility();

    btn?.addEventListener("click", () => {
      const ageRaw = ageInput ? ageInput.value.trim() : "";
      const age = Number(ageRaw);
      const ageValid = Number.isInteger(age) && age >= 1 && age <= 120;
      const gender = genderSelect ? genderSelect.value : "";
      const genderOther = genderOtherInput ? genderOtherInput.value.trim() : "";
      const genderValid = !!gender;

      if (!ageValid || !genderValid) {
        if (warning) warning.style.display = "block";
        return;
      }
      if (warning) warning.style.display = "none";
      participantAge = age;
      participantGender = gender;
      participantGenderOther = gender === "Otro" ? genderOther : "";

      jsPsych.finishTrial({
        age,
        gender,
        gender_other: participantGenderOther
      });
    });
  },
  data: { screen: "welcome" }
};

const instructionsTrial = {
  type: jsPsychHtmlKeyboardResponse,
  choices: "NO_KEYS",
  stimulus: `
    <div id="instructions-screen" class="screen active">
      <div class="screen-card">
        <h2 class="center">Primera fase</h2>
        <p>Imagina un planeta de otra galaxia.</p>
        <p>En esta tarea, te pediremos que imagines 3 criaturas diferentes que viven en ese planeta.</p>
        <p>Una a una, te pediremos que:</p>
        <ol>
          <li>Primero, <strong>dibujes</strong> la primera criatura (tendrás entre 2 y 5 minutos, habrá un temporizador, pero puedes acabar cuando lo consideres, pulsando ✔️).</li>
          <li>Después, la <strong>describas</strong> en unas pocas frases (tendrás hasta 3 minutos).</li>
        </ol>
        <p>A continuación, te pediremos lo mismo para las otras dos criaturas.</p>
        <div class="row" style="margin-top:12px;">
          <button class="btn primary" id="instructions-continue">Continue</button>
        </div>
      </div>
    </div>
  `,
  on_load: () => {
    const btn = document.getElementById("instructions-continue");
    btn?.addEventListener("click", () => jsPsych.finishTrial());
  },
  data: { screen: "instructions" }
};

const tutorialIntroTrial = {
  type: jsPsychHtmlKeyboardResponse,
  choices: "NO_KEYS",
  stimulus: `
    <div id="tutorial-intro-screen" class="screen active">
      <div class="screen-card">
        <p>Antes de comenzar a dibujar tu primera criatura, verás un vídeo tutorial (sin audio) que muestra cómo utilizar el Creador de Criaturas Creativas. A continuación, dispondrás de 2 minutos para explorar y familiarizarte con la herramienta.</p>
        <div class="row" style="margin-top:12px;">
          <button class="btn primary" id="tutorial-intro-continue">Continuar</button>
        </div>
      </div>
    </div>
  `,
  on_load: () => {
    const btn = document.getElementById("tutorial-intro-continue");
    btn?.addEventListener("click", () => jsPsych.finishTrial());
  },
  data: { screen: "tutorial_intro" }
};

const tutorialVideoTrial = {
  type: jsPsychHtmlKeyboardResponse,
  choices: "NO_KEYS",
  stimulus: `
    <div id="tutorial-video-screen" class="screen active" style="position:relative;">
      <button id="tutorial-video-skip" aria-label="Saltar tutorial" title="Saltar tutorial" style="position:absolute; top:6px; left:6px; z-index:5; width:12px; height:12px; padding:0; border-radius:999px; border:1px solid rgba(255,255,255,.18); background:rgba(0,0,0,.15); color:transparent; opacity:.18;"></button>
      <div class="screen-card" style="max-width: 980px; width: min(96vw, 980px);">
        <video id="tutorial-video" autoplay playsinline disablepictureinpicture disableremoteplayback controlslist="nodownload noremoteplayback nofullscreen" style="display:block; width:100%; max-height:70vh; border:1px solid var(--border); border-radius:12px; background:#000;">
          <source src="assets/Tutorial_CrCrCr.mp4" type="video/mp4" />
          Tu navegador no soporta la reproducción de vídeo.
        </video>
        <div class="row" style="margin-top:12px;">
          <button class="btn" id="pause-tutorial-video">Pausar</button>
        </div>
      </div>
    </div>
  `,
  on_load: () => {
    const pauseBtn = document.getElementById("pause-tutorial-video");
    const skipBtn = document.getElementById("tutorial-video-skip");
    const video = document.getElementById("tutorial-video");
    let finished = false;
    if (video) {
      video.disablePictureInPicture = true;
      video.disableRemotePlayback = true;
      if (video.controlsList && typeof video.controlsList.add === "function") {
        video.controlsList.add("nodownload", "noremoteplayback", "nofullscreen");
      }
    }

    const finishOnce = () => {
      if (finished) return;
      finished = true;
      jsPsych.finishTrial();
    };

    video?.addEventListener("ended", finishOnce);
    skipBtn?.addEventListener("click", finishOnce);

    const tryAutoplay = () => {
      if (!video) return;
      const maybePromise = video.play();
      if (maybePromise && typeof maybePromise.catch === "function") {
        maybePromise.catch(() => {
          // If autoplay is blocked, participant can press the pause button to resume playback.
        });
      }
    };

    pauseBtn?.addEventListener("click", () => {
      if (!video) return;
      if (video.paused) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
      if (pauseBtn) pauseBtn.textContent = video.paused ? "Reanudar" : "Pausar";
    });

    video?.addEventListener("play", () => {
      if (pauseBtn) pauseBtn.textContent = "Pausar";
    });
    video?.addEventListener("pause", () => {
      if (pauseBtn) pauseBtn.textContent = "Reanudar";
    });

    tryAutoplay();
  },
  data: { screen: "tutorial_video" }
};

const tutorialExploreTrial = {
  type: jsPsychHtmlKeyboardResponse,
  choices: "NO_KEYS",
  stimulus: `
    <div id="tutorial-explore-screen" class="screen active">
      <div class="screen-card">
        <p>Ahora dispondras de hasta 2 minutos para explorar y familiarizarte con la herramienta</p>
        <div class="row" style="margin-top:12px;">
          <button class="btn primary" id="tutorial-explore-start">Empezar</button>
        </div>
      </div>
    </div>
  `,
  on_load: () => {
    const btn = document.getElementById("tutorial-explore-start");
    btn?.addEventListener("click", () => jsPsych.finishTrial());
  },
  data: { screen: "tutorial_explore" }
};

const trainingDrawingTrial = {
  type: jsPsychDrawingCreator,
  time_limit_ms: 120000,
  min_draw_time_ms: 60000,
  training_mode: true,
  on_start: trial => {
    trial.laboratory_id = laboratoryId;
    trial.participant_id = participantId;
  },
  on_load: () => {
    ensureGlobalGates();
    updateFullscreenUi();
    updateZoomUi();
  },
  on_finish: data => {
    Object.keys(data).forEach(key => {
      delete data[key];
    });
  },
  data: { screen: "drawing_training" }
};

const preImportantIntroTrial = {
  type: jsPsychHtmlKeyboardResponse,
  choices: "NO_KEYS",
  stimulus: `
    <div id="pre-important-screen" class="screen active">
      <div class="screen-card">
        <p>¡Genial! Unas cuestiones importantes antes de empezar a dibujar tu primera criatura, lee atentamente la siguiente pantalla.</p>
        <div class="row" style="margin-top:12px;">
          <button class="btn primary" id="pre-important-continue">Continuar</button>
        </div>
      </div>
    </div>
  `,
  on_load: () => {
    const btn = document.getElementById("pre-important-continue");
    btn?.addEventListener("click", () => jsPsych.finishTrial());
  },
  data: { screen: "pre_important_intro" }
};

const importantTrial = {
  type: jsPsychHtmlKeyboardResponse,
  choices: "NO_KEYS",
  stimulus: `
    <div id="important-screen" class="screen active">
      <div class="screen-card">
        <h2 class="center">Instrucciones</h2>
        <p class="important">IMPORTANTE</p>
        <p>Usa tu imaginación y diseña una criatura <strong><u>lo más creativa posible</u></strong> (tanto el dibujo como su descripción).</p>
        <p>Por favor, <strong>no copies</strong> ninguna criatura real de la Tierra (ni actual ni extinta) ni un personaje o criatura conocida de ficción.</p>
        <p>No te preocupes por tus habilidades artísticas.</p>
        <p>Al final del estudio, si te interesa, te mandaremos tu puntuación en creatividad junto con los dibujos de tus criaturas, a modo de obsequio por tu amable participación.</p>
        <div class="row" style="margin-top:12px;">
          <button class="btn primary" id="enter-fullscreen">Continue</button>
        </div>
      </div>
    </div>
  `,
  on_load: () => {
    const btn = document.getElementById("enter-fullscreen");
    btn?.addEventListener("click", async () => {
      try {
        await requestFullscreen();
      } catch (_) {
        // Ignore and continue.
      }
      jsPsych.finishTrial();
    });
  },
  data: { screen: "important" }
};

const preFirstDrawingReadyTrial = {
  type: jsPsychHtmlKeyboardResponse,
  choices: "NO_KEYS",
  stimulus: `
    <div id="pre-first-drawing-ready-screen" class="screen active">
      <div class="screen-card">
        <p>Prepárate para empezar a dibujar tu primera criatura (y después describirla)</p>
        <p id="pre-first-drawing-countdown" class="muted">Empezando en 10...</p>
        <div class="row" style="margin-top:12px;">
          <button class="btn primary" id="pre-first-drawing-start">Empezar</button>
        </div>
      </div>
    </div>
  `,
  on_load: () => {
    const btn = document.getElementById("pre-first-drawing-start");
    const countdownEl = document.getElementById("pre-first-drawing-countdown");
    let remaining = 10;
    let finished = false;
    let timerId = null;

    const finishOnce = () => {
      if (finished) return;
      finished = true;
      if (timerId) {
        clearInterval(timerId);
        timerId = null;
      }
      jsPsych.finishTrial();
    };

    btn?.addEventListener("click", finishOnce);
    timerId = window.setInterval(() => {
      remaining -= 1;
      if (countdownEl) countdownEl.textContent = `Empezando en ${Math.max(0, remaining)}...`;
      if (remaining <= 0) finishOnce();
    }, 1000);
  },
  data: { screen: "pre_first_drawing_ready" }
};

const drawingTrial1 = {
  type: jsPsychDrawingCreator,
  time_limit_ms: 300000,
  min_draw_time_ms: 120000,
  bottom_prompt_html: "Dibuja tu <strong>primera</strong> criatura lo más creativa posible.",
  on_start: trial => {
    trial.laboratory_id = laboratoryId;
    trial.participant_id = participantId;
    trial.save_outputs_to_workspace = false;
    trial.description_time_limit_ms = 180000;
    trial.min_description_time_ms = 60000;
    trial.description_intro_text = "Imagina que el dibujo de tu criatura estuviera expuesto en un museo, junto a un cartelito con su descripción. Ahora te pedimos que, en 3 minutos, escribas esa descripción en un párrafo corto, lo más creativo posible.";
  },
  on_load: () => {
    ensureGlobalGates();
    updateFullscreenUi();
    updateZoomUi();
  },
  on_finish: data => {
    cacheCreatureRecord(data, 1, PHASE_INVENT);
  },
  data: { screen: "drawing", creature_number: 1 }
};

const preSecondDrawingReadyTrial = {
  type: jsPsychHtmlKeyboardResponse,
  choices: "NO_KEYS",
  stimulus: `
    <div id="pre-second-drawing-ready-screen" class="screen active">
      <div class="screen-card">
        <p>¡Perfecto!</p>
        <p>Ahora prepárate para dibujar tu segunda criatura (y después describirla)</p>
        <p id="pre-second-drawing-countdown" class="muted">Empezando en 10...</p>
        <div class="row" style="margin-top:12px;">
          <button class="btn primary" id="pre-second-drawing-start">Empezar</button>
        </div>
      </div>
    </div>
  `,
  on_load: () => {
    const btn = document.getElementById("pre-second-drawing-start");
    const countdownEl = document.getElementById("pre-second-drawing-countdown");
    let remaining = 10;
    let finished = false;
    let timerId = null;

    const finishOnce = () => {
      if (finished) return;
      finished = true;
      if (timerId) {
        clearInterval(timerId);
        timerId = null;
      }
      jsPsych.finishTrial();
    };

    btn?.addEventListener("click", finishOnce);
    timerId = window.setInterval(() => {
      remaining -= 1;
      if (countdownEl) countdownEl.textContent = `Empezando en ${Math.max(0, remaining)}...`;
      if (remaining <= 0) finishOnce();
    }, 1000);
  },
  data: { screen: "pre_second_drawing_ready" }
};

const drawingTrial2 = {
  type: jsPsychDrawingCreator,
  time_limit_ms: 300000,
  min_draw_time_ms: 120000,
  bottom_prompt_html: "Dibuja tu <strong>segunda</strong> criatura lo más creativa posible.",
  on_start: trial => {
    trial.laboratory_id = laboratoryId;
    trial.participant_id = participantId;
    trial.save_outputs_to_workspace = false;
    trial.description_time_limit_ms = 180000;
    trial.min_description_time_ms = 60000;
    trial.description_intro_text = "Imagina que el dibujo de tu criatura estuviera expuesto en un museo, junto a un cartelito con su descripción. Ahora te pedimos que, en 3 minutos, escribas esa descripción en un párrafo corto, lo más creativo posible.";
  },
  on_load: () => {
    ensureGlobalGates();
    updateFullscreenUi();
    updateZoomUi();
  },
  on_finish: data => {
    cacheCreatureRecord(data, 2, PHASE_INVENT);
  },
  data: { screen: "drawing", creature_number: 2 }
};

const preThirdDrawingReadyTrial = {
  type: jsPsychHtmlKeyboardResponse,
  choices: "NO_KEYS",
  stimulus: `
    <div id="pre-third-drawing-ready-screen" class="screen active">
      <div class="screen-card">
        <p>¡Perfecto!</p>
        <p>Ahora prepárate para dibujar tu tercera criatura (y después describirla)</p>
        <p id="pre-third-drawing-countdown" class="muted">Empezando en 10...</p>
        <div class="row" style="margin-top:12px;">
          <button class="btn primary" id="pre-third-drawing-start">Empezar</button>
        </div>
      </div>
    </div>
  `,
  on_load: () => {
    const btn = document.getElementById("pre-third-drawing-start");
    const countdownEl = document.getElementById("pre-third-drawing-countdown");
    let remaining = 10;
    let finished = false;
    let timerId = null;

    const finishOnce = () => {
      if (finished) return;
      finished = true;
      if (timerId) {
        clearInterval(timerId);
        timerId = null;
      }
      jsPsych.finishTrial();
    };

    btn?.addEventListener("click", finishOnce);
    timerId = window.setInterval(() => {
      remaining -= 1;
      if (countdownEl) countdownEl.textContent = `Empezando en ${Math.max(0, remaining)}...`;
      if (remaining <= 0) finishOnce();
    }, 1000);
  },
  data: { screen: "pre_third_drawing_ready" }
};

const drawingTrial3 = {
  type: jsPsychDrawingCreator,
  time_limit_ms: 300000,
  min_draw_time_ms: 120000,
  bottom_prompt_html: "Dibuja tu <strong>tercera</strong> criatura lo más creativa posible.",
  on_start: trial => {
    trial.laboratory_id = laboratoryId;
    trial.participant_id = participantId;
    trial.save_outputs_to_workspace = false;
    trial.description_time_limit_ms = 180000;
    trial.min_description_time_ms = 60000;
    trial.description_intro_text = "Imagina que el dibujo de tu criatura estuviera expuesto en un museo, junto a un cartelito con su descripción. Ahora te pedimos que, en 3 minutos, escribas esa descripción en un párrafo corto, lo más creativo posible.";
  },
  on_load: () => {
    ensureGlobalGates();
    updateFullscreenUi();
    updateZoomUi();
  },
  on_finish: data => {
    cacheCreatureRecord(data, 3, PHASE_INVENT);
  },
  data: { screen: "drawing", creature_number: 3 }
};

const postThreeCreaturesIntroTrial = {
  type: jsPsychHtmlKeyboardResponse,
  choices: "NO_KEYS",
  stimulus: `
    <div id="post-three-creatures-intro-screen" class="screen active">
      <div class="screen-card">
        <h2 class="center">Segunda fase</h2>
        <p>¡Gracias por esas tres criaturas!</p>
        <p>Ahora te vamos a dar la oportunidad de editarlas de nuevo, una a una. Tu objetivo es hacerlas más creativas aún. Tendrás 2 minutos para cada dibujo y 1 minuto para cada descripción.</p>
        <div class="row" style="margin-top:12px;">
          <button class="btn primary" id="post-three-creatures-intro-start">Empezar</button>
        </div>
      </div>
    </div>
  `,
  on_load: () => {
    const btn = document.getElementById("post-three-creatures-intro-start");
    btn?.addEventListener("click", () => jsPsych.finishTrial());
  },
  data: { screen: "post_three_creatures_intro" }
};

const editDrawingTrial1 = {
  type: jsPsychDrawingCreator,
  time_limit_ms: 120000,
  bottom_prompt_html: "Edita tu <strong>primera</strong> criatura para hacerla más creativa",
  on_start: trial => {
    trial.laboratory_id = laboratoryId;
    trial.participant_id = participantId;
    trial.save_outputs_to_workspace = false;
    trial.initial_parts = getCreatureInitialParts(1);
    trial.initial_creature_name = getCreatureInitialName(1);
    trial.initial_description = getCreatureInitialDescription(1);
    trial.description_time_limit_ms = 60000;
    trial.description_intro_text = "Ahora tienes 1 minuto para editar tu descripción anterior. Recuerda que la idea es que sea un cartelito que acompañe a tu dibujo en un museo.";
  },
  on_load: () => {
    ensureGlobalGates();
    updateFullscreenUi();
    updateZoomUi();
  },
  on_finish: data => {
    cacheCreatureRecord(data, 1, "edit");
  },
  data: { screen: "editing", creature_number: 1 }
};

const preSecondEditingReadyTrial = {
  type: jsPsychHtmlKeyboardResponse,
  choices: "NO_KEYS",
  stimulus: `
    <div id="pre-second-editing-ready-screen" class="screen active">
      <div class="screen-card">
        <p>¡Perfecto!</p>
        <p>Ahora prepárate para editar tu segunda criatura (y después describirla)</p>
        <div class="row" style="margin-top:12px;">
          <button class="btn primary" id="pre-second-editing-start">Empezar</button>
        </div>
      </div>
    </div>
  `,
  on_load: () => {
    const btn = document.getElementById("pre-second-editing-start");
    btn?.addEventListener("click", () => jsPsych.finishTrial());
  },
  data: { screen: "pre_second_editing_ready" }
};

const editDrawingTrial2 = {
  type: jsPsychDrawingCreator,
  time_limit_ms: 120000,
  bottom_prompt_html: "Edita tu <strong>segunda</strong> criatura para hacerla más creativa",
  on_start: trial => {
    trial.laboratory_id = laboratoryId;
    trial.participant_id = participantId;
    trial.save_outputs_to_workspace = false;
    trial.initial_parts = getCreatureInitialParts(2);
    trial.initial_creature_name = getCreatureInitialName(2);
    trial.initial_description = getCreatureInitialDescription(2);
    trial.description_time_limit_ms = 60000;
    trial.description_intro_text = "Ahora tienes 1 minuto para editar tu descripción anterior. Recuerda que la idea es que sea un cartelito que acompañe a tu dibujo en un museo.";
  },
  on_load: () => {
    ensureGlobalGates();
    updateFullscreenUi();
    updateZoomUi();
  },
  on_finish: data => {
    cacheCreatureRecord(data, 2, "edit");
  },
  data: { screen: "editing", creature_number: 2 }
};

const preThirdEditingReadyTrial = {
  type: jsPsychHtmlKeyboardResponse,
  choices: "NO_KEYS",
  stimulus: `
    <div id="pre-third-editing-ready-screen" class="screen active">
      <div class="screen-card">
        <p>¡Perfecto!</p>
        <p>Ahora prepárate para editar tu tercera criatura (y después describirla)</p>
        <div class="row" style="margin-top:12px;">
          <button class="btn primary" id="pre-third-editing-start">Empezar</button>
        </div>
      </div>
    </div>
  `,
  on_load: () => {
    const btn = document.getElementById("pre-third-editing-start");
    btn?.addEventListener("click", () => jsPsych.finishTrial());
  },
  data: { screen: "pre_third_editing_ready" }
};

const editDrawingTrial3 = {
  type: jsPsychDrawingCreator,
  time_limit_ms: 120000,
  bottom_prompt_html: "Edita tu <strong>tercera</strong> criatura para hacerla más creativa",
  on_start: trial => {
    trial.laboratory_id = laboratoryId;
    trial.participant_id = participantId;
    trial.save_outputs_to_workspace = false;
    trial.initial_parts = getCreatureInitialParts(3);
    trial.initial_creature_name = getCreatureInitialName(3);
    trial.initial_description = getCreatureInitialDescription(3);
    trial.description_time_limit_ms = 60000;
    trial.description_intro_text = "Ahora tienes 1 minuto para editar tu descripción anterior. Recuerda que la idea es que sea un cartelito que acompañe a tu dibujo en un museo.";
  },
  on_load: () => {
    ensureGlobalGates();
    updateFullscreenUi();
    updateZoomUi();
  },
  on_finish: data => {
    cacheCreatureRecord(data, 3, "edit");
  },
  data: { screen: "editing", creature_number: 3 }
};

const leastCreativeIntroTrial = {
  type: jsPsychHtmlKeyboardResponse,
  choices: "NO_KEYS",
  stimulus: `
    <div id="least-creative-intro-screen" class="screen active">
      <div class="screen-card">
        <h2 class="center">Tercera fase</h2>
        <p>&iexcl;Perfecto!</p>
        <p>Te vamos a pedir una &uacute;ltima criatura.</p>
        <p>Ahora queremos que dibujes y describas una criatura <strong>lo menos creativa posible</strong>. Esto no quiere decir que no te esfuerces, solo que intentes ser lo menos original que puedas, tanto en el dibujo como en la descripci&oacute;n.</p>
        <p>Tendr&aacute;s de nuevo entre 1 y 5 minutos para el dibujo y 3 para la descripci&oacute;n.</p>
        <div class="row" style="margin-top:12px;">
          <button class="btn primary" id="least-creative-intro-start">Empezar</button>
        </div>
      </div>
    </div>
  `,
  on_load: () => {
    const btn = document.getElementById("least-creative-intro-start");
    btn?.addEventListener("click", () => jsPsych.finishTrial());
  },
  data: { screen: "least_creative_intro" }
};

const leastCreativeDrawingTrial = {
  type: jsPsychDrawingCreator,
  time_limit_ms: 300000,
  min_draw_time_ms: 60000,
  description_time_limit_ms: 180000,
  min_description_time_ms: 60000,
  bottom_prompt_html: "Dibuja una criatura lo menos creativa posible",
  on_start: trial => {
    trial.laboratory_id = laboratoryId;
    trial.participant_id = participantId;
    trial.save_outputs_to_workspace = false;
    trial.description_intro_text = "De nuevo imagina que el dibujo de esta criatura estuviera expuesta en un museo junto a un cartelito. Escribe su descripción, pero intenta que sea lo menos creativo posible.";
  },
  on_load: () => {
    ensureGlobalGates();
    updateFullscreenUi();
    updateZoomUi();
  },
  on_finish: data => {
    cacheCreatureRecord(data, 4, PHASE_INVENT);
  },
  data: { screen: "drawing", creature_number: 4, phase: PHASE_INVENT }
};

const finalAssessmentTrial = {
  type: jsPsychHtmlKeyboardResponse,
  choices: "NO_KEYS",
  stimulus: `
    <style>
      .assessment-list { display: grid; gap: 14px; max-height: 65vh; overflow: auto; padding-right: 4px; }
      .assessment-card { border: 1px solid var(--border); border-radius: 12px; padding: 12px; background: #111827; display: grid; gap: 12px; }
      .assessment-title { margin: 0; font-size: 16px; }
      .assessment-top { display: grid; grid-template-columns: minmax(0, 45%) minmax(0, 55%); gap: 18px; align-items: stretch; }
      .assessment-left { display: grid; gap: 10px; align-content: start; }
      .assessment-right { display: grid; gap: 12px; align-content: start; }
      .assessment-preview { width: 100%; height: 264px; object-fit: contain; border-radius: 10px; border: 1px solid var(--border); background: #0b1220; }
      .assessment-description-box { border: 1px solid var(--border); border-radius: 10px; background: #0b1220; padding: 10px; }
      .assessment-description-box h4 { margin: 0 0 8px; font-size: 14px; }
      .assessment-description { margin: 0; color: var(--ink-dim); white-space: pre-wrap; max-height: 188px; overflow: auto; }
      .assessment-field { display: grid; gap: 6px; }
      .assessment-field label { font-size: 13px; color: var(--ink-dim); }
      .assessment-field select {
        width: auto;
        background: #0b1220;
        color: var(--ink);
        border: 1px solid var(--border);
        border-radius: 10px;
        padding: 8px 10px;
        font: inherit;
      }
      .assessment-field.assessment-field--symmetry { justify-items: start; margin-top: 6px; }
      .assessment-field.assessment-field--symmetry label { text-align: left; }
      .assessment-field.assessment-field--symmetry select { min-width: 250px; }
      .assessment-number-title { margin: 0; font-size: 13px; color: var(--ink-dim); text-align: left; }
      .assessment-numbers-row { display: grid; grid-template-columns: repeat(8, minmax(40px, 1fr)); gap: 2px; justify-items: start; max-width: none; margin-top: -2px; }
      .assessment-number-item { display: grid; gap: 4px; justify-items: start; text-align: left; min-width: 0; }
      .assessment-number-item span { font-size: 12px; color: var(--ink-dim); line-height: 1.05; max-width: 100%; word-break: break-word; }
      .assessment-number {
        width: 40px !important;
        height: 40px;
        text-align: center;
        padding: 0 !important;
      }
      .assessment-likert { display: grid; gap: 8px; align-content: start; margin-top: 12px; }
      .assessment-likert-title { margin: 0; font-size: 13px; color: var(--ink-dim); text-align: left; }
      .assessment-likert-options { display: grid; grid-template-columns: repeat(10, minmax(24px, 1fr)); gap: 4px; }
      .assessment-likert-choice {
        display: grid;
        place-items: center;
        height: 34px;
        border: 1px solid var(--border);
        border-radius: 8px;
        background: #0b1220;
        color: var(--ink);
        cursor: pointer;
        user-select: none;
        font-size: 12px;
      }
      .assessment-likert-choice input { display: none; }
      .assessment-likert-choice.is-selected {
        border-color: #6366f1;
        box-shadow: 0 0 0 1px #4f46e5 inset;
        background: #1f2937;
      }
      .assessment-likert-ends { display: flex; justify-content: space-between; gap: 10px; font-size: 11px; color: var(--ink-dim); align-items: flex-start; line-height: 1.05; }
      .assessment-warning { min-height: 20px; color: #dc2626; font-weight: 600; margin: 0; }
      #final-assessment-screen .screen-card { max-width: 1200px; width: min(96vw, 1200px); }
      @media (max-width: 900px) {
        .assessment-top { grid-template-columns: 1fr; }
        .assessment-preview { height: 216px; }
        .assessment-numbers-row { grid-template-columns: repeat(3, minmax(56px, 1fr)); }
        .assessment-numbers-row { max-width: none; }
        .assessment-field.assessment-field--symmetry select { min-width: 0; width: 100%; }
      }
    </style>
    <div id="final-assessment-screen" class="screen active">
      <div class="screen-card">
        <div id="final-assessment-intro">
          <h2 class="center">¡Muchísimas gracias! Ya sólo queda la última fase.</h2>
          <p>Ahora te mostraremos los 7 dibujos que has hecho y sus descripciones y queremos que, para cada una de ellas, indiques:</p>
          <p>su número de ojos, orejas, bocas, narices (u hocicos), piernas (o patas), brazos, cuernos y colas, así como el nivel de simetría de su cuerpo y, por último, cómo de creativa e inusual te parece cada criatura.</p>
          <p>Podrás deslizar hacia abajo para evaluar todas las criaturas, una a una.</p>
          <div class="row" style="margin-top:12px;">
            <button class="btn primary" id="final-assessment-start">Empezar</button>
          </div>
        </div>
        <div id="final-assessment-form" style="display:none;">
          <div id="final-assessment-list" class="assessment-list"></div>
          <p id="final-assessment-warning" class="assessment-warning"></p>
          <div class="row" style="margin-top:12px;">
            <button class="btn primary" id="final-assessment-continue">Continuar</button>
          </div>
        </div>
      </div>
    </div>
  `,
  on_load: () => {
    const intro = document.getElementById("final-assessment-intro");
    const form = document.getElementById("final-assessment-form");
    const startBtn = document.getElementById("final-assessment-start");
    const list = document.getElementById("final-assessment-list");
    const warning = document.getElementById("final-assessment-warning");
    const continueBtn = document.getElementById("final-assessment-continue");
    const items = buildFinalAssessmentItems();
    for (let i = items.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }

    if (!list || !continueBtn || !startBtn || !intro || !form) return;
    if (warning) {
      warning.style.setProperty("color", "#dc2626", "important");
      warning.style.setProperty("font-weight", "600");
    }
    list.innerHTML = "";

    startBtn.addEventListener("click", () => {
      intro.style.display = "none";
      form.style.display = "";
    });

    items.forEach(item => {
      const card = document.createElement("div");
      card.className = "assessment-card";
      card.dataset.itemId = item.item_id;

      const title = document.createElement("h3");
      title.className = "assessment-title";
      title.textContent = item.label;

      const img = document.createElement("img");
      img.className = "assessment-preview";
      img.alt = item.label;
      img.src = item.drawing?.drawing_png_data_url || "";

      const description = document.createElement("p");
      description.className = "assessment-description";
      const desc = String(item.drawing?.summary?.description || "").trim();
      description.textContent = desc || "(sin descripción)";

      const top = document.createElement("div");
      top.className = "assessment-top";
      const left = document.createElement("div");
      left.className = "assessment-left";
      const right = document.createElement("div");
      right.className = "assessment-right";
      const descriptionBox = document.createElement("div");
      descriptionBox.className = "assessment-description-box";
      descriptionBox.innerHTML = "<h4>Descripción</h4>";
      descriptionBox.append(description);
      left.append(img, descriptionBox);

      const numbersTitle = document.createElement("p");
      numbersTitle.className = "assessment-number-title";
      numbersTitle.textContent = "Para esta criatura, indica su número de...";
      const numbersRow = document.createElement("div");
      numbersRow.className = "assessment-numbers-row";

      const numberField = (label, key) => {
        const wrap = document.createElement("div");
        wrap.className = "assessment-number-item";
        const text = document.createElement("span");
        text.innerHTML = label;
        const input = document.createElement("input");
        input.type = "number";
        input.min = "0";
        input.step = "1";
        input.value = "0";
        input.required = true;
        input.dataset.key = key;
        input.className = "assessment-number";
        wrap.append(text, input);
        return wrap;
      };

      numbersRow.append(
        numberField("ojos", "n_ojos"),
        numberField("orejas", "n_orejas"),
        numberField("bocas", "n_bocas"),
        numberField("narices<br><span style=\"line-height:1; display:inline-block;\">(u hocicos)</span>", "n_narices"),
        numberField("piernas<br><span style=\"line-height:1; display:inline-block;\">(o patas)</span>", "n_patas"),
        numberField("brazos", "n_brazos"),
        numberField("cuernos", "n_cuernos"),
        numberField("colas", "n_colas")
      );

      const symmetryWrap = document.createElement("div");
      symmetryWrap.className = "assessment-field assessment-field--symmetry";
      const symmetryLabel = document.createElement("label");
      symmetryLabel.textContent = "¿Cómo de simétrica es esta criatura?";
      const symmetrySelect = document.createElement("select");
      symmetrySelect.required = true;
      symmetrySelect.dataset.key = "simetria";
      symmetrySelect.innerHTML = `
        <option value="">Selecciona una opción</option>
        <option value="3">completamente simétrica</option>
        <option value="2">algo simétrica</option>
        <option value="1">nada simétrica</option>
      `;
      symmetryWrap.append(symmetryLabel, symmetrySelect);

      const makeLikert = (key, titleText, leftText, rightText) => {
        const wrap = document.createElement("div");
        wrap.className = "assessment-likert";
        const titleEl = document.createElement("p");
        titleEl.className = "assessment-likert-title";
        titleEl.textContent = titleText;
        const options = document.createElement("div");
        options.className = "assessment-likert-options";
        const groupName = `likert_${key}_${item.item_id}`;
        for (let i = 1; i <= 10; i += 1) {
          const label = document.createElement("label");
          label.className = "assessment-likert-choice";
          const input = document.createElement("input");
          input.type = "radio";
          input.name = groupName;
          input.value = String(i);
          input.dataset.key = key;
          input.addEventListener("change", () => {
            const allChoices = options.querySelectorAll(".assessment-likert-choice");
            allChoices.forEach(choice => choice.classList.remove("is-selected"));
            label.classList.add("is-selected");
          });
          const number = document.createElement("span");
          number.textContent = String(i);
          label.append(input, number);
          options.append(label);
        }
        const ends = document.createElement("div");
        ends.className = "assessment-likert-ends";
        ends.innerHTML = `<span>${leftText}</span><span>${rightText}</span>`;
        wrap.append(titleEl, options, ends);
        return wrap;
      };

      const creativityLikert = makeLikert(
        "creatividad",
        "Del 1 al 10, ¿cómo de creativa consideras que es esta criatura?",
        "Nada creativa",
        "Extremadamente creativa"
      );
      const unusualLikert = makeLikert(
        "parecido_tierra",
        "Del 1 al 10, ¿cómo de inusual consideras que es esta criatura?",
        "Muy parecida<br>a una criatura terrestre",
        "Nada parecida<br>a una criatura terrestre"
      );
      right.append(numbersTitle, numbersRow, symmetryWrap, creativityLikert, unusualLikert);
      top.append(left, right);

      card.append(title, top);
      list.append(card);
    });

    continueBtn.addEventListener("click", () => {
      if (warning) {
        warning.textContent = "";
        warning.style.setProperty("color", "#dc2626", "important");
      }
      const cards = [...list.querySelectorAll(".assessment-card")];
      const responses = [];

      for (const card of cards) {
        const itemId = card.dataset.itemId || "";
        const itemMeta = items.find(i => i.item_id === itemId);
        if (!itemMeta) continue;

        const readNumber = key => {
          const el = card.querySelector(`input[data-key="${key}"]`);
          const raw = el ? el.value.trim() : "";
          if (raw === "") return 0;
          const value = Number(raw);
          if (!Number.isFinite(value) || value < 0 || !Number.isInteger(value)) return null;
          return value;
        };

        const n_ojos = readNumber("n_ojos");
        const n_orejas = readNumber("n_orejas");
        const n_bocas = readNumber("n_bocas");
        const n_narices = readNumber("n_narices");
        const n_patas = readNumber("n_patas");
        const n_brazos = readNumber("n_brazos");
        const n_cuernos = readNumber("n_cuernos");
        const n_colas = readNumber("n_colas");
        const simetriaEl = card.querySelector('select[data-key="simetria"]');
        const simetria = simetriaEl ? Number(simetriaEl.value) : NaN;
        const creatividadEl = card.querySelector('input[data-key="creatividad"]:checked');
        const creatividad = creatividadEl ? Number(creatividadEl.value) : NaN;
        const parecidoTierraEl = card.querySelector('input[data-key="parecido_tierra"]:checked');
        const parecido_tierra = parecidoTierraEl ? Number(parecidoTierraEl.value) : NaN;

        if (
          n_ojos === null ||
          n_orejas === null ||
          n_bocas === null ||
          n_narices === null ||
          n_patas === null ||
          n_brazos === null ||
          n_cuernos === null ||
          n_colas === null ||
          !Number.isInteger(simetria) ||
          simetria < 1 ||
          simetria > 3 ||
          !Number.isInteger(creatividad) ||
          creatividad < 1 ||
          creatividad > 10 ||
          !Number.isInteger(parecido_tierra) ||
          parecido_tierra < 1 ||
          parecido_tierra > 10
        ) {
          if (warning) {
            warning.textContent = "Contesta a todas las preguntas";
            warning.style.setProperty("color", "#dc2626", "important");
          }
          return;
        }

        responses.push({
          item_id: itemMeta.item_id,
          creature_number: itemMeta.creature_number,
          phase: itemMeta.phase,
          label: itemMeta.label,
          n_ojos,
          n_orejas,
          n_bocas,
          n_narices,
          n_patas,
          n_brazos,
          n_cuernos,
          n_colas,
          simetria,
          creatividad,
          parecido_tierra
        });
      }

      if (responses.length !== 7) {
        if (warning) warning.textContent = "No se encontraron las 7 criaturas esperadas.";
        return;
      }

      finalAssessmentResponses = responses;
      saveEmergencySnapshotToStorage();
      jsPsych.finishTrial({ final_assessment: responses, n_assessments: responses.length });
    });
  },
  data: { screen: "final_assessment" }
};

const experimentEndTrial = {
  type: jsPsychHtmlKeyboardResponse,
  choices: "NO_KEYS",
  stimulus: `
    <div id="experiment-end-screen" class="screen active">
      <div class="screen-card" style="min-height: 56vh; display:flex; flex-direction:column;">
        <h2 class="center">FIN DEL EXPERIMENTO</h2>
        <p>&iexcl;Muchas gracias por participar!</p>
        <div style="margin-top:auto;">
          <p style="text-align:center; margin-bottom:10px;">&iexcl;Eso es todo!<br>La experimentadora se encargar&aacute; de guardar los datos, no pulses nada m&aacute;s.</p>
          <p id="participant-stop-warning" style="display:none; text-align:center; color:#dc2626; font-weight:600; margin:0 0 10px;">&iexcl;ESPERA! Si eres participante, no toques nada m&aacute;s, &iexcl;gracias por participar!</p>
          <div class="row" style="padding-top:4px;">
            <button class="btn" id="save-data-btn" style="font-size:11px; padding:4px 8px; background:transparent; border-color:#111827; color:#1f2937; opacity:0.22;">G</button>
          </div>
          <div class="row" style="padding-top:6px;">
            <button class="btn" id="experimenter-save-btn" style="display:none; font-size:12px; padding:5px 10px; background:#0b1220; border-color:var(--border); opacity:0.38;">soy experimentadora</button>
          </div>
        </div>
      </div>
    </div>
  `,
  on_load: () => {
    const btn = document.getElementById("save-data-btn");
    const warning = document.getElementById("participant-stop-warning");
    const experimenterBtn = document.getElementById("experimenter-save-btn");
    btn?.addEventListener("click", () => {
      if (warning) warning.style.display = "block";
      if (experimenterBtn) experimenterBtn.style.display = "inline-block";
    });
    experimenterBtn?.addEventListener("click", () => jsPsych.finishTrial());
  },
  data: { screen: "experiment_end" }
};

const finalSaveTrial = {
  type: jsPsychHtmlKeyboardResponse,
  choices: "NO_KEYS",
  stimulus: `
    <div id="final-save-screen" class="screen active">
      <div class="screen-card">
        <h2 class="center">Guardando datos</h2>
        <p>Espera unos segundos mientras guardamos tus dibujos y descripci&oacute;nes.</p>
      </div>
    </div>
  `,
  on_load: async () => {
    try {
      await saveAllCreatureOutputs();
      clearEmergencySnapshot();
      jsPsych.finishTrial({ final_save_success: true, creatures_saved: creatureRecords.length });
    } catch (err) {
      console.error("Final save failed:", err);
      saveEmergencySnapshotToStorage();
      alert("No se pudo completar el guardado final. Se guardó una copia parcial de emergencia en este navegador.");
      jsPsych.finishTrial({ final_save_success: false, error: String(err && err.message ? err.message : err) });
    }
  },
  data: { screen: "final_save" }
};

const timeline = [
  setupTrial,
  welcomeTrial,
  instructionsTrial,
  tutorialIntroTrial,
  tutorialVideoTrial,
  tutorialExploreTrial,
  trainingDrawingTrial,
  preImportantIntroTrial,
  importantTrial,
  preFirstDrawingReadyTrial,
  drawingTrial1,
  preSecondDrawingReadyTrial,
  drawingTrial2,
  preThirdDrawingReadyTrial,
  drawingTrial3,
  postThreeCreaturesIntroTrial,
  editDrawingTrial1,
  preSecondEditingReadyTrial,
  editDrawingTrial2,
  preThirdEditingReadyTrial,
  editDrawingTrial3,
  leastCreativeIntroTrial,
  leastCreativeDrawingTrial,
  finalAssessmentTrial,
  experimentEndTrial,
  finalSaveTrial
];

jsPsych.run(timeline);
