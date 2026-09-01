# V7 Trust Proof Refinement Contract

Status: ACTIVE narrow refinement
Base main: `9e56fffb638f0a0aac6b458c463f590aa86f71b5`

## Professional inputs

- Spline `AGENTS.md`, Conversion Agent, UX Architect, Frontend Agent and current `DESIGN.md` remain authoritative.
- Exact copy is bounded by the frozen `conversion-messaging-web-copy` `0.1.0-candidate` at `7019f6717b1b61806f4a221a297d049a4ad3b8cb`. It is a frozen candidate pending independent qualification, not a released professional core.
- Visual refinement uses the current `visual-design-art-direction-core` `0.3.0-candidate` in `REFINE` mode. It is a candidate, not independent release approval.

## New authorized business evidence

Source: project owner supplied direct answers from the operating business stakeholder on 2026-09-01.

### VERIFIED / BOUNDED facts eligible for customer-facing copy

1. Parts offered:
   - new original parts;
   - used original parts;
   - new aftermarket/analog parts.
   The stakeholder additionally described the new analog source as Taiwan; the landing does not need that narrower origin claim for this refinement.
2. Search time: usually `1–3 days`.
   - Scope boundary: this is the part-search time, **not delivery time**.
3. Shipping geography for the current offer: from the UAE to Russia and CIS countries.
   - Do not imply worldwide shipping yet.
4. Before purchase/buyout the customer receives available photo/video evidence of the part, including condition, markings and visible features; the customer confirms before the part is bought for them.
5. Optional additional warranty:
   - price: `+10%` of the part price;
   - term: `14 days from receipt`;
   - available across the part categories above;
   - conditions are agreed before buyout.
6. The previously discussed `20%` extended-warranty option is rejected and must not appear.

### Detailed warranty boundary retained from the stakeholder policy

The optional warranty concerns a confirmed problem/defect that was not disclosed in the description/photo/video and existed before purchase. It does not cover issues caused after receipt by incorrect installation, use, repair/disassembly or other excluded causes. Any return/replacement decision remains subject to the agreed warranty conditions and case confirmation.

This contract is a messaging/product truth record, not legal approval of consumer terms. Do not expand detailed legal wording on the landing without a separate accountable review.

## Conversion diagnosis

Observed gap: the current V7 page explains how to submit a usable request but contains little real business proof before the form.

Funnel stage: `Trust -> Effort/Anxiety`.

Evidence confidence: `HIGH` for the business facts above because they are direct project-owner/stakeholder input; no claim is made that adding the section will cause conversion lift.

Hypothesis: because visitors currently see process mechanics but little real operational proof, a concise pre-form trust chapter using verified sourcing, review-before-buyout, search-time scope, shipping geography and optional-warranty facts may reduce uncertainty without weakening request quality. Judge later by qualified CRM requests / manager conversations; guardrail: request quality and factual accuracy must not worsen.

## UX contract

- Preserve the existing single-page flow and form architecture.
- Add one non-interactive trust chapter between the acid evidence chapter and the request transition.
- Do not add a FAQ accordion, modal, checkout logic, pricing calculator or warranty-purchase control.
- Keep the primary action `Запросить запчасть`; trust content must not compete with it.
- Keep the warranty wording concise and bounded; detailed conditions are not the primary request task.

## Exact copy contract

Hero support line:
`Из ОАЭ в Россию и страны СНГ. VIN или марка, модель и год — плюс фото, название, OEM‑номер или описание детали. Добавьте контакт — менеджер продолжит подбор.`

Trust chapter:
- eyebrow: `До выкупа`
- heading: `Сначала покажем деталь. Потом выкупим.`
- lead: `Перед покупкой отправим фото и видео детали: состояние, маркировку и заметные особенности. Вы подтверждаете — после этого выкупаем.`
- `Запчасти` -> `Новые оригинальные, б/у оригинальные и новые аналоги.`
- `Срок поиска` -> `Обычно 1–3 дня.` + `Это срок поиска детали, не доставки.`
- `Отправка` -> `Из ОАЭ в Россию и страны СНГ.`
- `Доп. гарантия` -> `По желанию — 14 дней с момента получения, +10% к стоимости детали.` + `Условия согласуем до выкупа.`

Metadata geography should change from `автозапчасти в ОАЭ` to sourcing/shipping `из ОАЭ в Россию и СНГ`.

## Visual contract

Root-cause class: `UPSTREAM CONTENT GAP`, not a V7 concept failure.

Bounded correction:
- preserve V7 EXPLODED OBJECT hero, process, acid evidence chapter and dark request surface;
- insert a calm cold-white editorial proof chapter before the request transition;
- no cards, badges, fake metrics, fake logistics graphics or stock imagery;
- use thin rules, large typography and numbered editorial rows consistent with V7;
- mobile must recompose to one readable column with no horizontal overflow;
- supplied photos/video are **ASSET PENDING** for a later pass and are not required for this text-first refinement.

FUNCTION / MOBILE / AUTHORITY / TRUTH are veto gates.

## Must preserve

- hero object and motion behavior;
- process 01 -> 02 -> 03 behavior;
- existing form fields, validation, photo upload, CRM payload and endpoint;
- analytics semantics;
- confirmed-success behavior;
- reduced-motion behavior;
- no fabricated review/rating/customer/order/inventory/fitment/delivery-time claims.

## Acceptance

- build + existing E2E PASS;
- new trust-proof assertions PASS;
- exact-head visual captures at 360 / 390 / 768 / 1440;
- no horizontal overflow or trust-copy collision;
- independent UI Guard + QA required before merge under repository policy.
