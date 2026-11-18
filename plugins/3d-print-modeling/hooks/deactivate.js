// SessionEnd: remove the active flag so the statusline badge disappears.
const fs = require('fs');
const os = require('os');
const path = require('path');

const configDir = process.env.CLAUDE_CONFIG_DIR || path.join(os.homedir(), '.claude');
try {
  fs.unlinkSync(path.join(configDir, '.3d-print-modeling-active'));
} catch (e) {
  // flag already gone
}
