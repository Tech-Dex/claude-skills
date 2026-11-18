#!/usr/bin/env bash
# Prints a badge while the plugin's SessionStart hook has marked it active.
flag="${CLAUDE_CONFIG_DIR:-$HOME/.claude}/.3d-print-modeling-active"
[ -f "$flag" ] || exit 0
printf '\033[38;5;110m[3D-PRINT]\033[0m'
