# PR54 browser integration release review — 2026-09-07

## Verdict

**UI Guard PASS on529611550dd2438e744bfb17e885fe99bda248b1 → final independent QA BLOCKED → DO NOT MERGE.**

The independent UI Guard personally reviewed exact-head CI images and same-build hero3d=0/1 viewport pairs at390x844,390x640,768x960,1440x1000, plus delayed loading and crossfade samples. Visual8.5/10, commercial9.0/10; noP0/P1. Crop is intentional under the V7 contract. No demonstrated asset defect. Mild edge softness/crossfade areP2.

## Recovered evidence

- Head5296115 adds768 evidence after8406275 mobile framing repair.
- CI34033415004: visual-production success, build success, release tests26passed/3failed/14skipped. Failures are process numeral reveal at390 and mobile/desktop staged reveal. Earlier runs34033412350 and34033145336 also failed.
- Exact-head visual artifact9989390438 SHA2561a1365a40abff7964006c3705865c1fe3ebd7bd3c7c4aeb7d9f410e3289434e3; source-commit matches head.
- Playwright artifact9989424224 SHA256d2d1affe99698e118803bfa82d3a9048945ee7baadf3c78b8d9f845581d1d4ce. Both downloaded hashes verified.
- Full recovery, independent scorecard, screenshots and traces are retained locally inC:/Users/bandu/Documents/Codex/pr54-evidence.

## Confirmed integration defect and repair

On the reviewed head, loading3D then switching prefers-reduced-motion to reduce hid the viewer with display:none while CSS stayed opacity:0. Browser reproduction and screenshot confirmed the missing object.

Repair is limited to the integration component and stylesheet: listen for preference changes, stop/unmount the viewer, remove readiness, cancel pending boot, and immediately reveal CSS during the media-query change. Returning to no-preference keeps the safe fallback for that visit. Asset, camera/framing, copy, form and CRM behavior remain unchanged.

## Executed developer verification after repair

- Production build PASS.
- TypeScript noEmit PASS.
-17Playwright tests PASS:3new integration regressions (runtime reduced-motion, initial reduced-motion/noGLB, GLB404/fallback/CTA) plus all14existing request-flow tests. These exercise mocked request boundaries, including VIN and make/model/year success, multiple parts, validation and recoverable error/retry. No real CRM records created.
- Runtime retest: viewer count0, CSS opacity1; screenshot visually checked.
- GLB remains68,392bytes, SHA25683109e5c734d2fab54a6560b1a56596d6dda069b54b2a2ffaf6ae08ae86abf10.
- npm run lint cannot run: repository has no lint script.

## Remaining release gate

Independent QA and CI-diagnosis agents terminated because of account usage limits. Their unfinished work must not be presented as a PASS. A preliminary process A/B diagnosis observed4/4successful local reveals and zero page errors, which does not explain or clear the three CI failures.

Before merge: independently retest the repaired integration, finish WebGL absent/context failure and GLB corrupt/network cases, responsive/loading/animation/cache coverage, resolve the original CI failures using trace evidence, and verify current-head CI. The old-head UI Guard PASS and developer tests do not constitute final current-head independent release approval.
