# 3D Product Visualization v0.1 — Rendered Practical R1 Result

Date: 2026-09-06
Run: `34017982525`
Candidate source: `f2ae8ef0e5c26e4137fcb5bc14e34488d433fb29`
Artifact: `hero-3d-rendered-practical-r1`
Verdict: **PROFESSIONAL_FAIL / REVISE CANDIDATE**
Infrastructure verdict: **EXECUTABLE for render-observation**
Qualification verdict: **NOT QUALIFIED**

## Evidence obtained

Preserved artifact contents:
- `hero-assembled.png`;
- `hero-exploded.png`;
- `hero-alt.png`;
- `hero-object.blend`;
- `asset-report.json`.

Deterministic report:
- Blender: `4.0.2`;
- mesh objects: `30`;
- triangles: `8,072`;
- material families: exactly `3`;
- assembly axis recorded;
- no GLB attempted in this stage;
- truth status: fictional art direction / no real SKU claims.

The render-only execution path therefore produced valid observable professional evidence for PV-01..PV-06.

## Artifact-first diagnosis

### What succeeded

**PV-02 partial — shading/surface integrity**
- hero-visible bevels render cleanly;
- gross faceting and paper-thin single-plane failures are absent;
- the alternate angle proves real thickness exists.

**PV-09 truth boundary**
- no OEM code, dimensions, fitment, brand, fake technical labels or stock proof;
- object remains fictional.

**Runtime observability**
- the capability can now produce and preserve reviewable render artifacts.

### P1 professional failures

#### PV-01 — hard-surface form construction: FAIL

Observed:
- main body reads as a large extruded polygon enclosure rather than a fabricated automotive cast housing;
- several long bars cross the face as applied decoration rather than construction logic;
- front layers read as nested plates/panels, not as parts that explain mounting/service/assembly;
- the assembled state resembles an electrical/industrial enclosure more than an automotive mechanical module;
- mounting features are present but do not organize the silhouette strongly enough.

Root cause:
The implementation translated the contract into **too many flat extrusions and add-on bars**, reproducing the same "stacked illustration" failure in real 3D instead of exploiting 3D to create cast mass, pockets, bosses, lips and integrated ribs.

#### PV-03 — material/look development: FAIL

Observed:
- three materials exist structurally, but at final render scale they collapse into a narrow blue-grey family;
- dark cast housing is too bright/smooth and reads plastic-coated rather than cast/graphite;
- satin metal does not separate strongly enough by value/roughness/specular response;
- steel hardware is not visually disciplined enough to become a small tertiary accent.

Root cause:
Material count met the contract mechanically, but **perceptual material separation did not**.

#### PV-04 — lighting/camera: FAIL

Observed:
- edge highlights are clean, but fill level is high enough to flatten the dark cast material;
- the object is lit like a generic studio prop rather than using controlled raking reflections to reveal cast-vs-machined surfaces;
- floor/contact setup creates a product-photo stage without adding useful automotive character;
- camera reveals shape but does not turn the assembly into a strong hero silhouette comparable to the current V7 composition.

#### PV-05 — exploded assembly construction: FAIL at hero camera

Observed:
- the alternate view shows genuine depth and separate parts;
- the main exploded hero render still visually collapses because the assembly vector points too strongly toward the camera;
- assembly order is not obvious enough in 2D hero projection;
- the front service cap remains a dominant flat plate rather than the final small layer of a readable stack.

Root cause:
The one-axis rule is obeyed mathematically but not **perceptually**.

#### PV-06 — artifact-first repair: NOT YET DEMONSTRATED

The first artifact has now been observed. A bounded repair informed by these exact defects is required before PV-06 can pass.

## Comparison against current production baseline

Current exact production render `0d93d3a8a2ad45ca124df40ec97291c204770d37` remains stronger in:
- recognizable authored silhouette;
- fit to V7 hero composition;
- visual lightness;
- front-cap hierarchy;
- overall distinctiveness.

The R1 Blender object is stronger only in:
- actual mesh thickness;
- real bevel response;
- physical inter-part depth potential.

Therefore realtime/true-3D is **not itself the quality win**. The production capability must transfer the current silhouette/art-direction strengths into real 3D rather than replacing them with a generic mechanical enclosure.

## External reference mechanisms checked

Current reference research reinforced these transferable mechanisms:
- real cast automotive housings obtain identity from integrated bosses, mounting ears, ribs, pockets and machined interfaces rather than decorative surface bars;
- strong product CGI uses controlled reflection/raking light to make material boundaries legible;
- exploded-view quality depends on projected separation that communicates assembly order, not merely nonzero 3D distance.

References are mechanism-only. No real component form should be copied.

## Required candidate repair

Keep:
- fictional subsystem ambiguity;
- current three-material budget;
- one assembly axis;
- deterministic Blender production path;
- actual geometry thickness/bevels;
- artifact-first render loop.

Change:
1. rebuild silhouette around one asymmetric cast housing, not a flat enclosure;
2. remove crossing decorative bars;
3. integrate 2–3 short ribs and mounting bosses into the housing logic;
4. reduce front-cap area and visual dominance;
5. make a machined flange/interface the bright precision cue, not most of the object;
6. darken/roughen cast material and reduce fill;
7. use a more lateral/upward assembly axis so gaps read in the hero projection;
8. use the current production hero-object as silhouette/composition evidence, not as geometry to copy literally.

## Decision

This is a valid **professional failure**, not an infrastructure failure.

Next authorized action:
- revise the responsible production implementation;
- preserve the professional model/authority/truth boundaries;
- run a fresh targeted rendered practical on the revised candidate before any GLB/web-integration work.

Status:
`3D PRODUCTION: REVISE`
