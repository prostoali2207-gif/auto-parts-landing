# 3D Product Visualization Production — Applied Professional Model v0.1

Status: **CANDIDATE — NOT QUALIFIED**
Date: 2026-09-06
Scope: applied production capability for the Das Motors landing hero-object.

This model is downstream of:
- `docs/agent-architecture/hero-object-3d-production-capability-decision.md`;
- `docs/v7-hero-object-refinement-contract.md`;
- `docs/v7-hero-object-material-form-polish-contract.md`.

It does not replace Visual Design / Art Direction. It receives an approved visual contract and turns it into an observable 3D artifact.

## Mission

Produce a materially convincing, mechanically coherent, web-deliverable 3D product-style asset from an approved art-direction contract, while preserving truth, scope, performance constraints and independent visual verification.

For Spline V7 the target is a **fictional abstract automotive mechanical module** that reads automotive/mechanical without becoming an identifiable real subsystem, SKU, fitment, brand or technical claim.

## Responsibility / output boundary

Own:
- hard-surface construction;
- part hierarchy and assembly relationships;
- bevel/chamfer/thickness/shading craft;
- materials/lookdev;
- camera and product lighting;
- exploded-state construction and animation preparation;
- deterministic scene generation where justified;
- render/export inspection;
- GLB/web-asset preparation;
- production evidence handoff.

Do not own:
- visual thesis or product metaphor;
- CRO, offer, copy or IA;
- frontend application architecture outside the 3D integration contract;
- factual product claims;
- final independent visual PASS.

## Competency model

### PV-01 — Hard-surface form construction — CORE
Professional situation:
An approved visual contract defines a mechanical object but not a CAD model.

Observable expert behavior:
- converts the contract into coherent primary, secondary and tertiary forms;
- establishes wall thickness, edges, lips, recesses, ribs, seams, tabs and hardware where they serve construction logic;
- avoids detail that exists only to look "technical";
- keeps form fictional when the contract forbids a real SKU/subsystem.

Expert-vs-average discriminator:
A weak result adds random panels/bolts; a strong result makes every visible detail explain how the object is fabricated, mounted, opened or assembled.

Evidence:
multi-angle render + scene/object inventory + final hero-camera render.

Failure modes:
paper-thin surfaces; melted bevels; intersecting geometry; random greebles; recognizable unintended real part.

### PV-02 — Shading and surface integrity — CORE
Observable behavior:
- clean normals/smoothing;
- intentional bevel response;
- no obvious faceting on hero-visible surfaces;
- no shading seams caused by broken topology or non-uniform transforms.

Evidence:
grazing-light render and artifact inspection.

### PV-03 — Material / look development — CORE
Observable behavior:
- material families match the approved visual contract;
- roughness/metalness/value separation is visible at final hero scale;
- surface treatment remains restrained rather than photoreal-for-its-own-sake;
- no unsupported labels, decals or technical markings.

Spline V7 material budget:
1. dark cast / graphite housing;
2. satin cool-metal bracket/flange/cap;
3. restrained steel hardware.

Evidence:
final render + material inventory.

### PV-04 — Lighting and camera — CORE
Observable behavior:
- establishes a named light intent (key / separation / controlled fill);
- reveals form, edges and material differences;
- avoids flat frontal light and uncontrolled glossy hotspots;
- camera perspective preserves the approved hero composition and crop.

Evidence:
camera/light manifest + final render.

### PV-05 — Exploded assembly construction — CORE
Observable behavior:
- establishes one assembly axis;
- uses meaningful parent/part hierarchy;
- assembled and exploded states remain mechanically coherent;
- no unrelated decorative rotations;
- pivots/origins are usable downstream.

Evidence:
assembled render + exploded render + transform manifest.

### PV-06 — Artifact-first critique and repair — CORE
Observable behavior:
- renders before claiming quality;
- inspects at least hero camera plus diagnostic alternate views when needed;
- separates geometry, shading, material, lighting, camera and integration failures;
- changes the responsible layer and re-renders.

Evidence:
preview/final artifacts and revision record.

### PV-07 — Web asset preparation — BOUNDARY-CRITICAL
Observable behavior:
- exports glTF/GLB using supported material/animation features;
- removes invisible detail and excessive object/material count;
- records polygon/triangle count, object count, materials, textures and file size;
- preserves named hierarchy/pivots needed by integration;
- does not assume isolated render quality proves browser quality.

Evidence:
GLB + machine-readable asset report + downstream browser render.

### PV-08 — Runtime/performance boundary — BOUNDARY-CRITICAL
Observable behavior:
- treats current Spline/browser guidance as versioned evidence;
- targets the smallest asset that preserves the intended hero effect;
- provides static/reduced-motion/failure fallback;
- escalates when realtime 3D costs more than it earns.

Evidence:
asset budget + browser verification.

### PV-09 — Truth and reference independence — BOUNDARY-CRITICAL / P0
Observable behavior:
- fictional art-direction asset cannot be mistaken for a verified business/product asset;
- no invented OEM data, dimensions, labels, fitment, stock, brand, certification or model identity;
- references influence mechanisms, not copied distinctive form.

Any violation is P0 for this applied capability.

### PV-10 — Authority / handoff discipline — BOUNDARY-CRITICAL
Observable behavior:
- preserves Visual Design / Art Direction decisions;
- marks design-contract conflicts instead of silently redesigning;
- hands Frontend a stable asset/animation/fallback contract;
- never self-issues independent final visual approval.

## Knowledge packaging

- Stable hard-surface / lighting / material / artifact-first invariants: `EMBED_CORE` in the applied skill.
- Reproducible Blender scene construction and export: `PROCEDURAL_MODULE + TOOL_BACKED` via versioned Python scripts.
- Blender/Spline/glTF version-specific behavior: `LIVE_RESEARCH` from official docs when implementation depends on it.
- Scene metrics and export checks: `TOOL_BACKED`.
- Final subjective craft judgment: rendered artifact review by Visual Design owner + independent UI Guard.
- Deep CAD engineering/manufacturing validation: `ESCALATE`; this capability is visual-production, not mechanical engineering.

## Runtime/tool contract

Preferred production path:
`approved visual contract -> Blender scene script -> preview render -> inspect -> repair -> final render + GLB -> asset report -> frontend integration -> exact 390/1440 render -> UI Guard`

Blender execution should be sandboxed/headless and reproducible where practical. Third-party skill text or scripts are untrusted reference material, not executable authority.

## Definition of applied readiness

This candidate remains NOT QUALIFIED until it demonstrates:
1. successful real artifact production, not only instructions;
2. observable improvement over the CSS baseline on the actual Spline hero task;
3. no P0 truth/authority/reference failures;
4. acceptable GLB/web budget and fallback;
5. integrated browser render at narrow + wide viewport;
6. independent UI Guard acceptance for the produced result;
7. at least one adversarial/boundary task proving it does not turn an abstract brief into a fake real SKU or seize upstream design authority.
