# Hero Object 3D Production Capability — Agent Architect Decision

Date: 2026-09-06
Applied repository: `prostoali2207-gif/auto-parts-landing`
Professional source repository: `prostoali2207-gif/professional-ai-agents`
Status: architecture decision recorded; capability not yet implemented or qualified.

## Decision

**BUILD NEW — applied production capability, not a new professional core.**

Target capability name for the applied project:

`3D Product Visualization Production`

Project specialization:

`Abstract Automotive Mechanical Hero Object`

The existing Visual Design / Art Direction Core remains the decision owner for what the object should communicate and how it should look. The missing layer is specialist execution competence for constructing, materializing, lighting, animating, exporting, and validating a real 3D product-style asset.

Do **not** extend the Visual Design / Art Direction Core with Blender/WebGL craft. Its current boundary already states that 3D/WebGL is routed implementation capability and that the core must not pretend to own specialist implementation competence.

Do **not** create a reusable professional core yet. First prove the capability on the current Spline hero-object and at least one materially different production task before considering extraction into `professional-ai-agents`.

## Why this decision exists

Current source-of-truth contracts already diagnose the bottleneck:

- `docs/v7-hero-object-refinement-contract.md` — concept is an abstract automotive mechanical module.
- `docs/v7-hero-object-material-form-polish-contract.md` — verdict is `PASS CONCEPT / REVISE CRAFT`; the remaining problem is that major surfaces still read too much like stacked clipped polygons and depth is carried by silhouette stacking rather than fabricated construction.
- `.agents/skills/frontend-agent/SKILL.md` — Frontend owns implementation fidelity, not visual strategy or specialist 3D craft.
- `.agents/skills/ui-guard/SKILL.md` — final visual proof is artifact-first and independent.

The current production stack has no 3D runtime dependency and the hero-object is implemented as CSS/DOM geometry. This is suitable for a stylized illustration but is a poor fit for the stated goal of making the object feel fabricated, materially convincing, spatially coherent, and product-render quality.

## Target professional work

The capability must be able to take an approved art-direction contract and produce a reviewable 3D asset without changing the visual thesis.

### CORE production competencies

1. **Hard-surface form construction**
   - coherent primary/secondary forms;
   - believable wall thickness;
   - chamfers/bevels;
   - ribs, seams, recesses, lips, mounting ears and fasteners;
   - mechanically plausible part relationships without copying a real SKU.

2. **Surface/shading quality**
   - clean normals and shading;
   - controlled edge response;
   - no accidental faceting or melted hard-surface read.

3. **Material/look development**
   - dark cast/graphite housing;
   - satin cool metal;
   - restrained steel hardware;
   - roughness/metalness/value separation appropriate to the approved V7 material budget.

4. **Lighting and camera**
   - one intentional key-light model;
   - rim/separation light only when justified;
   - contact/ambient occlusion and inter-layer depth;
   - camera perspective and crop that preserve the approved hero composition.

5. **Exploded assembly**
   - one coherent assembly axis;
   - stable part hierarchy;
   - mechanically plausible gaps;
   - no unrelated independent rotations.

6. **Artifact-first iteration**
   - produce preview renders from multiple relevant angles;
   - inspect the rendered result before claiming quality;
   - revise from observed defects, not source-code intention.

### BOUNDARY-CRITICAL competencies

7. **Realtime/web asset preparation**
   - glTF/GLB export;
   - material baking where needed;
   - polygon/object/material budget;
   - texture compression;
   - stable pivots/origins and animation hierarchy;
   - mobile performance/fallback awareness.

8. **Truth / evidence boundary**
   - preserve the object as fictional art direction;
   - no invented dimensions, part numbers, OEM labels, fitment, stock, brand, or technical proof;
   - do not drift into a recognizable specific subsystem unless the Visual Design owner explicitly changes the thesis.

### OUT OF SCOPE

The capability does not own:
- CRO/offer decisions;
- copy;
- information architecture;
- request flow;
- final visual approval;
- frontend product architecture beyond the 3D integration handoff.

## Architecture

```
Visual Design / Art Direction Core
        ↓ approved visual contract
3D Product Visualization Production capability
        ↓ .blend/script + GLB/render + evidence
Frontend Agent / Spline integration
        ↓ exact 390 / 1440 browser render
UI Guard
        ↓
QA
```

The same system can use a static/pre-rendered output when interactivity does not earn its runtime cost.

## Mechanism opportunity search

### A. Continue CSS/DOM pseudo-3D
Decision: **REJECT as the primary path for this quality target.**

Reason:
- the current contract explicitly identifies the remaining gap as fabricated construction/material craft;
- CSS can keep improving illustration quality, but it lacks a real mesh/surface/material/light pipeline;
- further CSS polishing has diminishing decision value for this specific defect.

Keep CSS only as fallback if the 3D asset fails performance or delivery constraints.

### B. Generate a static image only
Decision: **CONTEXTUAL / concept-preview only.**

Useful for:
- visual exploration;
- quick lookdev references;
- fallback art.

Insufficient as the main production mechanism when we need:
- editable geometry;
- coherent exploded assembly;
- repeatable camera/material changes;
- interactive web motion.

### C. Model directly inside Spline only
Decision: **VALID MANUAL TOOL PATH, not the preferred agent production architecture.**

Official Spline documentation supports importing `.glb/.obj/.stl/.fbx`, adding lights/interactions, and exporting to React/Next.js/web runtimes. Spline also publishes CAD-to-Spline optimization guidance.

However, the current agent environment does not have a trusted executable Spline scene-authoring tool. Available third-party Spline MCP projects primarily generate runtime integration code or manipulate already-exported scenes; they do not provide a proven professional modeling workflow.

### D. Blender → GLB → Spline / web
Decision: **RECOMMENDED production path.**

Why:
- Blender provides real hard-surface geometry, normals, materials, lighting, camera and animation;
- glTF is a runtime-neutral 3D delivery format with PBR materials;
- Spline officially imports GLB and supports interaction/export;
- the asset can remain editable/reproducible upstream while the web layer stays small.

### E. Procedural Three.js geometry in frontend
Decision: **REJECT as first choice.**

Reason:
- collapses hard-surface modeling, lookdev, realtime technical art and frontend integration into one implementation layer;
- makes the Frontend Agent invent specialist 3D craft;
- raises coupling and review difficulty without a demonstrated benefit over an authored GLB asset.

## Reuse / capability classification

| Candidate | Decision | Reason |
|---|---|---|
| Visual Design / Art Direction Core | **REUSE** as decision owner | Already owns visual thesis, product treatment, refinement and 3D routing boundary. Candidate status remains `NOT QUALIFIED`; this is applied use, not library qualification. |
| Frontend Agent | **REUSE at integration boundary** | Correct owner for loading/responsive/fallback/accessibility/performance integration, not for specialist hard-surface creation. |
| UI Guard | **REUSE** | Independent artifact-first visual verification is exactly the required eye layer. |
| Qualified existing Professional Core Library | **REJECT for 3D production reuse** | Current qualified catalog has no 3D product visualization / hard-surface modeling core. |
| `jokull/jokull-skills` `blender-product-render` | **REJECT direct REUSE/ADAPT; REFERENCE ONLY** | Strong useful mechanisms (reproducible scripted Blender, render inspection, camera/lighting discipline, GLB export), but no repository qualification evidence sufficient for professional-core/capability inheritance. |
| `jithinolickal/blender` | **REJECT direct REUSE/ADAPT; REFERENCE ONLY** | Useful multi-angle verification and Blender patterns, but broad/general scope and no qualifying evaluation evidence for our professional claims. |
| Blender headless / bpy | **DETERMINISTIC TOOL CANDIDATE** | Suitable execution substrate for reproducible modeling/render/export; requires installation/runtime binding and security review. |
| Blender MCP | **TOOL CANDIDATE, not required** | Can enable live manipulation, but arbitrary Python/tool authority and local Blender dependency add risk. Prefer headless scripted execution for repeatable production unless live exploration proves necessary. |
| Spline import/runtime | **DETERMINISTIC DELIVERY / INTERACTION TOOL** | Officially supports imported 3D assets, compression/performance settings, interactions and React/Next.js export. |
| New `3D Product Visualization Production` package | **BUILD NEW APPLIED CAPABILITY** | Missing execution competence is distinct from art direction and frontend. |
| New reusable 3D professional core | **REJECT FOR NOW / DEFER** | Premature before applied evidence demonstrates a stable profession boundary and cross-project reuse value. |

## External evidence used

Primary / official:
- Spline — Exporting as Code: https://docs.spline.design/exporting-your-scene/web/exporting-as-code
- Spline — Code API for Web: https://docs.spline.design/exporting-your-scene/web/code-api-for-web
- Spline — Scene optimization: https://docs.spline.design/exporting-your-scene/how-to-optimize-your-scene
- Spline — CAD to Spline optimization: https://docs.spline.design/importing-content/cad-to-spline-optimization-best-practices
- Khronos — glTF 2.0 specification: https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html
- Khronos — glTF PBR: https://www.khronos.org/gltf/pbr
- Blender manual — glTF 2.0 export: https://docs.blender.org/manual/en/5.1/addons/import_export/scene_gltf2.html
- Blender manual — Bevel modifier: https://docs.blender.org/manual/en/latest/modeling/modifiers/generate/bevel.html
- Blender manual — Weighted Normal modifier: https://docs.blender.org/manual/en/5.2/modeling/modifiers/normals/weighted_normal.html

External candidate references, not trusted/evaluated inventory:
- https://github.com/jokull/jokull-skills/tree/main/skills/blender-product-render
- https://github.com/jithinolickal/blender
- https://github.com/MCPBlender/blender-mcp

## Spline-specific production limits

Use current Spline guidance as initial delivery constraints, not eternal constants:
- simplify geometry before web import;
- remove invisible/internal detail that does not affect the shot;
- minimize object/material count;
- Spline currently recommends roughly **50k–150k polygons max** for CAD-to-Spline assets and **20 materials or fewer** for complex models;
- use compression/performance settings;
- avoid multiple complex 3D embeds;
- inspect actual mobile performance rather than treating the polygon target as proof.

These values are volatile platform guidance and must be rechecked when the capability is implemented.

## First applied evaluation

The capability is not ready because this document exists. It must prove value on the current hero-object.

### Input

Use the current approved contracts:
- `docs/v7-hero-object-refinement-contract.md`;
- `docs/v7-hero-object-material-form-polish-contract.md`;
- current exact production render as baseline.

### Required artifacts

At minimum:
1. reproducible scene source — preferably `build_scene.py` + generated `.blend`, or a versioned `.blend` with explicit provenance if procedural generation is not justified;
2. preview still(s) from defined camera;
3. `.glb` web asset if realtime route is selected;
4. exploded/rest state definition;
5. asset inspection record: triangles/polygons, objects, materials, texture sizes, file size;
6. exact browser render at ~390px and 1440px after integration.

### Professional acceptance

The 3D result must:
- preserve the approved abstract automotive thesis;
- read `automotive/mechanical` without identifying a specific subsystem/SKU;
- materially improve fabricatedness, construction depth, material separation and lighting coherence over the CSS baseline;
- preserve the one-axis exploded logic;
- avoid fake labels/dimensions/proof;
- remain visually strong in the real hero crop, not only in an isolated turntable;
- provide a usable mobile fallback/reduced-motion behavior;
- not materially harm the first-screen CTA or request flow.

### Comparative evidence

Run a blind or source-hidden pairwise review when practical:

`current CSS hero-object vs new 3D hero-object`

Judge the actual browser renders, not isolated source assets, on:
- perceived quality;
- mechanical legibility;
- material credibility;
- construction depth;
- visual distinctiveness;
- fit to V7 thesis;
- mobile composition.

The new capability should not be considered valuable if it merely looks more photorealistic. It must improve the intended commercial visual artifact without creating a concrete-SKU/subsystem read or a performance/CTA regression.

### Independent gates

1. Visual Design / Art Direction REFINE review — diagnoses contract fidelity.
2. UI Guard — independent rendered visual verdict.
3. Frontend/QA — integration, fallback, performance and request-path regression.

## Promotion rule

Only after repeated applied evidence should Agent Architect reassess whether this becomes reusable infrastructure.

Possible future decision:

`APPLIED CAPABILITY -> repeated cross-project evidence -> Agent Architect reuse review -> CAPABILITY LIBRARY or BUILD NEW professional core`

Do not promote it merely because one hero-object looks good.
