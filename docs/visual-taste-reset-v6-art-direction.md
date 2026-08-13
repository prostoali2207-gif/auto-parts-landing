# Spline — Visual Taste Reset V6

## Status
**VISUAL TASTE: READY FOR FRONTEND**

Scope is visual only. Preserve request IA, fields, validation, analytics, success/error semantics, `create-landing-request`, CRM contract and factual integrity.

## Research basis
Visual Taste Agent process used: fundamentals → current-state audit → cross-category reference research → 15+ concept divergence → anti-convergence → 3 radical shortlists → selection → implementation blueprint.

Current `main` is V5 plus agent/knowledge changes. V5 remains useful only as failure evidence; it is not the visual foundation.

### Visually reviewed reference mechanisms
1. Scout Motors — cinematic full-bleed product framing, oversized concise copy, CTA embedded in image composition.
2. Lightship — huge brand scale, cinematic chapter changes, image/type overlap, restrained UI chrome.
3. Polestar — disciplined product theatre, negative space, precise typography, confidence through reduction.
4. Teenage Engineering — object-as-hero, neutral field, industrial product honesty, tiny functional metadata against large physical form.
5. MSCHF — graphic product isolation, hard grid, irreverent scale, one loud accent used structurally.
6. Aesop — editorial pacing, product still-life, warm paper-like fields, sophisticated asymmetry.
7. RIMOWA — campaign imagery combined with rigorous commerce hierarchy.
8. Jacquemus — off-grid editorial image placement and deliberate empty space.
9. Studio Freight — radical typography, dense/quiet contrast, authored black/white graphic system.
10. A24 — cinematic crop, restrained navigation, editorial sequencing.
11. Braun / Dieter Rams references — industrial clarity, object hierarchy, functional visual discipline.
12. Something Special Studios / ISM — controlled orange/black collision, zine-like composition, windows/frames as graphic devices rather than SaaS cards.
13. Editorial New / Locomotive — typography itself as motion/composition, print-advertising energy translated to web.
14. Pentagram packaging work — physical label/packaging hierarchy, serif/sans tension, material presentation.
15. Nothing — recognizable graphic language, product-detail framing, controlled monochrome with distinctive technical texture.

### Cross-category pattern map
- Strong pages choose one dominant visual event per viewport rather than distributing attention across cards.
- Type can carry identity when imagery is limited, but only with real scale contrast and authored line breaks.
- Industrial credibility comes from material/object framing and precise hierarchy, not dashboard chrome.
- Fashion/editorial references create memorability through crop, asymmetry, whitespace and unexpected scale.
- Packaging references create domain credibility through labels, marks, surfaces and physical hierarchy.
- Daring references are strongest when the interaction remains simple underneath the visual theatre.

## Divergence record
Generated and clustered 18 distinct metaphors across industrial object, editorial/print, fashion campaign, packaging/logistics, architecture/spatial, cinematic, archival catalogue, abstract graphics, surreal composition, product launch, cultural poster, tactile/material, identifier language, radical typography and wildcard directions.

Conventional concepts discarded: technical workstation, clean parts catalogue, generic premium automotive, dark industrial dashboard, hero-with-floating-specimens.

Useful mechanisms extracted from the strangest concepts: giant physical shipping label as composition; impossible macro crop of corrugated packaging; typographic tear/peel transition; orange packing tape as navigation line; museum-object plinth for an unidentified part; fashion-editorial crop with no car; customs/warehouse stamp rhythm; oversized blank inventory field used as negative space.

## Three radical shortlists

### A — THE UNBOXING
**Metaphor:** the entire page feels like opening a precisely packed, correctly identified part shipment.

Hero is not a car and not a form card. It is a monumental package/label composition: warm paper field, oversized black typography, one orange tape/label element crossing the viewport, and a large abstract/photographic part silhouette or material crop when real assets exist. The request flow feels like completing the missing identification label that allows the right part to be sourced.

Scores: magnetism 9.2; originality 9.1; commercial clarity 9.0; feasibility 9.0; mobile 9.2; request compatibility 9.4.

### B — PARTS MUSEUM AFTER HOURS
**Metaphor:** one unidentified mechanical object is treated like a valuable museum artifact under severe editorial lighting.

Very dark field, one monumental object crop, tiny curatorial captions, quiet transitions, form enters as a bright conservation/work table. High perceived value, but risks luxury slowness and dependence on strong imagery.

Scores: magnetism 9.3; originality 8.8; commercial clarity 7.9; feasibility 7.2; mobile 8.4; request compatibility 8.1.

### C — WRONG PART / RIGHT SIGNAL
**Metaphor:** a bold typographic campaign built around ambiguity resolving into identification.

Hero starts with deliberately incomplete giant words/fields; VIN, vehicle, OEM, photo become visual signals that snap the composition into certainty. Graphic and memorable, but can become conceptual before commercial.

Scores: magnetism 9.0; originality 9.4; commercial clarity 8.2; feasibility 9.1; mobile 8.8; request compatibility 8.9.

## Selected direction — THE UNBOXING

### Concept sentence
**Spline should feel like the moment a correctly identified part arrives: physical, precise, satisfying and unmistakably automotive-parts — with the visitor completing the one missing label needed to source it.**

This direction deliberately abandons V5's poster/specimen language, technical workstation inheritance, sparse wireframe minimalism and dashboard-like form framing.

## Signature moment
A single orange “packing tape / routing label” band enters the hero off-grid, crosses behind or through the headline, then becomes the visual route through process and finally terminates at the request submit action. It is not a progress bar and not decoration everywhere. It is one authored continuity device: **unknown part → useful signals → request sent**.

On mobile the band becomes a vertical/diagonal edge element rather than a collapsed desktop stripe.

## Hero — 1440px
- Height: roughly 760–880px, enough for impact without delaying CTA.
- Dominant warm off-white / kraft-paper-adjacent field, not literal brown cardboard texture.
- Spline wordmark small and confident in header; minimal navigation.
- Headline occupies roughly 55–65% viewport width with 3–4 authored lines. Display scale approximately 88–118px depending on chosen open font and actual wrapping.
- Copy stays commercially direct. Do not invent a new proposition merely for the concept.
- Primary `Find My Part` CTA is visible in first viewport and visually attached to the orange routing element.
- Right/bottom composition contains one monumental “parcel evidence” object: abstract corrugated edge, label sheet, packaging silhouette, or real part/box crop if real Spline asset exists. No fake inventory photography.
- Small VIN / OEM / PHOTO words may appear only as real input vocabulary, treated like shipping-label fields rather than UI chips.
- Avoid centered symmetry. Use edge tension and partial crop.

### Focal order
1. Commercial headline.
2. Orange route + primary CTA.
3. Physical/graphic packaging object.
4. Short support copy.
5. Identifier vocabulary.

## Hero — 390px
- Treat mobile as a poster/package front, not stacked desktop.
- Headline 48–62px with deliberate line breaks; no tiny overline above it.
- Orange route enters from top/right edge and cuts behind one line, never reducing readability.
- CTA within first ~650px of page.
- Graphic object becomes a cropped bottom-third material/label composition, not a tiny illustration.
- Keep 20–24px side breathing room for functional copy; expressive elements may bleed to viewport edges.

## Typography
Use at most two families, legally available/open-source.

### Display / headings
Choose a strong grotesk with compact, editorial authority. Preferred implementation candidates after render testing: `Archivo Black` / `Archivo` variable, `Manrope` at heavy weights, or another already-available open grotesk with strong Cyrillic/Latin support if needed. Do not use a sci-fi/techno face.

### Body / UI
Neutral highly legible sans, 16–18px body desktop, 16px minimum important mobile body.

### Metadata
Mono only for actual identifiers or label-like field names where semantically justified. Never turn the whole page into terminal typography.

Typography must create the design: extreme display/body contrast, short measures, deliberate line breaks, occasional rotated/vertical label text only outside functional content.

## Color / surfaces
- Dominant: warm paper/off-white, approximately `#F1EFE8` territory; tune in render.
- Ink: near-black, approximately `#11110F`.
- Routing accent: saturated safety/packing orange, approximately `#FF4B16`; exact value must pass CTA contrast and not be reused casually.
- Secondary material tone: muted grey-beige / corrugated neutral.
- Functional error/success colors remain semantic and separate from brand orange.

No gradients, glow, glass, metallic effects or multiple accents.

## Section rhythm
Page should feel like opening and unfolding a package, not scrolling through equal modules.

1. **Hero / sealed package** — dense, bold, off-grid.
2. **Process / routing marks** — compressed horizontal desktop sequence with giant 01/02/03 and one continuous route; on mobile a vertical sequence with alternating edge alignment.
3. **Quiet evidence gap** — short calm field explaining what is useful to send; substantial negative space and one material/label motif.
4. **Request transition / opened package** — background or surface inversion creates a clear chapter change.
5. **Request tool / packing table** — functional, bright, calm, highly legible; visual theatre steps back.
6. **Submit / dispatch** — orange route terminates at primary submit action.

Do not add sections solely to make the page longer.

## Process
Do not use three equal cards.

Desktop: one wide composition. `01`, `02`, `03` are oversized anchors at different vertical positions; concise copy sits close to each number; orange route physically connects them. Use labels `Vehicle`, `Part`, `Contact` only if consistent with existing copy/IA.

Mobile: 01/02/03 become three strong typographic beats, not bordered boxes. The route shifts sides between steps to create rhythm. Keep each step short.

## Request transition
The transition should feel like peeling/opening the outer package to reveal the precise work surface.

Implementation-safe version: a hard diagonal or stepped edge between warm hero/process field and the request surface, with the orange route crossing the boundary. No heavy scroll animation required.

## Form integration
The form is the core product surface. It must become calmer than the hero.

- No giant dark application shell.
- No nested cards.
- Use one broad work surface with clear groups for vehicle, part, contact.
- Grouping by typography, whitespace and thin rules before containers.
- Inputs can use a restrained label-field language reminiscent of a shipping manifest, but remain conventional HTML controls.
- VIN/OEM values use mono only inside relevant fields/examples.
- Photo upload gets a generous tactile drop/tap area on mobile, but no fake thumbnail.
- Required/optional states explicit in text.
- Error, focus, disabled, loading and success states remain unmistakable.
- Submit button is the visual endpoint of the orange route; do not add a competing secondary CTA beside it.

## Imagery / graphics
V1 must work with zero real photography.

Allowed now:
- CSS/SVG geometric packaging planes;
- abstract corrugated-edge or label-sheet forms;
- barcode-like marks only if decorative and clearly not presented as a real Spline tracking code;
- crop/overlap of generic physical-material abstractions;
- typography as the primary visual asset.

When real Spline assets arrive, replace the abstract object with actual part/packaging close crops. Do not generate fake warehouse, stock, team, order or customer proof.

## Motion
Motion budget remains low.
- Route/tape may reveal 200–400ms on initial paint or section entry.
- CTA press should feel physical: 1–2px translate/scale, short duration.
- Optional subtle label slide on section entry.
- No scroll hijacking, parallax theatre, 3D package rotation or delayed CTA.
- Respect `prefers-reduced-motion`.

## Graphic language
One motif: routing/packing.
- hard rules;
- cut edges;
- label blocks;
- large serial numerals;
- controlled orange tape;
- off-grid crops.

Avoid turning every content group into a sticker. One or two strong labels per viewport maximum.

## Accessibility / fundamentals controls
- CTA text/background must meet WCAG contrast; tune orange/ink pairing in browser.
- Focus ring must remain visible against paper and orange.
- No important text rotated.
- Orange never communicates state by itself.
- Maintain 44–48px practical mobile targets.
- Preserve text-spacing resilience and no horizontal overflow at 390px.
- Decorative bleeds must be `overflow: clip/hidden` without clipping focusable controls.
- Large display typography must not push the first CTA below useful mobile view.

## Delete from old visual language
Frontend should actively remove, not restyle:
- Identification Poster composition;
- specimen strips/panels;
- CRM/workstation visual residue;
- technical table/rail motifs;
- repeated outlined cards;
- sparse wireframe sections;
- excessive mono labels;
- hero mini-request UI;
- generic automotive HUD/engineering decoration;
- old section geometry preserved merely for convenience.

## Hard anti-patterns
- no dashboard aesthetic;
- no SaaS card stack;
- no fake ecommerce catalog;
- no supercar hero;
- no carbon fibre/racing language;
- no AI gradients/glow;
- no fake social proof;
- no generated business-evidence imagery;
- no decorative barcodes that look like real order tracking;
- no literal cardboard texture covering the whole page;
- no typography so experimental that request clarity suffers.

## Frontend implementation order
1. Preserve existing functional markup/contracts where possible but do not preserve visual wrappers by default.
2. Build hero composition and mobile transformation first.
3. Build route/tape graphic system as one reusable visual primitive.
4. Recompose process without cards.
5. Recompose request transition and form surface.
6. Implement responsive type/crop rules at 390 and 1440.
7. Implement states/accessibility.
8. Build and run existing e2e.
9. Capture real full-page renders at 390 and 1440.
10. Send to independent UI Guard against `docs/visual-quality-scorecard.md`.

## Render acceptance target
Conservative target after implementation:
- Magnetism >= 8.5
- Originality >= 8.5
- Composition >= 8.5
- Typography >= 8.5
- Character >= 8.5
- Perceived quality >= 8.5
- Commercial clarity >= 9
- Mobile presence >= 8.5

The page fails visual reset if it merely becomes cleaner, more consistent, or more polished. The package/routing concept must be recognizable without the logo while the request remains easier—not harder—to start.
