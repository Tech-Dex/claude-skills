# Bambu Studio process settings

Starting points for the Process tab in Bambu Studio (0.4 mm nozzle). Defaults differ by printer, nozzle and Bambu Studio version, and sources disagree on some numbers. Read the actual values in the user's preset and propose changes from there. Tags: *(general knowledge)* means it is my judgment and no source confirmed it. Untagged values come from the sources listed at the end.

## Presets by goal

The table below assumes PLA or PETG. Speeds, cooling, retraction and wall counts change per material. Apply the adjustments in `process-by-material.md`.

Pick the row closest to the part. All values are proposals to confirm with a print.

| Setting | Standard | Strong functional | Threads and tight fits |
|---|---|---|---|
| Layer height | 0.20 mm | 0.20 mm or lower | 0.16 mm |
| Wall loops | 2 to 3 | 4 (up to 5 or 6 for heavy loads) | 3 to 4 |
| Top shell layers | 5 | 5 to 6 | 5 to 6 |
| Bottom shell layers | 3 | 4 to 6 *(general knowledge)* | 4 to 5 *(general knowledge)* |
| Sparse infill density | 15% | 30 to 45% | 20 to 30% *(general knowledge)* |
| Sparse infill pattern | Gyroid (default) | Gyroid, cubic or honeycomb | Gyroid |
| Elephant foot compensation | Preset default | 0.1 to 0.2 mm, calibrate | 0.1 to 0.2 mm, calibrate |
| Precise wall | Off *(general knowledge)* | On | On |
| Outer wall speed | Preset default | Preset default | Lower than default *(general knowledge)* |

## Line width

Process, Quality, Line width. A value of 0 uses the global default. The first-layer width overrides other types for the first layer.

| Line type | Typical value (0.4 mm nozzle) | Note |
|---|---|---|
| Initial layer | 0.45 to 0.50 mm | Wider for bed adhesion |
| Outer wall | 0.40 to 0.42 mm | Narrow for surface detail |
| Inner wall | about 0.45 mm | |
| Top surface | 0.40 to 0.42 mm | |
| Sparse infill | about 0.45 mm | |
| Support | about 0.42 mm | |

Sources disagree. One gives 0.4 mm outer wall and 0.45 mm for inner wall, top surface and infill. Another gives 0.42, 0.45 and 0.50 for the global, inner wall and initial layer widths. The global default is 0.42 mm, not 0.4 mm. Use the preset's values unless there is a reason to change them. Do not set a width far below the nozzle diameter without a test print *(general knowledge)*.

## Walls, shells and infill

- Wall loops add more strength than infill. Raise walls before infill.
- Match shell thickness to wall thickness. Example: 3 wall loops (about 1.2 mm) pair with about 6 top and bottom layers at 0.2 mm layer height.
- Bambu's documented example is 3 to 4 walls, 15% infill, 5 top and 3 bottom layers. Treat it as an example, not a rule.
- For stiffness, raise infill to 35 to 45% and add 1 or 2 extra wall loops.
- Gyroid is the Bambu default. Honeycomb is stiffest for flat load-bearing parts, cubic is a middle ground, and cross hatch is faster.
- Very high wall counts can leave no space for infill in thin sections. Check the slice preview.
- Threads: put the most wall material in the threaded region, and use a fine layer height (0.16 mm) for thread detail.

## Quality and dimensional accuracy

- **Elephant foot compensation:** raise it if bottom edges are wider than the rest of the part, lower it if the base looks undercut. A starting range is 0.1 to 0.2 mm. Calibrate on the printer.
- **XY hole and contour compensation** (Process, Quality): hole compensation changes only holes and contour compensation changes only the outer boundary. Example from the Bambu wiki: a hole 0.5 mm undersized takes about +0.25 mm compensation. Small holes can be less accurate and the effect is not linear.
- **Precise wall** improves shell precision. **Precise Z height** improves vertical accuracy.
- **Ringing or ghosting:** reduce outer wall speed or acceleration, and run the built-in vibration compensation. For overshoot at sharp corners, lower jerk or acceleration on the outer wall.
- XY compensation shifts contours but does not fix a proportional scaling error.

## Not covered by the sources

Seam position, wall print order, and ironing had no sourced guidance. Do not state numbers for them. If the user asks, say so and suggest the Bambu Studio default.

## How to use this at the end of a task

Add a Process block to the print recommendation from `materials-and-profiles.md`:

```
Process (Bambu Studio, 0.4 mm nozzle)
Preset base:  Strong functional
Layer height: 0.16 mm
Walls:        4 loops, precise wall on
Shells:       top 6, bottom 5
Infill:       30% gyroid
Line width:   preset defaults (initial layer 0.50, outer 0.42, inner 0.45)
Quality:      elephant foot comp 0.15 mm (calibrate)
Verify:       fit with the export/tests/ coupon before the full print
```

State that these are proposals until a print confirms them.

## Sources

- [Bambu Lab wiki: line width](https://wiki.bambulab.com/en/software/bambu-studio/parameter/line-width)
- [Bambu Lab wiki: strength advance settings](https://wiki.bambulab.com/en/software/bambu-studio/parameter/strength-advance-settings)
- [Bambu Lab wiki: XY hole and contour compensation](https://wiki.bambulab.com/en/software/bambu-studio/xy-hole-contour-compensation)
- [Bambu Studio manual: print and filament settings, quality](https://bambu-studio-manual.pages.dev/docs/prepare/prepare-print-and-filament-settings-quality)
- [SimplyPrint: Bambu Studio settings reference](https://simplyprint.io/slicer/bambustudio.md)
- [StackSheriff: extrusion width in Bambu Studio](https://stacksheriff.com/3d-printing/bambu-studio-extrusion-width-guide/)
- [PrintPal: layer height, walls and line width](https://printpal.io/wiki/layer-heights-walls-and-line-widths)
- [PrintPal: 10 Bambu Studio tips for stronger prints](https://blog.printpal.io/10-bambu-studio-tips-for-stronger-3d-prints/)
- [All3DP: strongest infill patterns](https://all3dp.com/2/strongest-infill-pattern/)
- [Bambu forum: dimensional accuracy problems](https://forum.bambulab.com/t/dimensional-accuracy-problems-and-possible-ways-to-address-them/77468)
