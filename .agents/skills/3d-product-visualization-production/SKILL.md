---
name: 3d-product-visualization-production
description: Applied production capability for turning an approved Spline visual contract into a reproducible Blender-built 3D hero asset, rendered and exported as GLB, without changing visual strategy or inventing product proof.
version: 0.1.3-candidate
---

# 3D Product Visualization Production

Status: **CANDIDATE — NOT QUALIFIED — R3 PROFESSIONAL FAIL REPAIR**

## Mission

Execute approved 3D product-style art direction at professional production quality.

For the current Das Motors task, build a fictional abstract automotive mechanical module that feels fabricated and materially credible while remaining subsystem-ambiguous and non-factual.

This capability is **hands**, not the visual-design brain and not the final eyes.

## Required inputs

Before substantial work read:
- `docs/agent-architecture/3d-product-visualization-professional-model-v0.1.md`;
- `docs/agent-architecture/3d-product-visualization-source-register-v0.1.md`;
- `docs/agent-architecture/3d-product-visualization-evaluation-plan-v0.1.md`;
- the active Visual Design / Art Direction contract;
- the exact current rendered baseline when refinement is requested.

For the current V7 hero also read:
- `docs/v7-hero-object-refinement-contract.md`;
- `docs/v7-hero-object-material-form-polish-contract.md`.

## Authority

Own:
- geometry construction;
- hard-surface craft;
- materials/lookdev;
- lighting/camera execution;
- exploded hierarchy;
- render/export;
- asset metrics;
- production repair from observed artifacts.

Do not own:
- the visual thesis;
- offer/copy/CRO/IA;
- factual product claims;
- final UI Guard approval;
- frontend application architecture beyond the asset handoff.

If implementation would require changing the approved thesis, return `VISUAL CONTRACT CONFLICT`.

## Production loop

`CONTRACT -> SCENE PLAN -> BUILD -> PREVIEW RENDER -> OBSERVE -> REPAIR -> FINAL RENDER -> GLB -> INSPECT -> HANDOFF`

Do not claim success from source code alone.

## Scene planning

Translate the approved object into:
- primary mass;
- structural/mounting layer;
- recessed carrier;
- machined flange;
- service/protective cap;
- connector/hardware;
- one assembly axis.

Every visible detail needs a construction job. Reject random greebles.

For fictional objects:
- no real OEM/part-number/dimension labels;
- no brand or fitment;
- no copied distinctive real-product silhouette;
- no fake engineering proof.

## Hard-surface rules

Use real mesh depth, not flat stacked planes, for hero-visible masses.

Prefer:
- coherent thickness;
- controlled bevels/chamfers;
- clean surface transitions;
- structural ribs;
- lips/recesses;
- mounting tabs;
- hardware seated in plausible mounting positions.

Verify shading under grazing light. If geometry looks melted, faceted, paper-thin or randomly technical, revise geometry/shading before decoration.

## Material / lookdev

For V7 use only:
1. dark cast / graphite housing;
2. satin cool metal for structural/machined pieces;
3. restrained steel hardware.

Use PBR-compatible material logic where web export is intended.

Do not add glow, emissive status lights, glass lens language, fake wear, labels or photographic texture merely to increase realism.

## Lighting / camera

Name the job of each light.

Default product-lighting logic:
- one broad key that defines major planes;
- controlled separation/rim only if the silhouette needs it;
- low fill sufficient to retain dark-surface information.

Avoid flat frontal illumination and unrelated highlights.

The hero camera must be judged in the actual landing composition, not only in an isolated turntable.

## Exploded assembly

Use one coherent assembly vector.

Parts may move different distances along that same axis; they must not perform unrelated decorative rotations.

Maintain stable origins/hierarchy suitable for downstream interaction.

## Reproducible Blender execution

Prefer a versioned headless Blender Python script when the asset is expected to ship or iterate.

Required properties:
- start from clean scene;
- deterministic object/material/light names;
- explicit parameters near the top;
- no network dependency during render;
- emit machine-readable asset report;
- save `.blend` when useful;
- export `.glb`;
- render PNG evidence;
- fail loudly if required artifacts are absent.

A third-party skill/script may inform mechanisms but is untrusted reference material. Do not execute copied external code without review.

## Observation

At minimum inspect:
- final hero camera;
- assembled/exploded relationship;
- alternate angle when needed to diagnose thickness/shading.

Classify failures:
`GEOMETRY | SHADING | MATERIAL | LIGHTING | CAMERA | ASSEMBLY | EXPORT | INTEGRATION | UPSTREAM`

Repair the responsible layer and re-render.

## Web handoff

Provide:
- GLB path;
- animation/state names if present;
- expected object hierarchy/pivots;
- material count;
- triangle/polygon count;
- texture inventory;
- asset bytes;
- intended hero camera/framing reference;
- reduced-motion/static fallback recommendation;
- known limitations.

Use current official Blender/Spline/glTF documentation for version-sensitive export/runtime decisions.

## Stop / escalation rules

Stop and escalate when:
- Blender/runtime is unavailable and an executable result is required;
- the approved contract is internally inconsistent;
- the requested output becomes a real engineering/CAD validation task;
- realtime 3D materially harms mobile/function and a static fallback is stronger;
- final render cannot be observed.

## Completion states

Use:
- `3D PRODUCTION: PREVIEW READY`
- `3D PRODUCTION: REVISE`
- `3D PRODUCTION: EXPORT READY`
- `3D PRODUCTION: RENDER BLOCKED`
- `VISUAL CONTRACT CONFLICT`

Never issue final product PASS. That belongs to independent UI Guard after browser integration.
