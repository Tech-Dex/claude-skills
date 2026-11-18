// Shared by the hooks and the toggle command. State lives in ~/.claude/3d-print-modeling/state ("on" or "off").
const fs = require('fs');
const os = require('os');
const path = require('path');

const configDir = process.env.CLAUDE_CONFIG_DIR || path.join(os.homedir(), '.claude');
const stableDir = path.join(configDir, '3d-print-modeling');
const stateFile = path.join(stableDir, 'state');
const flagFile = path.join(configDir, '.3d-print-modeling-active');

function readState() {
  try {
    return fs.readFileSync(stateFile, 'utf8').trim() === 'off' ? 'off' : 'on';
  } catch (e) {
    return 'on'; // no file yet: default on
  }
}

function writeState(state) {
  fs.mkdirSync(stableDir, { recursive: true });
  fs.writeFileSync(stateFile, state + '\n');
  syncFlag(state);
}

// The statusline badge shows while the flag file exists.
function syncFlag(state) {
  if (state === 'on') {
    fs.writeFileSync(flagFile, 'on\n');
  } else {
    try { fs.unlinkSync(flagFile); } catch (e) { /* already gone */ }
  }
}

module.exports = { configDir, stableDir, flagFile, readState, writeState, syncFlag };
