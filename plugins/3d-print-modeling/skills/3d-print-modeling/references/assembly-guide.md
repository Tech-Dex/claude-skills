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
- One HTML file with inline CSS, no external scripts or fonts, so it opens offline.
- Images go in `assembly/img/<project>_vK/` and the HTML references them with relative paths. If the user wants a single file, embed the PNGs as base64 `data:` URIs instead, and warn that the file gets large.
- If the project already links plate files in `export/`, reference them by file name only. Do not copy 3D files into the guide.

## Use real renders from the CAD, not drawings

Take the images from the CAD application through its MCP tools. In SolidCraft that is the `screenshot` tool. Real renders and measured numbers are the point of the guide, so avoid hand-drawn diagrams when a render is possible.

Shots to take, as they apply:
- **Assembled view.** All parts in place, `source: "model"`, `view: "iso"`.
- **Exploded view.** Copy the bodies (`solid.move` with `copy: true`) and translate each copy apart along its joint axis. Render, then restore the checkpoint so the model is unchanged.
- **Per-step view.** One render per assembly step, with the other parts hidden or moved away, so the step shows only the parts involved.
- **Joint close-up.** Use `camera` (target, yaw, pitch, distance) or a section (`inspect.section`) to show thread engagement, a snap, or the stop face.
- **Motion states.** For a moving joint, render two states: for example the ring at the start of the thread and fully seated (move a copy along the axis by the real travel). Label the direction of motion in the caption.
- **Print orientation.** Optional: the plate layout as exported, from the top view.

How to capture:
1. Use a checkpoint (`edit.checkpoint`) before moving or hiding anything, and restore it when done.
2. Call `screenshot` with `path` set to a file inside the MCP server's allowed folder. The server's temp folder name can change each run. If a call fails with "outside the folders this agent may use", read the allowed folder from that error message and retry.
3. Copy the PNG from that folder into `assembly/img/<project>_vK/`. Name files by step, for example `step1_assembled.png`.
4. Use consistent size and view settings across shots (for example 960 by 600) so the page looks even.
5. Look at each image after capture. If a part is hidden, cropped or the camera is wrong, retake it before building the page.

Take numbers from the model too: use `measure`, `body_topology` and the parameters for pitch, diameters and travel. Do not read them off the picture.

## What it must contain

1. **Title, assembled render, and part list.** Each printed part with its plate file (`export/plateN_..._vK.3mf`), material, and orientation used for printing.
2. **Assembly order.** Numbered steps, in the order a person should do them. One action per step.
3. **Joint details per step.** Joint type, thread size and handedness (right-hand unless the model says otherwise), which part is male and which is female, the tolerance used (for example "female thread +1 mm"), and whether PTFE tape is needed for sealing.
4. **Expected movement.** For each moving or adjustable joint: the motion (rotation, sliding, hinge), the axis, the range or number of turns, and what stops it. For a thread, travel per turn equals the pitch (for example 3 mm per turn for M60x3). State when a part should not move.
5. **Checks.** What a correct fit feels like (hand tight, no wobble, ring seats against its stop) and what to do if it is too tight or too loose.
6. **Print notes.** Material and Process settings used, with the link to the print recommendation if one was given.

## Rules

- Take dimensions, pitches, tolerances and axes from the model and the export files. Do not invent movement. If something is unknown, write "not verified" in the guide.
- Mark what was verified by a physical print and what is a model estimate, the same way the skill does.
- Keep it plain: short steps, small tables, no marketing wording. Readable on a phone (single column, 16 px side margin) and in light and dark mode.
- Renders cannot draw arrows. Add motion arrows and labels as a small inline SVG overlay or in the caption. Make sure the arrow matches the real axis and direction in the model.
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
  img { max-width:100%; height:auto; border:1px solid var(--line); border-radius:4px; }
</style>
</head>
<body>
<h1>Project name: assembly</h1>
<h2>Parts</h2>
<table>
  <tr><th>Part</th><th>Plate file</th><th>Material</th><th>Print orientation</th></tr>
</table>
<h2>Assembly steps</h2>
<div class="step"><strong>1.</strong> ...<br><img src="img/project_v1/step1_assembled.png" alt="Step 1: parts in place" width="100%"></div>
<h2>Expected movement</h2>
<table>
  <tr><th>Joint</th><th>Motion</th><th>Range</th><th>Stops at</th></tr>
</table>
<h2>Checks and fixes</h2>
<p class="note">Mark anything not verified on a real print.</p>
</body>
</html>
```
