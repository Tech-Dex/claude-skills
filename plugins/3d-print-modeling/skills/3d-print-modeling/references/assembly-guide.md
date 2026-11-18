# Assembly guide (optional HTML)

An optional single-page HTML guide that shows how the printed parts go together and how they move. Do not generate it by default. Offer it at the end of a task and only build it if the user says yes.

## When to offer

Offer it when the model has more than one printed part that joins (threads, press fits, snap fits, hinges, sliding parts), or when the parts have motion the user should know about. Skip the offer for a single part with no joints.

Ask once, in one question, with these options:
- Yes, generate the assembly guide.
- No, skip it.

Do not ask again for the same task if the user said no.

## Where it goes

- Folder: `assembly/` in the project root, next to `export/`.
- File name: `<project>_assembly_vK.html`, for example `funnel_assembly_v1.html`. Increase `vK` on every change. Do not overwrite an earlier guide.
- One self-contained file: inline CSS, no external scripts or fonts, so it opens offline.
- If the project already links plate files in `export/`, reference them by file name only. Do not copy 3D files into the guide.

## What it must contain

1. **Title and part list.** Each printed part with its plate file (`export/plateN_..._vK.3mf`), material, and orientation used for printing.
2. **Assembly order.** Numbered steps, in the order a person should do them. One action per step.
3. **Joint details per step.** Joint type, thread size and handedness (right-hand unless the model says otherwise), which part is male and which is female, the tolerance used (for example "female thread +1 mm"), and whether PTFE tape is needed for sealing.
4. **Expected movement.** For each moving or adjustable joint: the motion (rotation, sliding, hinge), the axis, the range or number of turns, and what stops it. For a thread, travel per turn equals the pitch (for example 3 mm per turn for M60x3). State when a part should not move.
5. **Checks.** What a correct fit feels like (hand tight, no wobble, ring seats against its stop) and what to do if it is too tight or too loose.
6. **Print notes.** Material and Process settings used, with the link to the print recommendation if one was given.

## Rules

- Take dimensions, pitches, tolerances and axes from the model and the export files. Do not invent movement. If something is unknown, write "not verified" in the guide.
- Mark what was verified by a physical print and what is a model estimate, the same way the skill does.
- Keep it plain: short steps, small tables, no marketing wording. Readable on a phone (single column, 16 px side margin) and in light and dark mode.
- Diagrams are optional. If you add one, use simple inline SVG (arrows for rotation or sliding, labels for parts). Do not add a diagram that you cannot make match the model.
- Tell the user the file path when done.

## Skeleton

Start from this and fill in the sections:

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Assembly guide</title>
<style>
  :root { --bg:#fff; --fg:#1a1a1a; --muted:#666; --line:#ddd; --accent:#0b6bcb; }
  @media (prefers-color-scheme: dark) {
    :root { --bg:#16181c; --fg:#e8e8e8; --muted:#9aa; --line:#333; --accent:#5aa9f0; }
  }
  body { background:var(--bg); color:var(--fg); font:16px/1.5 system-ui, sans-serif; margin:0; padding:16px; max-width:760px; margin-inline:auto; }
  h1,h2 { line-height:1.2; }
  table { border-collapse:collapse; width:100%; }
  th,td { border:1px solid var(--line); padding:6px 8px; text-align:left; vertical-align:top; }
  .note { color:var(--muted); }
  .step { border-left:4px solid var(--accent); padding-left:12px; margin:16px 0; }
</style>
</head>
<body>
<h1>Project name: assembly</h1>
<h2>Parts</h2>
<table>
  <tr><th>Part</th><th>Plate file</th><th>Material</th><th>Print orientation</th></tr>
</table>
<h2>Assembly steps</h2>
<div class="step"><strong>1.</strong> ...</div>
<h2>Expected movement</h2>
<table>
  <tr><th>Joint</th><th>Motion</th><th>Range</th><th>Stops at</th></tr>
</table>
<h2>Checks and fixes</h2>
<p class="note">Mark anything not verified on a real print.</p>
</body>
</html>
```
