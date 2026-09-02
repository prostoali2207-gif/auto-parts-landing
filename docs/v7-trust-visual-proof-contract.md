# V7 Real Visual Proof Contract

Status: ACTIVE narrow refinement
Base main: `a4fe4233920bbcfaa62d8be6c2c31fb26e9d9844`
Parent contract: `docs/v7-trust-proof-refinement-contract.md`

## Professional routing

- Conversion / messaging boundary: frozen `conversion-messaging-web-copy` `0.1.0-candidate` at `7019f6717b1b61806f4a221a297d049a4ad3b8cb`.
- Visual direction: current `visual-design-art-direction-core` `0.3.0-candidate` in REFINE mode.
- Media edit/finishing boundary: qualified `video-editing-post-production` `0.1.0` for bounded editorial selection/finishing; source capture quality itself is not re-qualified here.
- Frontend -> independent UI Guard -> independent QA remains the release sequence.

## Verified asset provenance

Project owner supplied the source photos and videos on 2026-09-01 and confirmed:

- they depict real supplier locations used to search/source parts;
- publication on the Spline landing is permitted.

These assets may therefore be used as real operational visual proof within that exact scope.

They do **not** prove or imply:

- that the locations are owned by Spline;
- that everything shown is current Spline inventory or available stock;
- that every shown part is new, original, compatible or reserved for a customer;
- any official affiliation with visible vehicle brands;
- delivery time, price, order volume, supplier count, fitment certainty or other unsupported commercial claims.

## Selected media

Primary still source: `111389.jpg`.

Function: stable establishing proof of a real supplier environment with body parts and mechanical assemblies.

Primary video source: `IMG_6559.MOV`.

Selected interval: approximately the first eight seconds after the initial camera settle.

Function: moving establishing proof of the real sourcing environment and its physical scale. It is not product-specific condition proof.

`111266.jpg` and `IMG_6570.MOV` remain reserves and are intentionally not placed in the landing in this pass.

## Allowed finishing

Only bounded documentary finishing is allowed:

- crop/reframe;
- resolution/codec optimization;
- restrained exposure/contrast/saturation correction.

No generative object removal/addition, fake cleanup, synthetic stock expansion or content alteration is allowed for proof-bearing media.

## Placement and hierarchy

Keep the existing V7 hero, process, acid evidence chapter, trust copy, facts and request transition.

Inside `.trustProof`, place exactly one visual-proof figure after `.trustProofHead` and before `.trustFacts`.

Desktop / intermediate:

- moving proof on the left as the narrower field;
- establishing still on the right as the dominant wide field;
- restrained caption below;
- no carousel, thumbnails, lightbox, gallery controls, badges or fake metadata.

Mobile:

- one readable column;
- video first;
- still second;
- bounded crops authored for the narrow state;
- no horizontal overflow;
- media must not displace or weaken the request CTA through additional interaction chrome.

Caption:

`Снято у поставщиков в ОАЭ, где ищем детали.`

This wording is intentionally scoped to the verified provenance above and must not be strengthened to `наш склад`, `в наличии`, `официальный поставщик` or similar implications.

## Motion / delivery

- video is muted, looped and inline;
- source audio is omitted;
- no custom cinematic transitions or speed ramps;
- playback begins only when reduced motion is not requested;
- `prefers-reduced-motion: reduce` keeps the video paused and uses the verified mobile crop of the selected supplier still as the poster fallback;
- non-critical media is served from bounded cached asset endpoints and must not change hero loading behavior.

## Must preserve

- V7 exploded hero object and existing hero/process motion;
- all current exact trust facts and claim boundaries;
- request form fields and validation;
- photo-upload flow;
- CRM payload/endpoint;
- analytics semantics;
- confirmed-success behavior;
- no new commercial claim, review, metric, guarantee, delivery time, stock or fitment statement.

## Acceptance

Before merge:

1. production build PASS;
2. existing E2E plus visual-proof assertions PASS;
3. exact-head rendered captures at 360 / 390 / 768 / 1440;
4. proof media visibly resolves with no broken asset state;
5. no horizontal overflow or trust/request hierarchy regression;
6. reduced-motion media behavior PASS;
7. independent UI Guard PASS;
8. scoped QA PASS.
