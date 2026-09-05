# V7 Request Flow Enhancement Contract

Status: ACTIVE bounded product/UX refinement  
Base main: `9fe3eec17bb6d813fa9076f0ebf244efee48d31b`

## Why this contract exists

The client explicitly requested four connected improvements on 2026-09-05:

1. keep the top `Запросить` action available while the visitor scrolls;
2. make the mobile request flow read as three progressive steps rather than one long form;
3. allow several parts for the same vehicle in one request;
4. provide a secondary direct-manager contact path for visitors who only want to ask a question.

This request reopens the earlier mobile-only `no multi-step wizard` decision. Older documents remain useful historical context, but this contract is authoritative for these exact changes.

## Professional routing

`Conversion Agent -> UX Architect -> Visual Director (bounded refinement) -> Frontend -> independent UI Guard -> independent QA`

No new ecommerce/catalog/cart/account scope is introduced.

## Conversion contract

Primary outcome remains a qualified `Request a Part` submission accepted by `create-landing-request`.

### Approved behavior

- Keep `Запросить запчасть` / `Запросить` as the only dominant CTA.
- Make the existing header sticky so the primary request action remains reachable during long-scroll mobile use.
- Add a secondary manager-contact link only when a verified destination is configured. It must remain visually subordinate to the primary request CTA.
- Do not weaken vehicle, part or contact qualification to reduce friction.
- Multiple parts for one vehicle should remain one request, because the live request contract already accepts a `parts` JSON array.
- Different vehicles remain separate requests because vehicle identity lives at request level.

### Guardrails

- qualified-request data quality must not fall;
- no catalog/cart/checkout behavior;
- no unsupported response-time, fitment, stock or availability promise;
- no unverified WhatsApp/Telegram/phone destination may be published.

## UX contract

### Desktop / intermediate

Keep the current single-page form with all three groups visible:

`01 Автомобиль -> 02 Детали -> 03 Контакт -> Отправить заявку`

Do not force desktop users through artificial screens.

### Mobile <= 700px

Use progressive disclosure:

`01 Автомобиль -> 02 Детали -> 03 Контакт`

Requirements:

- show clear `Шаг X из 3` progress;
- provide explicit `Назад` / `Далее` controls;
- preserve all entered values when moving between steps;
- validate the current step before advancing;
- if final submission detects an earlier-step problem, reveal that step before focusing the invalid control;
- do not require swipe gestures to discover navigation;
- restrained horizontal slide-in motion is allowed as feedback, with reduced-motion fallback;
- sticky header must not cover the active form step, errors or focused controls.

### Vehicle step

Preserve the live alternative:

- VIN; OR
- make + model + year.

### Parts step

Allow one or more part entries for the same vehicle.

Each submitted part must contain at least one useful signal:

- name;
- OEM / Part Number;
- description;
- photo.

Each part gets its own optional photo input. Empty explicitly added part entries must be corrected or removed before submission; they must not silently become malformed CRM items.

Use a plain repeated editorial group with separators, not ecommerce cards.

Actions:

- `+ Добавить ещё деталь`;
- `Удалить` only when more than one part entry exists.

### Contact step

Preserve required customer contact and optional name.

## CRM / payload contract

Preserve:

- endpoint: `create-landing-request`;
- `multipart/form-data`;
- request-level vehicle/contact fields;
- `parts` as JSON array;
- photo files referenced by each part's `photoKeys`;
- confirmed-success-only behavior;
- analytics semantics.

For each rendered part entry, frontend must generate a sequential backend photo key such as:

`part-0-photo-0`, `part-1-photo-0`, ...

Do not change backend schema from this frontend pass.

## Direct manager contact

Verified against the Das Motors BayerCRM profile and confirmed by the business owner on 2026-09-05:

- WhatsApp: `+971544550149` -> `https://wa.me/971544550149`;
- Telegram: `@dasmotors_dxb` -> `https://t.me/dasmotors_dxb`.

Both links may be rendered as quiet secondary actions under the dominant request CTA. They must not compete visually with `Запросить запчасть`.

## Visual refinement contract

Preserve V7 EXPLODED OBJECT, palette, typography, hero, process, evidence/trust chapters and request-surface language.

Allowed additions:

- sticky solid-navy header with restrained divider;
- compact mobile progress rail using existing V7 typography/cobalt/acid hierarchy;
- plain part-entry separators;
- quiet secondary manager-contact text link;
- restrained forward/back step transition.

Do not add:

- floating chat bubble;
- glassmorphism;
- cards around every step;
- new accent colors;
- modal wizard shell;
- bottom sticky submit bar that covers fields;
- decorative swipe affordances.

## Accessibility / mobile

- sticky header target remains >= 44px;
- all step controls are native buttons;
- moving between steps preserves logical focus;
- hidden mobile steps are not interactive while hidden;
- labels remain persistent;
- errors remain text-based and associated with the affected field;
- reduced motion removes step animation;
- no horizontal overflow at 360 / 390.

## Acceptance

Before merge:

1. build PASS;
2. request-flow E2E PASS;
3. multiple-parts payload test proves at least two part items are sent in one request;
4. mobile step navigation / back-edit / validation recovery PASS;
5. sticky header remains visible after scroll and does not cover focused form controls;
6. exact-head rendered captures at 360 / 390 / 768 / 1440;
7. mobile request-step captures for 01 / 02 / 03;
8. independent UI Guard PASS;
9. independent QA PASS for mocked request paths;
10. manager-contact destinations are verified; live CRM HTTP submission remains to be verified safely against the active BayerCRM project.
