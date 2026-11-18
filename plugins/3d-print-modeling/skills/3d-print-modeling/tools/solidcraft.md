# SolidCraft notes

- The export tool can only write to its own temp folder. Export there, then copy into the project folder.
- Use `edit.checkpoint` before building test bodies and `edit.restore_checkpoint` afterwards to leave the design unchanged.
- `inspect.clearance` with `against` reports overlaps and near pairs; each call took about 6 to 11 seconds on the full model.
