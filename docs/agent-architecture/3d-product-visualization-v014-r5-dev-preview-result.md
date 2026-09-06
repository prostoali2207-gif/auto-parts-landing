# 3D Product Visualization v0.1.4 — R5 Development Preview Result

Date: 2026-09-06
Run: `34020367917`
Candidate: `3d-product-visualization-production 0.1.4-candidate`
Artifact: `hero-3d-v014-dev-preview`
Stage verdict: **DO NOT RUN FULL R5 / REVISE CANDIDATE**
Professional release verdict: **NONE — development preview only**

## Deterministic evidence

- Blender 4.0.2;
- 26 mesh objects;
- 9,712 triangles;
- exactly 3 material families;
- preview mode 960×720 / 32 samples;
- assembled / exploded / alternate evidence preserved;
- no GLB attempted.

## Preview decision

The v0.1.4 repair has partial value:
- closed satin bracket is now an actual open structural frame;
- housing remains the dominant volumetric mass;
- service cap is materially smaller;
- cast-vs-satin separation is slightly clearer.

However the preregistered stop condition fired:

> if preview still reads as nested plates/armor, do not spend a full-quality R5.

The object still has this read.

## Root cause after v0.1.4

The remaining stacked-panel language has moved inward:
- `CarrierBody` is still a broad closed polygon;
- `MachinedFlange` plus the carrier create another large nested face;
- service cap, although smaller, is still a closed bright plate;
- the open bracket cannot fix the hierarchy while the inner assembly is still panel-based.

## Next professional repair

Do not tune lighting or add decorative detail.

Required v0.1.5 topology change:
1. replace the broad closed carrier with a **compact open cradle / three-point support**;
2. expose the machined keyed opening as the dominant precision interface;
3. reduce cap again and offset it away from the opening;
4. add 2–3 explicit integrated mounting ears/lugs to the cast housing so the silhouette reads mechanically mounted rather than armor-like;
5. retain the successful lofted housing, boolean pocket, open bracket, connector, materials and exploded axis;
6. no new labels, slots, HUD or subsystem-specific geometry.

Resource decision:
The preview saved a full 96-sample R5 because the structural defect is already visible at 32 samples.

Status:
`3D PRODUCTION: REVISE BEFORE R5`
