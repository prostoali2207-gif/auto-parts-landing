# Das Motors Landing — Design Contract

## Visual thesis
The landing page should feel like a modern automotive parts sourcing workstation: precise, practical, technical, and trustworthy.

It is not a racing site, luxury-car brochure, generic ecommerce template, or dashboard. The visual system should reinforce one job: help a customer identify the right vehicle/part and send a request with confidence.

Primary direction: **Parts Sourcing Workstation**.

Supporting influences:
- real parts-counter / specialist photography for trust;
- restrained technical catalogue language for identity.

## Commercial priority
The visual system must preserve this path:

`arrival → understand offer → trust the process → identify vehicle/part → Request a Part → CRM/manager`

`Find My Part / Request a Part` remains the dominant action.

No visual treatment may hide, delay, or visually demote the request flow.

## Signature visual ideas
Use 1–2 recurring signatures rather than many decorative effects.

### 1. Technical identification language
Small structured labels can reference real service inputs such as:
- VIN;
- OEM / Part No.;
- vehicle;
- part photo;
- request status / step numbers.

They should feel like functional identifiers, not fake engineering decoration.

### 2. Real-part imagery
When real assets are available, use close, tactile photography of:
- actual parts;
- packaging and labels;
- OEM/part-number markings;
- specialist handling/checking a part;
- actual counter / sourcing environment.

Photography should provide evidence and texture, not generic automotive lifestyle imagery.

## Automotive identity rule
If the logo and words `auto parts` were removed, the page should still plausibly feel connected to vehicle-part sourcing and verification.

Do this through real domain material, not clichés.

Avoid by default:
- carbon-fibre textures;
- racing stripes;
- speedometers;
- unrelated supercars;
- red/black purely because the business is automotive;
- fake exploded diagrams;
- meaningless mechanical HUD graphics.

## Visual calibration
- **Visual boldness:** 6/10 — distinctive but commercial.
- **Density:** 5/10 — efficient, not sparse luxury and not marketplace clutter.
- **Motion:** 2/10 — mostly static; interaction feedback only.
- **Industrial character:** 7/10 — technical and mechanical without cosplay.
- **Trust formality:** 7/10 — competent specialist, not corporate bureaucracy.

## Typography
Current Arial-only treatment is too neutral.

Use a strong contemporary sans-serif system with clear distinction between:
- display / hero;
- section headings;
- body;
- technical labels / VIN / OEM values.

Requirements:
- display type should feel engineered and deliberate, not futuristic;
- body must stay highly readable on mobile;
- technical labels may use tighter tracking or a mono/technical secondary face only when it improves identification;
- avoid decorative mixed-font tricks;
- avoid oversized headings that push the primary CTA below useful view.

Do not introduce paid/licensed fonts unless already available and legally usable.

## Color
Keep the foundation neutral and practical.

Preferred structure:
- warm or cool near-white base;
- charcoal / near-black primary text;
- one controlled brand/accent color;
- subdued technical secondary tones.

Avoid:
- AI purple/blue glow;
- multi-accent palettes;
- excessive gradients;
- neon;
- fake metallic effects.

The accent should primarily support CTA, focus, active state, and selected/important identification information.

## Photography
Photography is the main opportunity to add authenticity.

Prefer:
- real business photos over generic stock;
- close crops showing material, labels, surfaces, boxes, connectors, lamps, mechanical parts;
- controlled backgrounds;
- consistent crop treatment across the page.

Avoid:
- unrelated sports cars;
- stock mechanics posing at camera;
- dramatic workshop imagery that does not prove anything about this business;
- AI-generated fake warehouse, team, order, or inventory presented as real.

If real assets are not yet available, keep the layout strong without pretending proof exists.

## Asset needs
Priority assets to request from the business:
1. 3–5 real parts/orders photographed cleanly on the actual counter or neutral surface;
2. at least one photo where a real OEM/part-number label is readable;
3. one real sourcing / handling / packaging scene if practical;
4. current logo in clean vector or high-resolution transparent format;
5. only if true and useful: real location/counter/store photo.

Do not block V1 launch solely because these are missing; design should degrade gracefully.

## Hero composition
Hero must communicate within seconds:
- auto parts in UAE;
- we can identify/find the part for this specific vehicle;
- VIN/photo/OEM are valid ways to start;
- primary action is Request a Part.

Preferred composition:
- strong left-aligned commercial message;
- one dominant request CTA;
- one purposeful technical/visual object on the other side, not a generic card stack;
- technical identifiers or a real part image may support the message.

The existing three-step black panel should not remain merely because it fills the right side. Replace or redesign it only if the new element adds identity, confidence, or comprehension.

## Request tool
The request area is the core product surface, not a generic contact form.

Visually communicate three jobs:
1. identify the vehicle;
2. identify the part;
3. provide a contact.

Rules:
- VIN must feel important but not mandatory when approved fallback vehicle data is available;
- photo upload must look easy and useful on mobile;
- OEM/Part Number should feel like a useful shortcut, not obscure technical trivia;
- required vs optional inputs must be obvious;
- entered information must remain legible and calm;
- submit action must be visually dominant within the form;
- no decorative controls that imply functionality we do not have.

Do not make the request tool look like a multi-step SaaS onboarding wizard unless the UX actually becomes multi-step.

## Sections and rhythm
Avoid a page made from repeated equal cards.

Use different but coherent section compositions based on purpose:
- hero = offer and action;
- process = simple explanation;
- proof/trust = real evidence when available;
- request = functional tool.

Prefer section rhythm created through spacing, typography, imagery, rules/lines, crop changes, and layout shifts rather than alternating random background colors.

## Surfaces
Use borders and panels only when they structure information.

Preferred:
- crisp 1px rules;
- restrained surface contrast;
- low or zero radius for technical areas, or a deliberate small radius system;
- shadows only when elevation communicates something real.

Avoid:
- rounded rectangles around every text group;
- card-on-card nesting;
- glass surfaces;
- generic floating SaaS panels.

## Buttons
Primary CTA must be unmistakable.

Use:
- one strong filled primary style;
- clear secondary/text actions only where needed;
- strong hover, pressed, focus, disabled states;
- minimum practical mobile touch height around 44–48px.

Avoid multiple equal-weight CTA styles competing in the same viewport.

## Icons
Use icons sparingly.

Good uses:
- upload/photo;
- VIN/vehicle identification;
- contact channel;
- simple directional/action meaning.

Do not decorate every heading with an icon.
Use one consistent icon family if icons are introduced.

## Motion
Motion is supporting polish only.

Allowed:
- short hover/press transitions;
- subtle state transitions;
- small reveal only if it does not delay comprehension.

Avoid:
- scroll hijacking;
- parallax stacks;
- cinematic intro sequences;
- looping decorative movement;
- animations before CTA access.

Respect reduced-motion preferences where animation exists.

## Mobile — 390px baseline
Mobile is the primary design constraint.

Require:
- offer and main CTA visible early;
- no horizontal scrolling;
- hero does not depend on side-by-side composition;
- technical details wrap safely;
- VIN/OEM strings do not break layout;
- photo upload is thumb-friendly;
- form fields are single-column unless a grouping is clearly easier;
- no tiny labels;
- sticky elements must not consume excessive viewport height;
- keyboard appearance must not make the flow unusable.

Desktop may become more expressive, but must not introduce a different information hierarchy.

## Trust treatment
Trust should answer: `Why can I believe they can find the correct part?`

Prefer proof of mechanism:
- VIN / vehicle identification;
- part-number/photo inputs;
- explanation of specialist verification;
- real order/part evidence;
- real contact/location/social presence where confirmed.

Do not use unsupported:
- star ratings;
- client counts;
- years in business;
- partner logos;
- `Best Price`;
- `Premium Quality`;
- delivery-speed claims;
- warranty claims.

## Explicit defaults to reject
- generic AI hero with gradient blobs;
- dark mesh background + glowing button;
- three equal rounded feature cards;
- bento layout with no business reason;
- fake dashboard panels;
- black/red racing theme by default;
- excessive pill badges;
- giant ornamental headline with tiny useful copy;
- stock supercar as main proof;
- long decorative animations;
- visual complexity that suggests a catalogue/ecommerce system that does not exist.

## Implementation guardrails
Frontend Agent should preserve current working request logic and CRM integration unless a separate UX/technical change is explicitly approved.

Visual redesign should primarily touch:
- composition;
- typography;
- CSS/design tokens;
- imagery and image treatment;
- section hierarchy;
- request-form presentation;
- responsive polish;
- interaction states.

Do not rebuild the application architecture to implement this design.

## Visual review gate
After implementation, review rendered output at minimum at:
- ~390px mobile;
- ~1440px desktop.

Check:
- 5-second offer clarity;
- primary CTA visibility;
- automotive identity;
- request-tool clarity;
- typography wrapping;
- image quality/crop;
- trust credibility;
- section rhythm;
- generic AI fingerprints;
- consistency with this document.

No PASS with unresolved P0/P1 issues.
