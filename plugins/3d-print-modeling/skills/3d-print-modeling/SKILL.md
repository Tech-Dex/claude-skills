---
name: 3d-print-modeling
description: Rules for modeling parts that will be FDM 3D printed, especially threaded joints, mating parts, and print-test workflow. Use when designing, modifying, or exporting any CAD model meant for printing.
---

# 3D-print modeling rules

Learned on a funnel project (threaded union ring and extension tubes, FDM printer). The rules are CAD-agnostic. Items marked **verified** were confirmed by a physical print; **assumed** were not.

## 1. Threads and mating parts

- Never model male and female threads at the same nominal size. Both parts printed at M60x3 gave zero flank clearance and the ring would not screw on. **verified**
- Put the tolerance on the female part. Leave the male part at its nominal size so one change fixes one part and the other part stays reusable.
- Working starting point: female thread major = male nominal + 1 mm (M60x3 male, M61x3 female; M30x2 male, M31x2 female). This worked in a physical thread test. **verified**
- Drive the clearance from a parameter (`thread_d + 1 mm`), not a typed number, so one edit retunes it.
- CAD may auto-narrow the female bore to the thread's minor diameter and report a warning (for example "narrowed the 61 mm hole to 57.75 mm"). That is expected. Set the bore sketch dimension to the same enlarged size so the thread cuts into material.
- Where a thread joint must also seal, a small extra gap is acceptable: wrap the male thread with PTFE (teflon) tape. On this project the tape made the +1 mm clearance fine.
- Radial clearance numbers are not enough. Check flank clearance as well, because the flanks are what jam.

## 2. Test before reprinting the full part

- A uniform scale-down is not a valid fit test. Pitch and clearance scale with the part, so the result does not predict the real fit.
- Print thread coupons at full scale instead: a short slice (about 8 to 12 mm) of the male thread and of the female thread. They print in a fraction of the time and answer the real question.
- Build coupons by copying the bodies, intersecting each copy with a cylinder along the thread axis, then rotating the slice so the axis is vertical. Restore the model afterwards so no test bodies are left in it.
- Lay slices with the thread axis vertical (Z) so layers run perpendicular to the thread.

## 3. Verify in CAD, but do not trust CAD alone

- Run an interference check on the assembled position and rotate one part about its thread axis in steps (30 degrees worked) to find the best phase. Overlap should reach near zero at some phase.
- On this project the CAD check never reached zero overlap (best 48 mm3), yet the printed thread coupons fit. Treat CAD overlap as a warning to investigate, not as proof of failure, and treat the physical coupon as the deciding test.
- Do not state "this fits" or call a clearance "typical" without a check. Say what was and was not verified.
- Check axial travel too: the ring must be able to seat fully against its stop.

## 4. General FDM modeling reminders (assumed, check against your printer)

- Printed holes come out smaller and printed pegs come out larger. Add clearance to the part that receives.
- Keep features that must be printed without supports at a printable angle, and orient parts to avoid supports inside threads.
- Plan print orientation while modeling. Place threads with the axis vertical where you can.

## 4b. Design-for-FDM rules from published guides

Numbers below come from vendor and service-bureau guides and vary by printer. They are starting points, not guarantees. Defaults assume a 0.4 mm nozzle.

**Walls and features**
- Minimum wall: about 0.8 mm (2x nozzle). Use 1.2 to 2.0 mm for structural parts. Keep wall thickness uniform to reduce warping.
- Smallest reliable pin or column: about 1 to 2 mm diameter. Minimum printable feature estimates range from 0.4 to about 1.1 mm, so avoid detail near the low end.

**Overhangs and bridges**
- Keep overhangs at 45 degrees or less from vertical so they print without supports. Steeper angles can work on some printers, so calibrate with a test plate.
- Bridges up to about 10 mm usually print without supports.
- Use teardrop or diamond shapes for horizontal holes instead of round holes, so the top does not sag.
- Add a chamfer or fillet to surfaces steeper than 45 degrees to remove the need for support.

**Bed contact and orientation**
- Put the largest flat face on the bed and orient the part so overhangs and supports are minimal.
- Parts are weakest between layers, so orient so that loads run along layers, not across them.
- Add a small chamfer (about 0.5 mm at 45 degrees) to bottom edges and the bottom of holes to counter elephant foot. A slicer elephant-foot compensation of about 0.2 mm is also common.
- Fillets on the first layers can warp. Prefer a chamfer on the bed side.

**Threads**
- Printed threads work best with rounded roots and crests, not sharp ones. Large pitches (here M30x2 and M60x3) print better than fine ones.
- A tapered or "dog point" lead-in of at least 0.8 mm helps the thread start.
- Printed holes smaller than about 3 mm for threads are unreliable.

**Holes**
- Printed holes come out slightly small. Compensate by adding clearance to the receiving hole and test with a coupon. No source gave a universal value, so record the value that works on your printer.

Sources: [Onshape: top 5 design tips](https://www.onshape.com/en/resource-center/tech-tips/top-5-design-tips-for-3d-printing), [Ultimaker: design for FFF](https://ultimaker.com/learn/design-for-fff-3d-printing-maximize-your-success/), [Wevolver: FDM design tips](https://www.wevolver.com/article/fdm-3d-printing-design-tips-best-practices-and-techniques-for-stronger-prints), [AMFG: top 10 FDM tips](https://www.amfg.ai/post/designing-for-fdm-3d-printing-top-10-tips), [Stratasys FDM design guide](https://www.stratasys.com/siteassets/sdm/content---website-storage/design-guides/dg_sdm_fdm_0725a.pdf), [PrintPal design guide](https://printpal.io/docs/3d-printing-design-guide).

## 5. Workflow

1. Identify mating pairs and decide which side receives the tolerance.
2. Add clearance as named parameters.
3. Check interference in CAD, rotating through thread phase.
4. Export one plate per print job and give each file a version suffix (`_v6`). Do not overwrite earlier exports.
   Never export bodies in their assembled pose: tilted, overlapping parts import as one object. Copy each body, rotate it into print orientation (flat face on Z=0), and space the copies apart before export. Check each copy's bbox min Z is 0.
5. Print thread coupons first, confirm the fit, then print the full parts.
6. Record the working clearance values here so the next project starts from them.

## 6. Tool notes

Tool-specific commands live in `tools/`. Read the matching file when you use that CAD app:

- `tools/solidcraft.md`

## Open items

- Confirm whether the same +1 mm works at other thread sizes and on other printers or filaments.
- Confirm the full reprint fits the way the coupons did.
