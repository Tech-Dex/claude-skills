# claude-skills

A Claude Code plugin marketplace with skills for Claude.

## Plugins

| Plugin | What it does |
|---|---|
| [`3d-print-modeling`](plugins/3d-print-modeling/skills/3d-print-modeling/SKILL.md) | Design-for-FDM rules, joint tolerances, plate export to `export/`, and joint test plates in `export/tests/`. |

## Install (Claude Code)

```
/plugin marketplace add Tech-Dex/claude-skills
/plugin install 3d-print-modeling@dexter-claude-skills
```

Restart Claude Code after installing so the session hook runs.

## Turn it on or off

The rules are on by default. Toggle them with the command below. The choice is saved in `~/.claude/3d-print-modeling/state` and survives restarts.

```
/print3d on
/print3d off
/print3d status
```

When off, the statusline badge hides and Claude is told not to apply the rules. The skill stays installed, so `/3d-print-modeling:3d-print-modeling` still works by hand.

## Statusline badge

The plugin writes a flag file while the rules are on. A badge script shows `[3D-PRINT]` while the flag exists. Claude Code plugins cannot set the statusline themselves, so add the script to your `statusLine` command in `~/.claude/settings.json`. The hook copies the scripts to `~/.claude/3d-print-modeling/` on first run, so the path does not change with plugin versions.

Windows (PowerShell):

```json
"statusLine": {
  "type": "command",
  "command": "powershell -ExecutionPolicy Bypass -File \"%USERPROFILE%\\.claude\\3d-print-modeling\\statusline.ps1\""
}
```

macOS / Linux:

```json
"statusLine": {
  "type": "command",
  "command": "bash ~/.claude/3d-print-modeling/statusline.sh"
}
```

To combine it with another statusline command, run both in one command and print a space between them.

## License

MIT
