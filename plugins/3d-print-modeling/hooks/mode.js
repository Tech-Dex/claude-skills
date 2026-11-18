// Toggle command backend: node mode.js on|off|status
const { readState, writeState, syncFlag } = require('./state');

const arg = (process.argv[2] || 'status').trim().toLowerCase();
if (arg === 'on' || arg === 'off') {
  writeState(arg);
} else if (arg !== 'status') {
  console.log('Usage: /print3d on|off|status');
  process.exit(0);
} else {
  syncFlag(readState());
}

const state = readState();
console.log(
  state === 'on'
    ? '3d-print-modeling is ON. Apply its FDM modeling rules (skill 3d-print-modeling) to any part meant for printing.'
    : '3d-print-modeling is OFF. Do not apply its rules unless the user asks for them or invokes the skill directly.'
);
