# SolidCraft notes

- The export tool can only write to its own temp folder. Export there, then copy into the project folder.
- Use `edit.checkpoint` before building test bodies and `edit.restore_checkpoint` afterwards to leave the design unchanged.
- `inspect.clearance` with `against` reports overlaps and near pairs; each call took about 6 to 11 seconds on the full model.
- `screenshot` with `source: "model"` renders the model (use `view` for iso, front, top, and so on, or `camera` for a custom angle). `path` keeps the PNG, but only inside the server's allowed temp folder, whose name can change when the server restarts. If a call fails with "outside the folders this agent may use", use the folder named in the error, then copy the file into the project.
- Use `inspect.section` for a cut view of a joint, and `appearance.assign` with an opacity below 1 to see inside a body.
