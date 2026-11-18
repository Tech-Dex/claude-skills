# User print profile

Template for the file Claude saves at `~/.claude/3d-print-modeling/profile.md` (or `$CLAUDE_CONFIG_DIR/3d-print-modeling/profile.md`). That folder is outside the plugin cache, so plugin updates do not erase it. The file stays on the user's machine.

Claude fills this in after asking the user, and updates it when the setup changes.

```markdown
# My print setup

## Printer
- Model: <for example Bambu Lab P1S>
- Nozzle: <0.4 mm, brass or hardened>
- Enclosure: <yes or no>
- AMS or multi-spool feeder: <yes or no>
- Slicer: <Bambu Studio, Orca Slicer, other>
- Build plate: <textured PEI, smooth PEI, other>

## Filaments in use
| Material | Brand and line | Colour (optional) | Reference links |
|---|---|---|---|
| PLA | <for example Sunlu PLA Meta> | | <link to the maker's settings, datasheet or MakerWorld profile> |
| PETG | <for example Bambu Lab PETG HF> | | <link> |
| TPU | <for example Sunlu TPU 95A> | | <link> |

## Calibrated values (from the user's own prints)
- Thread clearance that worked: <for example +1 mm on the female thread major>
- Elephant foot compensation: <value>
- XY hole compensation: <value>
- Notes: <anything that went wrong or right>

## Preferences
- Default material for functional parts: <PETG>
- Quality or speed preference: <quality first, or speed first>
```

## Rules for Claude

- Ask for any missing field once, in one question. Do not ask again in later sessions once it is saved.
- Save only what the user tells you or confirms. Do not guess a brand or a link.
- When you recommend print settings, read the profile first. Use the saved reference links for that filament. If a filament has no link, search for the maker's official datasheet or settings page, show the user the link, and save it once they agree.
- If the user switches printer, nozzle or filament, update the profile.
- Calibrated values from the user's own prints override every number in the other references.

## Known reference pages

Pages found while building this skill. Prefer the maker's own page for a filament over these.

- Bambu Lab filaments: [filament guide material table](https://wiki.bambulab.com/en/general/filament-guide-material-table) and [compatibility and parameter settings](https://wiki.bambulab.com/en/x1/manual/compatibility-and-parameter-settings-of-filaments)
- Sunlu PLA Meta: [optimized settings on MakerWorld](https://makerworld.com/models/2484472)
- Sunlu PETG: [Bambu forum thread on best settings](https://forum.bambulab.com/t/best-settings-for-sunlu-petg/33776/1)
