# Process settings by material

Best-estimate Bambu Studio starting points per filament, 0.4 mm nozzle. Start from the Bambu preset for the exact filament, then adjust with this table. Sources are community guides and Bambu forum posts, and they often disagree, so the values here are the middle of the quoted ranges. Tags: *(general knowledge)* means my judgment with no source behind it. Treat every number as an estimate to confirm with a test print.

Always dry the filament before printing PETG, TPU, PA and PC. Several sources say moisture causes more stringing and poor surfaces than any slicer setting.

## Estimates for a functional part

| Setting | PLA | PETG | TPU 95A | ABS / ASA | PA-CF / PC |
|---|---|---|---|---|---|
| Layer height | 0.20 mm (0.24 to 0.28 for hidden parts, 0.16 for threads) | 0.20 mm (0.16 for threads) | 0.20 mm | 0.20 mm *(general knowledge)* | 0.20 mm *(general knowledge)* |
| Wall loops | 3 to 4 | 3 to 4 *(general knowledge)* | 3 | 3 to 4 *(general knowledge)* | 3 to 4 *(general knowledge)* |
| Sparse infill | 15% light, 30%+ strong | 20 to 30% | 20% | 20 to 30% *(general knowledge)* | 20 to 30% *(general knowledge)* |
| Outer wall speed | 80 to 120 mm/s | 60 to 100 mm/s (sources range 40 to 120) | 25 to 30 mm/s | Moderate *(general knowledge)* | Start conservative, raise until quality drops, then back off 20% |
| Inner wall and infill speed | Up to 200 to 300 mm/s | Faster than outer wall | 30 to 45 mm/s overall | Moderate *(general knowledge)* | Conservative |
| Part cooling fan | 100% after layer 3 (70 to 80% on functional parts) | 30 to 50%, up to 70% on overhangs and bridges | Low to medium *(general knowledge)* | Low or off *(general knowledge)* | Low or off *(general knowledge)* |
| Retraction | Preset default | 0.8 to 1.2 mm at 30 to 40 mm/s (direct drive) | 0 to 1 mm at about 25 mm/s | Preset default | Preset default |
| Chamber | Not needed | Not needed | Not needed | Enclosure needed; default off in the Bambu preset | 60 C chamber is the default for PC, PA and PA-CF |
| Feed path | AMS fine | AMS fine | Direct feed, bypass the AMS | AMS fine | Check filament and AMS limits |

## Material notes

### PLA
- Fan matters less for strength than layer height and wall count. Strong cooling helps overhangs and small features.
- Walls add more strength per gram than infill. Raise walls before infill.
- The default 15% infill is enough for most prints.

### PETG
- Less cooling than PLA. Too much cooling gives weak layer adhesion and brittle prints.
- Nozzle temperature: the Bambu Studio preset uses about 255 C, while some spools specify 220 to 250 C. Check the spool.
- Stringing: tune retraction, but dry the filament first.
- Open-frame printers: some sources suggest 20 to 30% fan.
- Outer wall speed is the least settled number. Start near 60 to 100 mm/s and test.

### TPU 95A
- Use the Generic TPU or standard 95A preset and keep its speed limit. The standard 95A preset is listed at 3.6 mm3/s and 230 C, and the 95A HF preset at 12 mm3/s.
- Flow ratio around 0.96 to 0.98 and run flow calibration. Turn off flow dynamics calibration for TPU.
- Print 95A from the direct feed, not through the AMS. Softer grades (85A and below) are hard to feed.
- One sourced example: 0.2 mm layers, 3 walls, 20% infill on a P1S.
- Slow speeds are the main quality lever.

### ABS / ASA
- Needs an enclosure. Warping and layer splitting are the main failures.
- The ABS and ASA presets set the auxiliary fan to 0%, but users report the printer raising it during the print. Check the generated G-code before trusting the setting.
- Chamber default is off in the Bambu preset. Some guides say heating the chamber helps warping. One manufacturer data sheet says ASA-CF prints without chamber heating.
- Wall and infill values for these materials had no sourced guidance. The numbers above are my estimate.

### PA-CF / PC
- Hardened steel nozzle required for carbon-fiber grades. Bambu's default chamber setting for PC, PA and PA-CF is on at 60 C.
- Speed: increase from conservative until quality drops, then back off 20%.
- Dry the filament, and check the Bambu wiki page on printing tips for engineering materials before relying on these estimates.
- Wall and infill values had no sourced guidance here.

## Using this at the end of a task

Pick the column for the chosen material, then add the Process block from `bambu-process-settings.md`. Where a value says *(general knowledge)* or the sources disagree, say it is an estimate and point to the Bambu preset as the baseline. If the material is a poor fit for the part, recommend a better one from `materials-and-profiles.md`.

## Sources

- [PrintPal: PETG settings, temperature, cooling and stringing fixes](https://printpal.io/wiki/petg-complete-guide)
- [Bambu Lab filament settings: complete parameter guide](https://bambureviews-com.pages.dev/posts/bambu-filament-settings-guide)
- [Bambu forum: best settings for Sunlu PETG](https://forum.bambulab.com/t/best-settings-for-sunlu-petg/33776/1)
- [StackSheriff: Bambu Lab PETG settings](https://stacksheriff.com/3d-printing/bambu-lab-petg-settings/)
- [PrintPal: how to print TPU](https://printpal.io/wiki/tpu-flexibles-guide)
- [Siraya Tech: how to print with TPU](https://siraya.tech/ja/blogs/news/how-to-print-with-tpu)
- [BambuHub: Overture TPU 95A on Bambu printers](https://bambuhub.net/articles/overture-tpu-on-bambu)
- [StackSheriff: printing TPU on Bambu, AMS limits and direct feed](https://stacksheriff.com/3d-printing/printing-tpu-bambu-settings-ams-limits-direct-feed/)
- [Hark Tech: TPU print settings for Bambu A1 and X1C](https://harktech.co.uk/help/tpu-print-settings-bambu-a1-x1c)
- [PrintPal: 10 Bambu Studio tips for stronger prints](https://blog.printpal.io/10-bambu-studio-tips-for-stronger-3d-prints/)
- [Sunlu PLA Meta optimized settings (MakerWorld)](https://makerworld.com/models/2484472)
- [Bambu Lab wiki: chamber temperature](https://wiki.bambulab.com/en/software/bambu-studio/chamber-temperature)
- [Bambu Lab wiki: X1E chamber temp guide](https://wiki.bambulab.com/en/x1/manual/X1E-chamber-temp-guide)
- [Bambu forum: part cooling fan settings](https://forum.bambulab.com/t/part-cooing-fan-settings/95451)
- [BambuHub: engineering materials guide](https://bambuhub.net/guides/engineering-materials)
