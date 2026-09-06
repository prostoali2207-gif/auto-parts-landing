# 3D Product Visualization v0.1.6 — Export Stage E1 Result

Date: 2026-09-06
Source rendered-practical candidate: `76ddd17e8b72a58274278394bcd1aa68e800d01d`
Export execution boundary: official Blender `5.2.1 LTS`
Final run: `34024772287`
Artifact: `hero-3d-export-e1`
Verdict: **EXPORT PASS — BROWSER INTEGRATION JUSTIFIED**

## Technical chain

Initial E1 run `34024697834`:
- official Blender archive downloaded;
- official SHA256 verification passed;
- Blender version resolved to `5.2.1 LTS`;
- runner aborted because `libEGL.so.1` was absent.

Classification: local runtime defect.

One bounded E1 repair:
- install `libegl1` and `libgl1`.

Final eligible retry `34024772287`:
- official Blender download/checksum: PASS;
- scene build: PASS;
- GLB export: PASS;
- deterministic GLB verification: PASS;
- artifact verification: PASS.

No second technical defect occurred.

## Export evidence

Scene report:
- Blender: `5.2.1 LTS`;
- mesh objects: `32`;
- triangles: `11,498`;
- material count: `3`;
- assembly axis: `[0.819672, -0.279888, 0.4998]`;
- assembled frame: `1`;
- exploded frame: `40`.

GLB:
- file: `hero-object.glb`;
- bytes: `68,392`;
- SHA256: `83109e5c734d2fab54a6560b1a56596d6dda069b54b2a2ffaf6ae08ae86abf10`;
- glTF version: `2.0`;
- generator: `Khronos glTF Blender I/O v5.2.40`;
- nodes: `39`;
- meshes: `32`;
- materials: `3`;
- animations: `6`;
- animation channels: `6`;
- animation samplers: `6`;
- required hero hierarchy nodes: present;
- required material families: present;
- byte budget: PASS.

Export artifact bundle digest:
`sha256:8087ab40e9f1fddeca3ab445b14afefae206bd5f4297aee83576f4949867fcd2`.

## What E1 establishes

- the R5-proven Blender scene is transportable as a compact GLB;
- hierarchy survives export;
- three PBR material families survive export;
- transform animation survives export;
- the web asset is small enough to justify an integration experiment.

## What E1 does not establish

Not yet proven:
- browser rendering fidelity;
- browser animation fidelity;
- mobile performance;
- Core Web Vitals impact;
- responsive crop;
- reduced-motion/failure fallback;
- superiority over the current CSS hero inside the actual landing page;
- UI Guard PASS;
- QA/release PASS.

## Integration contract

Next stage must be reversible and preserve the current CSS object as fallback.

Because `DESIGN.md` prohibits a **WebGL dependency**, realtime 3D may only be used as progressive enhancement:
- request path and content must not depend on WebGL;
- CSS/static fallback must remain complete;
- failed/unsupported WebGL must preserve the existing hero;
- reduced-motion must remain complete;
- performance regression can force static-only delivery.

Required sequence:

`GLB integration behind fallback -> exact 390 / 768 / 1440 browser artifacts -> independent UI Guard -> targeted QA -> production decision`.

Status:
`3D PRODUCTION: EXPORT READY FOR REVERSIBLE BROWSER INTEGRATION`
