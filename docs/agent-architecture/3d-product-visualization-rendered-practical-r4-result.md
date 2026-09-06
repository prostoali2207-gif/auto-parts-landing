# 3D Product Visualization v0.1.3 — Rendered Practical R4 Result

Date: 2026-09-06
Run: `34019997972`
Candidate: `3d-product-visualization-production 0.1.3-candidate`
Artifact: `hero-3d-rendered-practical-r4`
Verdict: **PROFESSIONAL_FAIL / REVISE**
Infrastructure: **PASS for render-observation**

## Deterministic evidence

- Blender `4.0.2`;
- 26 mesh objects;
- 9,786 triangles;
- 3 material families;
- assembled / exploded / alternate renders preserved;
- one declared assembly axis;
- truth boundary preserved;
- no GLB attempted.

## What R4 proves

### PV-01 — major construction-method improvement, still REVISE
The tapered/lofted housing is materially better than R3:
- sidewalls now draft instead of remaining parallel;
- main shell reads as one volume;
- recessed pocket is a real boolean recess;
- integrated bosses/ribs belong to the cast mass;
- alternate view shows meaningful surface depth.

This successfully escapes the strict "extruded SVG" failure.

### Remaining P1 construction problem
The overall assembled object still reads as **nested armor/shield panels** because:
- the large satin bracket remains a closed plate behind the cast housing;
- rear backplate + bracket + housing still create three similarly shaped envelopes;
- the bright service cap becomes another closed polygonal plate in front;
- therefore the silhouette hierarchy is more mechanical, but the part hierarchy is still too panel-driven.

### PV-02 — shading/surface integrity: PASS
- bevel response is clean;
- lofted shell renders without gross faceting;
- boolean pocket edge is stable;
- cast micro-surface is restrained.

### PV-03 — materials: REVISE
Material separation is clearer than R3, but:
- large satin surfaces consume too much area;
- the precision cue is not concentrated enough;
- cast housing should remain dominant by area while bright material should primarily describe mounting/machined interfaces.

### PV-04 — lighting/camera: PASS for isolated practical
Lighting reveals the new volumetric form and no longer hides the cast shell. Remaining quality limits come from geometry/material allocation rather than inability to observe the form.

### PV-05 — exploded assembly: PASS
One-axis exploded relationship remains coherent and readable.

### PV-06 — artifact-first repair: PASS
R3 construction-method failure was repaired at the responsible layer and re-observed.

## Visual-language / automotive-read diagnosis

Automotive/mechanical category cues now exist:
- cast volume;
- mounting bosses;
- short ribs;
- connector;
- fasteners;
- separate precision interface.

However, the **closed satin bracket** weakens these cues and pushes the object back toward industrial enclosure / armor language.

Current strong automotive cast-housing references consistently use:
- open mounting structures;
- bosses/ears;
- ribs;
- machined interfaces;
- large cast mass with smaller precision surfaces.

Transferable mechanism:
**make the support structure visibly structural, not another skin.**

## Required v0.1.4 repair

1. turn the satin bracket into an **open structural frame** by cutting a large internal opening;
2. keep enough frame around mounting shoulders to preserve the V7 asymmetrical envelope;
3. reduce service-cap dimensions ~18–22%;
4. keep the machined flange exposed around/behind the cap;
5. darken cast slightly toward neutral graphite and keep satin clearly brighter/cooler;
6. keep all current housing loft/pocket/boss/rib geometry;
7. no new decorative detail.

## Decision

R4 is the first revision where the new 3D hands show genuine hard-surface value, but it is not yet visually strong enough to justify export/integration.

Status:
`3D PRODUCTION: REVISE`
