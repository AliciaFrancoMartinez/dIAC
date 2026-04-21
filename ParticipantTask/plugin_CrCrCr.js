const DRAWING_CREATOR_HTML = `
    <style>
      .transform-buttons-grid {
        display: grid;
        grid-template-columns: repeat(2, 76px);
        grid-template-rows: repeat(3, 76px);
        column-gap: 14px;
        row-gap: 14px;
        align-items: center;
        justify-items: center;
        justify-content: center;
      }
      .transform-buttons-grid .btn.icon-btn {
        width: 76px;
        min-width: 76px;
        height: 76px;
        min-height: 76px;
        padding: 0;
      }
      .transform-buttons-grid .btn.icon-btn img {
        width: 72%;
        height: 72%;
        object-fit: contain;
      }
      .transform-buttons-grid #flip-y {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .transform-buttons-grid #flip-y img {
        width: 62%;
        height: 62%;
        display: block;
        margin: 0;
      }
      .sticker.heart-icon-cell svg {
        width: 66%;
        height: 66%;
        display: block;
        margin: auto;
      }
      .summary-card {
        position: relative;
      }
      #description-intro {
        position: absolute;
        inset: 0;
        display: grid;
        place-items: center;
        background: rgba(11, 18, 32, 0.45);
        backdrop-filter: blur(1px);
        border-radius: 12px;
        z-index: 5;
        padding: 16px;
      }
      #description-intro .intro-card {
        background: rgba(11, 18, 32, 0.96);
        border: 1px solid var(--border);
        border-radius: 12px;
        padding: 16px;
        max-width: 680px;
        text-align: center;
      }
      #description-intro .intro-card p {
        margin: 0 0 12px;
      }
      #description-intro .intro-card .row {
        justify-content: center;
      }
      .timer-display.timer-warning {
        color: #fecaca !important;
        background: #7f1d1d !important;
        border-color: #ef4444 !important;
        box-shadow: 0 0 0 1px #ef4444 inset;
      }
    </style>
    <div id="zoom-gate" class="fullscreen-gate fullscreen-hidden">
      <div class="fullscreen-card">
        <p>Ajusta el zoom del navegador a 100%.</p>
      </div>
    </div>
    <div id="fullscreen-exit" class="fullscreen-gate fullscreen-hidden">
      <div class="fullscreen-card">
        <h2>Full Screen Paused</h2>
        <p>Click to return to full screen to continue.</p>
        <div class="row">
          <button class="btn primary" id="return-fullscreen">Return</button>
        </div>
      </div>
    </div>
    <div id="editor-screen" class="editor-screen">
      <button id="trial-skip-hidden-editor" aria-label="Saltar tutorial" title="Saltar tutorial" style="position:absolute; top:6px; left:6px; z-index:5; width:12px; height:12px; padding:0; border-radius:999px; border:1px solid rgba(255,255,255,.18); background:rgba(0,0,0,.15); color:transparent; opacity:.18;"></button>
      <div class="wrap">
        <div class="editor-wrap">
        <div class="hero">
          <div class="hero-top">
            <div class="hero-actions">
              <button class="btn" id="undo-btn" title="Undo (Ctrl/Cmd+Z)">↩</button>
              <button class="btn" id="redo-btn" title="Redo (Ctrl/Cmd+Shift+Z)">↪</button>
            </div>
            <h1>Creative Creature Creator</h1>
            <div class="hero-right">
              <div class="timer-display" id="timer-display">05:00</div>
              <button class="btn icon-btn" id="record-video" title="Record">⏺</button>
              <button class="btn primary icon-btn" id="finish-top" title="Finish">✓</button>
              
            </div>
          </div>
        </div>
        <div class="layout">
          <div class="panel stack tools-panel-fixed">
            <div class="stack">
              <div class="draw-tools">
                <button class="btn icon-btn" id="draw-stroke" title="Stroke Draw"><img src="assets/icons/icon_strokedraw.png" alt="Stroke Draw" /></button>
                <button class="btn icon-btn" id="draw-figure" title="Figure Draw"><img src="assets/icons/icon_figuredraw.png" alt="Figure Draw" /></button>
              </div>
            </div>
            <div class="stack elements-panel-fixed">
              <div class="sticker-grid" id="sticker-grid"></div>
              <div class="color-controls" id="color-controls"></div>
              <div class="row">
                <input id="brush-size" class="range" type="range" min="1" max="40" value="6" />
                <svg class="brush-preview" viewBox="0 0 70 22" aria-label="Stroke thickness preview">
                  <line id="brush-preview-line" x1="10" y1="11" x2="60" y2="11" stroke-width="6"></line>
                </svg>
                <div id="draw-palette" class="draw-palette"></div>
              </div>
            </div>
          </div>

          <div class="canvas-col">
          <div class="canvas-wrap">
            <svg id="stage" viewBox="0 0 900 900" width="900" height="900" preserveAspectRatio="xMidYMid meet"></svg>
          </div>
          
        </div>
          

          <div class="panel stack layers-panel-fixed">
            <div class="right-controls transform-buttons-grid">
              <button class="btn icon-btn" id="flip-x" title="Flip X"><img src="assets/icons/icon_flipX.png" alt="Flip X" /></button>
              <button class="btn icon-btn" id="flip-y" title="Flip Y"><img src="assets/icons/icon_flipY.png" alt="Flip Y" /></button>
              <button class="btn icon-btn" id="bring-forward" title="Bring Forward"><img src="assets/icons/icon_bringforward.png" alt="Bring Forward" /></button>
              <button class="btn icon-btn" id="send-backward" title="Send Backward"><img src="assets/icons/icon_sendbackward.png" alt="Send Backward" /></button>
              <button class="btn icon-btn" id="delete-selection" title="Delete"><img src="assets/icons/icon_delete.png" alt="Delete" /></button>
              <button class="btn icon-btn" id="duplicate-selection" title="Duplicate"><img src="assets/icons/icon_duplicate.png" alt="Duplicate" /></button>
            </div>
            <div class="layer-list" id="layers-list"></div>
          </div>
        </div>
      </div>
    </div>
    <div id="timeout-message" class="overlay-message">
      <div class="overlay-card">
        <h2>¡Tiempo!</h2>
        
        <div class="row">
          <button class="btn primary icon-btn" id="finish" title="Finish">✓</button>
        </div>
      </div>
    </div>
    <div id="summary-screen" class="summary-screen">
      <button id="trial-skip-hidden-summary" aria-label="Saltar tutorial" title="Saltar tutorial" style="position:absolute; top:6px; left:6px; z-index:5; width:12px; height:12px; padding:0; border-radius:999px; border:1px solid rgba(255,255,255,.18); background:rgba(0,0,0,.15); color:transparent; opacity:.18;"></button>
      <div class="summary-card">
        <img id="summary-preview" class="summary-preview" alt="Final creature" />
        <div class="row" id="description-timer-row" style="justify-content:flex-end; display:none;">
          <div class="timer-display" id="description-timer-display">01:00</div>
        </div>
        <div id="description-intro">
          <div class="intro-card">
            <p id="description-intro-text">Imagina que el dibujo de tu criatura estuviera expuesto en un museo, junto a un cartelito con su descripción. Ahora te pedimos que escribas esa descripción en un párrafo corto, lo más creativo posible.</p>
            <p id="description-intro-countdown" class="muted">Empezando en 20...</p>
            <div class="row">
              <button class="btn primary" id="description-start">Empezar</button>
            </div>
          </div>
        </div>
        <div class="description-box">
          <input id="creature-name" type="text" placeholder="Nombre de la criatura..." />
          <textarea id="creature-description" placeholder="Descripción..."></textarea>
        </div>
        <div class="summary-actions">
          <button class="btn primary icon-btn" id="finish-final" title="Finish">✓</button>
        </div>
      </div>
    </div>
    <div id="description-required-message" class="overlay-message">
      <div class="overlay-card">
        <p>El nombre y la descripción no pueden quedar vacíos.</p>
        <div class="row">
          <button class="btn primary" id="description-required-ok">OK</button>
        </div>
      </div>
    </div>`;

var jsPsychDrawingCreator = (function (jspsych) {
  const info = {
    name: "drawing-creator",
    parameters: {
      time_limit_ms: { type: jspsych.ParameterType.INT, default: 300000 },
      laboratory_id: { type: jspsych.ParameterType.STRING, default: "" },
      participant_id: { type: jspsych.ParameterType.STRING, default: "" },
      training_mode: { type: jspsych.ParameterType.BOOL, default: false },
      bottom_prompt_html: { type: jspsych.ParameterType.STRING, default: "" },
      save_outputs_to_workspace: { type: jspsych.ParameterType.BOOL, default: true },
      initial_parts: { type: jspsych.ParameterType.OBJECT, default: null },
      min_draw_time_ms: { type: jspsych.ParameterType.INT, default: 0 },
      description_time_limit_ms: { type: jspsych.ParameterType.INT, default: null },
      min_description_time_ms: { type: jspsych.ParameterType.INT, default: 0 },
      initial_creature_name: { type: jspsych.ParameterType.STRING, default: "" },
      initial_description: { type: jspsych.ParameterType.STRING, default: "" },
      description_intro_text: { type: jspsych.ParameterType.STRING, default: "" }
    }
  };

  class DrawingCreatorPlugin {
    constructor(jsPsych) {
      this.jsPsych = jsPsych;
    }

    trial(display_element, trial) {
      display_element.innerHTML = DRAWING_CREATOR_HTML;
      const jsPsych = this.jsPsych;
      const localZoomGate = display_element.querySelector("#zoom-gate");
      const localFullscreenExit = display_element.querySelector("#fullscreen-exit");
      if (localZoomGate) {
        if (!document.body.querySelector("#zoom-gate")) document.body.appendChild(localZoomGate);
        else localZoomGate.remove();
      }
      if (localFullscreenExit) {
        if (!document.body.querySelector("#fullscreen-exit")) document.body.appendChild(localFullscreenExit);
        else localFullscreenExit.remove();
      }

      const getTrialElement = (id) => display_element.querySelector(`#${id}`);
      const getOverlayElement = (id) => getTrialElement(id) || document.body.querySelector(`#${id}`);

      const stage = getTrialElement("stage");
      const transparentInput = { checked: false };
      const grid = getTrialElement("sticker-grid");
      const layersList = getTrialElement("layers-list");
      const colorControls = getTrialElement("color-controls");
      const figureDrawBtn = getTrialElement("draw-figure");
      const strokeDrawBtn = getTrialElement("draw-stroke");
      const brushSizeInput = getTrialElement("brush-size");
      const brushPreviewLine = getTrialElement("brush-preview-line");
      const brushPreview = display_element.querySelector(".brush-preview");
      const drawPalette = getTrialElement("draw-palette");
      const undoBtn = getTrialElement("undo-btn");
      const redoBtn = getTrialElement("redo-btn");
      const finishBtn = getTrialElement("finish");
      const finishTopBtn = getTrialElement("finish-top");
      const recordVideoBtn = getTrialElement("record-video");
      const timerDisplay = getTrialElement("timer-display");
      const zoomGate = getOverlayElement("zoom-gate");
      const timeoutMessage = getTrialElement("timeout-message");
      const summaryScreen = getTrialElement("summary-screen");
      const summaryPreview = getTrialElement("summary-preview");
      const trialSkipHiddenEditorBtn = getTrialElement("trial-skip-hidden-editor");
      const trialSkipHiddenSummaryBtn = getTrialElement("trial-skip-hidden-summary");
      const finishFinalBtn = getTrialElement("finish-final");
      const descriptionTimerRow = getTrialElement("description-timer-row");
      const descriptionTimerDisplay = getTrialElement("description-timer-display");
      const descriptionIntro = getTrialElement("description-intro");
      const descriptionIntroTextEl = getTrialElement("description-intro-text");
      const descriptionIntroCountdownEl = getTrialElement("description-intro-countdown");
      const descriptionStartBtn = getTrialElement("description-start");
      const descriptionRequiredMessage = getTrialElement("description-required-message");
      const descriptionRequiredOkBtn = getTrialElement("description-required-ok");
      const flipXBtn = getTrialElement("flip-x");
      const flipYBtn = getTrialElement("flip-y");
      const bringForwardBtn = getTrialElement("bring-forward");
      const sendBackwardBtn = getTrialElement("send-backward");
      const deleteSelectionBtn = getTrialElement("delete-selection");
      const duplicateSelectionBtn = getTrialElement("duplicate-selection");

      const descriptionInput = getTrialElement("creature-description");
      const creatureNameInput = getTrialElement("creature-name");
      descriptionRequiredOkBtn?.addEventListener("click", resumeDescriptionTimerAfterRequiredMessage);
      creatureNameInput?.addEventListener("input", updateDescriptionValidityUi);
      creatureNameInput?.addEventListener("blur", updateDescriptionValidityUi);
      descriptionInput?.addEventListener("input", updateDescriptionValidityUi);
      descriptionInput?.addEventListener("blur", updateDescriptionValidityUi);
      let descriptionStarted = false;
      descriptionStartBtn?.addEventListener("click", beginDescriptionEntry);

      const setupScreen = getTrialElement("setup-screen");
      const instructionsScreen = getTrialElement("instructions-screen");
      const importantScreen = getTrialElement("important-screen");
      const editorScreen = getTrialElement("editor-screen");
      const labIdInput = getTrialElement("lab-id");
      const participantIdInput = getTrialElement("participant-id");
      const setupContinueBtn = getTrialElement("setup-continue");
      const instructionsContinueBtn = getTrialElement("instructions-continue");
      const fullscreenExit = getOverlayElement("fullscreen-exit");
      const enterFullscreenBtn = getTrialElement("enter-fullscreen");
      const returnFullscreenBtn = getOverlayElement("return-fullscreen");
      let setupComplete = true;
      let instructionsComplete = true;
      let laboratoryId = (trial && trial.laboratory_id) || "L-001";
      let participantId = (trial && trial.participant_id) || "P-001";
      let editorEnabled = true;
      const zoomPauseState = {
        active: false,
        elapsedMs: 0,
        editorEnabled: true
      };
      let timerIntervalId = null;

      function setGateVisible(el, visible) {
        if (!el) return;
        el.classList.toggle("fullscreen-hidden", !visible);
      }

      function setScreenVisible(el, visible) {
        if (!el) return;
        el.classList.toggle("active", visible);
      }

      function initSetupScreen() {
        if (!setupScreen || !setupContinueBtn || !labIdInput || !participantIdInput) {
          setupComplete = true;
          return;
        }
        labIdInput.value = laboratoryId;
        setScreenVisible(setupScreen, true);
        setScreenVisible(instructionsScreen, false);
        setScreenVisible(importantScreen, false);
        setScreenVisible(editorScreen, false);
        const finishSetup = () => {
          const lab = labIdInput.value.trim().toUpperCase();
          const pid = participantIdInput.value.trim().toUpperCase();
          const labOk = /^L-\d{3}$/.test(lab);
          const pidOk = /^P-\d{3}$/.test(pid);
          if (!labOk || !pidOk) {
            alert("Use format 'L-XXX' for laboratory and 'P-XXX' for participant (X = digit). For instance: L-001 and P-023.");
            return;
          }
          laboratoryId = lab;
          participantId = pid;
          setupComplete = true;
          setScreenVisible(setupScreen, false);
          setScreenVisible(instructionsScreen, true);
          setScreenVisible(importantScreen, false);
        };
        setupContinueBtn.addEventListener("click", finishSetup);
        [labIdInput, participantIdInput].forEach(el => {
          el.addEventListener("keydown", e => {
            if (e.key === "Enter") finishSetup();
          });
        });
      }

      function setTimeoutVisible(visible) {
        if (!timeoutMessage) return;
        timeoutMessage.classList.toggle("active", visible);
      }

      function handleTimeOver() {
        if (drawStartMs && !drawEndMs) {
          drawEndMs = drawStartMs + DRAW_TIME_LIMIT_MS;
        }
        lockEditing();
        updateTimerDisplay();
        if (IS_TRAINING_MODE) {
          finishTrialWithoutData();
          return;
        }
        setTimeoutVisible(true);
        if (videoState.active) {
          const ts = new Date().toISOString().replace(/[:.]/g, "-");
          stopVideoRecording({ suppressDownload: true, fileName: `monster_process_${ts}.webm` });
        }
      }

      async function handleFinish(force = false) {
        if (summaryScreen && summaryScreen.classList.contains("active")) return;
        if (!force && MIN_DRAW_TIME_MS > 0) {
          const elapsed = drawStartMs ? (Date.now() - drawStartMs) : 0;
          if (elapsed < MIN_DRAW_TIME_MS) return;
        }
        if (drawTimerId) {
          clearTimeout(drawTimerId);
          drawTimerId = null;
        }
        drawEndMs = drawEndMs || Date.now();
        lockEditing();
        if (IS_TRAINING_MODE) {
          finishTrialWithoutData();
          return;
        }
        if (videoState.active) {
          const ts = new Date().toISOString().replace(/[:.]/g, "-");
          await stopVideoRecording({ suppressDownload: true, fileName: `monster_process_${ts}.webm` });
        }
        if (summaryScreen) {
          const blob = await renderPngBlob(true);
          if (summaryPreview) {
            const url = URL.createObjectURL(blob);
            summaryPreview.src = url;
          }
          summaryScreen.classList.add("active");
          descriptionStartMs = null;
          descriptionStarted = false;
          if (DESCRIPTION_INTRO_TEXT) {
            if (descriptionIntro) descriptionIntro.style.display = "";
            if (descriptionInput) descriptionInput.disabled = true;
            updateDescriptionValidityUi();
            startDescriptionIntroCountdown();
          } else {
            if (descriptionIntro) descriptionIntro.style.display = "none";
            if (descriptionInput) descriptionInput.disabled = false;
            beginDescriptionEntry();
          }
        }
      }
      function pauseForZoom() {
        if (zoomPauseState.active) return;
        zoomPauseState.active = true;
        zoomPauseState.editorEnabled = editorEnabled;
        if (isDrawing) finalizeDrawing(false);
        setEditorEnabled(false);
        if (drawStartMs) {
          zoomPauseState.elapsedMs = Date.now() - drawStartMs;
        } else {
          zoomPauseState.elapsedMs = 0;
        }
        if (drawTimerId) {
          clearTimeout(drawTimerId);
          drawTimerId = null;
        }
        if (timerIntervalId) {
          clearInterval(timerIntervalId);
          timerIntervalId = null;
        }
        updateTimerDisplay();
      }

      function resumeFromZoomPause() {
        if (!zoomPauseState.active) return;
        zoomPauseState.active = false;
        if (!editingLocked && zoomPauseState.editorEnabled) setEditorEnabled(true);
        if (drawStartMs && !editingLocked) {
          drawStartMs = Date.now() - zoomPauseState.elapsedMs;
          const remaining = Math.max(0, DRAW_TIME_LIMIT_MS - zoomPauseState.elapsedMs);
          if (drawTimerId) clearTimeout(drawTimerId);
          drawTimerId = setTimeout(() => {
            handleTimeOver();
          }, remaining);
          if (timerIntervalId) clearInterval(timerIntervalId);
          timerIntervalId = setInterval(updateTimerDisplay, 250);
          updateTimerDisplay();
        }
      }
      function startDrawingTimer() {
        if (!setupComplete || !instructionsComplete) return;
        if (!drawStartMs) {
          drawStartMs = Date.now();
          if (drawTimerId) clearTimeout(drawTimerId);
          drawTimerId = setTimeout(() => {
            handleTimeOver();
          }, DRAW_TIME_LIMIT_MS);
          if (timerIntervalId) clearInterval(timerIntervalId);
          timerIntervalId = setInterval(updateTimerDisplay, 250);
          updateTimerDisplay();
        }
      }

      function formatTime(ms) {
        const total = Math.max(0, Math.ceil(ms / 1000));
        const m = String(Math.floor(total / 60)).padStart(2, "0");
        const s = String(total % 60).padStart(2, "0");
        return `${m}:${s}`;
      }

      function updateTimerDisplay() {
        if (!timerDisplay) return;
        if (!drawStartMs) {
          timerDisplay.textContent = formatTime(DRAW_TIME_LIMIT_MS);
          timerDisplay.classList.toggle("timer-warning", DRAW_TIME_LIMIT_MS <= DRAW_TIMER_WARNING_MS);
          updateTrainingFinishButtons(0);
          return;
        }
        const elapsed = Date.now() - drawStartMs;
        const remaining = Math.max(0, DRAW_TIME_LIMIT_MS - elapsed);
        timerDisplay.textContent = formatTime(remaining);
        timerDisplay.classList.toggle("timer-warning", remaining <= DRAW_TIMER_WARNING_MS);
        updateTrainingFinishButtons(elapsed);
      }

      function updateTrainingFinishButtons(elapsedMs) {
        if (!IS_TRAINING_MODE) return;
        const canFinish = MIN_DRAW_TIME_MS <= 0 || elapsedMs >= MIN_DRAW_TIME_MS;
        [finishTopBtn, finishBtn].forEach(btn => {
          if (!btn) return;
          btn.style.display = canFinish ? "" : "none";
          btn.disabled = !canFinish;
        });
      }

      function setDescriptionRequiredVisible(visible) {
        if (!descriptionRequiredMessage) return;
        descriptionRequiredMessage.classList.toggle("active", !!visible);
      }

      function updateDescriptionValidityUi() {
        const isDescriptionEmpty = !((descriptionInput && descriptionInput.value || "").trim());
        const isNameEmpty = !((creatureNameInput && creatureNameInput.value || "").trim());
        const waitingToStart = !!(summaryScreen && summaryScreen.classList.contains("active") && !descriptionStarted);
        if (finishFinalBtn) finishFinalBtn.disabled = isDescriptionEmpty || isNameEmpty || waitingToStart;
      }

      function clearDescriptionIntroCountdown() {
        if (descriptionIntroTimeoutId) {
          clearTimeout(descriptionIntroTimeoutId);
          descriptionIntroTimeoutId = null;
        }
        if (descriptionIntroIntervalId) {
          clearInterval(descriptionIntroIntervalId);
          descriptionIntroIntervalId = null;
        }
      }

      function startDescriptionIntroCountdown() {
        clearDescriptionIntroCountdown();
        let remaining = DESCRIPTION_INTRO_COUNTDOWN_SECONDS;
        if (descriptionIntroCountdownEl) {
          descriptionIntroCountdownEl.textContent = `Empezando en ${remaining}...`;
        }
        descriptionIntroIntervalId = setInterval(() => {
          remaining -= 1;
          if (descriptionIntroCountdownEl) {
            descriptionIntroCountdownEl.textContent = `Empezando en ${Math.max(0, remaining)}...`;
          }
        }, 1000);
        descriptionIntroTimeoutId = setTimeout(() => {
          beginDescriptionEntry();
        }, DESCRIPTION_INTRO_COUNTDOWN_SECONDS * 1000);
      }

      function beginDescriptionEntry() {
        if (!summaryScreen || !summaryScreen.classList.contains("active") || descriptionStarted) return;
        clearDescriptionIntroCountdown();
        descriptionStarted = true;
        if (descriptionIntro) descriptionIntro.style.display = "none";
        if (descriptionInput) {
          descriptionInput.disabled = false;
          descriptionInput.focus();
          const end = descriptionInput.value.length;
          if (typeof descriptionInput.setSelectionRange === "function") {
            descriptionInput.setSelectionRange(end, end);
          }
        }
        descriptionStartMs = Date.now();
        updateDescriptionValidityUi();
        startDescriptionTimer();
      }

      function clearDescriptionTimer() {
        if (descriptionTimerTimeoutId) {
          clearTimeout(descriptionTimerTimeoutId);
          descriptionTimerTimeoutId = null;
        }
        if (descriptionTimerIntervalId) {
          clearInterval(descriptionTimerIntervalId);
          descriptionTimerIntervalId = null;
        }
      }

      function updateDescriptionTimerDisplay() {
        if (!descriptionTimerDisplay || !DESCRIPTION_TIME_LIMIT_MS || descriptionRemainingMs === null) return;
        const elapsed = descriptionTimerStartedAtMs ? (Date.now() - descriptionTimerStartedAtMs) : 0;
        const remaining = Math.max(0, descriptionRemainingMs - elapsed);
        descriptionTimerDisplay.textContent = formatTime(remaining);
        descriptionTimerDisplay.classList.toggle("timer-warning", remaining <= DESCRIPTION_TIMER_WARNING_MS);
      }

      function startDescriptionTimer(resume = false) {
        if (!DESCRIPTION_TIME_LIMIT_MS || !summaryScreen || !summaryScreen.classList.contains("active")) {
          if (descriptionTimerRow) descriptionTimerRow.style.display = "none";
          return;
        }
        if (!resume || descriptionRemainingMs === null) descriptionRemainingMs = DESCRIPTION_TIME_LIMIT_MS;
        if (descriptionRemainingMs <= 0) descriptionRemainingMs = 1000;
        descriptionTimerStartedAtMs = Date.now();
        if (descriptionTimerRow) descriptionTimerRow.style.display = "flex";
        clearDescriptionTimer();
        updateDescriptionTimerDisplay();
        descriptionTimerIntervalId = setInterval(updateDescriptionTimerDisplay, 250);
        descriptionTimerTimeoutId = setTimeout(() => {
          descriptionRemainingMs = 0;
          void completeSummaryAndFinish();
        }, descriptionRemainingMs);
      }

      function pauseDescriptionTimerForRequiredMessage() {
        if (!DESCRIPTION_TIME_LIMIT_MS || descriptionRemainingMs === null || descriptionPausedForRequiredMessage) return;
        const elapsed = descriptionTimerStartedAtMs ? (Date.now() - descriptionTimerStartedAtMs) : 0;
        descriptionRemainingMs = Math.max(0, descriptionRemainingMs - elapsed);
        descriptionTimerStartedAtMs = null;
        descriptionPausedForRequiredMessage = true;
        clearDescriptionTimer();
      }

      function resumeDescriptionTimerAfterRequiredMessage() {
        setDescriptionRequiredVisible(false);
        updateDescriptionValidityUi();
        if (!descriptionPausedForRequiredMessage) return;
        descriptionPausedForRequiredMessage = false;
        startDescriptionTimer(true);
        if (descriptionInput) descriptionInput.focus();
      }

      async function completeSummaryAndFinish() {
        if (summarySubmitting) return;
        if (MIN_DESCRIPTION_TIME_MS > 0) {
          const elapsed = descriptionStartMs ? (Date.now() - descriptionStartMs) : 0;
          if (elapsed < MIN_DESCRIPTION_TIME_MS) return;
        }
        const creatureNameText = (creatureNameInput && creatureNameInput.value || "").trim();
        const descriptionText = (descriptionInput && descriptionInput.value || "").trim();
        if (!creatureNameText || !descriptionText) {
          pauseDescriptionTimerForRequiredMessage();
          setDescriptionRequiredVisible(true);
          if (!creatureNameText && creatureNameInput) creatureNameInput.focus();
          else if (descriptionInput) descriptionInput.focus();
          return;
        }
        setDescriptionRequiredVisible(false);
        summarySubmitting = true;
        if (IS_TRAINING_MODE) {
          finishTrialWithoutData();
          return;
        }
        clearDescriptionTimer();
        descriptionEndMs = Date.now();
        if (SHOULD_SAVE_OUTPUTS) {
          const ts = new Date().toISOString().replace(/[:.]/g, "-");
          if (videoState.active) {
            await stopVideoRecording({ suppressDownload: true, fileName: `monster_process_${ts}.webm` });
          }
          await exportPNG(false, { saveToWorkspace: true, fileName: `monster_${ts}.png` });
          await exportActionsCsv({ saveToWorkspace: true, fileName: `monster_actions_${ts}.csv` });
          await exportSummaryCsv({ saveToWorkspace: true, fileName: `monster_summary_${ts}.csv` });
        } else if (videoState.active) {
          await stopVideoRecording({ suppressDownload: true });
        }
        await finishTrialWithData();
      }

      function setEditorEnabled(enabled) {
        editorEnabled = enabled;
        const disabled = !enabled;
        [figureDrawBtn, strokeDrawBtn, brushSizeInput, undoBtn, redoBtn, recordVideoBtn, flipXBtn, flipYBtn, bringForwardBtn, sendBackwardBtn, deleteSelectionBtn, duplicateSelectionBtn]
          .forEach(el => {
            if (!el) return;
            if ("disabled" in el) el.disabled = disabled;
          });
        if (grid) grid.style.pointerEvents = enabled ? "auto" : "none";
        if (colorControls) colorControls.style.pointerEvents = enabled ? "auto" : "none";
        if (layersList) layersList.style.pointerEvents = enabled ? "auto" : "none";
        if (drawPalette) drawPalette.style.pointerEvents = enabled ? "auto" : "none";
        stage.style.pointerEvents = enabled ? "auto" : "none";
      }

      function lockEditing() {
        if (editingLocked) return;
        editingLocked = true;
        drawEndMs = drawEndMs || Date.now();
        if (isDrawing) finalizeDrawing(false);
        drawMode = drawModes.NONE;
        figureDrawBtn.classList.remove("active");
        strokeDrawBtn.classList.remove("active");
        setEditorEnabled(false);
        updateTimerDisplay();
        if (timerIntervalId) {
          clearInterval(timerIntervalId);
          timerIntervalId = null;
        }
      }


      const drawModes = {
        NONE: "none",
        FIGURE: "figure",
        STROKE: "stroke"
      };
      const DEFAULT_COLOR = "#6b7280";
      const DEFAULT_ALPHA = 1;
      const PALETTE_ICON_DATA = "assets/icons/icon_palette.png";
      const MIN_SCALE = 0.01;
      const DRAW_TIME_LIMIT_MS = typeof trial.time_limit_ms === "number" ? trial.time_limit_ms : 300000;
      const MIN_DRAW_TIME_MS = typeof trial.min_draw_time_ms === "number" ? Math.max(0, trial.min_draw_time_ms) : 0;
      const DRAW_TIMER_WARNING_MS = 60000;
      const DESCRIPTION_TIMER_WARNING_MS = 30000;
      const DESCRIPTION_TIME_LIMIT_MS = typeof trial.description_time_limit_ms === "number"
        ? trial.description_time_limit_ms
        : null;
      const MIN_DESCRIPTION_TIME_MS = typeof trial.min_description_time_ms === "number"
        ? Math.max(0, trial.min_description_time_ms)
        : 0;
      const DESCRIPTION_INTRO_COUNTDOWN_SECONDS = 20;
      const DESCRIPTION_INTRO_TEXT = (trial && typeof trial.description_intro_text === "string")
        ? trial.description_intro_text
        : "";
      const IS_TRAINING_MODE = !!(trial && trial.training_mode);
      const BOTTOM_PROMPT_HTML = (trial && typeof trial.bottom_prompt_html === "string") ? trial.bottom_prompt_html : "";
      const SHOULD_SAVE_OUTPUTS = !(trial && trial.save_outputs_to_workspace === false);
      const INITIAL_PARTS = Array.isArray(trial && trial.initial_parts) ? trial.initial_parts : null;
      const INITIAL_CREATURE_NAME = (trial && typeof trial.initial_creature_name === "string") ? trial.initial_creature_name : "";
      const INITIAL_DESCRIPTION = (trial && typeof trial.initial_description === "string") ? trial.initial_description : "";
      if (descriptionIntroTextEl && DESCRIPTION_INTRO_TEXT) {
        descriptionIntroTextEl.textContent = DESCRIPTION_INTRO_TEXT;
      }

      const stickerCategories = {
        features: [
          {
            id: "feature-eye",
            name: "eye",
            svg: "<ellipse cx='60' cy='60' rx='42' ry='28' fill='#ffffff' stroke='#000000' stroke-width='2'/><circle cx='60' cy='60' r='14' fill='currentColor'/><circle cx='66' cy='54' r='4' fill='#ffffff'/>",
            w: 120,
            h: 120,
            tintable: true
          },
          {
            id: "feature-nose",
            name: "nose",
            svg: "<path d='m433.7 525.1c-29.8 0-68.2-20.7-114.7-61.7-22.1-19.6-28.7-45.1-18-70 14.6-33.7 59-59.6 85-57.3 22.1 2.1 48.2 19.5 69.9 46.5 23.6 29.4 35.2 61.8 31.9 88.8-4.3 34-23.5 46.1-34.5 50.3q-9.1 3.4-19.6 3.4z' fill='__C1__'/><path d='m599.5 508.9c-22.7 0-39.4-5.6-50.5-16.7-11.9-12-15.5-29.2-10.1-48.2 7.4-26.3 32.5-42.8 46.7-50.3 20.1-10.6 49.5-19.2 71.9-11.6 21.9 7.4 48 41.9 47.2 71.7-0.6 21.5-14.3 37.6-37.5 44-26.7 7.4-49.2 11.1-67.7 11.1z' fill='__C1__'/><path d='m356.8 460c75.1 66.2 111.2 56.8 116.2 17.3 4.9-39.6-41.8-93.6-71.7-96.4-22.6-2.1-86.5 42-44.5 79.1z' fill='__C2__'/><path d='m638.2 485.6c-73.3 20.4-96.7 2.8-88.8-25 7.9-27.9 57.3-49 79.6-41.5 16.9 5.8 50.2 55.2 9.2 66.5z' fill='__C2__'/>",
            w: 1000,
            h: 1000,
            colors: ["__C1__", "__C2__"],
            defaultColors: ["#9ca3af", "#4b5563"],
            defaultScale: 0.24,
            hideLayerLabel: true,
            previewGreyscale: true
          },
          {
            id: "feature-mouth",
            name: "mouth",
            svg: "<path d='M20 55 Q60 95 100 55' fill='none' stroke='currentColor' stroke-width='12' stroke-linecap='round'/>",
            w: 120,
            h: 120,
            tintable: true,
            strokeWidth: 12,
            forceStroke: true
          },
          {
            id: "feature-ear",
            name: "smallear",
            svg: "<path d='m1791.2 345.7c-96.3 6.5-450.6 655-427.5 762 23.2 107.1 139.5 67.4 290.8 61.9 151.4-5.5 326.8 32.5 383.7-1.5 98.9-59.3-62.8-834.8-247-822.4z' fill='__C1__'/><path d='m1793 477.9c-98.3 3.6-332.7 515.8-313.3 597.2 19.4 81.5 169.8 4.6 255.4 18.5 129.3 21 204.7 60.6 257.6-4.6 52.9-65.3-99.9-614.9-199.7-611.1z' fill='__C2__'/>",
            w: 3400,
            h: 2000,
            colors: ["__C1__", "__C2__"],
            defaultColors: ["#6b7280", "#d1d5db"],
            defaultScale: 0.085,
            hideLayerLabel: true,
            previewGreyscale: true
          },
          {
            id: "feature-horn",
            name: "horn",
            svg: "<path d='m948.5 969.4c45.8-4.8 111.5-11.9 171.9-60.8 24-19.3 43.8-43.5 59.8-69.7 39.2-64.4 55.3-142.5 44.6-217.1-10.7-74.5-48-145-103.6-195.8 117.8 40 216.8 132 265.5 246.4 48.7 114.5 46.3 249.6-6.5 362.2-65.9 140.4-189.9 210-274.3 236.6-91.6 28.9-189.6 24.1-261.5 20.5-47.2-2.3-86.2-7.5-113.4-11.8-17.4-12.9-51.8-42.2-70.9-92.1-4.1-10.9-33.4-91.7 11.8-170.2 24.2-41.9 58.6-63.8 75.7-73.2 45.6 16.3 116.3 34 200.9 25z' fill='currentColor'/>",
            w: 2000,
            h: 2000,
            tintable: true,
            defaultScale: 0.15,
            hideLayerLabel: true,
            previewGreyscale: true
          },
          {
            id: "feature-leg",
            name: "leg",
            svg: "<path d='m453 248.9c29.6 129.6 11.3 337.7-13.3 408.6-24.6 70.8-47.1 117.9-45.7 133.7l251.6-3.3c0 0-13.4-28.4-40.3-42.7-26.9-14.2-80.8-10.2-91.9-27.1-11.2-16.9 20.9-165.2-2.6-446.5-3.6-42.5-57.8-22.7-57.8-22.7z' fill='currentColor'/>",
            w: 1000,
            h: 1000,
            tintable: true,
            defaultScale: 0.24,
            hideLayerLabel: true,
            previewGreyscale: true
          },
          {
            id: "feature-arm",
            name: "arm",
            svg: "<path d='m556.1 353.4c0 0 146.1 209.1 123.7 292.6-14.7 54.7-88.9 148.7-155.9 171.9l-33.4-47.8c128.1-49 155.7-202.9 59.5-284.9-96.3-82-104-104.4-104-104.4z' fill='__C1__'/><path d='m548.2 468.3c33.1 20.3 67.1 33.6 98.2 39.7 24.6 51.8 42.3 104.8 33.4 138-14.7 54.7-88.9 148.7-155.9 171.9l-33.4-47.8c128.1-49 155.7-202.9 59.5-284.9-96.3-82-104-104.4-104-104.4l8.2-2c19.4 31.6 52.1 63.8 94 89.5z' fill='__C1__'/><path d='m392.8 234.3c3.8-2.5 17.8-3.9 26.6 4.2 8.8 8.2-8.1 27.7-4.1 39.8 4 12 18.8 25.8 18.8 25.8 0 0 4.6-0.2 10.8 0.4 6.4-12.6 20.4-39.5 30-51.5 6.1-16.8 12.7-38.5 11.1-44.5-2-7.1-20.3-37.4-18.3-40.4 2-2.9 18.3-8.3 25.3-5 7.1 3.4 20.2 29.8 20.2 44.5-0.1 8.2-3.4 24.8-8.6 38.8 2.7 0.6 5.5 1.1 8.7 1.3 3 0.1 6.2 0.8 9.5 1.9 5.6-14.5 10.1-38.6 9-44.5-1.5-8.3-19.8-46.4-17.4-49.9 2.4-3.5 22.2-5.3 29.4 0.7 7.2 6 17.7 37.1 15.7 53.3-1.2 10.8-7.7 38.1-15.1 52 3.6 2.6 6.9 5.3 9.8 7.9 6.9-7.5 19.9-21.1 21.1-30.9 1.8-13.5-9.1-38.1-5.7-46.1 3.5-7.9 17-3.7 26.6 1.9 9.5 5.6 7.4 43.2 4.4 56.5 0 0-18.7 39.4-24.5 50.9-5.8 11.4-15.8 33.3-18.8 57-17.6 33-63 67-103.7 32.3-19.3-16.4-43.1-36-48.6-49-5.4-13-22.3-52.8-20.9-62.2 1.3-9.3 4.9-42.6 8.7-45.2z' fill='__C2__'/>",
            w: 1000,
            h: 1000,
            colors: ["__C1__", "__C2__"],
            defaultColors: ["#9ca3af", "#6b7280"],
            defaultScale: 0.26,
            hideLayerLabel: true,
            previewGreyscale: true
          },
          {
            id: "feature-tail",
            name: "tail",
            svg: "<path d='m161.1 146.3q0 0 1.6 0.7c0.9 0.3 2 0.9 3.4 1.7 2.6 1.6 6 4.1 9.5 7.8 7.1 7.2 14.2 19 18.7 33.7l0.9 3 0.8 2.7q0.7 2.6 1.4 5.4c1 3.9 2 8.2 2.8 12.3 1.6 8.2 3 16.8 4.5 25.5 1.6 8.7 3.2 17.7 5.7 26.2 2.4 8.5 5.6 16.8 10.3 23.5 4.6 6.7 10.8 11.7 18.4 13.9 1.7 0.9 3.9 0.9 5.8 1.4l2.9 0.6 3 0.1c1.1 0.1 2.3 0.2 3.3 0.2l2.6-0.4c1.6 0 3.5-0.5 5.2-1 7.2-1.9 13.4-6 18.3-11 5-5.1 8.5-11.2 11.3-17 5.4-11.8 7.3-22.9 8-30.6 0.5-3.8 0.5-6.9 0.6-8.9 0.1-2.1 0.1-3.2 0.1-3.2v-0.6c0.2-5.7 4.9-10.2 10.7-10 5.7 0.1 10.2 4.9 10 10.6 0 0.4 0 0.9-0.1 1.3 0 0-0.2 1.2-0.5 3.6-0.4 2.3-0.8 5.8-1.7 10.2-0.8 4.4-2.2 9.7-4.1 15.6-1.8 6-4.3 12.6-8 19.5-3.7 6.9-8.6 14-15.2 20.6-6.5 6.5-15.3 12.2-25.5 14.7-2.6 0.6-5.1 1.2-8 1.3l-4.3 0.3-3.4-0.1-1.8-0.1-0.8-0.1h-0.5l-0.7-0.1h-0.2l-3.9-0.7c-2.6-0.7-5.2-0.8-7.8-1.9-10.5-2.9-20.1-10.4-26.3-19.3-6.3-8.9-9.9-18.7-12.8-28.1-2.8-9.4-4.6-18.6-6.5-27.5-1.9-8.8-3.5-17.1-5.3-24.9-1-3.9-1.9-7.4-2.8-11q-0.9-2.7-1.7-5.4l-0.8-2.6-0.8-2.2c-4.5-12.5-10.8-21.1-15.6-25.4-2.5-2.3-4.5-3.5-5.7-4.1-0.6-0.3-1-0.4-1.2-0.5 0 0.1 0.1 0.1 0.1 0.1q-0.2-0.1-0.2-0.1l-0.3-0.1c-5.5-1.5-8.7-7.3-7.1-12.8 1.6-5.5 7.3-8.6 12.8-7.1q0.5 0.2 0.9 0.3z' fill='__C1__'/><path d='m315.9 242.1c-22.2 0.9-29.8-21.6-32.8-32.3-4.4-15.1-5.7-46 5.1-49.1 9.1-2.6 13 7.2 13 7.2 0 0 3-11 10.5-10.8 7.6 0.1 10.3 9.5 10.3 9.5 0 0 4.6-10.5 12-7.6 9.4 3.7 12.2 29.6 5.3 49.4-6.8 19.7-14.6 33.4-23.4 33.7z' fill='__C2__'/>",
            w: 450,
            h: 450,
            colors: ["__C1__", "__C2__"],
            defaultColors: ["#6b7280", "#d1d5db"],
            defaultScale: 0.42,
            hideLayerLabel: true,
            previewGreyscale: true
          }
        ],
        figures: [
          {
            id: "shape-circle",
            name: "Circle",
            path: "M 0 -50 A 50 50 0 1 1 0 50 A 50 50 0 1 1 0 -50",
            w: 100,
            h: 100,
            fill: true
          },
          {
            id: "shape-square",
            name: "Square",
            path: "M -38 -50 L 38 -50 Q 50 -50 50 -38 L 50 38 Q 50 50 38 50 L -38 50 Q -50 50 -50 38 L -50 -38 Q -50 -50 -38 -50 Z",
            w: 100,
            h: 100,
            fill: true,
            shapeType: "rounded-square",
            roundness: 0.35
          },
          {
            id: "shape-triangle",
            name: "Triangle",
            path: "M 0 -56 Q 8 -56 13 -47 L 50 30 Q 55 40 46 44 L -46 44 Q -55 40 -50 30 L -13 -47 Q -8 -56 0 -56 Z",
            w: 112,
            h: 104,
            fill: true,
            shapeType: "rounded-triangle",
            roundness: 0.28
          },
          {
            id: "shape-line",
            name: "Line",
            path: "M -60 0 L 60 0",
            w: 120,
            h: 12,
            fill: false,
            strokeWidth: 8
          },
          {
            id: "shape-star",
            name: "Star",
            path: "M 0 -60 L 14 -20 L 56 -20 L 22 6 L 36 48 L 0 22 L -36 48 L -22 6 L -56 -20 L -14 -20 Z",
            w: 112,
            h: 120,
            fill: true
          },
          {
            id: "shape-heart",
            name: "Heart",
            svg: "<path d='M237.376,436.245l0.774,0.976c210.94-85.154,292.221-282.553,199.331-367.706c-92.899-85.154-199.331,30.953-199.331,30.953h-0.774c0,0-106.44-116.107-199.331-30.953C-54.844,154.658,26.437,351.092,237.376,436.245z' fill='currentColor'/>",
            w: 475.528,
            h: 475.528,
            tintable: true,
            defaultScale: 0.28
          },
          {
            id: "shape-bolt",
            name: "Bolt",
            path: "M -14 -70 L 18 -70 L -4 -16 L 24 -16 L -22 72 L -8 12 L -34 12 Z",
            w: 120,
            h: 150,
            fill: true
          },
          {
            id: "shape-diamond",
            name: "Diamond",
            path: "M 0 -60 L 46 0 L 0 60 L -46 0 Z",
            w: 120,
            h: 120,
            fill: true
          }
        ]
      };

      let parts = [];
      let selectedIds = [];
      let dragState = null;
      let drawMode = drawModes.NONE;
      let isDrawing = false;
      let drawPathD = "";
      let drawPointerId = null;
      let drawColor = DEFAULT_COLOR;
      let drawAlpha = DEFAULT_ALPHA;
      let clipboardParts = [];
      let cropState = null;
      let historyUndo = [];
      let historyRedo = [];
      const sessionStartMs = Date.now();
      let debugStickerCenters = false;
      let drawStartMs = null;
      let drawEndMs = null;
      let descriptionStartMs = null;
      let descriptionEndMs = null;
      let descriptionTimerTimeoutId = null;
      let descriptionTimerIntervalId = null;
      let descriptionRemainingMs = null;
      let descriptionTimerStartedAtMs = null;
      let descriptionPausedForRequiredMessage = false;
      let descriptionIntroTimeoutId = null;
      let descriptionIntroIntervalId = null;
      let summarySubmitting = false;
      let editingLocked = false;
      let drawTimerId = null;
      const actionRows = [];
      const layerRegistry = [];
      const layerMetaById = {};
      let outputDirHandle = null;
      let trialResourcesCleaned = false;
      const recordedVideoClips = [];
      if (creatureNameInput) creatureNameInput.value = INITIAL_CREATURE_NAME;
      if (descriptionInput) descriptionInput.value = INITIAL_DESCRIPTION;
      updateDescriptionValidityUi();
      const videoState = {
        active: false,
        recorder: null,
        chunks: [],
        canvas: null,
        ctx: null,
        intervalId: null,
        rafId: null,
        lastFrameTs: 0,
        rendering: false,
        stream: null,
        mode: "",
        targetFps: 10,
        lowQualityBg: false
      };

      if (editorScreen) editorScreen.classList.add("active");
      startDrawingTimer();
      const canvasCol = display_element.querySelector(".canvas-col");
      if (canvasCol) {
        const promptHtml = IS_TRAINING_MODE
          ? "Explora la herramienta para familiarizarte con ella"
          : BOTTOM_PROMPT_HTML;
        if (promptHtml) {
          const bottomPrompt = document.createElement("p");
          bottomPrompt.innerHTML = promptHtml;
          bottomPrompt.className = "hint";
          bottomPrompt.style.textAlign = "center";
          bottomPrompt.style.fontSize = "18px";
          bottomPrompt.style.margin = "0";
          canvasCol.appendChild(bottomPrompt);
        }
      }
      if (IS_TRAINING_MODE) {
        if (recordVideoBtn) {
          recordVideoBtn.disabled = true;
          recordVideoBtn.style.display = "none";
        }
        updateTrainingFinishButtons(0);
        if (finishFinalBtn) finishFinalBtn.disabled = true;
      }

      const debugKeydownHandler = e => {
        if (e.key !== "d" || e.target.closest("input, textarea")) return;
        debugStickerCenters = !debugStickerCenters;
        document.body.classList.toggle("debug-sticker-centers", debugStickerCenters);
        renderArt();
        renderStickers();
      };
      window.addEventListener("keydown", debugKeydownHandler);

      const layers = {
        art: document.createElementNS("http://www.w3.org/2000/svg", "g"),
        overlay: document.createElementNS("http://www.w3.org/2000/svg", "g")
      };
      const clipDefs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
      stage.append(clipDefs, layers.art, layers.overlay);

      const guides = {
        v: document.createElementNS("http://www.w3.org/2000/svg", "line"),
        h: document.createElementNS("http://www.w3.org/2000/svg", "line")
      };
      guides.v.setAttribute("class", "guide");
      guides.h.setAttribute("class", "guide");
      layers.overlay.append(guides.v, guides.h);

      const selectionBox = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      selectionBox.setAttribute("class", "box");
      layers.overlay.append(selectionBox);

      const drawPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
      drawPath.setAttribute("class", "draw-path");
      layers.overlay.append(drawPath);

      const marqueeBox = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      marqueeBox.setAttribute("class", "marquee-box");
      marqueeBox.setAttribute("visibility", "hidden");
      layers.overlay.append(marqueeBox);

      const cropBox = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      cropBox.setAttribute("class", "crop-box");
      cropBox.setAttribute("visibility", "hidden");
      layers.overlay.append(cropBox);

      const cropHandleNames = ["nw", "ne", "sw", "se"];
      const cropHandles = {};
      cropHandleNames.forEach(name => {
        const h = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        h.setAttribute("width", 12);
        h.setAttribute("height", 12);
        h.setAttribute("class", "crop-handle");
        h.dataset.cropHandle = name;
        h.setAttribute("visibility", "hidden");
        layers.overlay.append(h);
        cropHandles[name] = h;
      });

      const handleNames = ["tl", "tm", "tr", "ml", "mr", "bl", "bm", "br"];
      const handles = {};
      handleNames.forEach(name => {
        const h = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        h.setAttribute("width", 12);
        h.setAttribute("height", 12);
        h.setAttribute("class", "handle");
        h.dataset.handle = name;
        layers.overlay.append(h);
        handles[name] = h;
      });

      const rotateLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
      rotateLine.setAttribute("class", "rotate-line");
      const rotateHandle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      rotateHandle.setAttribute("class", "rotate-handle");
      rotateHandle.setAttribute("r", 7);
      layers.overlay.append(rotateLine, rotateHandle);

      function nextId() {
        return `part-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
      }

      function snapshotState() {
        return {
          parts: JSON.parse(JSON.stringify(parts)),
          selectedIds: [...selectedIds]
        };
      }

      function snapshotKey(snap) {
        return JSON.stringify(snap);
      }

      function applySnapshot(snap) {
        parts = JSON.parse(JSON.stringify(snap.parts || []));
        parts.forEach(p => registerLayerMeta(p));
        selectedIds = [...(snap.selectedIds || [])];
        cropState = null;
        hideCropUi();
        dragState = null;
        drawPath.setAttribute("d", "");
        renderArt();
        updateSelection();
        updateColorControls();
      }

      function updateHistoryButtons() {
        undoBtn.disabled = historyUndo.length <= 1;
        if (redoBtn) redoBtn.disabled = historyRedo.length === 0;
      }

      function recordHistory() {
        const snap = snapshotState();
        const key = snapshotKey(snap);
        const last = historyUndo.length ? snapshotKey(historyUndo[historyUndo.length - 1]) : null;
        if (key !== last) {
          historyUndo.push(snap);
          if (historyUndo.length > 200) historyUndo.shift();
          historyRedo = [];
        }
        updateHistoryButtons();
      }

      function undoAction() {
        if (historyUndo.length <= 1) return;
        const current = historyUndo.pop();
        historyRedo.push(current);
        applySnapshot(historyUndo[historyUndo.length - 1]);
        updateHistoryButtons();
        logAction("undo", []);
      }

      function redoAction() {
        if (!historyRedo.length) return;
        const next = historyRedo.pop();
        historyUndo.push(next);
        applySnapshot(next);
        updateHistoryButtons();
        logAction("redo", []);
      }

      function allPartsOrdered() {
        return [...parts].sort((a, b) => a.z - b.z);
      }

      function getMaxLayerIndex() {
        let max = 0;
        parts.forEach(p => {
          const m = /^(?:Layer|Capa)\s+(\d+)$/i.exec((p.layerName || "").trim());
          if (m) max = Math.max(max, Number(m[1]));
        });
        return max;
      }

      function nextLayerName() {
        return `Layer ${getMaxLayerIndex() + 1}`;
      }

      function normalizeLayerType(type) {
        if (!type) return "layer";
        if (type === "figuredraw" || type === "strokedraw") return type;
        if (type.startsWith("shape-")) {
          const s = type.replace("shape-", "");
          return s === "square" ? "rectangle" : s;
        }
        if (type.startsWith("feature-")) return type.replace("feature-", "");
        return String(type).toLowerCase().replace(/[^a-z0-9]+/g, "_");
      }

      function registerLayerMeta(part) {
        if (!part || !part.id || layerMetaById[part.id]) return;
        const layerNumber = layerRegistry.length + 1;
        const col = `Layer${layerNumber}`;
        const type = normalizeLayerType(part.type || part.name || part.kind);
        const header = `${col}_${type}`;
        const meta = { id: part.id, col, type, header };
        layerMetaById[part.id] = meta;
        layerRegistry.push(meta);
      }

      function logAction(actionType, partIds) {
        const ids = Array.isArray(partIds) ? partIds : [];
        const row = {
          step: actionRows.length + 1,
          timestamp_ms: Date.now() - sessionStartMs,
          action_type: actionType,
          layerActions: {}
        };
        ids.forEach(id => {
          const meta = layerMetaById[id];
          if (meta) row.layerActions[meta.header] = actionType;
        });
        actionRows.push(row);
      }

      function csvEscape(v) {
        const s = String(v ?? "");
        if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
        return s;
      }

      async function ensureOutputDirHandle() {
        if (!window.showDirectoryPicker) return null;
        if (outputDirHandle) return outputDirHandle;
        try {
          outputDirHandle = await window.showDirectoryPicker();
          return outputDirHandle;
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

      async function exportActionsCsv(options = {}) {
        const cols = layerRegistry.map(m => m.header);
        const header = ["laboratory_id", "participant_id", "step", "timestamp_ms", "action_type", ...cols];
        const lines = [header.map(csvEscape).join(",")];

        actionRows.forEach(r => {
          const row = [laboratoryId, participantId, r.step, r.timestamp_ms, r.action_type || ""];
          cols.forEach(c => {
            row.push(r.layerActions[c] || "NA");
          });
          lines.push(row.map(csvEscape).join(","));
        });

        const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
        const fileName = options.fileName || `monster_actions_${new Date().toISOString().replace(/[:.]/g, "-")}.csv`;
        if (options.saveToWorkspace) {
          const saved = await writeBlobToDataSubfolder(blob, "CSVs", fileName);
          if (!saved) downloadBlob(blob, fileName);
          return;
        }
        downloadBlob(blob, fileName);
      }

      function getStrokeCaps(part) {
        if (part && part.type === "shape-line") {
          return { cap: "butt", join: "miter" };
        }
        return { cap: "round", join: "round" };
      }

      function buildLayerSvgString(part) {
        const { width, height } = getStageSize();
        updateParametricPath(part);
        const caps = getStrokeCaps(part);
        const color = part.tintColor || DEFAULT_COLOR;
        const content = part.kind === "svg"
          ? `<g transform='translate(${-part.w / 2} ${-part.h / 2})' style='color:${color}'>${applySvgColorMap(part.svg, part.colorMap)}</g>`
          : `<path d='${part.path}' transform='translate(${part.pathOffsetX || 0} ${part.pathOffsetY || 0})' fill='${part.fillColor || "none"}' fill-opacity='${getFillOpacity(part)}' stroke='${part.strokeColor || "none"}' stroke-opacity='${getStrokeOpacity(part)}' stroke-width='${part.strokeWidth || 0}' stroke-linecap='${caps.cap}' stroke-linejoin='${caps.join}'/>`;
        let defs = "";
        let wrapped = content;
        if (part.cropRect) {
          const clipId = `metric-clip-${part.id}`;
          defs = `<defs><clipPath id='${clipId}' clipPathUnits='userSpaceOnUse'><rect x='${part.cropRect.x}' y='${part.cropRect.y}' width='${part.cropRect.w}' height='${part.cropRect.h}'/></clipPath></defs>`;
          wrapped = `<g clip-path='url(#${clipId})'>${content}</g>`;
        }
        return `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}' width='${width}' height='${height}'>${defs}<g transform='${getTransform(part)}'>${wrapped}</g></svg>`;
      }

      function loadImageFromSvgString(svgString) {
        return new Promise((resolve, reject) => {
          const img = new Image();
          const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
          const url = URL.createObjectURL(blob);
          img.onload = () => {
            URL.revokeObjectURL(url);
            resolve(img);
          };
          img.onerror = err => {
            URL.revokeObjectURL(url);
            reject(err);
          };
          img.src = url;
        });
      }

      async function computeAreaOverlapMetrics() {
        const { width, height } = getStageSize();
        const total = width * height;
        const counts = new Uint16Array(total);
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        const ordered = allPartsOrdered();
        for (const part of ordered) {
          ctx.clearRect(0, 0, width, height);
          const svg = buildLayerSvgString(part);
          try {
            const img = await loadImageFromSvgString(svg);
            ctx.drawImage(img, 0, 0);
          } catch (_) {
            continue;
          }
          const data = ctx.getImageData(0, 0, width, height).data;
          for (let i = 0, p = 0; i < data.length; i += 4, p += 1) {
            if (data[i + 3] > 0) counts[p] += 1;
          }
        }
        let covered = 0;
        let overlap = 0;
        for (let i = 0; i < counts.length; i += 1) {
          if (counts[i] >= 1) covered += 1;
          if (counts[i] >= 2) overlap += 1;
        }
        return {
          area: covered / total,
          overlap: overlap / total
        };
      }

      function getFinalVisibleColors() {
        const set = new Set();
        parts.forEach(part => {
          if (part.kind === "svg") {
            if (part.colorMap && Object.keys(part.colorMap).length) {
              Object.values(part.colorMap).forEach(c => set.add(String(c).toLowerCase()));
            } else {
              set.add(String(part.tintColor || DEFAULT_COLOR).toLowerCase());
            }
          } else {
            if (part.fillColor) set.add(String(part.fillColor).toLowerCase());
            if (part.strokeColor) set.add(String(part.strokeColor).toLowerCase());
          }
        });
        return set;
      }

      function normalizeColorToken(color) {
        if (!color) return "";
        const c = String(color).trim().toLowerCase();
        const short = c.match(/^#([0-9a-f]{3})([0-9a-f])?$/i);
        if (short) {
          const [r, g, b] = short[1].split("");
          return `#${r}${r}${g}${g}${b}${b}`;
        }
        const long = c.match(/^#([0-9a-f]{6})([0-9a-f]{2})?$/i);
        if (long) return `#${long[1]}`;
        return c;
      }

      function clampAlpha(alpha) {
        const value = Number(alpha);
        if (!Number.isFinite(value)) return DEFAULT_ALPHA;
        return Math.max(0, Math.min(1, value));
      }

      function getColorInputValue(color) {
        const normalized = normalizeColorToken(color);
        return /^#[0-9a-f]{6}$/i.test(normalized) ? normalized : DEFAULT_COLOR;
      }

      function getFillOpacity(part) {
        if (!part) return DEFAULT_ALPHA;
        return clampAlpha(part.fillOpacity);
      }

      function getStrokeOpacity(part) {
        if (!part) return DEFAULT_ALPHA;
        return clampAlpha(part.strokeOpacity);
      }

      function initializePartInitialColors(part) {
        if (!part) return;
        const initial = {};
        if (part.kind === "svg") {
          if (part.colorMap && Object.keys(part.colorMap).length) {
            Object.entries(part.colorMap).forEach(([key, value]) => {
              initial[key] = normalizeColorToken(value);
            });
          } else {
            initial.tint = normalizeColorToken(part.tintColor || DEFAULT_COLOR);
          }
        } else {
          if (part.fillColor) initial.fill = normalizeColorToken(part.fillColor);
          if (part.strokeColor) initial.stroke = normalizeColorToken(part.strokeColor);
        }
        part.initialColors = initial;
      }

      function getFinalColorStats() {
        const finalColors = new Set();
        const changedColors = new Set();
        parts.forEach(part => {
          if (!part.initialColors) initializePartInitialColors(part);
          if (part.kind === "svg") {
            if (part.colorMap && Object.keys(part.colorMap).length) {
              Object.entries(part.colorMap).forEach(([key, value]) => {
                const current = normalizeColorToken(value);
                if (!current) return;
                finalColors.add(current);
                const original = normalizeColorToken(part.initialColors && part.initialColors[key]);
                if (original && current !== original) changedColors.add(current);
              });
            } else {
              const current = normalizeColorToken(part.tintColor || DEFAULT_COLOR);
              if (current) finalColors.add(current);
              const original = normalizeColorToken(part.initialColors && part.initialColors.tint);
              if (original && current !== original) changedColors.add(current);
            }
            return;
          }
          if (part.fillColor) {
            const current = normalizeColorToken(part.fillColor);
            if (current) finalColors.add(current);
            const original = normalizeColorToken(part.initialColors && part.initialColors.fill);
            if (original && current !== original) changedColors.add(current);
          }
          if (part.strokeColor) {
            const current = normalizeColorToken(part.strokeColor);
            if (current) finalColors.add(current);
            const original = normalizeColorToken(part.initialColors && part.initialColors.stroke);
            if (original && current !== original) changedColors.add(current);
          }
        });
        return {
          nColors_final: finalColors.size,
          nColors_changed: changedColors.size
        };
      }

      function countElaborationTotal() {
        const elaborationActions = new Set([
          "moved", "scaled", "rotated", "flipped_x", "flipped_y",
          "color_changed", "color1changed", "color2changed",
          "stroke_width_changed", "roundness_changed", "cropped"
        ]);
        let total = 0;
        actionRows.forEach(r => {
          if (!elaborationActions.has(r.action_type)) return;
          total += Object.keys(r.layerActions || {}).length || 0;
        });
        return total;
      }

      async function buildSummaryRow() {
        const nLayers = parts.length;
        const isDraw = p => p.type === "figuredraw" || p.type === "strokedraw";
        const isShape = p => (p.type || "").startsWith("shape-");
        const isSticker = p => !isDraw(p);
        const isFeature = p => isSticker(p) && !isShape(p);
        const nFeatures = parts.filter(isFeature).length;
        const nStickers = parts.filter(isSticker).length;
        const nShapes = parts.filter(isShape).length;
        const nDraws = parts.filter(isDraw).length;
        const nDrawsCreated = layerRegistry.filter(m => m.type === "figuredraw" || m.type === "strokedraw").length;
        const prodFlexibility = new Set(parts.map(p => normalizeLayerType(p.type || p.name || p.kind))).size;
        const procFlexibility = new Set(actionRows.map(r => r.action_type).filter(Boolean)).size;
        const procElaboration = countElaborationTotal();
        const procElaborationAvgPerLayer = nLayers ? procElaboration / nLayers : 0;
        const crops = actionRows.filter(r => r.action_type === "cropped").length;
        const metrics = await computeAreaOverlapMetrics();
        const startMs = drawStartMs || sessionStartMs;
        const endMs = drawEndMs || Date.now();
        const drawing_time = Math.round(Math.max(0, endMs - startMs) / 10) / 100;
        const colorStats = getFinalColorStats();
        const undos = actionRows.filter(r => r.action_type === "undo").length;
        const redos = actionRows.filter(r => r.action_type === "redo").length;
        const nDeleted = actionRows
          .filter(r => r.action_type === "deleted")
          .reduce((acc, r) => acc + Object.keys(r.layerActions || {}).length, 0);
        const creature_name = (creatureNameInput && creatureNameInput.value || "").trim();
        const description = (descriptionInput && descriptionInput.value || "").trim();
        const description_time = (descriptionStartMs && descriptionEndMs)
          ? Math.round(Math.max(0, descriptionEndMs - descriptionStartMs) / 10) / 100
          : 0;
        return {
          laboratory_id: laboratoryId,
          participant_id: participantId,
          prodElaboration: nLayers,
          nFeatures,
          nStickers,
          nShapes,
          nDraws,
          nDrawsCreated,
          prodFlexibility,
          procFlexibility,
          procElaboration_tot: procElaboration,
          procElaboration_avg: procElaborationAvgPerLayer,
          crops,
          area: metrics.area,
          overlap: metrics.overlap,
          drawing_time,
          nColors_final: colorStats.nColors_final,
          nColors_changed: colorStats.nColors_changed,
          undos,
          redos,
          nDeleted,
          creature_name,
          description_time,
          description
        };
      }

      async function exportSummaryCsv(options = {}) {
        const summary = await buildSummaryRow();
        const keys = [
          "laboratory_id",
          "participant_id",
          "prodElaboration",
          "nFeatures",
          "nStickers",
          "nShapes",
          "nDraws",
          "nDrawsCreated",
          "prodFlexibility",
          "procFlexibility",
          "procElaboration_tot",
          "procElaboration_avg",
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
        const lines = [
          keys.map(csvEscape).join(","),
          keys.map(k => csvEscape(summary[k])).join(",")
        ];
        const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
        const fileName = options.fileName || `monster_summary_${new Date().toISOString().replace(/[:.]/g, "-")}.csv`;
        if (options.saveToWorkspace) {
          const saved = await writeBlobToDataSubfolder(blob, "CSVs", fileName);
          if (!saved) downloadBlob(blob, fileName);
          return;
        }
        downloadBlob(blob, fileName);
      }

      function buildActionsCsvString() {
        const cols = layerRegistry.map(m => m.header);
        const header = ["laboratory_id", "participant_id", "step", "timestamp_ms", "action_type", ...cols];
        const lines = [header.map(csvEscape).join(",")];
        actionRows.forEach(r => {
          const row = [laboratoryId, participantId, r.step, r.timestamp_ms, r.action_type || ""];
          cols.forEach(c => {
            row.push(r.layerActions[c] || "NA");
          });
          lines.push(row.map(csvEscape).join(","));
        });
        return lines.join("\n");
      }

      async function buildSummaryCsvString() {
        const summary = await buildSummaryRow();
        const keys = [
          "laboratory_id",
          "participant_id",
          "prodElaboration",
          "nFeatures",
          "nStickers",
          "nShapes",
          "nDraws",
          "nDrawsCreated",
          "prodFlexibility",
          "procFlexibility",
          "procElaboration_tot",
          "procElaboration_avg",
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
        const lines = [
          keys.map(csvEscape).join(","),
          keys.map(k => csvEscape(summary[k])).join(",")
        ];
        return lines.join("\n");
      }

      function blobToDataURL(blob) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = () => reject(reader.error);
          reader.readAsDataURL(blob);
        });
      }

      function queueRecordedVideoClip(blob, fileName) {
        if (!blob || !blob.size) return;
        recordedVideoClips.push({
          file_name: fileName,
          mime_type: blob.type || "video/webm",
          blob
        });
      }

      async function buildTrialData() {
        const svgString = buildStandaloneStageSvgString(true);
        const svgDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
        const pngBlob = await renderPngBlob(false);
        const pngDataUrl = await blobToDataURL(pngBlob);
        const summary = await buildSummaryRow();
        const actionsCsv = buildActionsCsvString();
        const summaryCsv = await buildSummaryCsvString();
        const partsJson = JSON.parse(JSON.stringify(parts));
        const actionsJson = JSON.parse(JSON.stringify(actionRows));
        return {
          laboratory_id: laboratoryId,
          participant_id: participantId,
          drawing_svg: svgString,
          drawing_svg_data_url: svgDataUrl,
          drawing_png_data_url: pngDataUrl,
          parts: partsJson,
          actions: actionsJson,
          summary,
          actions_csv: actionsCsv,
          summary_csv: summaryCsv,
          recorded_videos: recordedVideoClips.slice()
        };
      }

      function cleanupTrialResources() {
        if (trialResourcesCleaned) return;
        trialResourcesCleaned = true;
        window.removeEventListener("keydown", debugKeydownHandler);
        window.removeEventListener("keydown", mainKeydownHandler);
        if (localZoomGate && localZoomGate.parentElement === document.body) localZoomGate.remove();
        if (localFullscreenExit && localFullscreenExit.parentElement === document.body) localFullscreenExit.remove();
      }

      async function finishTrialWithData() {
        const trialData = await buildTrialData();
        cleanupTrialResources();
        jsPsych.finishTrial(trialData);
      }

      function finishTrialWithoutData() {
        cleanupTrialResources();
        jsPsych.finishTrial({});
      }

      function hiddenSkipTrial() {
        finishTrialWithoutData();
      }

      async function hiddenSkipEditorPhase() {
        await handleFinish(true);
      }


      function normalizeZ() {
        allPartsOrdered().forEach((p, idx) => {
          p.z = idx;
        });
      }

      function renderArt() {
        layers.art.innerHTML = "";
        clipDefs.innerHTML = "";
        normalizeZ();
        allPartsOrdered().forEach(part => {
          const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
          g.setAttribute("data-id", part.id);
          g.setAttribute("transform", getTransform(part));
          const clipId = `clip-${part.id}`;
          let content = "";
          if (part.kind === "svg") {
            const color = part.tintColor || DEFAULT_COLOR;
            const svgMarkup = applySvgColorMap(part.svg, part.colorMap);
            content = `<g transform='translate(${-part.w / 2} ${-part.h / 2})' style='color:${color}'>${svgMarkup}</g>`;
          } else {
            updateParametricPath(part);
            const caps = getStrokeCaps(part);
            const attrs = part.fillColor ? `fill='${part.fillColor}'` : "fill='none'";
            const fillOpacity = part.fillColor ? `fill-opacity='${getFillOpacity(part)}'` : "";
            const stroke = part.strokeColor ? `stroke='${part.strokeColor}'` : "";
            const strokeOpacity = part.strokeColor ? `stroke-opacity='${getStrokeOpacity(part)}'` : "";
            const strokeWidth = part.strokeColor ? `stroke-width='${part.strokeWidth || 2}'` : "";
            const ox = part.pathOffsetX || 0;
            const oy = part.pathOffsetY || 0;
            content = `<path d='${part.path}' transform='translate(${ox} ${oy})' ${attrs} ${fillOpacity} ${stroke} ${strokeOpacity} ${strokeWidth} stroke-linecap='${caps.cap}' stroke-linejoin='${caps.join}'/>`;
          }
          if (debugStickerCenters) {
            const cross = document.createElementNS("http://www.w3.org/2000/svg", "g");
            const h = document.createElementNS("http://www.w3.org/2000/svg", "line");
            const v = document.createElementNS("http://www.w3.org/2000/svg", "line");
            const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            h.setAttribute("x1", "-12");
            h.setAttribute("y1", "0");
            h.setAttribute("x2", "12");
            h.setAttribute("y2", "0");
            v.setAttribute("x1", "0");
            v.setAttribute("y1", "-12");
            v.setAttribute("x2", "0");
            v.setAttribute("y2", "12");
            h.setAttribute("class", "center-crosshair");
            v.setAttribute("class", "center-crosshair");
            dot.setAttribute("class", "center-crosshair-dot");
            dot.setAttribute("cx", "0");
            dot.setAttribute("cy", "0");
            dot.setAttribute("r", "2.5");
            cross.append(h, v, dot);
            g.append(cross);
          }
          if (part.cropRect) {
            const cp = document.createElementNS("http://www.w3.org/2000/svg", "clipPath");
            cp.setAttribute("id", clipId);
            cp.setAttribute("clipPathUnits", "userSpaceOnUse");
            const r = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            r.setAttribute("x", part.cropRect.x);
            r.setAttribute("y", part.cropRect.y);
            r.setAttribute("width", part.cropRect.w);
            r.setAttribute("height", part.cropRect.h);
            cp.append(r);
            clipDefs.append(cp);
            g.setAttribute("clip-path", `url(#${clipId})`);
          }
          g.innerHTML = content;
          g.addEventListener("pointerdown", e => onPartPointerDown(e, part.id));
          g.addEventListener("dblclick", e => onPartDoubleClick(e, part.id));
          layers.art.append(g);
        });
        renderLayerPanel();
      }

      function applySvgColorMap(svg, colorMap) {
        if (!svg || !colorMap) return svg;
        let out = svg;
        Object.entries(colorMap).forEach(([key, value]) => {
          out = out.split(key).join(value);
        });
        return out;
      }

      function roundedPolygonPath(points, radius) {
        const n = points.length;
        if (n < 3) return "";
        const seg = (a, b) => ({ x: b.x - a.x, y: b.y - a.y });
        const len = v => Math.hypot(v.x, v.y) || 1;
        const norm = v => {
          const l = len(v);
          return { x: v.x / l, y: v.y / l };
        };
        const corners = points.map((curr, i) => {
          const prev = points[(i - 1 + n) % n];
          const next = points[(i + 1) % n];
          const toPrev = norm(seg(curr, prev));
          const toNext = norm(seg(curr, next));
          const maxR = Math.min(len(seg(curr, prev)), len(seg(curr, next))) / 2;
          const r = Math.max(0, Math.min(radius, maxR));
          return {
            curr,
            start: { x: curr.x + toPrev.x * r, y: curr.y + toPrev.y * r },
            end: { x: curr.x + toNext.x * r, y: curr.y + toNext.y * r }
          };
        });
        let d = `M ${corners[0].end.x} ${corners[0].end.y}`;
        for (let i = 1; i < n; i += 1) {
          d += ` L ${corners[i].start.x} ${corners[i].start.y}`;
          d += ` Q ${corners[i].curr.x} ${corners[i].curr.y} ${corners[i].end.x} ${corners[i].end.y}`;
        }
        d += ` L ${corners[0].start.x} ${corners[0].start.y}`;
        d += ` Q ${corners[0].curr.x} ${corners[0].curr.y} ${corners[0].end.x} ${corners[0].end.y} Z`;
        return d;
      }

      function getShapePath(shapeType, roundness) {
        const r = Math.max(0, Math.min(1, Number(roundness || 0)));
        if (shapeType === "rounded-square") {
          const pts = [{ x: -50, y: -50 }, { x: 50, y: -50 }, { x: 50, y: 50 }, { x: -50, y: 50 }];
          return roundedPolygonPath(pts, 22 * r);
        }
        if (shapeType === "rounded-triangle") {
          const pts = [{ x: 0, y: -58 }, { x: 56, y: 46 }, { x: -56, y: 46 }];
          return roundedPolygonPath(pts, 18 * r);
        }
        return "";
      }

      function updateParametricPath(part) {
        if (!part || !part.shapeType) return;
        const d = getShapePath(part.shapeType, part.roundness);
        if (!d) return;
        part.path = d;
        const local = computePathMetrics(d);
        part.localBox = { minX: local.minX, minY: local.minY, w: local.w, h: local.h };
      }

      function renderLayerPanel() {
        layersList.innerHTML = "";

        const clearDropIndicators = () => {
          layersList.querySelectorAll(".drop-before, .drop-after").forEach(el => {
            el.classList.remove("drop-before");
            el.classList.remove("drop-after");
          });
        };

        [...allPartsOrdered()].reverse().forEach(item => {
          const row = document.createElement("div");
          row.className = `layer-item ${selectedIds.includes(item.id) ? "active" : ""}`;
          row.draggable = true;
          row.dataset.id = item.id;
          const icon = buildLayerIcon(item);
          const displayName = (item.layerName && item.layerName.trim()) ? item.layerName.trim() : nextLayerName();
          const safeName = displayName.replace(/"/g, "&quot;");
          const placeholder = `Layer ${item.z + 1}`;
          row.innerHTML = `<span class='layer-info'><span class='layer-icon'>${icon}</span><input class='layer-name-input' value="${safeName}" placeholder="${placeholder}" /></span>`;

          const nameInput = row.querySelector(".layer-name-input");
          nameInput.readOnly = true;
          nameInput.addEventListener("pointerdown", e => {
            if (!nameInput.readOnly) e.stopPropagation();
          });
          nameInput.addEventListener("click", e => {
            if (!nameInput.readOnly) e.stopPropagation();
          });
          nameInput.addEventListener("focus", () => {
            if (nameInput.readOnly) nameInput.blur();
          });
          nameInput.addEventListener("keydown", e => {
            e.stopPropagation();
            if (e.key === "Enter") {
              e.preventDefault();
              nameInput.blur();
            }
            if (e.key === "Escape") {
              e.preventDefault();
              nameInput.value = item.layerName || placeholder;
              nameInput.blur();
            }
          });
          nameInput.addEventListener("change", () => {
            item.layerName = nameInput.value.trim() || placeholder;
            recordHistory();
          });
          nameInput.addEventListener("blur", () => {
            nameInput.readOnly = true;
          });

          row.addEventListener("click", e => {
            const multi = e.ctrlKey || e.metaKey || e.shiftKey;
            selectById(item.id, multi);
          });
          row.addEventListener("dblclick", e => {
            e.stopPropagation();
            if (drawMode !== drawModes.NONE) return;
            if (!selectedIds.includes(item.id)) {
              selectedIds = [item.id];
              updateSelection();
              updateColorControls();
            }
            nameInput.readOnly = false;
            nameInput.focus();
            nameInput.select();
          });

          row.addEventListener("dragstart", e => {
            e.dataTransfer.setData("text/plain", item.id);
          });
          row.addEventListener("dragend", clearDropIndicators);
          row.addEventListener("dragover", e => {
            e.preventDefault();
            clearDropIndicators();
            const rect = row.getBoundingClientRect();
            const before = (e.clientY - rect.top) < rect.height / 2;
            row.classList.add(before ? "drop-before" : "drop-after");
            row.dataset.dropPos = before ? "before" : "after";
          });
          row.addEventListener("dragleave", () => {
            row.classList.remove("drop-before");
            row.classList.remove("drop-after");
          });
          row.addEventListener("drop", e => {
            e.preventDefault();
            const dropPos = row.dataset.dropPos || "before";
            clearDropIndicators();
            const draggedId = e.dataTransfer.getData("text/plain");
            if (!draggedId || draggedId === item.id) return;
            const orderedTop = [...allPartsOrdered()].reverse();
            const from = orderedTop.findIndex(p => p.id === draggedId);
            const to = orderedTop.findIndex(p => p.id === item.id);
            if (from < 0 || to < 0) return;
            const next = [...orderedTop];
            const [moved] = next.splice(from, 1);
            const adjustedTo = to + (dropPos === "after" ? 1 : 0) - (from < to ? 1 : 0);
            next.splice(Math.max(0, Math.min(next.length, adjustedTo)), 0, moved);
            next.reverse().forEach((p, idx) => {
              p.z = idx;
            });
            renderArt();
            updateSelection();
            recordHistory();
            logAction("reordered", [draggedId]);
          });

          layersList.append(row);
        });
      }

      function buildLayerIcon(item) {
        if (item.kind === "svg") {
          const svgMarkup = applySvgColorMap(item.svg, item.colorMap);
          return `<svg viewBox='0 0 ${item.w} ${item.h}' style='color:${item.tintColor || DEFAULT_COLOR}'>${svgMarkup}</svg>`;
        }
        const iconPath = item.shapeType ? getShapePath(item.shapeType, item.roundness) : item.path;
        const caps = getStrokeCaps(item);
        const attrs = item.fillColor ? `fill='${item.fillColor}'` : "fill='none'";
        const fillOpacity = item.fillColor ? `fill-opacity='${getFillOpacity(item)}'` : "";
        const stroke = item.strokeColor ? `stroke='${item.strokeColor}'` : "";
        const strokeOpacity = item.strokeColor ? `stroke-opacity='${getStrokeOpacity(item)}'` : "";
        const strokeWidth = item.strokeColor ? `stroke-width='${Math.max(1, Math.min(10, (item.strokeWidth || 2) / 2))}'` : "";
        const box = item.localBox || computePathMetrics(iconPath);
        const pad = 8;
        const viewX = box.minX - pad;
        const viewY = box.minY - pad;
        const viewW = box.w + pad * 2;
        const viewH = box.h + pad * 2;
        const ox = item.pathOffsetX || 0;
        const oy = item.pathOffsetY || 0;
        return `<svg viewBox='${viewX} ${viewY} ${viewW} ${viewH}'><path d='${iconPath}' transform='translate(${ox} ${oy})' ${attrs} ${fillOpacity} ${stroke} ${strokeOpacity} ${strokeWidth} stroke-linecap='${caps.cap}' stroke-linejoin='${caps.join}'/></svg>`;
      }

      function renderStickers() {
        grid.innerHTML = "";
        const features = [...(stickerCategories.features || [])];
        const fillers = (4 - (features.length % 4)) % 4;
        for (let i = 0; i < fillers; i += 1) {
          features.push({ id: `spacer-${i}`, spacer: true });
        }
        const allItems = [
          ...features,
          ...(stickerCategories.figures || [])
        ];
        allItems.forEach(item => {
          const cell = document.createElement("div");
          const shapeClass = (!item.spacer && !item.svg) ? " sticker-shape" : "";
          cell.className = `sticker${item.spacer ? " spacer" : ""}${shapeClass}`;
          if (item.id === "shape-heart") cell.classList.add("heart-icon-cell");
          if (item.spacer) {
            grid.append(cell);
            return;
          }
          if (item.svg) {
            const previewMap = item.colors
              ? Object.fromEntries(item.colors.map((k, i) => [k, item.previewGreyscale ? (i === 0 ? "#9ca3af" : "#4b5563") : ((item.defaultColors && item.defaultColors[i]) || DEFAULT_COLOR)]))
              : null;
            const svgMarkup = applySvgColorMap(item.svg, previewMap);
            cell.innerHTML = `<svg viewBox='0 0 ${item.w} ${item.h}' style='color:${DEFAULT_COLOR}'>${svgMarkup}</svg>`;
          } else {
            const previewPath = item.shapeType ? getShapePath(item.shapeType, item.roundness) : item.path;
            const box = item.previewBox || computePathMetrics(previewPath);
            const pad = 56;
            const viewX = box.minX - pad;
            const viewY = box.minY - pad;
            const viewW = box.w + pad * 2;
            const viewH = box.h + pad * 2;
            const lineCap = item.id === "shape-line" ? "butt" : "round";
            const lineJoin = item.id === "shape-line" ? "miter" : "round";
            cell.innerHTML = `<svg viewBox='${viewX} ${viewY} ${viewW} ${viewH}' preserveAspectRatio='xMidYMid meet'><path d="${previewPath}" fill='${item.fill === false ? "none" : DEFAULT_COLOR}' stroke='${item.fill === false ? DEFAULT_COLOR : "none"}' stroke-width='${item.strokeWidth || 2}' stroke-linecap='${lineCap}' stroke-linejoin='${lineJoin}'/></svg>`;
          }
          cell.onclick = () => addSticker(item);
          grid.append(cell);
        });
      }

      function addSticker(item) {
        if (drawMode !== drawModes.NONE) {
          if (isDrawing) finalizeDrawing(false);
          setDrawMode(drawModes.NONE);
        }
        const { width, height } = getStageSize();
        const maxZ = parts.length ? Math.max(...parts.map(p => p.z)) : -1;
        const part = {
          id: nextId(),
          type: item.id,
          name: item.name,
          layerName: nextLayerName(),
          hideLayerLabel: !!item.hideLayerLabel,
          x: width / 2,
          y: height / 2,
          w: item.w,
          h: item.h,
          rotation: 0,
          scaleX: typeof item.defaultScale === "number" ? item.defaultScale : 1,
          scaleY: typeof item.defaultScale === "number" ? item.defaultScale : 1,
          flipX: false,
          flipY: false,
          z: maxZ + 1
        };

        if (item.svg) {
          part.kind = "svg";
          part.svg = item.svg;
          part.tintColor = DEFAULT_COLOR;
          if (item.colors && item.colors.length) {
            part.colorKeys = [...item.colors];
            part.colorMap = {};
            item.colors.forEach((k, i) => {
              part.colorMap[k] = (item.defaultColors && item.defaultColors[i]) || DEFAULT_COLOR;
            });
          }
          if (item.forceStroke) {
            part.kind = "path";
            part.path = "M -40 0 Q 0 40 40 0";
            part.fillColor = null;
            part.strokeColor = DEFAULT_COLOR;
            part.strokeWidth = item.strokeWidth || 8;
            part.w = 90;
            part.h = 50;
          }
        } else {
          const generatedPath = item.shapeType ? getShapePath(item.shapeType, item.roundness) : item.path;
          const local = computePathMetrics(generatedPath);
          part.kind = "path";
          part.path = generatedPath;
          if (item.shapeType) {
            part.shapeType = item.shapeType;
            part.roundness = typeof item.roundness === "number" ? item.roundness : 0;
          }
          part.pathOffsetX = 0;
          part.pathOffsetY = 0;
          part.localBox = {
            minX: local.minX,
            minY: local.minY,
            w: local.w,
            h: local.h
          };
          if (item.fill === false) {
            part.fillColor = null;
            part.strokeColor = DEFAULT_COLOR;
            part.strokeWidth = item.strokeWidth || 8;
          } else {
            part.fillColor = DEFAULT_COLOR;
            part.strokeColor = null;
            part.strokeWidth = 0;
          }
        }

        registerLayerMeta(part);
        initializePartInitialColors(part);
        parts.push(part);
        selectedIds = [part.id];
        renderArt();
        updateSelection();
        updateColorControls();
        recordHistory();
        logAction("added", [part.id]);
      }

      function getTransform(part) {
        const sx = part.scaleX * (part.flipX ? -1 : 1);
        const sy = part.scaleY * (part.flipY ? -1 : 1);
        return `translate(${part.x} ${part.y}) rotate(${part.rotation}) scale(${sx} ${sy})`;
      }

      function findPart(id) {
        return parts.find(p => p.id === id);
      }

      function getPartBounds(part) {
        if (part.cropRect) {
          const cropped = getCropBoundsInStage(part);
          if (cropped) return cropped;
        }
        const rendered = getRenderedPartBounds(part.id);
        if (rendered) return rendered;
        const hw = (part.w * part.scaleX) / 2;
        const hh = (part.h * part.scaleY) / 2;
        const rad = (part.rotation * Math.PI) / 180;
        const corners = [
          rotatePoint(-hw, -hh, rad),
          rotatePoint(hw, -hh, rad),
          rotatePoint(hw, hh, rad),
          rotatePoint(-hw, hh, rad)
        ];
        const xs = corners.map(c => c.x + part.x);
        const ys = corners.map(c => c.y + part.y);
        const out = {
          minX: Math.min(...xs),
          maxX: Math.max(...xs),
          minY: Math.min(...ys),
          maxY: Math.max(...ys)
        };
        return out;
      }

      function getPartMatrix(part) {
        const rad = (part.rotation * Math.PI) / 180;
        const sx = part.scaleX * (part.flipX ? -1 : 1);
        const sy = part.scaleY * (part.flipY ? -1 : 1);
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);
        return {
          a: cos * sx,
          b: sin * sx,
          c: -sin * sy,
          d: cos * sy,
          e: part.x,
          f: part.y
        };
      }

      function transformLocalToStage(part, x, y) {
        const m = getPartMatrix(part);
        return {
          x: m.a * x + m.c * y + m.e,
          y: m.b * x + m.d * y + m.f
        };
      }

      function transformStageToLocal(part, x, y) {
        const m = getPartMatrix(part);
        const det = m.a * m.d - m.b * m.c;
        if (Math.abs(det) < 1e-9) return { x: 0, y: 0 };
        const invA = m.d / det;
        const invB = -m.b / det;
        const invC = -m.c / det;
        const invD = m.a / det;
        const dx = x - m.e;
        const dy = y - m.f;
        return {
          x: invA * dx + invC * dy,
          y: invB * dx + invD * dy
        };
      }

      function getCropBoundsInStage(part) {
        if (!part.cropRect) return null;
        const r = part.cropRect;
        const corners = [
          transformLocalToStage(part, r.x, r.y),
          transformLocalToStage(part, r.x + r.w, r.y),
          transformLocalToStage(part, r.x + r.w, r.y + r.h),
          transformLocalToStage(part, r.x, r.y + r.h)
        ];
        return {
          minX: Math.min(...corners.map(p => p.x)),
          maxX: Math.max(...corners.map(p => p.x)),
          minY: Math.min(...corners.map(p => p.y)),
          maxY: Math.max(...corners.map(p => p.y))
        };
      }

      function getSelectionBounds() {
        const selected = parts.filter(p => selectedIds.includes(p.id));
        if (!selected.length) return null;
        const boxes = selected.map(getPartBounds);
        return {
          minX: Math.min(...boxes.map(b => b.minX)),
          minY: Math.min(...boxes.map(b => b.minY)),
          maxX: Math.max(...boxes.map(b => b.maxX)),
          maxY: Math.max(...boxes.map(b => b.maxY))
        };
      }

      function selectById(id, multi) {
        if (!findPart(id)) return;
        if (drawMode !== drawModes.NONE) return;
        if (!multi) {
          selectedIds = [id];
        } else if (selectedIds.includes(id)) {
          selectedIds = selectedIds.filter(v => v !== id);
        } else {
          selectedIds = [...selectedIds, id];
        }
        if (cropState && (selectedIds.length !== 1 || selectedIds[0] !== cropState.partId)) {
          clearCropMode(true);
        }
        updateSelection();
        updateColorControls();
      }

      function onPartDoubleClick(e, id) {
        if (editingLocked) return;
        if (drawMode !== drawModes.NONE) return;
        e.preventDefault();
        e.stopPropagation();
        if (!selectedIds.includes(id)) {
          selectedIds = [id];
          updateSelection();
          updateColorControls();
        }
        if (selectedIds.length !== 1) return;
        startCropMode(id);
      }

      function startCropMode(id) {
        const part = findPart(id);
        if (!part) return;
        const rendered = getRenderedPartBounds(id);
        const base = part.cropRect ? getCropBoundsInStage(part) : (rendered || getPartBounds(part));
        cropState = {
          partId: id,
          rect: {
            x: base.minX ?? base.x,
            y: base.minY ?? base.y,
            w: Math.max(10, (base.maxX ? base.maxX - base.minX : base.w)),
            h: Math.max(10, (base.maxY ? base.maxY - base.minY : base.h))
          }
        };
        updateCropUi();
      }

      function getRenderedPartBounds(id) {
        const node = layers.art.querySelector(`g[data-id="${id}"]`);
        if (!node) return null;
        try {
          const rect = node.getBoundingClientRect();
          if (!rect || rect.width <= 0 || rect.height <= 0) return null;
          const corners = [
            clientToSvg(rect.left, rect.top),
            clientToSvg(rect.right, rect.top),
            clientToSvg(rect.right, rect.bottom),
            clientToSvg(rect.left, rect.bottom)
          ];
          return {
            minX: Math.min(...corners.map(p => p.x)),
            minY: Math.min(...corners.map(p => p.y)),
            maxX: Math.max(...corners.map(p => p.x)),
            maxY: Math.max(...corners.map(p => p.y))
          };
        } catch (_) {
          return null;
        }
      }

      function clientToSvg(clientX, clientY) {
        const pt = stage.createSVGPoint();
        pt.x = clientX;
        pt.y = clientY;
        return pt.matrixTransform(stage.getScreenCTM().inverse());
      }

      function clearCropMode(apply) {
        if (apply && cropState) {
          const part = findPart(cropState.partId);
          if (part) {
            const r = normalizeRect(cropState.rect);
            const localCorners = [
              transformStageToLocal(part, r.x, r.y),
              transformStageToLocal(part, r.x + r.w, r.y),
              transformStageToLocal(part, r.x + r.w, r.y + r.h),
              transformStageToLocal(part, r.x, r.y + r.h)
            ];
            const lx = localCorners.map(p => p.x);
            const ly = localCorners.map(p => p.y);
            const minX = Math.min(...lx);
            const maxX = Math.max(...lx);
            const minY = Math.min(...ly);
            const maxY = Math.max(...ly);
            part.cropRect = {
              x: minX,
              y: minY,
              w: Math.max(2, maxX - minX),
              h: Math.max(2, maxY - minY)
            };
          }
          renderArt();
          updateSelection();
          updateColorControls();
          recordHistory();
          logAction("cropped", part ? [part.id] : []);
        }
        cropState = null;
        hideCropUi();
      }

      function updateCropUi() {
        if (!cropState) return hideCropUi();
        selectionBox.setAttribute("visibility", "hidden");
        rotateHandle.setAttribute("visibility", "hidden");
        rotateLine.setAttribute("visibility", "hidden");
        Object.values(handles).forEach(h => h.setAttribute("visibility", "hidden"));
        const r = normalizeRect(cropState.rect);
        cropBox.setAttribute("x", r.x);
        cropBox.setAttribute("y", r.y);
        cropBox.setAttribute("width", r.w);
        cropBox.setAttribute("height", r.h);
        cropBox.setAttribute("visibility", "visible");
        const points = {
          nw: [r.x, r.y],
          ne: [r.x + r.w, r.y],
          sw: [r.x, r.y + r.h],
          se: [r.x + r.w, r.y + r.h]
        };
        Object.entries(points).forEach(([name, p]) => {
          const h = cropHandles[name];
          h.setAttribute("x", p[0] - 6);
          h.setAttribute("y", p[1] - 6);
          h.setAttribute("visibility", "visible");
        });
      }

      function hideCropUi() {
        cropBox.setAttribute("visibility", "hidden");
        Object.values(cropHandles).forEach(h => h.setAttribute("visibility", "hidden"));
      }

      function normalizeRect(rect) {
        const x = rect.w >= 0 ? rect.x : rect.x + rect.w;
        const y = rect.h >= 0 ? rect.y : rect.y + rect.h;
        const w = Math.abs(rect.w);
        const h = Math.abs(rect.h);
        return { x, y, w, h };
      }

      function updateSelection() {
        const bounds = getSelectionBounds();
        if (!bounds) {
          selectionBox.setAttribute("visibility", "hidden");
          rotateHandle.setAttribute("visibility", "hidden");
          rotateLine.setAttribute("visibility", "hidden");
          Object.values(handles).forEach(h => h.setAttribute("visibility", "hidden"));
          renderLayerPanel();
          return;
        }

        selectionBox.setAttribute("visibility", "visible");
        selectionBox.setAttribute("x", bounds.minX);
        selectionBox.setAttribute("y", bounds.minY);
        selectionBox.setAttribute("width", bounds.maxX - bounds.minX);
        selectionBox.setAttribute("height", bounds.maxY - bounds.minY);

        const cx = (bounds.minX + bounds.maxX) / 2;
        const cy = (bounds.minY + bounds.maxY) / 2;
        const points = {
          tl: [bounds.minX, bounds.minY],
          tm: [cx, bounds.minY],
          tr: [bounds.maxX, bounds.minY],
          ml: [bounds.minX, cy],
          mr: [bounds.maxX, cy],
          bl: [bounds.minX, bounds.maxY],
          bm: [cx, bounds.maxY],
          br: [bounds.maxX, bounds.maxY]
        };

        Object.entries(points).forEach(([name, pos]) => {
          const h = handles[name];
          h.setAttribute("visibility", "visible");
          h.setAttribute("x", pos[0] - 6);
          h.setAttribute("y", pos[1] - 6);
        });

        const rotateX = cx;
        const rotateY = bounds.minY - 26;
        rotateHandle.setAttribute("visibility", "visible");
        rotateLine.setAttribute("visibility", "visible");
        rotateHandle.setAttribute("cx", rotateX);
        rotateHandle.setAttribute("cy", rotateY);
        rotateLine.setAttribute("x1", rotateX);
        rotateLine.setAttribute("y1", rotateY + 8);
        rotateLine.setAttribute("x2", rotateX);
        rotateLine.setAttribute("y2", bounds.minY);

        renderLayerPanel();
      }

      function getSvgPoint(evt) {
        const pt = stage.createSVGPoint();
        pt.x = evt.clientX;
        pt.y = evt.clientY;
        return pt.matrixTransform(stage.getScreenCTM().inverse());
      }

      function rotatePoint(x, y, rad) {
        return {
          x: x * Math.cos(rad) - y * Math.sin(rad),
          y: x * Math.sin(rad) + y * Math.cos(rad)
        };
      }

      function computePathMetrics(d) {
        const temp = document.createElementNS("http://www.w3.org/2000/svg", "path");
        temp.setAttribute("d", d);
        layers.overlay.append(temp);
        const box = temp.getBBox();
        temp.remove();
        return {
          minX: box.x,
          minY: box.y,
          w: Math.max(10, box.width),
          h: Math.max(10, box.height),
          cx: box.x + box.width / 2,
          cy: box.y + box.height / 2
        };
      }

      function onPartPointerDown(e, id) {
        if (editingLocked) return;
        if (drawMode !== drawModes.NONE) return;
        if (cropState) {
          if (cropState.partId !== id) clearCropMode(true);
          else return;
        }
        e.stopPropagation();
        const multi = e.ctrlKey || e.metaKey || e.shiftKey;
        if (!selectedIds.includes(id)) {
          selectById(id, multi);
        } else if (multi) {
          selectById(id, true);
          if (!selectedIds.includes(id)) return;
        }

        const pt = getSvgPoint(e);
        const starts = parts
          .filter(p => selectedIds.includes(p.id))
          .map(p => ({
            id: p.id,
            x: p.x,
            y: p.y,
            rotation: p.rotation,
            scaleX: p.scaleX,
            scaleY: p.scaleY
          }));

        dragState = {
          mode: "move",
          startX: pt.x,
          startY: pt.y,
          starts
        };
      }

      function onStagePointerDown(e) {
        if (editingLocked) return;
        if (cropState) {
          const pt = getSvgPoint(e);
          const r = normalizeRect(cropState.rect);
          if (pointInRect(pt, r)) {
            dragState = {
              mode: "crop-move",
              startX: pt.x,
              startY: pt.y,
              startRect: { ...r }
            };
            return;
          }
          clearCropMode(true);
          return;
        }
        if (drawMode !== drawModes.NONE) {
          e.preventDefault();
          const pt = getSvgPoint(e);
          if (typeof stage.setPointerCapture === "function") {
            try {
              stage.setPointerCapture(e.pointerId);
              drawPointerId = e.pointerId;
            } catch (_) { }
          }
          isDrawing = true;
          drawPathD = `M ${pt.x} ${pt.y}`;
          drawPath.setAttribute("d", drawPathD);
          drawPath.setAttribute("stroke", drawColor);
          drawPath.setAttribute("stroke-opacity", String(drawAlpha));
          drawPath.setAttribute("stroke-width", drawMode === drawModes.STROKE ? brushSizeInput.value : 2);
          return;
        }
        if (e.target === stage) {
          const pt = getSvgPoint(e);
          dragState = {
            mode: "marquee",
            startX: pt.x,
            startY: pt.y,
            lastX: pt.x,
            lastY: pt.y,
            additive: e.shiftKey || e.ctrlKey || e.metaKey,
            baseSelection: [...selectedIds]
          };
          marqueeBox.setAttribute("x", pt.x);
          marqueeBox.setAttribute("y", pt.y);
          marqueeBox.setAttribute("width", 0);
          marqueeBox.setAttribute("height", 0);
          marqueeBox.setAttribute("visibility", "visible");
        }
      }

      function isPointerOutsideStage(e) {
        const rect = stage.getBoundingClientRect();
        return e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom;
      }

      function cancelActiveInteraction(clearSelection = false) {
        if (isDrawing) finalizeDrawing(false);
        dragState = null;
        marqueeBox.setAttribute("visibility", "hidden");
        if (clearSelection) {
          selectedIds = [];
          updateSelection();
          updateColorControls();
        }
        if (drawPointerId !== null && typeof stage.releasePointerCapture === "function") {
          try {
            if (stage.hasPointerCapture && stage.hasPointerCapture(drawPointerId)) {
              stage.releasePointerCapture(drawPointerId);
            }
          } catch (_) { }
        }
        drawPointerId = null;
      }

      function onCropBoxPointerDown(e) {
        if (!cropState) return;
        e.preventDefault();
        e.stopPropagation();
        const pt = getSvgPoint(e);
        const r = normalizeRect(cropState.rect);
        dragState = {
          mode: "crop-move",
          startX: pt.x,
          startY: pt.y,
          startRect: { ...r }
        };
      }

      function onCropHandlePointerDown(e) {
        if (!cropState) return;
        e.preventDefault();
        e.stopPropagation();
        const pt = getSvgPoint(e);
        const r = normalizeRect(cropState.rect);
        dragState = {
          mode: "crop-resize",
          handle: e.target.dataset.cropHandle,
          startX: pt.x,
          startY: pt.y,
          startRect: { ...r }
        };
      }

      function onHandlePointerDown(e) {
        if (!selectedIds.length) return;
        e.preventDefault();
        e.stopPropagation();
        const pt = getSvgPoint(e);
        const bounds = getSelectionBounds();
        if (!bounds) return;
        dragState = {
          mode: "scale",
          handle: e.target.dataset.handle,
          startX: pt.x,
          startY: pt.y,
          bounds,
          starts: parts
            .filter(p => selectedIds.includes(p.id))
            .map(p => ({ id: p.id, x: p.x, y: p.y, scaleX: p.scaleX, scaleY: p.scaleY, rotation: p.rotation }))
        };
      }

      function onRotatePointerDown(e) {
        if (!selectedIds.length) return;
        e.preventDefault();
        e.stopPropagation();
        const bounds = getSelectionBounds();
        if (!bounds) return;
        const center = {
          x: (bounds.minX + bounds.maxX) / 2,
          y: (bounds.minY + bounds.maxY) / 2
        };
        const pt = getSvgPoint(e);
        dragState = {
          mode: "rotate",
          center,
          startAngle: Math.atan2(pt.y - center.y, pt.x - center.x),
          starts: parts
            .filter(p => selectedIds.includes(p.id))
            .map(p => ({ id: p.id, x: p.x, y: p.y, rotation: p.rotation }))
        };
      }

      function onPointerMove(e) {
        if (editingLocked) return;
        if ((dragState || isDrawing) && isPointerOutsideStage(e)) {
          cancelActiveInteraction(true);
          return;
        }
        if (drawMode !== drawModes.NONE && isDrawing) {
          const pt = getSvgPoint(e);
          const { width, height } = getStageSize();
          const clampedX = Math.max(0, Math.min(width, pt.x));
          const clampedY = Math.max(0, Math.min(height, pt.y));
          drawPathD += ` L ${clampedX} ${clampedY}`;
          drawPath.setAttribute("d", drawPathD);
          return;
        }

        if (!dragState) return;
        const pt = getSvgPoint(e);

        if (dragState.mode === "crop-move" && cropState) {
          const dx = pt.x - dragState.startX;
          const dy = pt.y - dragState.startY;
          cropState.rect = {
            x: dragState.startRect.x + dx,
            y: dragState.startRect.y + dy,
            w: dragState.startRect.w,
            h: dragState.startRect.h
          };
          updateCropUi();
          return;
        }

        if (dragState.mode === "crop-resize" && cropState) {
          const dx = pt.x - dragState.startX;
          const dy = pt.y - dragState.startY;
          const r = { ...dragState.startRect };
          if (dragState.handle === "nw") {
            r.x += dx;
            r.y += dy;
            r.w -= dx;
            r.h -= dy;
          } else if (dragState.handle === "ne") {
            r.y += dy;
            r.w += dx;
            r.h -= dy;
          } else if (dragState.handle === "sw") {
            r.x += dx;
            r.w -= dx;
            r.h += dy;
          } else if (dragState.handle === "se") {
            r.w += dx;
            r.h += dy;
          }
          const n = normalizeRect(r);
          cropState.rect = { x: n.x, y: n.y, w: Math.max(10, n.w), h: Math.max(10, n.h) };
          updateCropUi();
          return;
        }

        if (dragState.mode === "marquee") {
          dragState.lastX = pt.x;
          dragState.lastY = pt.y;
          const minX = Math.min(dragState.startX, pt.x);
          const minY = Math.min(dragState.startY, pt.y);
          const maxX = Math.max(dragState.startX, pt.x);
          const maxY = Math.max(dragState.startY, pt.y);
          marqueeBox.setAttribute("x", minX);
          marqueeBox.setAttribute("y", minY);
          marqueeBox.setAttribute("width", maxX - minX);
          marqueeBox.setAttribute("height", maxY - minY);
          marqueeBox.setAttribute("visibility", "visible");

          const hitIds = parts
            .filter(part => boundsIntersect(getPartBounds(part), { minX, minY, maxX, maxY }))
            .map(part => part.id);

          if (dragState.additive) {
            const merged = new Set([...dragState.baseSelection, ...hitIds]);
            selectedIds = [...merged];
          } else {
            selectedIds = hitIds;
          }
          updateSelection();
          return;
        }

        if (dragState.mode === "move") {
          const dx = pt.x - dragState.startX;
          const dy = pt.y - dragState.startY;
          dragState.starts.forEach(s => {
            const part = findPart(s.id);
            if (!part) return;
            part.x = s.x + dx;
            part.y = s.y + dy;
            updateGuides(part);
          });
          renderArt();
          updateSelection();
          return;
        }

        if (dragState.mode === "rotate") {
          const angle = Math.atan2(pt.y - dragState.center.y, pt.x - dragState.center.x);
          let delta = angle - dragState.startAngle;
          let deltaDeg = (delta * 180) / Math.PI;
          if (e.ctrlKey || e.metaKey) {
            deltaDeg = Math.round(deltaDeg / 15) * 15;
            delta = (deltaDeg * Math.PI) / 180;
          }
          dragState.starts.forEach(s => {
            const part = findPart(s.id);
            if (!part) return;
            const local = rotatePoint(s.x - dragState.center.x, s.y - dragState.center.y, delta);
            part.x = dragState.center.x + local.x;
            part.y = dragState.center.y + local.y;
            part.rotation = s.rotation + deltaDeg;
          });
          renderArt();
          updateSelection();
          return;
        }

        if (dragState.mode === "scale") {
          const b = dragState.bounds;
          const w = Math.max(1, b.maxX - b.minX);
          const h = Math.max(1, b.maxY - b.minY);
          const handle = dragState.handle;
          const fromCenter = e.altKey;
          const mult = fromCenter ? 2 : 1;

          const dx = (pt.x - dragState.startX) * mult;
          const dy = (pt.y - dragState.startY) * mult;

          let sx = 1;
          let sy = 1;

          if (handle.includes("r")) sx = (w + dx) / w;
          if (handle.includes("l")) sx = (w - dx) / w;
          if (handle.includes("b")) sy = (h + dy) / h;
          if (handle.includes("t")) sy = (h - dy) / h;

          sx = Math.max(MIN_SCALE, sx);
          sy = Math.max(MIN_SCALE, sy);

          const corner = (handle.includes("l") || handle.includes("r")) && (handle.includes("t") || handle.includes("b"));
          if (e.shiftKey || corner) {
            const uni = Math.max(sx, sy);
            sx = uni;
            sy = uni;
          }

          const anchorX = fromCenter
            ? (b.minX + b.maxX) / 2
            : handle.includes("l")
              ? b.maxX
              : handle.includes("r")
                ? b.minX
                : (b.minX + b.maxX) / 2;

          const anchorY = fromCenter
            ? (b.minY + b.maxY) / 2
            : handle.includes("t")
              ? b.maxY
              : handle.includes("b")
                ? b.minY
                : (b.minY + b.maxY) / 2;

          dragState.starts.forEach(s => {
            const part = findPart(s.id);
            if (!part) return;
            const hasX = handle.includes("l") || handle.includes("r");
            const hasY = handle.includes("t") || handle.includes("b");
            const useSx = hasX ? sx : 1;
            const useSy = hasY ? sy : 1;
            part.x = anchorX + (s.x - anchorX) * useSx;
            part.y = anchorY + (s.y - anchorY) * useSy;
            part.scaleX = Math.max(MIN_SCALE, Math.min(8, s.scaleX * useSx));
            part.scaleY = Math.max(MIN_SCALE, Math.min(8, s.scaleY * useSy));
          });

          renderArt();
          updateSelection();
        }
      }

      function onPointerUp() {
        if (editingLocked) return;
        if (drawMode !== drawModes.NONE && isDrawing) {
          finalizeDrawing(true);
          return;
        }

        if (dragState && dragState.mode === "marquee") {
          const dx = (dragState.lastX ?? dragState.startX) - dragState.startX;
          const dy = (dragState.lastY ?? dragState.startY) - dragState.startY;
          const tinyDrag = Math.hypot(dx, dy) < 3;
          if (tinyDrag && !dragState.additive) {
            selectedIds = [];
          }
          marqueeBox.setAttribute("visibility", "hidden");
          updateSelection();
          updateColorControls();
          dragState = null;
          return;
        }

        if (dragState && (dragState.mode === "crop-move" || dragState.mode === "crop-resize")) {
          recordHistory();
          dragState = null;
          return;
        }

        if (dragState && (dragState.mode === "move" || dragState.mode === "rotate" || dragState.mode === "scale")) {
          const ids = Array.isArray(dragState.starts) ? dragState.starts.map(s => s.id) : [];
          if (dragState.mode === "move") logAction("moved", ids);
          if (dragState.mode === "rotate") logAction("rotated", ids);
          if (dragState.mode === "scale") logAction("scaled", ids);
          recordHistory();
        }

        dragState = null;
        clearGuides();
      }

      function boundsIntersect(a, b) {
        return !(a.maxX < b.minX || a.minX > b.maxX || a.maxY < b.minY || a.minY > b.maxY);
      }

      function pointInRect(pt, rect) {
        return pt.x >= rect.x && pt.x <= rect.x + rect.w && pt.y >= rect.y && pt.y <= rect.y + rect.h;
      }

      function updateGuides(part) {
        const { width, height } = getStageSize();
        const centerX = width / 2;
        const centerY = height / 2;
        const snap = 10;
        if (Math.abs(part.x - centerX) < snap) {
          guides.v.setAttribute("x1", centerX);
          guides.v.setAttribute("x2", centerX);
          guides.v.setAttribute("y1", 0);
          guides.v.setAttribute("y2", height);
          guides.v.setAttribute("visibility", "visible");
          part.x = centerX;
        } else {
          guides.v.setAttribute("visibility", "hidden");
        }

        if (Math.abs(part.y - centerY) < snap) {
          guides.h.setAttribute("x1", 0);
          guides.h.setAttribute("x2", width);
          guides.h.setAttribute("y1", centerY);
          guides.h.setAttribute("y2", centerY);
          guides.h.setAttribute("visibility", "visible");
          part.y = centerY;
        } else {
          guides.h.setAttribute("visibility", "hidden");
        }
      }

      function clearGuides() {
        guides.v.setAttribute("visibility", "hidden");
        guides.h.setAttribute("visibility", "hidden");
      }

      function updateDrawPaletteVisibility() {
        if (!drawPalette) return;
        const activeDrawTool = (drawMode === drawModes.FIGURE || drawMode === drawModes.STROKE) && selectedIds.length > 0;
        drawPalette.style.display = activeDrawTool ? "" : "none";
        if (activeDrawTool) renderDrawPalette();
      }

      function updateColorControls() {
        colorControls.innerHTML = "";
        updateDrawPaletteVisibility();
        if (!selectedIds.length) return;
        const selectedParts = selectedIds.map(id => findPart(id)).filter(Boolean);
        if (!selectedParts.length) return;
        const makeColorInput = ({
          value,
          onInputColor,
          onChangeAction,
          actionIds
        }) => {
          const row = document.createElement("div");
          row.className = "color-row";
          const icon = document.createElement("span");
          icon.className = "palette-symbol";
          icon.innerHTML = `<img src="${PALETTE_ICON_DATA}" alt="Palette" />`;
          const colorInput = document.createElement("input");
          colorInput.type = "color";
          colorInput.className = "color";
          colorInput.title = "Color";
          colorInput.value = getColorInputValue(value);
          colorInput.addEventListener("input", () => {
            if (onInputColor) onInputColor(colorInput.value);
            renderArt();
            updateSelection();
          });
          colorInput.addEventListener("change", () => {
            if (onChangeAction) logAction(onChangeAction, actionIds || selectedParts.map(p => p.id));
            recordHistory();
          });
          row.append(icon, colorInput);
          colorControls.append(row);
        };

        if (selectedParts.length > 1) {
          const sameType = selectedParts.every(p => p.kind === selectedParts[0].kind && p.type === selectedParts[0].type);

          if (sameType && selectedParts[0].kind === "svg") {
            const svgTargets = selectedParts;
            const first = svgTargets[0];
            if (first.colorKeys && first.colorKeys.length && first.colorMap) {
              first.colorKeys.forEach((key, idx) => {
                const actionName = first.colorKeys.length > 1 ? ("color" + (idx + 1) + "changed") : "color_changed";
                makeColorInput({
                  value: first.colorMap[key] || DEFAULT_COLOR,
                  onInputColor: color => {
                    svgTargets.forEach(p => {
                      if (!p.colorMap) p.colorMap = {};
                      p.colorMap[key] = color;
                    });
                  },
                  onChangeAction: actionName,
                  actionIds: svgTargets.map(p => p.id)
                });
              });
            } else {
              makeColorInput({
                value: first.tintColor || DEFAULT_COLOR,
                onInputColor: color => {
                  svgTargets.forEach(p => {
                    p.tintColor = color;
                  });
                },
                onChangeAction: "color_changed",
                actionIds: svgTargets.map(p => p.id)
              });
            }
            return;
          }

          const fillTargets = selectedParts.filter(p => p.fillColor);
          const strokeTargets = selectedParts.filter(p => p.strokeColor);
          if (fillTargets.length) {
            makeColorInput({
              value: fillTargets[0].fillColor || DEFAULT_COLOR,
              onInputColor: color => {
                fillTargets.forEach(p => {
                  p.fillColor = color;
                });
              },
              onChangeAction: "color_changed",
              actionIds: fillTargets.map(p => p.id)
            });
          }
          if (strokeTargets.length) {
            makeColorInput({
              value: strokeTargets[0].strokeColor || DEFAULT_COLOR,
              onInputColor: color => {
                strokeTargets.forEach(p => {
                  p.strokeColor = color;
                });
              },
              onChangeAction: "color_changed",
              actionIds: strokeTargets.map(p => p.id)
            });
          }
          return;
        }

        const part = selectedParts[0];

        if (part.kind === "svg") {
          if (part.colorKeys && part.colorKeys.length && part.colorMap) {
            part.colorKeys.forEach((key, idx) => {
              const actionName = part.colorKeys.length > 1 ? `color${idx + 1}changed` : "color_changed";
              makeColorInput({
                value: part.colorMap[key] || DEFAULT_COLOR,
                onInputColor: color => {
                  part.colorMap[key] = color;
                },
                onChangeAction: actionName,
                actionIds: [part.id]
              });
            });
          } else {
            makeColorInput({
              value: part.tintColor || DEFAULT_COLOR,
              onInputColor: color => {
                part.tintColor = color;
              },
              onChangeAction: "color_changed",
              actionIds: [part.id]
            });
          }
          return;
        }

        if (part.fillColor) {
          makeColorInput({
            value: part.fillColor,
            onInputColor: color => {
              part.fillColor = color;
            },
            onChangeAction: part.strokeColor ? "color1changed" : "color_changed",
            actionIds: [part.id]
          });
        }

        if (part.strokeColor) {
          let strokePreviewLine = null;
          makeColorInput({
            value: part.strokeColor,
            onInputColor: color => {
              part.strokeColor = color;
              if (strokePreviewLine) strokePreviewLine.setAttribute("stroke", color);
            },
            onChangeAction: part.fillColor ? "color2changed" : "color_changed",
            actionIds: [part.id]
          });
          const showStrokeWidthSlider = part.type === "shape-line" || part.type === "strokedraw";
          if (showStrokeWidthSlider) {
            const row = document.createElement("div");
            row.className = "row";
            const input = document.createElement("input");
            input.type = "range";
            input.className = "range";
            input.min = "1";
            input.max = "40";
            input.value = String(part.strokeWidth || 4);
            const preview = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            preview.classList.add("brush-preview");
            preview.setAttribute("viewBox", "0 0 70 22");
            preview.setAttribute("aria-label", "Stroke thickness preview");
            strokePreviewLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
            strokePreviewLine.setAttribute("x1", "10");
            strokePreviewLine.setAttribute("y1", "11");
            strokePreviewLine.setAttribute("x2", "60");
            strokePreviewLine.setAttribute("y2", "11");
            strokePreviewLine.setAttribute("stroke-width", String(part.strokeWidth || 4));
            strokePreviewLine.setAttribute("stroke", part.strokeColor);
            strokePreviewLine.setAttribute("stroke-opacity", String(getStrokeOpacity(part)));
            strokePreviewLine.setAttribute("stroke-linecap", "round");
            preview.append(strokePreviewLine);
            input.addEventListener("input", e => {
              part.strokeWidth = Number(e.target.value);
              if (strokePreviewLine) strokePreviewLine.setAttribute("stroke-width", String(part.strokeWidth));
              renderArt();
              updateSelection();
            });
            input.addEventListener("change", () => recordHistory());
            input.addEventListener("change", () => logAction("stroke_width_changed", [part.id]));
            row.append(input);
            row.append(preview);
            colorControls.append(row);
          }
        }

        if (part.shapeType === "rounded-square" || part.shapeType === "rounded-triangle") {
          const row = document.createElement("div");
          row.className = "row";
          const input = document.createElement("input");
          input.type = "range";
          input.className = "range";
          input.min = "0";
          input.max = "100";
          input.value = String(Math.round((part.roundness || 0) * 100));
          input.addEventListener("input", e => {
            part.roundness = Number(e.target.value) / 100;
            renderArt();
            updateSelection();
          });
          input.addEventListener("change", () => recordHistory());
          input.addEventListener("change", () => logAction("roundness_changed", [part.id]));
          const iconLabel = document.createElement("label");
          iconLabel.className = "hint";
          iconLabel.innerHTML = `<img class='hint-icon' src='assets/icons/icon_rounded.png' alt='Rounded corners' />`;
          row.append(input);
          row.append(iconLabel);
          colorControls.append(row);
        }
      }

      function setDrawMode(mode) {
        drawMode = drawMode === mode ? drawModes.NONE : mode;
        if (drawMode !== drawModes.NONE) {
          selectedIds = [];
          updateSelection();
          updateColorControls();
        }
        figureDrawBtn.classList.toggle("active", drawMode === drawModes.FIGURE);
        strokeDrawBtn.classList.toggle("active", drawMode === drawModes.STROKE);
        drawPath.setAttribute("visibility", "visible");
        const showBrushControls = drawMode === drawModes.STROKE && selectedIds.length > 0;
        if (brushSizeInput) brushSizeInput.style.display = showBrushControls ? "" : "none";
        if (brushPreview) brushPreview.style.display = showBrushControls ? "" : "none";
        updateDrawPaletteVisibility();
      }

      function finalizeDrawing(shouldCommit) {
        if (drawMode === drawModes.NONE || !isDrawing) return;
        isDrawing = false;
        if (shouldCommit && drawPathD.split(" ").length > 6) {
          const maxZ = parts.length ? Math.max(...parts.map(p => p.z)) : -1;
          const id = nextId();
          const isFigure = drawMode === drawModes.FIGURE;
          const finalPath = isFigure ? `${drawPathD} Z` : drawPathD;
          const metrics = computePathMetrics(finalPath);
          const part = {
            id,
            layerName: nextLayerName(),
            name: isFigure ? "Figure" : "Stroke",
            type: isFigure ? "figuredraw" : "strokedraw",
            kind: "path",
            path: finalPath,
            pathOffsetX: -metrics.cx,
            pathOffsetY: -metrics.cy,
            localBox: {
              minX: metrics.minX - metrics.cx,
              minY: metrics.minY - metrics.cy,
              w: metrics.w,
              h: metrics.h
            },
            fillColor: isFigure ? drawColor : null,
            fillOpacity: isFigure ? drawAlpha : DEFAULT_ALPHA,
            strokeColor: isFigure ? null : drawColor,
            strokeOpacity: isFigure ? DEFAULT_ALPHA : drawAlpha,
            strokeWidth: isFigure ? 0 : Number(brushSizeInput.value),
            w: metrics.w,
            h: metrics.h,
            x: metrics.cx,
            y: metrics.cy,
            rotation: 0,
            scaleX: 1,
            scaleY: 1,
            flipX: false,
            flipY: false,
            z: maxZ + 1
          };
          registerLayerMeta(part);
          initializePartInitialColors(part);
          parts.push(part);
          if (isFigure) {
            selectedIds = [id];
            drawMode = drawModes.NONE;
            setDrawMode(drawModes.NONE);
          } else {
            selectedIds = [];
          }
          renderArt();
          logAction("added", [id]);
          updateSelection();
          updateColorControls();
          recordHistory();
        }
        drawPath.setAttribute("d", "");
        drawPathD = "";
        if (drawPointerId !== null && typeof stage.releasePointerCapture === "function") {
          try {
            if (stage.hasPointerCapture && stage.hasPointerCapture(drawPointerId)) {
              stage.releasePointerCapture(drawPointerId);
            }
          } catch (_) { }
        }
        drawPointerId = null;
      }

      function flipSelected(axis) {
        const touched = [];
        parts.forEach(part => {
          if (!selectedIds.includes(part.id)) return;
          if (axis === "x") part.flipX = !part.flipX;
          if (axis === "y") part.flipY = !part.flipY;
          touched.push(part.id);
        });
        renderArt();
        updateSelection();
        recordHistory();
        if (touched.length) logAction(axis === "x" ? "flipped_x" : "flipped_y", touched);
      }

      function resetSelected() {
        parts.forEach(part => {
          if (!selectedIds.includes(part.id)) return;
          part.rotation = 0;
          part.scaleX = 1;
          part.scaleY = 1;
          part.flipX = false;
          part.flipY = false;
        });
        renderArt();
        updateSelection();
        recordHistory();
      }

      function bringForward() {
        const selected = allPartsOrdered().filter(p => selectedIds.includes(p.id)).sort((a, b) => b.z - a.z);
        selected.forEach(part => {
          const ordered = allPartsOrdered();
          const idx = ordered.findIndex(p => p.id === part.id);
          if (idx < 0 || idx >= ordered.length - 1) return;
          const above = ordered[idx + 1];
          if (selectedIds.includes(above.id)) return;
          const tmp = part.z;
          part.z = above.z;
          above.z = tmp;
        });
        renderArt();
        updateSelection();
        recordHistory();
        if (selectedIds.length) logAction("bringforward", [...selectedIds]);
      }

      function sendBackward() {
        const selected = allPartsOrdered().filter(p => selectedIds.includes(p.id)).sort((a, b) => a.z - b.z);
        selected.forEach(part => {
          const ordered = allPartsOrdered();
          const idx = ordered.findIndex(p => p.id === part.id);
          if (idx <= 0) return;
          const below = ordered[idx - 1];
          if (selectedIds.includes(below.id)) return;
          const tmp = part.z;
          part.z = below.z;
          below.z = tmp;
        });
        renderArt();
        updateSelection();
        recordHistory();
        if (selectedIds.length) logAction("sendbackward", [...selectedIds]);
      }

      function cloneSelectionToClipboard() {
        clipboardParts = parts
          .filter(p => selectedIds.includes(p.id))
          .map(p => JSON.parse(JSON.stringify(p)));
      }

      function pasteFromClipboard(actionLabel = "pasted") {
        if (!clipboardParts.length) return;
        const maxZ = parts.length ? Math.max(...parts.map(p => p.z)) : -1;
        let nextLayer = getMaxLayerIndex() + 1;
        const pasted = clipboardParts.map((p, idx) => ({
          ...p,
          id: nextId(),
          layerName: `Layer ${nextLayer++}`,
          x: p.x + 20,
          y: p.y + 20,
          z: maxZ + idx + 1
        }));
        pasted.forEach(p => initializePartInitialColors(p));
        pasted.forEach(p => registerLayerMeta(p));
        parts.push(...pasted);
        selectedIds = pasted.map(p => p.id);
        renderArt();
        updateSelection();
        updateColorControls();
        recordHistory();
        logAction(actionLabel, pasted.map(p => p.id));
      }

      function duplicateSelection() {
        cloneSelectionToClipboard();
        pasteFromClipboard("duplicated");
      }

      function deleteSelectedParts() {
        if (!selectedIds.length) return;
        const deletedIds = [...selectedIds];
        parts = parts.filter(p => !selectedIds.includes(p.id));
        selectedIds = [];
        cropState = null;
        hideCropUi();
        renderArt();
        updateSelection();
        updateColorControls();
        recordHistory();
        logAction("deleted", deletedIds);
      }

      function drawCheckerboardBackground(ctx, width, height, options = {}) {
        const size = options.size || 24;
        const c1 = options.c1 || "#c3c8d0";
        const c2 = options.c2 || "#9ca3af";
        for (let y = 0; y < height; y += size) {
          for (let x = 0; x < width; x += size) {
            const even = ((x / size) + (y / size)) % 2 === 0;
            ctx.fillStyle = even ? c1 : c2;
            ctx.fillRect(x, y, size, size);
          }
        }
      }

      function renderPngBlob(forceTransparent = false) {
        return new Promise((resolve, reject) => {
          const { width, height } = getStageSize();
          const svgString = buildStandaloneStageSvgString(true);
          const img = new Image();
          const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
          const url = URL.createObjectURL(svgBlob);
          img.onload = () => {
            try {
              const canvas = document.createElement("canvas");
              canvas.width = width;
              canvas.height = height;
              const ctx = canvas.getContext("2d");
              ctx.fillStyle = "#ffffff";
              ctx.fillRect(0, 0, canvas.width, canvas.height);
              ctx.drawImage(img, 0, 0, width, height);
              URL.revokeObjectURL(url);
              canvas.toBlob(blob => {
                if (!blob) return reject(new Error("Could not create PNG blob"));
                resolve(blob);
              }, "image/png");
            } catch (err) {
              URL.revokeObjectURL(url);
              reject(err);
            }
          };
          img.onerror = err => {
            URL.revokeObjectURL(url);
            reject(err);
          };
          img.src = url;
        });
      }

      async function exportPNG(forceTransparent = false, options = {}) {
        const blob = await renderPngBlob(forceTransparent);
        const fileName = options.fileName || `monster_${new Date().toISOString().replace(/[:.]/g, "-")}.png`;
        if (options.saveToWorkspace) {
          const saved = await writeBlobToDataSubfolder(blob, "PNGs", fileName);
          if (!saved) downloadBlob(blob, fileName);
          return;
        }
        downloadBlob(blob, fileName);
      }

      function pickVideoMimeType() {
        const choices = [
          "video/webm;codecs=vp9",
          "video/webm;codecs=vp8",
          "video/webm"
        ];
        for (const m of choices) {
          if (window.MediaRecorder && MediaRecorder.isTypeSupported(m)) return m;
        }
        return "";
      }

      function getStageSize() {
        const viewBox = stage.viewBox && stage.viewBox.baseVal;
        if (viewBox && viewBox.width && viewBox.height) {
          return { width: Math.round(viewBox.width), height: Math.round(viewBox.height) };
        }
        return { width: 900, height: 900 };
      }

      function buildStandaloneStageSvgString(omitEditorUi = false) {
        const { width, height } = getStageSize();
        const cloned = stage.cloneNode(true);
        if (omitEditorUi) {
          const selectors = [
            ".guide",
            ".box",
            ".marquee-box",
            ".crop-box",
            ".crop-handle",
            ".handle",
            ".rotate-line",
            ".rotate-handle",
            ".draw-path"
          ];
          cloned.querySelectorAll(selectors.join(",")).forEach(node => node.remove());
        }
        cloned.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        cloned.setAttribute("viewBox", `0 0 ${width} ${height}`);
        cloned.setAttribute("width", String(width));
        cloned.setAttribute("height", String(height));
        return new XMLSerializer().serializeToString(cloned);
      }

      function setEditorUiForRecording(hidden) {
        void hidden;
      }

      async function renderStageFrameToVideoCanvas() {
        if (!videoState.canvas || !videoState.ctx || videoState.rendering) return;
        videoState.rendering = true;
        try {
          const svgString = buildStandaloneStageSvgString(true);
          const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
          const url = URL.createObjectURL(blob);
          const img = await new Promise((resolve, reject) => {
            const i = new Image();
            i.onload = () => resolve(i);
            i.onerror = err => reject(err);
            i.src = url;
          });
          const { ctx, canvas } = videoState;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          URL.revokeObjectURL(url);
        } catch (err) {
          console.error("Video frame render failed:", err);
        } finally {
          videoState.rendering = false;
        }
      }

      function videoFrameLoop(ts) {
        if (!videoState.active) return;
        const frameInterval = 1000 / Math.max(1, videoState.targetFps || 10);
        if (!videoState.lastFrameTs || ts - videoState.lastFrameTs >= frameInterval) {
          videoState.lastFrameTs = ts;
          renderStageFrameToVideoCanvas();
        }
        videoState.rafId = requestAnimationFrame(videoFrameLoop);
      }

      function setRecordButtonLocked(locked) {
        if (!recordVideoBtn) return;
        if (locked) {
          recordVideoBtn.disabled = true;
          recordVideoBtn.style.opacity = "1";
          recordVideoBtn.style.cursor = "default";
          recordVideoBtn.title = "Grabando automáticamente";
        } else {
          recordVideoBtn.disabled = false;
          recordVideoBtn.style.cursor = "";
          recordVideoBtn.title = videoState.active ? "Stop Recording" : "Record";
        }
      }

      async function startVideoRecording() {
        if (videoState.active) return;
        if (!window.MediaRecorder) {
          alert("Video recording is not supported in this browser.");
          return;
        }
        const mimeType = pickVideoMimeType();
        if (!mimeType) {
          alert("No supported WebM codec found for recording.");
          return;
        }
        videoState.chunks = [];
        const profile = { fps: 10, bitrate: 350000, scale: 0.72, lowQualityBg: true };
        videoState.targetFps = profile.fps;
        videoState.lowQualityBg = profile.lowQualityBg;

        const { width, height } = getStageSize();
        let stream = null;
        if (HTMLCanvasElement.prototype.captureStream) {
          const canvas = document.createElement("canvas");
          canvas.width = Math.max(2, Math.round(width * profile.scale));
          canvas.height = Math.max(2, Math.round(height * profile.scale));
          const ctx = canvas.getContext("2d");
          videoState.canvas = canvas;
          videoState.ctx = ctx;
          await renderStageFrameToVideoCanvas();
          stream = canvas.captureStream(profile.fps);
          videoState.mode = "canvas-replay";
        } else {
          alert("Video recording is not supported in this browser.");
          return;
        }

        videoState.stream = stream;
        const recorder = new MediaRecorder(stream, {
          mimeType,
          videoBitsPerSecond: profile.bitrate
        });
        videoState.recorder = recorder;
        recorder.ondataavailable = e => {
          if (e.data && e.data.size) videoState.chunks.push(e.data);
        };
        recorder.start(1000);
        videoState.lastFrameTs = 0;
        videoState.rafId = requestAnimationFrame(videoFrameLoop);
        videoState.active = true;
        recordVideoBtn.classList.add("recording");
        recordVideoBtn.textContent = "■";
        recordVideoBtn.title = "Stop Recording";
      }

      async function stopVideoRecording(options = {}) {
        if (!videoState.active || !videoState.recorder) return null;
        if (videoState.rafId) cancelAnimationFrame(videoState.rafId);
        videoState.rafId = null;
        await new Promise(resolve => {
          videoState.recorder.onstop = () => resolve();
          videoState.recorder.stop();
        });
        const blob = new Blob(videoState.chunks, { type: videoState.recorder.mimeType || "video/webm" });
        const fileName = options.fileName || `monster_process_${new Date().toISOString().replace(/[:.]/g, "-")}.webm`;
        queueRecordedVideoClip(blob, fileName);
        if (options.saveToWorkspace) {
          const saved = await writeBlobToDataSubfolder(blob, "Videos", fileName);
          if (!saved) downloadBlob(blob, fileName);
        } else if (!options.suppressDownload) {
          downloadBlob(blob, fileName);
        }
        videoState.active = false;
        videoState.recorder = null;
        videoState.chunks = [];
        videoState.canvas = null;
        videoState.ctx = null;
        videoState.lastFrameTs = 0;
        videoState.targetFps = 10;
        videoState.lowQualityBg = false;
        if (videoState.stream) {
          videoState.stream.getTracks().forEach(t => t.stop());
        }
        videoState.stream = null;
        videoState.mode = "";
        recordVideoBtn.classList.remove("recording");
        recordVideoBtn.textContent = "⏺";
        recordVideoBtn.title = "Record";
        return blob;
      }

      stage.addEventListener("pointerdown", onStagePointerDown);
      stage.addEventListener("dblclick", e => {
        e.preventDefault();
      });
      display_element.addEventListener("selectstart", e => {
        if (e.target && e.target.closest && e.target.closest("input, textarea")) return;
        e.preventDefault();
      });
      stage.addEventListener("pointermove", onPointerMove);
      stage.addEventListener("pointerup", onPointerUp);
      stage.addEventListener("pointercancel", onPointerUp);
      stage.addEventListener("pointerleave", () => {
        cancelActiveInteraction(false);
      });
      Object.values(handles).forEach(h => h.addEventListener("pointerdown", onHandlePointerDown));
      rotateHandle.addEventListener("pointerdown", onRotatePointerDown);
      cropBox.addEventListener("pointerdown", onCropBoxPointerDown);
      Object.values(cropHandles).forEach(h => h.addEventListener("pointerdown", onCropHandlePointerDown));
      undoBtn.onclick = undoAction;
      if (redoBtn) redoBtn.onclick = redoAction;
      recordVideoBtn.onclick = async () => {
        if (IS_TRAINING_MODE) return;
        try {
          if (!videoState.active) await startVideoRecording();
        } catch (err) {
          console.error("Record button error:", err);
          alert("Could not start/stop recording in this browser.");
          videoState.active = false;
          videoState.recorder = null;
          videoState.chunks = [];
          if (videoState.rafId) cancelAnimationFrame(videoState.rafId);
          videoState.rafId = null;
          videoState.targetFps = 10;
          videoState.lowQualityBg = false;
          recordVideoBtn.classList.remove("recording");
          recordVideoBtn.textContent = "⏺";
          recordVideoBtn.title = "Record";
        }
      };

      if (!IS_TRAINING_MODE) {
        if (recordVideoBtn) recordVideoBtn.style.display = "none";
        setRecordButtonLocked(true);
        void (async () => {
          try {
            if (!videoState.active) await startVideoRecording();
          } catch (err) {
            console.error("Auto record start failed:", err);
            setRecordButtonLocked(false);
            alert("No se pudo iniciar la grabación automática en este navegador.");
          }
        })();
      }

      if (flipXBtn) flipXBtn.onclick = () => flipSelected("x");
      if (flipYBtn) flipYBtn.onclick = () => flipSelected("y");
      if (bringForwardBtn) bringForwardBtn.onclick = bringForward;
      if (sendBackwardBtn) sendBackwardBtn.onclick = sendBackward;
      if (deleteSelectionBtn) deleteSelectionBtn.onclick = deleteSelectedParts;
      if (duplicateSelectionBtn) duplicateSelectionBtn.onclick = duplicateSelection;
      finishBtn.onclick = handleFinish;
      if (finishTopBtn) finishTopBtn.onclick = handleFinish;
      if (trialSkipHiddenEditorBtn) trialSkipHiddenEditorBtn.onclick = hiddenSkipEditorPhase;
      if (trialSkipHiddenSummaryBtn) trialSkipHiddenSummaryBtn.onclick = hiddenSkipTrial;
      if (finishFinalBtn) {
        finishFinalBtn.onclick = async () => {
          await completeSummaryAndFinish();
        };
      }

      if (typeof window !== "undefined") {
        window.drawingCreatorApi = {
          pauseForZoom,
          resumeFromZoomPause,
          setEditorEnabled,
          setGateVisible,
          updateTimerDisplay,
          startDrawingTimer
        };
      }

      figureDrawBtn.onclick = () => setDrawMode(drawModes.FIGURE);
      strokeDrawBtn.onclick = () => setDrawMode(drawModes.STROKE);
      brushSizeInput.oninput = () => {
        if (!selectedIds.length) return;
        brushPreviewLine.setAttribute("stroke-width", brushSizeInput.value);
      };
      brushPreviewLine.setAttribute("stroke-width", brushSizeInput.value);
      brushPreviewLine.setAttribute("stroke", drawColor);
      brushPreviewLine.setAttribute("stroke-opacity", String(drawAlpha));

      function renderDrawPalette() {
        if (!drawPalette) return;
        drawPalette.innerHTML = "";
        const initialColor = drawColor;

        const row = document.createElement("div");
        row.className = "color-row";
        const icon = document.createElement("span");
        icon.className = "palette-symbol";
        icon.innerHTML = `<img src="${PALETTE_ICON_DATA}" alt="Palette" />`;

        const colorInput = document.createElement("input");
        colorInput.type = "color";
        colorInput.className = "color";
        colorInput.title = "Color";
        colorInput.value = getColorInputValue(initialColor);
        colorInput.disabled = !selectedIds.length;

        const applyDrawStyle = color => {
          if (!selectedIds.length) return;
          const nextColor = color || drawColor;
          drawColor = nextColor;
          brushPreviewLine.setAttribute("stroke", drawColor);
          if (isDrawing) {
            drawPath.setAttribute("stroke", drawColor);
          }
        };

        colorInput.addEventListener("input", () => {
          applyDrawStyle(colorInput.value);
        });
        colorInput.addEventListener("change", () => applyDrawStyle(colorInput.value));

        row.append(icon, colorInput);
        drawPalette.append(row);
      }
      renderDrawPalette();
      const initialShowDrawControls = drawMode === drawModes.STROKE && selectedIds.length > 0;
      if (brushSizeInput) brushSizeInput.style.display = initialShowDrawControls ? "" : "none";
      if (brushPreview) brushPreview.style.display = initialShowDrawControls ? "" : "none";
      updateDrawPaletteVisibility();

      const mainKeydownHandler = e => {
        if (editingLocked) return;
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
          e.preventDefault();
          if (e.shiftKey) redoAction();
          else undoAction();
          return;
        }
        if (cropState && e.key === "Enter") {
          e.preventDefault();
          clearCropMode(true);
          return;
        }
        if (cropState && e.key === "Escape") {
          e.preventDefault();
          clearCropMode(false);
          return;
        }
        if ((e.key === "Delete" || e.key === "Backspace") && selectedIds.length) {
          deleteSelectedParts();
        }
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "c" && selectedIds.length) {
          e.preventDefault();
          cloneSelectionToClipboard();
          logAction("copied", [...selectedIds]);
        }
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "v") {
          e.preventDefault();
          pasteFromClipboard();
        }
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "d" && selectedIds.length) {
          e.preventDefault();
          duplicateSelection();
        }
        if (e.key === "Escape") {
          if (isDrawing) finalizeDrawing(false);
          setDrawMode(drawModes.NONE);
        }
      };
      window.addEventListener("keydown", mainKeydownHandler);

      if (INITIAL_PARTS && INITIAL_PARTS.length) {
        parts = JSON.parse(JSON.stringify(INITIAL_PARTS));
        parts.forEach(p => {
          initializePartInitialColors(p);
          registerLayerMeta(p);
        });
      }

      renderStickers();
      updateSelection();
      updateColorControls();
      renderArt();
      recordHistory();


    }
  }

  DrawingCreatorPlugin.info = info;
  return DrawingCreatorPlugin;
})(typeof jsPsychModule !== "undefined" ? jsPsychModule : jsPsych);
