---
name: 3d-print-modeling
description: "Design-for-FDM rules and export workflow for any CAD model meant to be 3D printed. Use when modeling, modifying, or exporting parts for printing: wall thickness, overhangs, orientation, threads and press fits, tolerances, plate export to export/, and test coupons in export/tests/."
---

# 3D-print modeling (FDM)

Apply this whenever you design, change, or export a part that will be printed. Defaults assume FDM and a 0.4 mm nozzle. Numbers from published guides are starting points: printers differ, so confirm anything critical with a print test. Items marked **verified** were confirmed by a physical print on the project this skill came from.

## 1. Design for FDM

### Walls and small features
- Minimum wall: about 0.8 mm (2x nozzle). Use 1.2 to 2.0 mm for structural parts. Guides range from 2x to 4x extrusion width.
- Keep wall thickness uniform to reduce warping.
- Smallest reliable pin or column: about 1 to 2 mm diameter. Quoted minimum printable features range from 0.4 mm to about 1.1 mm, so avoid detail near the low end.
- Text: use bold, and place it on the top or bottom build plane.

### Overhangs and bridges
- Keep overhangs at 45 degrees or less from vertical so they print without supports. Some printers manage steeper angles, so calibrate with a test plate.
- Bridges up to about 10 mm usually print without supports.
- Use teardrop or diamond shapes for horizontal holes, not round holes, so the top does not sag.
- Add a chamfer or fillet to surfaces steeper than 45 degrees to remove the need for support.

### Orientation and bed contact
- Put the largest flat face on the bed. Orient the part to minimize overhangs and supports.
- Parts are weakest between layers. Orient so loads run along the layers, not across them.
- Add a small chamfer (about 0.5 mm at 45 degrees) to bottom edges and to the bottom of holes to counter elephant foot. Slicer elephant-foot compensation of about 0.2 mm is also common.
- Fillets on the first layers can warp. Prefer a chamfer on the bed side. Fillets elsewhere are fine for stress relief but optional in FDM.

### Holes
- Printed holes come out slightly small. Add clearance to the receiving hole and confirm with a test coupon (section 4). No source gives a universal value, so record the value that works on the user's printer.

### Threads
- Printed threads work best with rounded roots and crests, not sharp ones.
- Large pitches print better than fine ones. M30x2 and M60x3 worked well. **verified**
- A lead-in (tapered or "dog point") of at least 0.8 mm helps the thread start.
- Threaded holes smaller than about 3 mm are unreliable.
- Orient threads with the axis vertical (Z) so layers run perpendicular to the thread.

Sources: [Onshape: top 5 design tips](https://www.onshape.com/en/resource-center/tech-tips/top-5-design-tips-for-3d-printing), [Ultimaker: design for FFF](https://ultimaker.com/learn/design-for-fff-3d-printing-maximize-your-success/), [Wevolver: FDM design tips](https://www.wevolver.com/article/fdm-3d-printing-design-tips-best-practices-and-techniques-for-stronger-prints), [AMFG: top 10 FDM tips](https://www.amfg.ai/post/designing-for-fdm-3d-printing-top-10-tips), [Stratasys FDM design guide](https://www.stratasys.com/siteassets/sdm/content---website-storage/design-guides/dg_sdm_fdm_0725a.pdf), [PrintPal design guide](https://printpal.io/docs/3d-printing-design-guide).

## 2. Model parametrically

Build every part from named parameters so it can be resized and reused. A part that only exists at one size has to be remodeled for the next project.

- Make each important size a named parameter: overall dimensions, wall thickness, thread diameter, clearance, lengths. In the source project: `mouth_d`, `spout_od`, `wall`, `thread_d`, `tip_d`, `ring_od`.
- Express related sizes as expressions of those parameters, not typed numbers: inner diameter `spout_od - 2*wall`, female thread `thread_d + 1 mm`, extension body `0.75 * spout_od`. Changing one parameter then updates everything that depends on it.
- Put the printing clearance in a parameter too, so one edit retunes every mating part.
- Drive sketch dimensions from parameters or from other geometry (distance to the origin or to an edge), and fully constrain every sketch (0 degrees of freedom).
- Pick edges and faces by position so they follow the geometry when sizes change. Do not rely on fixed coordinates that break after a resize.
- Name every feature and parameter clearly (`thread_d`, not `d29`). Unnamed auto parameters are hard to reuse.
- Avoid typed constants in features. On the source project a few dimensions were plain numbers (`d3 = 200`, `d15 = 33.4`) and would not follow a resize.
- Test the parametric behavior: change a key parameter (for example `check_parameters` with a new `wall` or `thread_d`), confirm the design rebuilds without errors and the volume and bounding box change as expected, then set it back.
- Keep thread and clearance rules tied to the parameter they depend on, so a resized part keeps a working fit (section 3).

## 3. Joints and tolerances

- Never model male and female parts at the same nominal size. Both at M60x3 gave zero flank clearance and the ring would not screw on. **verified**
- Put the tolerance on the female part. Leave the male part at its nominal size, so one change fixes one part.
- Working starting point: female thread major = male nominal + 1 mm (M60x3 male with M61x3 female; M30x2 male with M31x2 female). **verified** by printed coupons.
- Drive the clearance from a named parameter (`thread_d + 1 mm`), not a typed number.
- The CAD may auto-narrow the female bore to the thread's minor diameter and warn ("narrowed the 61 mm hole to 57.75 mm"). That is expected. Set the bore sketch dimension to the enlarged size so the thread cuts into material.
- Where a joint must seal, a slightly loose fit is acceptable if the male thread is wrapped with PTFE (teflon) tape. **verified**
- Radial clearance alone is not enough. Check flank clearance, because the flanks are what jam.
- For press fits and snap fits, the same rule applies: tolerance on the receiving part, confirmed with a coupon.

## 4. Export for printing

### Plates
- Export one file per print job (a "plate") into the project's `export/` folder.
- Name files `plateN_<contents>_vK.3mf`, for example `plate2_spout_ring_v7.3mf`. Increase `vK` on every change. Never overwrite an earlier export.
- Never export bodies in their assembled pose. Tilted or overlapping parts import as one object. For each part:
  1. Copy the body (`solid.move` with `copy: true`), so the model stays untouched.
  2. Rotate the copy into print orientation with the chosen flat face on Z=0.
  3. Translate the copies apart so none touch.
  4. Export only those copies as separate bodies.
  5. Check each copy's bbox: min Z is 0, and the height matches what you expect.
- Restore the model afterwards (checkpoint and restore) so no print copies remain in the design.
- Choose orientation per part using section 1: largest flat face down, overhangs at 45 degrees or less, thread axis vertical.

### Test plates for joining parts
Any feature that joins another part (threads, press fits, snap fits, sliding fits) gets its own test export before the full parts are printed.

- Put these in `export/tests/`, for example `export/tests/test_ring_thread.3mf`.
- Include only the small part that mates, cut from the larger object. Do not print the whole object for a fit test.
- Print at full scale. A uniform scale-down is not a valid fit test, because pitch and clearance shrink with it.
- Method for each side of the joint:
  1. Copy the body.
  2. Intersect the copy with a cylinder or box around the joint (a thread slice of 8 to 12 mm works) using `solid.cylinder` or `solid.box` with `operation: intersect` and `targets`.
  3. Rotate the slice into print orientation, with the thread axis vertical.
  4. Place both mating slices on one test plate, apart from each other.
  5. Export to `export/tests/`.
- Restore the model afterwards.
- Print the test plate and confirm the fit before printing the full parts.

## 5. Verify, but do not trust CAD alone

- Run an interference check on the assembled pose (`inspect.clearance`) and rotate one part about its thread axis in 30 degree steps to find the best phase.
- On the source project the CAD overlap never reached zero (best 48 mm3), yet the printed coupons fit. Treat CAD overlap as a warning to investigate. The physical coupon decides.
- Check axial travel: the ring must be able to seat fully against its stop.
- Do not say "this fits" or call a clearance "typical" without a check. State what was and was not verified.

## 6. Workflow

1. Identify mating pairs and decide which side takes the tolerance.
2. Add clearance as named parameters.
3. Apply the section 1 rules: wall thickness, overhangs, orientation.
4. Check interference in CAD.
5. Export joint coupons to `export/tests/`. Print and confirm.
6. Export the full plates to `export/`.
7. Record the working clearance values so the next project starts from them.
8. Close with a print recommendation (section 7).
9. If the model has joined or moving parts, offer the optional assembly guide (section 9).

## 7. Material and print settings

Choose a material for each printed part. Details are in three references. Read them when you finish a modeling or export task:

- `references/materials-and-profiles.md`: material choice, PLA, PETG and TPU filament profiles for Bambu Lab printers, and the closing summary format.
- `references/bambu-process-settings.md`: Bambu Studio Process settings (layer height, wall loops, shells, infill, line widths, quality compensation) with presets by goal.
- `references/process-by-material.md`: how the Process settings change per material (PLA, PETG, TPU, ABS/ASA, PA-CF/PC), with best estimates and which values are unsourced.

- At the end of a task, give the user a short print recommendation: material, bed plate and temperatures, Process settings adjusted for the chosen material (layer height, wall loops, top and bottom shells, infill, line widths, speeds, cooling, retraction, compensation), orientation, supports, and which test plate to print first.
- If the material is a poor fit (heat, load, flex, outdoor use, sealing), say so and recommend the replacement from the reference.
- Use the saved user profile (section 8). Do not assume a printer or a filament brand.
- Values are starting points from published guides. Say they are unverified until a print confirms them.

## 8. Know the user's setup

Print settings depend on the printer, nozzle, and the exact filament brand and line (for example Sunlu, Bambu Lab, or another maker). The user's setup is saved in `~/.claude/3d-print-modeling/profile.md` (`$CLAUDE_CONFIG_DIR/3d-print-modeling/profile.md` if that variable is set). The template and rules are in `references/user-profile-template.md`.

- Before giving any print recommendation, read the profile file.
- If it is missing, ask the user once (printer model, nozzle, enclosure, AMS, slicer, build plate, and the brand and line of each filament they use), then save it. Use one question tool call with all the fields, not a series of questions.
- Save links the user gives you for their filaments, and look them up when you recommend settings. If a filament has no link, search for the maker's official datasheet or settings page, show the link, and save it once the user agrees.
- Calibrated values from the user's own prints (thread clearance, elephant foot, XY compensation) override every number in the references.
- Update the profile when the user changes printer, nozzle or filament. Never guess a brand.

## 9. Assembly guide (optional)

For a model with several printed parts that join or move, offer an HTML assembly guide at the end of the task. Do not generate it by default: ask the user first, in one question (yes or no), and skip it if they say no.

- If yes, write one self-contained file to `assembly/` in the project root, next to `export/`. Name it `<project>_assembly_vK.html` and increase `vK` on every change.
- Use real renders from the CAD through its MCP tools (SolidCraft `screenshot`): assembled, exploded, per step, joint close-ups, and two states of any moving joint. Save them in `assembly/img/<project>_vK/` and restore the model afterwards.
- The guide shows the part list with plate files, the assembly order, joint details (thread size, handedness, tolerance, PTFE tape), the expected movement (motion, axis, range, stops), and fit checks.
- Take movement and dimensions from the model. Do not invent them. Write "not verified" where unknown.
- Full contents, rules and an HTML skeleton are in `references/assembly-guide.md`.

## 10. Tool notes

Tool-specific commands live in `tools/`. Read the matching file when you use that CAD app:

- `tools/solidcraft.md`

## Open items

- Confirm the +1 mm clearance on other thread sizes, printers and filaments.
- Confirm the full reprint fits as the coupons did.
