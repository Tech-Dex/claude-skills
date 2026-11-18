# Materials and Bambu Lab print profiles

Starting points for common filaments on Bambu Lab printers (Bambu Studio). Numbers come from the Bambu wiki and third-party guides and vary by filament line and printer. The built-in Bambu Studio preset for the exact filament is the baseline. Treat everything here as a first guess, then confirm with a test print.

Items tagged *(general knowledge)* are not from the sources below.

## Material choice

| Material | Good for | Watch out for | Printer needs |
|---|---|---|---|
| PLA | Prototypes, decorative parts, easy prints, stiff parts | Low heat resistance, brittle, creeps under load *(general knowledge)* | Open or enclosed |
| PETG | Functional parts, tougher than PLA, better heat tolerance, water contact *(general knowledge)* | Stringing, softer surface, sticks hard to smooth plates *(general knowledge)* | Open or enclosed |
| TPU | Flexible parts, seals, grips, impact absorption | Slow printing, hard to feed through the AMS for soft grades (95A and softer) | Open or enclosed, direct feed |
| ABS / ASA | Heat resistance; ASA also for outdoor and UV *(general knowledge)* | Warps, needs an enclosure and hot bed | Enclosed (X1, P1S and similar) |
| PA-CF / PC and similar | High strength and stiffness | Needs enclosure, hot hotend, hardened nozzle, dry filament | Enclosed, hardened nozzle |

Carbon-fiber filaments (PLA-CF, PETG-CF, PA-CF, PC-CF) need a hardened steel nozzle, because brass wears quickly.

### If the current material is a bad fit
- Part deforms or sags under heat or load: move from PLA to PETG, then to ASA or ABS if an enclosure is available.
- Part cracks along layers or snaps: PLA is brittle. Move to PETG, or increase wall loops.
- Part must flex, seal or absorb impact: use TPU. Pick the hardness for the stiffness you need.
- Part is outdoors or in sunlight: ASA (UV stable). PLA and PETG degrade more readily *(general knowledge)*.
- Part needs very high stiffness or strength: PA-CF, only if the printer has an enclosure, a hardened nozzle and filament drying.
- Threads that must seal or hold pressure: PETG, with PTFE tape on the male thread.

## Typical settings by material (0.4 mm nozzle)

| Setting | PLA | PETG | TPU |
|---|---|---|---|
| Nozzle temperature | 190 to 220 C (some Bambu PLA lines up to 260 C) | 230 to 270 C | 210 to 240 C |
| Bed temperature | 45 to 65 C (textured PEI) | 60 to 80 C | 35 to 45 C (textured PEI) |
| Speed | Fast, up to about 300 mm/s practical | About 150 to 250 mm/s practical | Slow, stay under the filament's volumetric flow limit |
| Cooling | High *(general knowledge)* | Medium *(general knowledge)* | Low to medium *(general knowledge)* |
| Retraction | Normal | Normal, tune against stringing *(general knowledge)* | Minimal *(general knowledge)* |

ABS / ASA bed temperature: 90 to 100 C. PC: 100 to 120 C. Use an enclosure.

## Settings for strength and thread quality

- Layer height at or below half the nozzle diameter (0.2 mm on a 0.4 mm nozzle) for strong parts. 0.16 mm improves thread detail and fit.
- Wall loops: 3 to 4 for functional parts, up to 5 or 6 for heavy loads. Walls add more strength than infill. Sources disagree on exact counts.
- Sparse infill: about 15 percent for light parts, 30 to 45 percent for functional parts.
- Extra wall loops can use up the space in thin sections. Check the slice preview for gaps.
- A material change (for example PLA to PETG-HF) can add more strength than any slicer tweak.
- Orient the part so layers are not across the main load (see SKILL.md section 1).

## Closing recommendation format

At the end of a modeling or export task, give the user a short print summary. Ask for the printer model and nozzle once if unknown. Example:

```
Print recommendation (Bambu Studio, 0.4 mm nozzle)
Part:        union ring (plate2_spout_ring_v7)
Material:    PETG (functional, sees water; PLA would creep and soften)
Bed plate:   Textured PEI, 70 C
Nozzle:      250 C (start from the Bambu PETG preset)
Layer:       0.16 mm (thread detail), 4 wall loops, 30% sparse infill
Orientation: lip face down, thread axis vertical
Supports:    none expected; check the spout bend in the preview
Check first: print export/tests/ thread coupon before the full parts
```

State what is a recommendation and what has been verified on the user's printer. If the material is a poor fit for the part, say so and name the replacement from the table above.

## Sources

- [Bambu Lab wiki: filament guide material table](https://wiki.bambulab.com/en/general/filament-guide-material-table)
- [Bambu Lab wiki: filament compatibility and parameter settings](https://wiki.bambulab.com/en/x1/manual/compatibility-and-parameter-settings-of-filaments)
- [Bambu Lab wiki: strength advance settings](https://wiki.bambulab.com/en/software/bambu-studio/parameter/strength-advance-settings)
- [Bambu Lab filament settings: complete parameter guide](https://bambureviews-com.pages.dev/posts/bambu-filament-settings-guide)
- [SimplyPrint: Bambu Lab filaments at a glance](https://simplyprint.io/filaments/bambu-lab)
- [PrintPal: 10 Bambu Studio tips for stronger prints](https://blog.printpal.io/10-bambu-studio-tips-for-stronger-3d-prints/)
- [PrintPal: layer height, walls and line width](https://printpal.io/wiki/layer-heights-walls-and-line-widths)
