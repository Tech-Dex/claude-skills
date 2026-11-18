---
description: Turn the 3d-print-modeling rules on or off, or show their state (on|off|status)
argument-hint: on|off|status
allowed-tools: Bash(node:*)
---

!`node "${CLAUDE_PLUGIN_ROOT}/hooks/mode.js" $ARGUMENTS`

Reply with one short line stating the mode shown above. Follow it for the rest of the session.
