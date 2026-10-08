# Spline Landing — Design Contract

## Current visual thesis
The approved direction is **V7 — EXPLODED OBJECT**.

Spline should feel like an unknown automotive part being opened, separated and made understandable: one sculptural mechanical object in the hero, strong editorial typography, then a calm request surface.

This contract supersedes **THE UNBOXING / V6** and all older CRM/workstation directions.

Do **not** preserve the old beige / black / orange packing system merely because it exists in the current implementation.

Authoritative visual blueprint: `docs/visual-reset-v7-art-direction.md`.

## Commercial priority
Preserve the path:

`arrival → understand offer → trust the process → identify vehicle/part → Request a Part → CRM/manager`

`Request a Part` remains the dominant action. Visual theatre must not delay or weaken the request path.

## Functional integrity
Visual work must not change the request contract.

Vehicle identity:
- VIN; OR
- make + model + year.

Part identity requires at least one useful signal:
- part name;
- OEM / Part Number;
- description;
- photo.

Plus required contact data.

Preserve validation, analytics, upload behavior, loading/error/success semantics, `create-landing-request`, CRM mapping and confirmed-success behavior.

## V7 visual system
### Palette
The V6 beige/orange family is removed.

- deep electric navy `#08111F` — dominant dark field;
- cold white `#F4F6F8` — primary light surface;
- graphite `#101419` — text / structure;
- signal acid `#C8FF2E` — primary action / focal punctuation;
- electric cobalt `#4F6BFF` — secondary expressive depth;
- cool-metal greys — decorative exploded-object surfaces;
- semantic error/success colors remain independent.

Accent is scarce. Acid must not become decoration on every component.

### Typography
- display: `Unbounded` 600/700 for hero / chapter statements;
- body and controls: `Manrope` 400–700;
- mono: IBM Plex Mono only for genuine identifiers and restrained metadata.

Typography is compositional. Mobile gets deliberate line breaks and reflow, not a scaled desktop headline.

### Signature object
Hero owns one abstract **exploded mechanical assembly** built from vector/CSS layers.

It may suggest an automotive lamp / mechanical component through bezel, lens/ring, bracket, connector and fastener-like forms, but it is expressive art direction only.

No fake measurements, model names, stock status, fitment claims or technical evidence.

Pointer hover may separate the pieces slightly further. No essential meaning may depend on hover. Reduced motion freezes the useful exploded pose.

## Hero
### Desktop
- deep navy full first chapter;
- quiet wordmark;
- left-dominant monumental headline;
- acid emphasis on the key word / focal phrase without tape or stripe language;
- large exploded object occupies the right side and crops at the viewport edge;
- one acid primary CTA;
- supporting copy remains clearly readable.

### Mobile ~390
- recomposed 3-line display hierarchy;
- exploded object becomes a large diagonal/cropped visual mass rather than a tiny illustration;
- primary CTA remains within useful first-screen travel;
- no tiny utility copy or crowded technical labels.

## Process
One editorial composition, not cards and not the V6 orange route.

- large `01 / 02 / 03` anchors;
- Vehicle / Part / Contact copy stays concise;
- continuity comes from alignment, spacing and a restrained connector;
- deliberate asymmetry on desktop;
- staggered vertical rhythm on mobile;
- no boxed feature stack.

## Evidence chapter
Use one full-width signal-acid field for the truthful statement:

`Не нужно знать точное название детали.`

Supporting explanation remains graphite and readable.

Do not add proof badges, ratings, customers, inventory, supplier marks or pseudo-logistics evidence.

## Request transition
Hard cut to deep navy for the request intro, then resolve into a cold-white work surface.

No package-opening metaphor, route tape or CRM shell.

## Request form
The form is the commercial core and intentionally calmer than the hero.

- one broad light surface;
- no nested cards;
- three clear groups: vehicle, part, contact;
- hierarchy through type, whitespace and aligned rules;
- conventional native controls;
- practical 48–54px-class single-line controls;
- square / very small-radius geometry;
- persistent readable labels/helpers;
- VIN/OEM mono only where useful;
- large practical photo control;
- visible focus, error, disabled, loading and success states;
- no decorative complexity that slows completion.

## CTA system
Primary action uses signal acid on dark/graphite surroundings.

- no V6 black hard-shadow block;
- top, hero and submit actions share one visual grammar;
- physical press/compression may be subtle;
- submit remains the sole dominant form action.

## Motion
Low motion budget:
- coordinated exploded-object hover movement;
- restrained CTA press;
- restrained state transitions.

No scroll-jacking, parallax theatre, WebGL dependency or generic fade-up choreography.

## Graphic evidence integrity
Abstract mechanical graphics are art direction only.

Never fabricate:
- tracking/order IDs;
- inventory quantities;
- shipment status;
- supplier evidence;
- reviews/ratings;
- customers/orders;
- guarantees;
- locations;
- delivery times;
- stock/prices;
- fitment certainty.

## Responsive composition
Mobile is a recomposition.

At ~390px:
- strong first-screen poster feeling;
- useful CTA position;
- no horizontal overflow;
- decorative crops never clip copy/controls;
- form single-column;
- submit full width.

At ~1440px:
- hero object has real physical scale;
- asymmetry remains controlled;
- process is composed, not dispersed;
- acid evidence chapter creates a strong rhythm change;
- request intro and form read as one commercial chapter.

Also verify ~768–1024px.

## Accessibility
- readable contrast;
- visible focus;
- no essential meaning on hover/color alone;
- practical mobile targets around 44–48px minimum;
- text resizing/reflow must not break content or controls;
- decorative object is `aria-hidden`;
- reduced-motion state remains complete.

## Hard anti-patterns
Do not introduce:
- CRM / dashboard / workstation aesthetics;
- V6 beige paper palette;
- orange packing tape / shipping-label / barcode grammar;
- SaaS cards;
- catalogue/cart/account UI;
- racing/carbon-fibre/HUD clichés;
- fake automotive proof imagery;
- excessive mono labels;
- random gradients/glow/glass;
- generic AI decoration;
- new sections solely to create visual density.

## Implementation authority
`docs/visual-reset-v7-art-direction.md` defines the implementation-ready V7 aesthetic blueprint.

Older V4/V5/V6 visual documents are historical context only when they conflict with this contract.

## Release sequence
For V7:

`Visual Taste direction → Frontend implementation → rendered 390 / intermediate / 1440 review → independent UI Guard → QA → merge`

Source code or CI success alone is not visual approval.


## V7 verified supplier photography gallery (2026-10-08)

The real supplier gallery supersedes the previous still/video pairing in `trustProof` only.
Keep hero, process, trust facts, CTA, request form and CRM integration unchanged.

- Five owner-supplied supplier photographs; no AI generation and no simulated stock.
- Editorial horizontal photo rail; first BMW panorama, then Audi, Mercedes lighting, mixed marques, Mercedes components.
- Manual native touch/trackpad scroll with visible next photo, snapping, previous/next buttons, 01/05 counter, accessible full-size dialog. No autoplay.
- One short verified caption: `Снято у поставщиков в ОАЭ, где ищем детали.` No ownership/in-stock claim.
- Gallery link to existing `#request` anchor; no additional form or checkout.
- Mobile 360/390 responsive, keyboard and Escape navigation, visible focus, reduced motion, lazy-loading; preserve qualified request behavior.
- Original real photos are stored as first-party immutable JPEGs under `public/gallery/`, not third-party URLs.


## Approved HTML hero replacement (2026-10-08)

The owner approved the exact HTML concept `dasmotors-hero-html.html` (desktop/mobile) as the new visual reference for the hero. This targeted approval supersedes the older CSS exploded-object representation inside the hero only; the V7 site palette, request workflow, process, gallery and facts remain.

- Visual: first-party `/hero/deconstructed-front.webp` image exported byte-for-byte from the approved HTML concept (1020 × 798, 135792 bytes, sha256 `2306f3f72cc127e7f5d7048452b6ac90ccbc7e26147653ef3624340785121ac1`). This is synthetic concept art, **not** a stock photo or a promise of stock availability.
- Desktop: dark navy studio field, acid request CTA, editorial large white headline, smaller light second phrase, exploded front bumper/grille/lamp assembly on the right. Copy, eyebrow and spacing based on the user's HTML approval.
- Mobile: separately composed stack (headline → proof-of-process description → request CTA → preserved manager contact choices → artwork). The artwork remains large and visually distinct without obscuring controls. No separate photo dependency from CDN.
- Keep the request CTA anchored to the existing `#request`, live WhatsApp/Telegram choices, untouched form data and Supabase CRM/API contract.
- Motion: static mobile artwork. On hover-capable desktop only, a tiny image shift is acceptable; on reduced-motion, no shift. Do not bring back the old scroll-triggered pseudo-3D staging.
- Do not visually or semantically imply the synthetic object is a photographed product or confirmed inventory.
- Render-review: compare mobile 360, 390, compact-height 390×640 and desktop 1440 with the approved HTML prototype. UI Guard and QA must independently gate release.
