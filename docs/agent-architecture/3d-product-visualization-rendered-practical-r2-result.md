# 3D Product Visualization v0.1.1 — Rendered Practical R2 Result

Date: 2026-09-06
Run: `34018495095`
Behavioral candidate: `09a6d98be331f42d33bdf89f32122a1c2479ad43`
Run head: `39c22fcd29c5ef2c2e51293f4d10e3614a3fae94`
Artifact: `hero-3d-rendered-practical-r2`
Verdict: **PROFESSIONAL_FAIL / REVISE**
Infrastructure: **PASS for render-observation**

## Evidence

Preserved:
- assembled render;
- exploded render;
- alternate 3/4 render;
- `.blend`;
- asset report.

Report:
- 26 mesh objects;
- 8,008 triangles;
- exactly 3 material families;
- one declared assembly axis;
- no GLB attempted.

## R1 repair effects

### Improved
- crossing decorative bars removed;
- housing now dominates the silhouette;
- service cap is materially smaller;
- exploded projection separates layers much more clearly;
- actual thickness and bevel response remain present.

### PV-05 — exploded assembly: PASS for rendered-practical scope
The new lateral/upward axis communicates layer order in the main exploded render. The assembly remains coherent and avoids unrelated rotations.

### PV-06 — artifact-first repair: PASS
R1 defects were mapped to responsible layers, changed, re-rendered, and re-observed. This demonstrates the basic repair loop.

## Remaining / new P1 failures

### PV-01 — construction / assembled state: FAIL

The assembled render exposes a concrete spatial construction bug:
- carrier/flange/cap are positioned behind the housing's front plane;
- the housing occludes the precision layers when assembled;
- the visible result becomes a large dark shell with an oversized dark shoulder rather than a readable fabricated assembly.

This is not a camera-only issue. Local Y ordering of the parts is wrong for the intended assembly stack.

The broad silhouette is improved, but it still does not preserve the authored current V7 shape closely enough. The next revision should derive primary polygons/proportions from the exact approved CSS geometry rather than another approximate freehand silhouette.

### PV-03 — materials: FAIL

Three material families exist in data but do not read well enough in the assembled hero:
- cast housing falls too close to black;
- useful surface information disappears;
- satin bracket/flange/cap are largely hidden by the depth-order bug;
- perceived material hierarchy is therefore weaker than the current production CSS object.

### PV-04 — lighting/camera: FAIL

Reducing fill corrected R1 flatness but overshot:
- the dark shell loses construction information;
- the key/rake highlights describe edges but not enough main-plane form;
- isolated black-background composition is too severe for useful material evaluation.

Required repair:
- restore bounded frontal information without returning to flat lighting;
- use a slightly more front-biased hero camera consistent with the current V7 shared tilt.

### Visual-language failure

The three equal vertical cap slots read as a generic interface/menu/electronics motif. This is inconsistent with the no-gadget target.

Replace with mechanically irregular shallow vent/grip language or a single asymmetrical inset with non-UI slot rhythm.

## Comparison to current V7 production

Current exact CSS V7 remains stronger in:
- silhouette authorship;
- assembled layer visibility;
- cap placement;
- material hierarchy at hero scale;
- fit to the page.

R2 is stronger in:
- real thickness;
- bevel response;
- true exploded spatial separation.

The correct next move is therefore **not another invented 3D form**. It is:
`approved V7 geometry/proportions -> true mesh depth -> corrected layer order -> restrained material/light upgrade`.

## Candidate decision

v0.1.1 does not pass.

Next revision:
- derive backplate/bracket/housing/core/flange/cap polygons from the exact approved V7 CSS clip-paths and relative dimensions;
- preserve their scale relationships;
- order front layers physically in front of the housing in assembled state;
- keep R2's improved exploded-axis projection;
- brighten cast material enough to retain plane information;
- remove three-bar UI motif.

Status:
`3D PRODUCTION: REVISE`
