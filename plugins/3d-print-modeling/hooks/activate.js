// SessionStart: mark the plugin active and copy the statusline scripts to a stable path,
// so the user's statusLine command does not depend on the plugin's versioned cache folder.
const fs = require('fs');
const os = require('os');
const path = require('path');

const configDir = process.env.CLAUDE_CONFIG_DIR || path.join(os.homedir(), '.claude');
const stableDir = path.join(configDir, '3d-print-modeling');

try {
  fs.mkdirSync(stableDir, { recursive: true });
  fs.writeFileSync(path.join(configDir, '.3d-print-modeling-active'), 'on\n');
  for (const f of ['statusline.sh', 'statusline.ps1']) {
    fs.copyFileSync(path.join(__dirname, f), path.join(stableDir, f));
  }
} catch (e) {
  // shortcut: a failed write only hides the statusline badge, never blocks the session
}

console.log('3d-print-modeling active: apply its FDM modeling rules (skill 3d-print-modeling) to any part meant for printing.');
