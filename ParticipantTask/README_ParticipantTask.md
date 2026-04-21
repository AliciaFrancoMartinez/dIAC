# Participant Task Guide (For Researchers)

This guide explains how to run the Participant Task and what files must stay in place.

## Entry File

Open:

- `ParticipantTask/dIAC_ParticipantTask_index.html` for participants to complete the task.

This HTML loads:

- `ParticipantTask/plugin_CrCrCr.js`
- `ParticipantTask/timeline_ParticipantTask.js`

## Required Structure

Inside `ParticipantTask/`:

- `dIAC_ParticipantTask_index.html`
- `timeline_ParticipantTask.js`
- `plugin_CrCrCr.js`
- `assets/`
- `assets/Tutorial_CrCrCr.mp4`
- `assets/icons/` (all icon `.png` files)

## Quick Setup Checklist

1. `dIAC_ParticipantTask_index.html` points to `timeline_ParticipantTask.js`
2. Timeline points to `assets/Tutorial_CrCrCr.mp4`
3. Plugin icon paths use `assets/icons/...`
4. Open task from `ParticipantTask/dIAC_ParticipantTask_index.html`

## Troubleshooting

If the page is blank:

1. Open browser DevTools Console
2. Check for missing file errors (404 / Not Found)
3. Confirm exact filenames and capitalization

If icons do not appear:

1. Confirm folder exists: `ParticipantTask/assets/icons/`
2. Confirm paths in `plugin_CrCrCr.js` use `assets/icons/...`

If tutorial video does not play:

1. Confirm file exists: `ParticipantTask/assets/Tutorial_CrCrCr.mp4`
2. Confirm timeline source name matches exactly
