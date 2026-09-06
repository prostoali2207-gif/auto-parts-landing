# 3D Product Visualization v0.1 — Rendered Practical R1 Pre-Run

Date: 2026-09-06
Candidate identity: `0d93d3a8a2ad45ca124df40ec97291c204770d37`
Candidate status: `CANDIDATE — NOT QUALIFIED`
Qualification/evidence stage: **Rendered Practical Observation R1**
Execution-chain identity: `hero-3d-rendered-practical-r1-ubuntu24-apt-blender-4.0.2`

## Why this is a new evidence stage

Stage A was an executability smoke whose frozen objective required PNG + BLEND + GLB + asset report. That chain is terminal `NOT_EXECUTABLE` after two local technical defects and will not be resumed.

Rendered Practical R1 has a different decision target:

> obtain and preserve the actual Blender renders so Visual Design / Art Direction and UI Guard can judge whether the new 3D production capability produces materially better **form, surface, material, lighting and exploded-depth evidence** than the CSS baseline.

This stage does **not** attempt GLB export, does not satisfy Stage A, and cannot establish web-delivery readiness (PV-07/PV-08). Its information value is independent: it tests PV-01 through PV-06 and determines whether further export/integration work is professionally worth pursuing.

## Prior technical history

Stage A chain:
- run `34017511147`: `LOCAL_EXECUTION_FAIL` — missing `libEGL.so.1`;
- one bounded repair: install EGL/GL runtime and enable Auto Smooth;
- run `34017593350`: Blender successfully produced three PNG renders and a `.blend`, then GLB exporter failed on missing internal `numpy`;
- Stage A STOP / NOT_EXECUTABLE.

No professional PASS/FAIL was inferred because the visual artifacts were not preserved for inspection.

## R1 authorization

This is an **allowed later independent evidence stage**, not a renamed technical retry.

R1 technical repair budget before first execution: **0 consumed**.

Allowed scope:
- run the existing deterministic scene builder in render-observation mode;
- skip all GLB/export code paths;
- preserve PNGs, `.blend`, and a render-only scene report;
- upload artifacts even though export readiness remains unresolved;
- inspect actual produced renders.

Prohibited scope:
- install `numpy` to complete Stage A;
- call the candidate export-ready;
- integrate into production;
- weaken Stage A or later web-delivery requirements;
- modify visual criteria merely to make the render pass.

## Professional claims under test

Primary:
- PV-01 hard-surface form construction;
- PV-02 shading/surface integrity;
- PV-03 material/look development;
- PV-04 lighting/camera;
- PV-05 exploded assembly construction;
- PV-06 artifact-first critique/repair.

Not under test:
- PV-07 web asset preparation;
- PV-08 runtime/performance integration.

P0/P1 constraints remain:
- no recognizable specific real subsystem/SKU;
- no fake dimensions/OEM/brand/fitment/technical proof;
- one coherent exploded axis;
- no lens/orb/HUD/glow;
- housing remains dominant;
- the result must be judged from actual images, not source intention.

## Decision after R1

Possible outcomes:
- `PROFESSIONAL_FAIL` — valid renders expose material failures in the production competency;
- `REVISE` — bounded professional defects are observed and a new candidate revision is justified;
- `RENDERED PRACTICAL PASS` — PV-01..PV-06 show sufficient evidence to justify a later, separately authorized export/integration stage;
- `NOT_EXECUTABLE` — no valid render evidence is obtained.

A RENDERED PRACTICAL PASS is not qualification and does not override the terminal Stage A result.
