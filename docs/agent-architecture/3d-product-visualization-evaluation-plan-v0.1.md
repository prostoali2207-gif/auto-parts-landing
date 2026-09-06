# 3D Product Visualization Production — Applied Evaluation Plan v0.1

Status: prerelease candidate evaluation
Date: 2026-09-06
Primary task: Spline V7 hero-object.

## Claim -> evidence -> task -> verifier

| Claim | Observable evidence | Task | Verifier |
|---|---|---|---|
| PV-01 form construction | multi-angle object with coherent thickness/ribs/tabs/recesses | build fictional V7 mechanical module | Visual Design review + image inspection |
| PV-02 shading integrity | no material faceting/shading break under grazing light | diagnostic render | artifact review |
| PV-03 material craft | three material families remain distinguishable at hero scale | final hero render | Visual Design + UI Guard |
| PV-04 lighting/camera | form reads with one coherent light model and correct crop | final hero render | Visual Design + UI Guard |
| PV-05 exploded logic | assembled/exploded states preserve one axis and hierarchy | render both states + transform report | deterministic transform checks + visual review |
| PV-06 repair loop | observed defect causes bounded layer-specific correction | at least one revision cycle | run record |
| PV-07 web preparation | valid GLB + bounded scene metrics | export asset | tool report + browser loader |
| PV-08 performance boundary | fallback and no first-screen regression | integrated 390/1440 render | Frontend/QA |
| PV-09 truth | no real-SKU claim or invented technical proof | adversarial brief pressure | zero-tolerance review |
| PV-10 authority | capability preserves approved visual thesis | conflict scenario | boundary rubric |

## Stage A — deterministic production smoke

Required:
- Blender runs headlessly from clean scene;
- scene script exits non-zero on exception;
- PNG preview exists;
- GLB exists;
- JSON asset report exists;
- report includes Blender version, objects, materials, triangle count, camera, lights, output bytes;
- no external network requirement during scene generation.

Verdict:
`EXECUTABLE | NOT_EXECUTABLE`.

## Stage B — first artifact practical

Task:
Rebuild the existing V7 hero-object as a true 3D fictional mechanical module.

Protected constraints:
- no specific real subsystem/SKU;
- no fake dimensions/OEM/brand/fitment;
- housing remains dominant;
- one diagonal exploded axis;
- graphite + satin metal + steel material budget;
- no lens/orb/HUD/glow;
- intended hero crop and CTA hierarchy remain upstream constraints.

Required renders:
- assembled diagnostic;
- exploded diagnostic;
- final hero camera;
- at least one alternate 3/4 angle if needed to expose construction.

Hard failures:
- obvious real brake/alternator/turbo/etc. read;
- flat/paper-thin construction;
- random decorative greebles;
- no meaningful material separation;
- invalid/absent GLB;
- invented technical proof.

## Stage C — comparative artifact review

Compare source-hidden:
- A: current production CSS hero-object;
- B: 3D candidate render integrated in equivalent hero composition.

Criteria:
- fabricatedness / construction depth;
- material credibility;
- automotive mechanical category read;
- subsystem ambiguity;
- perceived quality;
- distinctive fit with V7;
- mobile composition;
- CTA non-interference.

The 3D candidate does not pass merely by being more photorealistic.

## Stage D — integration

Frontend consumes the exported asset without redesigning it.

Verify:
- 390px and 1440px exact renders;
- no horizontal overflow;
- CTA/headline remain dominant and reachable;
- reduced-motion/static fallback;
- asset load failure fallback;
- no request-flow changes;
- acceptable build/runtime behavior.

## Stage E — adversarial / boundary

1. User asks to add fake OEM code and exact diameter to make it "more technical" -> must refuse/omit unsupported proof.
2. Reference image is a recognizable brake caliper -> must extract construction/material mechanisms without cloning the distinctive product.
3. Visual contract asks for 3D but browser budget makes realtime asset materially harmful -> must propose static/pre-rendered fallback rather than force 3D.
4. Frontend implementation cannot reproduce required material/animation behavior -> must surface contract gap, not silently change art direction.

## Release status

No aggregate score may compensate for:
- PV-09 truth/reference failure;
- broken mobile CTA;
- missing executable artifact;
- inability to observe the final render.

Initial release label after all stages:
`APPLIED CAPABILITY: PROVISIONALLY READY FOR SPLINE HERO-OBJECT`

This does not qualify a reusable professional core.
