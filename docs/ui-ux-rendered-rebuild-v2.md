# Spline Landing — Rendered UI/UX Rebuild V2

## Why this exists
This contract is based on full-page rendered review at 390px mobile and 1440px desktop, not source-only inspection.

## Status
REVISE — current direction is valid, but the page has unresolved P1 hierarchy and length problems before the request form.

## P1 findings
1. The visitor is asked to read two consecutive explanatory sections before reaching the request form. `process` and `confidence` repeat the same vehicle → part → contact logic.
2. On mobile, the page becomes a long text-first instruction manual before the core action. The request form appears too late relative to the primary intent.
3. Desktop has excessive vertical spread and large empty zones between the hero, process explanation, confidence explanation, and request surface.
4. The `sourcingTicket`, `process`, `confidence`, and form all explain essentially the same three identifiers. Repetition weakens hierarchy instead of building trust.

## New information architecture
Use exactly this V1 order:

1. Sticky header
2. Hero
3. One compact 3-step process strip
4. Request form

Remove `confidence` as a standalone page section.

Do not replace it with another marketing section.

### Hero
Keep:
- Spline wordmark;
- one headline;
- one short explanatory paragraph;
- primary `Request a Part` CTA;
- the technical request-ticket object, because it gives the page domain-specific identity.

The ticket must stay secondary to the CTA.

### Process strip
Purpose: answer only `What do I need to send?`

Content:
- 01 Vehicle — VIN or make + model + year
- 02 Part — photo, name, OEM/Part Number or description
- 03 Contact — one contact method

Rules:
- no large second marketing headline on mobile;
- no paragraph explaining the same process again;
- keep it visually compact enough that the request section follows immediately;
- desktop may use one horizontal rail; mobile may use three concise rows.

### Confidence content
Delete the standalone `confidence` section.

Preserve only genuinely useful guidance at the point of action:
- near vehicle fields: `Нет VIN? Укажите марку, модель и год.`
- near part fields: `Не знаете OEM? Фото, название или описание тоже подходят.`

Do not explain this a third time elsewhere.

### Request section
The request form is the main product surface.

Desktop:
- keep dark surrounding section as a strong transition into action;
- intro column should be materially smaller than the form column;
- avoid large empty dark space below intro content;
- form should remain visually dominant.

Mobile:
- request intro must be short;
- remove nonessential badge/pill clutter if it delays the first field;
- first vehicle field should appear quickly after the section title;
- form labels remain persistent;
- touch targets remain >=44px;
- no multi-step wizard.

## Mobile 390px target
The user should see this sequence with minimal scrolling:
- hero proposition + CTA;
- technical ticket;
- compact 3-step summary;
- start of request section.

The page must no longer spend roughly two full mobile screens repeating how the request works.

## Desktop 1440px target
The page should read as three strong visual acts:
1. Offer / technical identity
2. Compact process explanation
3. Request tool

Avoid a fourth large light section before the request tool.

## Visual rhythm
Keep the existing visual language:
- warm paper background;
- near-black ink;
- orange signal color;
- IBM Plex Sans / Mono roles;
- crisp rules;
- square technical surfaces;
- low/no radius;
- restrained hard shadows on key technical objects only.

Do not solve the length problem by adding decorative imagery, cards, icons, gradients, or animation.

## Acceptance criteria
At 390px:
- no horizontal overflow;
- hero CTA remains obvious;
- `process` + explanatory content before request is at least ~30% shorter than current render;
- no standalone `confidence` section;
- request section starts significantly earlier;
- no duplicated vehicle/part/contact explanation across more than hero ticket + compact process strip + local field helper text.

At 1440px:
- no oversized empty vertical gaps;
- hero, process, request form read as the three primary acts;
- form is the strongest visual surface after hero;
- request intro does not create a large dead dark column.

## Handoff boundary
This document is UI/UX direction only.
Frontend implementation must preserve the existing `create-landing-request` contract, validation rules, analytics behavior, success state, and CRM flow.

After implementation, run the existing `visual-review` screenshots at 390px and 1440px and return the rendered result to UI Guard for PASS / REVISE.