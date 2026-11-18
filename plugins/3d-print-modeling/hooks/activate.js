// SessionStart: apply the saved on/off state and copy the statusline scripts to a stable path,
// so the user's statusLine command does not depend on the plugin's versioned cache folder.
const fs = require('fs');
const path = require('path');
const { stableDir, readState, syncFlag } = require('./state');

const state = readState();
try {
  fs.mkdirSync(stableDir, { recursive: true });
  for (const f of ['statusline.sh', 'statusline.ps1']) {
    fs.copyFileSync(path.join(__dirname, f), path.join(stableDir, f));
  }
  syncFlag(state);
} catch (e) {
  // shortcut: a failed write only hides the statusline badge, never blocks the session
}

if (state === 'on') {
  console.log('3d-print-modeling active: apply its FDM modeling rules (skill 3d-print-modeling) to any part meant for printing.');
  const profile = path.join(stableDir, 'profile.md');
  console.log(fs.existsSync(profile)
    ? 'User print profile saved at ' + profile + '. Read it before recommending print settings.'
    : 'No user print profile yet. Before recommending print settings, ask the user once for printer, nozzle and filament brands, then save to ' + profile + '.');
}
