# Spline Landing — Design Contract

## Current visual thesis
The approved visual direction is **THE UNBOXING**.

Spline should feel like the moment a correctly identified automotive part arrives: physical, precise, satisfying and unmistakably related to parts sourcing. The visitor completes the missing identification information needed to route the request to a manager.

This contract supersedes the previous **Parts Sourcing Workstation** thesis. Do not return to CRM, dashboard, internal-tool, SaaS onboarding, technical workstation or sparse wireframe aesthetics.

## Commercial priority
The visual system must preserve this path:

`arrival → understand offer → trust the process → identify vehicle/part → Request a Part → CRM/manager`

`Find My Part / Request a Part` remains the dominant action. Visual theatre must not delay or weaken the request path.

## Functional integrity
Do not change the existing request contract for visual reasons.

Vehicle identification:
- VIN; OR
- make + model + year.

Part identification requires at least one useful signal:
- part name;
- OEM / Part Number;
- description;
- photo.

Plus required contact data.

Preserve existing validation, analytics, loading/error/success semantics, `create-landing-request`, CRM mapping and confirmed-success behavior.

## Core visual language
### Surfaces
- warm paper / off-white dominant field;
- near-black ink;
- one saturated safety/packing orange routing accent;
- muted corrugated/grey-beige secondary material tone;
- semantic success/error colors remain separate from brand orange.

No gradients, glow, glass, metallic effects, neon or multi-accent palettes.

### Signature motif
Use one continuous **routing / packing** grammar:
- orange tape/route;
- hard rules;
- cut/angled edges;
- label blocks;
- large serial numerals;
- restrained identification marks;
- off-grid crops.

The orange route expresses `unknown part → useful signals → request → dispatch`. It is a continuity device, not decoration on every component.

### Typography
Typography is primary art-direction material.

Roles:
- monumental editorial display for hero and major chapter headings;
- highly legible sans for body and controls;
- mono only for genuine identifiers or restrained label language such as VIN/OEM/step metadata.

Requirements:
- strong scale contrast;
- authored headline wrapping;
- readable 16–18px-class body/support copy on desktop;
- important mobile copy should appear approximately 15–16px minimum;
- persistent form labels;
- no tiny low-contrast helper text used to simulate sophistication;
- no terminal-like mono treatment across the page.

## Hero
The hero is a package-front/editorial composition, not a card layout.

It must communicate within seconds:
- Spline can help source the needed part;
- VIN, vehicle data, OEM, photo or description can start the request;
- the primary action is Request a Part.

Keep:
- oversized left-dominant commercial headline;
- one monumental abstract packaging/label object;
- one primary CTA in the first viewport;
- clear relationship between CTA and orange route;
- asymmetric edge tension and deliberate crop.

Do not add supercars, fake warehouse imagery, floating UI specimens or a mini form in the hero.

## Process
Process is one routing composition, not three equal cards.

Desktop:
- large `01 / 02 / 03` anchors;
- concise Vehicle / Part / Contact copy grouped tightly with each numeral;
- one route visibly connecting the three beats;
- deliberate asymmetry with controlled density.

Mobile:
- three typographic beats;
- route changes edge/position intentionally;
- no boxed feature stack.

## Evidence / quiet interval
Use a short calm release between process and request.

It may reinforce useful input vocabulary such as VIN / OEM / PHOTO / DESCRIPTION, but must not create fake proof, badges, testimonials, partner logos or inventory claims.

Whitespace must feel authored rather than empty.

## Request transition
The transition should feel like opening the outer package to reveal the work surface.

Use a hard cut, diagonal/stepped edge and/or continuation of the orange route so the dark request intro and the form belong to one event rather than separate modules.

## Request form
The form is the commercial core and should feel like a calm manifest / packing-table work surface.

Rules:
- one broad surface;
- no nested cards;
- no giant dark application shell;
- three clear groups: vehicle, part, contact;
- hierarchy through typography, whitespace and thin aligned rules;
- conventional native controls;
- practical 48–54px-class single-line controls;
- readable labels/helper text;
- VIN/OEM mono only where useful;
- generous but simple photo upload control;
- explicit optional/required meaning where needed;
- visible focus, error, disabled, loading and success states.

The request form must look art-directed at the same level as the hero without becoming decorative or harder to complete.

## Submit / dispatch
The submit action is the endpoint of the routing concept.

- one dominant submit CTA;
- orange route should terminate at or align decisively with it;
- mobile submit uses full available width and practical touch height;
- no competing secondary CTA beside it;
- loading/disabled states must remain unmistakable.

## Graphic evidence integrity
Abstract packaging and routing marks are allowed only as expressive art direction.

Do not fabricate:
- tracking/order IDs;
- shipment status;
- inventory quantities;
- supplier evidence;
- reviews/ratings;
- customers/orders;
- guarantees;
- locations;
- delivery times;
- stock/prices.

Barcode-like decoration must be clearly non-scannable/non-factual.

When real Spline parts/packaging assets become available, real close crops may replace abstract material forms.

## Responsive composition
Mobile is a recomposition, not scaled desktop.

At ~390px:
- preserve the hero poster feeling;
- keep primary CTA within useful first-screen travel;
- no horizontal overflow;
- expressive bleeds cannot clip text or controls;
- request labels/helpers remain readable;
- form stays single-column;
- submit is full width.

At ~1440px:
- preserve hero asymmetry and package scale;
- process should feel composed rather than dispersed;
- evidence should be purposeful release;
- request intro and form should read as one chapter;
- form uses enough spatial presence to feel deliberate without becoming a dashboard.

Also verify at least one intermediate width around 768–1024px.

## Visual load budget
Use emphasis selectively. Borders, hard shadows, mono labels, uppercase text, orange, cut edges and large numbers are limited budget.

Prefer hierarchy through:
- scale;
- negative space;
- placement;
- value contrast;
- density changes;
- one strong motif.

Do not make every group look like a sticker or technical panel.

## Motion
Motion budget is low.

Allowed:
- short route/tape reveal;
- physical CTA press;
- restrained state transitions.

No scroll hijacking, parallax theatre, 3D package rotation or generic fade-up choreography. Respect `prefers-reduced-motion`.

## Accessibility
- readable contrast is mandatory;
- visible focus must survive paper/orange/dark surfaces;
- no essential text rotated;
- orange cannot communicate state alone;
- practical mobile targets around 44–48px minimum;
- text resizing/reflow must not break content or controls;
- no decorative bleed may clip focusable elements.

## Hard anti-patterns
Do not introduce:
- dashboard / CRM / workstation aesthetic;
- SaaS card stacks;
- generic ecommerce catalogue/cart/account UI;
- racing/carbon-fibre/HUD language;
- unrelated supercars;
- repeated rounded cards;
- gradients/glow/glass/neon;
- fake social proof or business imagery;
- excessive mono labels;
- decorative technical diagrams presented as evidence;
- new sections merely to make the page feel richer.

## Current refinement contract
`docs/v6-fundamentals-refinement.md` is the active refinement specification for typography, CTA mass, process Gestalt, evidence compression, request-transition continuity, manifest-style form composition and submit dispatch treatment.

If this file and older V4/V5 documents conflict, this `DESIGN.md`, the V6 art direction and the V6 fundamentals refinement are authoritative for current visual work.

## Release sequence
For material visual changes:

`Visual direction → Frontend implementation → rendered 390 / intermediate / 1440 review → independent UI Guard → QA → merge`

Frontend implementation is not final visual approval.
