# Spline — Visual Reset V4 Audit

## Why this exists
The current Spline UI is commercially strong but still reads too much like a technical workstation/form system. The issue is not that the CRM was copied directly. `DESIGN.md` explicitly rejects dashboard UI. The deeper problem is that the original `Parts Sourcing Workstation` metaphor over-weighted interface language: panels, technical labels, rules, form surfaces, and system-like composition.

This audit resets the visual source without changing the approved UX or CRM flow.

## Hard constraints
Preserve:
- header → hero → compact process → request form;
- early dominant Request a Part CTA;
- current form fields, validation, analytics, success/error logic, `create-landing-request`, CRM handoff;
- Spline wordmark and orange/paper/ink brand family unless Visual Director finds a documented brand-level reason to refine usage;
- mobile-first behavior and current commercial clarity.

Do not use CRM/dashboard aesthetics as a visual reference.
Do not add catalogue, ecommerce, accounts, admin UI, fake proof, unsupported claims, or generic luxury/AI styling.

## Current diagnosis
Strengths:
- clarity and conversion path are strong;
- automotive sourcing cues are specific;
- CTA dominance is excellent;
- mobile usability is strong.

Weaknesses:
- too much visual language comes from forms/system UI rather than art direction;
- desktop hero still feels arranged rather than composed;
- the process still carries table/rail semantics;
- the request section feels like a large application form instead of a premium service moment;
- page rhythm stays inside one technical/editorial register for too long;
- beauty and perceived quality trail strong contemporary commercial landing references.

## Research read
Baymard treats automotive-parts UX as a distinct product category, but this does not imply dashboard styling. Automotive sourcing can remain domain-specific through VIN/OEM/photo/vehicle identification while presentation is more editorial and brand-led.

Observed transferable mechanisms from relevant sourcing/commercial sites:
- strong single-message hero;
- automotive specificity via VIN/OEM/request mechanics rather than UI chrome;
- clearer changes of scale and rhythm between page acts;
- real business/part evidence where available;
- strong typography and whitespace doing more work than panels/cards;
- request action remaining unmistakably primary.

## Visual reset rule
Do not refine `Parts Sourcing Workstation` by default. Treat it as one hypothesis that may be rejected.

Visual Director must generate 3 genuinely different directions from the same UX:

### Direction A — Editorial Parts Sourcing
Brand-led, typography-first, high negative-space control, one precise domain object in hero, minimal system chrome.

### Direction B — Material / Product Evidence
More tactile automotive identity from real parts, packaging, labels, crops, surfaces, and sourcing evidence; UI becomes quieter around those assets.

### Direction C — Precision Service
Premium service-business composition: disciplined typography, compact technical cues only where meaningful, stronger human/commercial rhythm, request area treated as a high-value service entry point rather than a software panel.

The Visual Director may rename or refine these after research, but the alternatives must differ in composition and visual logic, not just styling.

## Selection criteria
Score each direction 1–10 on:
- Character
- Clarity
- Beauty
- Visual lightness
- Composition
- Typography
- Page rhythm
- Perceived quality
- Originality
- Commercial direction
- Trust credibility
- Mobile visual UX

Hard targets for selected direction:
- Clarity >= 9
- Commercial direction >= 9
- Character >= 8.5
- Beauty >= 8.5
- Composition >= 8.5
- Typography >= 8.5
- Page rhythm >= 8.5
- Perceived quality >= 8.5
- Mobile visual UX >= 8.5

Do not inflate scores to force a selection.

## Anti-CRM / anti-dashboard test
Reject a direction if any of these are true:
- the page could plausibly be mistaken for an internal CRM/admin tool;
- the hero depends on panels/cards more than composition;
- section identity comes mainly from borders, labels, status-like UI, rows, tables, or dashboard modules;
- the request experience visually resembles back-office data entry;
- mono/uppercase labels are used as decoration rather than true identifiers;
- the visual interest disappears when UI chrome is removed.

## Automotive identity test
If Spline branding and the words `auto parts` were removed, the page should still feel automotive because of real domain material such as VIN, OEM, part numbers, vehicle identity, parts, packaging, sourcing and verification — not because it looks like software.

## Real assets
Real part/order/packaging imagery is the highest-leverage missing visual ingredient. If unavailable, mark `ASSET NEEDED`; do not fabricate proof.

## Required next output
Visual Director must:
1. inspect current rendered 390px and 1440px PR #14;
2. inspect at least 3 relevant strong external references and extract mechanisms;
3. produce 3 visual directions;
4. score all 3 using the common scorecard;
5. select one with rationale;
6. write a new implementation-ready visual contract;
7. explicitly state what parts of the old `Parts Sourcing Workstation` metaphor are retained or rejected.

No frontend changes during this stage.

Status: VISUAL RESET AUDIT APPROVED — ART DIRECTION REQUIRED
