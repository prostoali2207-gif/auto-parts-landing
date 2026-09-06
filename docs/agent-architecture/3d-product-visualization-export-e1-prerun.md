# 3D Product Visualization v0.1.6 — Export Stage E1 Pre-Run

Date: 2026-09-06
Source candidate: rendered-practical R5 PASS in `main` at `76ddd17e8b72a58274278394bcd1aa68e800d01d`.
Stage: **Export / Web Asset E1**
Execution boundary: **official Blender 5.2.1 LTS Linux x64 binary distribution**

## Why this is a new eligible stage

Terminal Stage A used Ubuntu's apt Blender 4.0.2 package and failed inside its glTF addon because its Python environment lacked `numpy`.

E1 is not a repair/retry of that chain:
- R5 has since independently proved PV-01..PV-06 professional value;
- E1 asks a new question: can the proven artifact be transported as a web GLB with hierarchy/material/animation integrity?
- E1 uses Blender Foundation's official maintained LTS binary, which ships its own bundled runtime instead of Ubuntu's distro Python/addon boundary.

## External version evidence

As of 2026-09-06:
- Blender's official release index lists 5.2.1 LTS dated 2026-08-25;
- official Linux x64 archive: `blender-5.2.1-linux-x64.tar.xz`;
- archive checksum must be verified against Blender's official `blender-5.2.1.sha256` file before execution.

## Frozen object behavior

E1 must use the existing `scripts/hero-3d/build_scene.py` geometry/material/light/animation behavior.
No visual/craft changes are allowed inside this export stage.

Run with `--preview` only to reduce redundant render cost; do **not** use `--render-only`, so the same scene exports GLB.

## Required export evidence

- `hero-object.glb`;
- `hero-object.blend`;
- preview PNGs only as execution diagnostics;
- `asset-report.json`;
- export verification summary.

GLB verifier must establish:
- valid GLB 2.0 header/length/JSON chunk;
- required hero hierarchy nodes present;
- required three material families present and material count <= 3;
- at least one animation with expected transform channels;
- non-empty scene/mesh graph;
- byte budget <= 8 MB.

## E1 decision states

- `EXPORT PASS — BROWSER INTEGRATION JUSTIFIED`
- `EXPORT FAIL — PROFESSIONAL/TOOL DIAGNOSIS REQUIRED`
- `NOT_EXECUTABLE`

E1 PASS does not establish browser/mobile performance or UI Guard PASS.
