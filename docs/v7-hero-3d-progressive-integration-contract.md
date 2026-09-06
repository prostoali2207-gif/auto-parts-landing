# V7 Hero 3D — Progressive Browser Integration Contract

Date: 2026-09-06
Status: **FRONTEND CANDIDATE — REQUIRES UI GUARD**

Source artifact:
- R5 rendered-practical PASS;
- E1 export PASS;
- `public/hero/hero-object.glb`;
- exact GLB: 68,392 bytes;
- SHA256: `83109e5c734d2fab54a6560b1a56596d6dda069b54b2a2ffaf6ae08ae86abf10`;
- 39 nodes / 32 meshes / 3 materials / 6 transform animations.

## Authority

This integration implements the already-approved V7 hero-object direction. It does not own or change the visual thesis, copy, CTA, request flow, CRM, analytics or truth boundary.

## No-WebGL-dependency rule

`DESIGN.md` prohibits a WebGL dependency.

Therefore:
- the existing CSS V7 object remains complete markup and visual fallback;
- hero copy/CTA/request path render before and independently of 3D;
- model-viewer is loaded only client-side after the page load boundary;
- unsupported WebGL or viewer load failure leaves CSS fallback untouched;
- `prefers-reduced-motion: reduce` uses the complete CSS fallback and does not instantiate model-viewer;
- no user interaction requires the GLB.

This is progressive enhancement, not a WebGL-dependent page.

## Viewer choice

Pinned:
- `@google/model-viewer 4.3.1`;
- peer `three 0.183.0`.

Current official model-viewer source documents:
- `availableAnimations`;
- `animationName`;
- `appendAnimation(animationName, options)` for simultaneous animation blending;
- `play({ repetitions, pingpong })`;
- `pause()`.

The six exported root transform actions are played simultaneously once after model load.

## Reversible evidence switch

Same preview build supports:
- `?hero3d=0` — force CSS V7 baseline;
- `?hero3d=1` — force progressive 3D attempt when motion/WebGL permits;
- no parameter — normal progressive-enhancement behavior.

This switch exists for comparison/recovery and must not alter conversion/request behavior.

## UI Guard acceptance

Required rendered evidence:
- exact mobile ~390;
- browser-chrome-constrained 390×640;
- intermediate 768;
- desktop 1440;
- reduced-motion fallback.

Compare `hero3d=0` and `hero3d=1` on the same deployment.

PASS requires:
- new 3D object is materially stronger in fabricatedness, material credibility and assembly depth;
- V7 category-recognizable/subsystem-ambiguous read remains;
- no lens/camera/gadget/AI/HUD regression;
- headline and CTA hierarchy remain stronger than the object;
- no overflow/collision;
- mobile crop still feels intentional;
- no visible asset-load failure/flicker that damages trust;
- CSS fallback remains complete.

## QA after UI Guard PASS

Targeted QA:
- 3D load failure -> fallback;
- reduced motion -> fallback;
- direct `hero3d=0` fallback;
- exact asset request success and cache behavior;
- no request/form/CRM changes;
- no severe mobile responsiveness/performance regression.

Production replacement is not authorized until UI Guard and targeted QA pass.
