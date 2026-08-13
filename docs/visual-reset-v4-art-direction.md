# Spline — Visual Reset V4 Art Direction

Status: **VISUAL DIRECTION: APPROVED FOR IMPLEMENTATION**

Scope: visual/art direction only. UX, copy, form fields, validation, analytics, `create-landing-request`, CRM handoff and page order remain unchanged.

## 1. Rendered diagnosis — PR #14

Reviewed the CI `visual-review` artifact from PR #14 head `30ae0514d4c1314d0171803b5f27dee8de5710d9` at 390px and 1440px.

### What already works
- Offer comprehension is immediate.
- Orange CTA has strong dominance on both viewports.
- VIN / vehicle / photo / OEM mechanics make the category specific.
- Mobile hierarchy is robust and form controls are comfortably usable.
- Spline wordmark + paper/ink/orange family has enough brand equity to retain.

### What blocks a higher visual ceiling
- Desktop hero is two adjacent information zones: headline block + miniature request panel. It is arranged, not art-directed as one composition.
- The miniature request panel repeats the form/system metaphor before the actual form appears.
- Process uses row/table semantics; it explains correctly but keeps the page in an interface/manual register.
- Request section becomes a dark application shell with a light form panel. On desktop the left half is largely dead space; on mobile the visitor enters a very long uninterrupted software-form visual language.
- Typography is forceful but too uniformly heavy. There is insufficient contrast between commercial/editorial voice and identification data.
- Rules, small uppercase/mono labels, numbered rows and bordered surfaces collectively consume too much visual-load budget.
- Beauty and perceived quality depend mainly on typography + UI chrome because there is no material evidence layer.

Core diagnosis: **the page currently visualizes the act of entering data. V4 should visualize the value of specialist part sourcing, with data entry becoming the quiet final instrument.**

## 2. External research — transferable mechanisms

Research date: 2026-08-13.

### Porsche Classic / ORIGINALE
Observed mechanism: parts are treated as objects with identity and stories, using editorial hierarchy, strong photography, technical literature and real part numbers rather than dashboard chrome. The Genuine Parts Catalogue and ORIGINALE material combine model/part specificity with magazine-like presentation.

Transfer to Spline: let one real component / package label / OEM marking carry automotive character while typography carries the commercial message. Part numbers can behave as captions, not badges.

Risk: Porsche can lean on enormous brand equity and lifestyle imagery. Spline cannot imitate luxury emptiness or make unsupported provenance/quality claims.

Decision: **ADAPT** the editorial object/caption relationship; reject luxury-brand theatre.

### HELLA Tech World / Spare Parts Finder
Observed mechanism: automotive specificity comes from genuine identification methods — OE number and manual vehicle identification — and the product/repair context. The domain is clear even without decorative automotive clichés.

Transfer to Spline: keep VIN/OEM/photo semantics explicit, but restrict technical visual treatment to those true identifiers. Identification should prove competence, not define every surface.

Risk: HELLA is a large product/technical portal and can become tool-like. Copying its finder UI would recreate the workstation problem.

Decision: **TAKE** identification semantics; **REJECT** portal/tool density.

### Bosch Mobility Aftermarket
Observed mechanism: broad commercial messaging and product imagery sit above technical catalogue mechanics. The parts proposition is presented as a customer-facing business first, then tools/products.

Transfer to Spline: separate the commercial voice from the request instrument. Use larger editorial acts and calmer transitions instead of making every section look operational.

Risk: corporate modularity can become generic and card-heavy.

Decision: **ADAPT** commercial-first hierarchy; reject generic corporate modules.

### McMaster-Carr
Observed mechanism: product photography and precise descriptions make industrial objects legible and trustworthy; information density is accepted because it is attached to real products and specifications, not decorative UI.

Transfer to Spline: close, neutral, high-resolution part/label imagery can create tactile credibility. When technical information appears, attach it to a real object or a real input requirement.

Risk: its catalogue density and taxonomy are wrong for a one-page lead funnel.

Decision: **TAKE** object clarity and evidence discipline; reject catalogue density.

### Baymard automotive-parts benchmark
2026 research identifies vehicle-based finders/compatibility scoping as strong fundamentals across automotive-parts sites, while decision-stage confidence often suffers when physical context/specification comparison is weak. Spline is not ecommerce, but the transferable point is useful: retain vehicle/part identification clarity and increase physical/evidentiary context rather than adding more interface chrome.

Decision: **TAKE** domain-specific identification confidence; do not import ecommerce scope.

### Previously shown high visual benchmark competitor
Treat the previously shown benchmark as a **quality bar, not a style source**. V4 must match its perceived intentionality — composition, typography, rhythm, polish — without copying its layout, claims, imagery or brand devices. The winning direction therefore needs a memorable composition even before real photography is available, and should become materially stronger when real assets arrive.

## 3. Three genuinely different directions

### A — Editorial Parts Sourcing

**Thesis**
Spline feels like a sharp specialist publication/service: large commercial typography, disciplined whitespace, one automotive evidence object, minimal UI chrome.

**Dominant composition**
Hero becomes a single asymmetric editorial field. Headline occupies the primary mass. The secondary side is not a request card: it is a real part/packaging crop when available, with a restrained caption containing a real visible identifier. Without an asset, the side remains intentionally open with a typographic identification motif; no fake placeholder product.

**Typography**
Display sans is bold but not used at maximum weight everywhere. Body becomes calmer. Mono/condensed treatment is reserved for VIN/OEM/part-number examples and tiny evidence captions only.

**Rhythm**
Hero = expansive; process = compact editorial strip with three verbal beats and no cell grid; request = large service chapter with headline/intro followed by a quiet form surface.

**Image treatment**
One or two decisive crops, near life-size or macro. Neutral/paper background, natural hard/soft workshop light, readable material texture. `ASSET NEEDED`.

**Signature**
A real identifier caption aligned to a large cropped part, like editorial product documentation.

**Commercial advantage**
Highest clarity and lowest distraction; breaks the CRM association strongly while preserving the CTA.

**Risk**
Without real imagery, it can become too typographic and fashion-editorial.

**Mobile**
Hero is headline → CTA → evidence crop/caption. Process is three short stacked statements without boxes. Request introduction creates a clear visual reset before fields.

### B — Material / Product Evidence

**Thesis**
Spline is understood through the physical evidence of parts sourcing: components, labels, packaging, connector geometry, markings and handling surfaces.

**Dominant composition**
Hero uses a large tactile part crop as the main visual mass, with headline integrated alongside/over a controlled quiet zone. Process is expressed through three evidence fragments: vehicle identity, part identity, contact — each anchored by real material detail rather than a UI row.

**Typography**
More restrained display scale because imagery carries character. Technical captions are precise and sparse.

**Rhythm**
Alternates image-dominant and text-dominant acts. Request form sits on a neutral/paper field and is visually surrounded by evidence, not a dark application shell.

**Image treatment**
Macro crops, labels, boxes, casting marks, lamp housings, connectors, specialist hand only when real and useful. No staged warehouse/team imagery. `ASSET NEEDED`.

**Signature**
A sequence of tactile crops with one readable real identifier per crop.

**Commercial advantage**
Strongest automotive identity and strongest potential trust-by-evidence.

**Risk**
Direction is asset-dependent. Weak or inconsistent phone photos would reduce beauty/perceived quality sharply. Too many crops could resemble ecommerce/catalogue merchandising.

**Mobile**
Images become full-bleed/edge crops between short text acts; form remains uninterrupted once started.

### C — Precision Service

**Thesis**
Spline feels like a premium human sourcing service, not software: calm confidence, precise language, generous composition, and a request moment treated like handing a specialist the job.

**Dominant composition**
Hero is a service promise with an oversized typographic statement and a small, deliberately placed identification example. Process becomes a conversational three-beat handoff, not steps in a system. Request area uses a strong service-introduction column paired with a form, but the two are compositionally linked through baseline/spacing rather than a giant dark shell.

**Typography**
Most sophisticated hierarchy of the three: display for promise, text face for explanation, technical face only inside real identification contexts.

**Rhythm**
Large → quiet → focused. Hero has scale; process is low-density; request regains scale with a strong introduction, then form density is contained.

**Image treatment**
Optional rather than structural. One real object/handling image can enrich the service story but direction remains complete without it.

**Signature**
A recurring thin orange service mark / crop line that connects a vehicle/part identifier to the human action, used only 2–3 times on the page.

**Commercial advantage**
Best balance of immediate lead generation, perceived quality, asset independence and anti-dashboard separation.

**Risk**
If spacing becomes too generous or copy too precious, it could drift toward generic agency/luxury service. Automotive identifiers must stay visible.

**Mobile**
Designed as distinct acts: strong hero; brief calm handoff; explicit request chapter; then the functional form. This directly fixes the current long single-register technical experience.

## 4. Scorecard

| Dimension | A Editorial | B Material Evidence | C Precision Service |
|---|---:|---:|---:|
| Character | 9.0 | 9.3 | 9.0 |
| Clarity | 9.4 | 9.0 | 9.5 |
| Beauty | 9.0 | 9.4* | 9.1 |
| Visual lightness | 9.2 | 8.6 | 9.1 |
| Composition | 9.1 | 9.3* | 9.3 |
| Typography | 9.3 | 8.7 | 9.4 |
| Page rhythm | 9.1 | 9.4 | 9.3 |
| Perceived quality | 9.0 | 9.4* | 9.2 |
| Originality | 8.9 | 9.2 | 8.8 |
| Commercial direction | 9.4 | 9.0 | 9.6 |
| Trust credibility | 9.0 | 9.5* | 9.2 |
| Mobile visual UX | 9.1 | 8.8 | 9.4 |

`*` assumes high-quality real Spline assets. Without them, B drops below the launch bar in Beauty, Composition and Perceived Quality. Scores are not raised to compensate for missing evidence.

## 5. Anti-CRM / anti-dashboard test

### A Editorial Parts Sourcing — PASS
- Hero interest survives with almost all UI chrome removed.
- No status panels/table rows required.
- Form is a final instrument, not the page metaphor.

### B Material / Product Evidence — PASS WITH ASSET DEPENDENCY
- Character comes from real objects/materials.
- No dashboard semantics required.
- Fails commercially if fake/stock evidence is substituted; therefore missing assets must remain `ASSET NEEDED`.

### C Precision Service — PASS
- Page reads as a customer-facing specialist service.
- Hero depends on type composition, not cards.
- Process is human/commercial, not a workflow rail.
- Request section can contain fields without making the entire page look like data-entry software.

## 6. Selected direction

# Precision Service — selected

C is the strongest V4 base because it clears every hard target **without depending on assets Spline does not yet have**. It also gives Frontend a complete visual system now, while allowing the strongest mechanism from B — real material evidence — to be added later as proof rather than as decoration.

A is excellent but risks becoming too editorial/typographic while real evidence is missing. B has the highest eventual automotive character but is not honest to score as implementation-ready at its full quality ceiling until real assets exist.

The selected direction therefore is **Precision Service with a controlled Material Evidence layer when real assets become available**. This is one direction, not a hybrid collage: service composition is the system; material evidence is optional proof inside it.

## 7. Implementation-ready Visual Reset V4 contract

### Visual thesis
Spline is a **specialist parts-sourcing service**. The page should feel composed by a confident commercial brand and operated by people who know how to identify a part. It must not look like software used by those people.

### Preserve exactly
- page order: header → hero → compact process → request form;
- existing copy and CTA semantics unless a separate owner changes them;
- all request fields, validation, analytics, submission states and CRM contract;
- Spline wordmark;
- paper / ink / orange family;
- early primary CTA and mobile-first behavior.

### Global composition
- Replace the repeated technical-panel logic with **three distinct acts**.
- Act 1 / Hero: expansive commercial composition.
- Act 2 / Process: quiet, compact explanatory bridge.
- Act 3 / Request: premium service entry moment followed by the functional form.
- Do not add new marketing sections.

### Hero
- Remove the miniature `PART REQUEST` card as the dominant right-side object.
- Desktop: use an asymmetric 7/5 or approximately 60/40 composition, but visually connect both sides through alignment and negative space rather than two boxes.
- Left: existing offer/headline remains dominant. Keep body measure compact enough that CTA sits early.
- Right: use a restrained **identification specimen**, not a panel: e.g. `VIN`, `OEM / PART NO.`, `PHOTO` as 2–3 typographic fragments arranged around one thin orange service mark. They must read as examples of what the customer can send, not statuses or form fields.
- When a genuine Spline part/packaging asset exists, replace most of the specimen with one strong crop and a real visible identifier caption. `ASSET NEEDED`.
- No bordered card stack, fake request preview, fake status, fake document UI or ornamental HUD.
- Mobile: headline → body → full-width CTA → short reassurance → identification specimen/evidence. Keep specimen secondary and materially shorter than the current request preview.

### Process
- Keep the approved three concepts and content; change only presentation.
- Remove table/grid/cell construction.
- Desktop: one horizontal editorial sentence/sequence with three uneven beats, separated primarily by whitespace and at most two short rules.
- Step numbers may remain as small orange anchors, but labels must not look like database columns.
- Make nouns (`Автомобиль`, `Деталь`, `Контакт`) the visual anchors; descriptions are quiet supporting text.
- Mobile: three compact stacked beats with generous inter-beat spacing; no enclosing boxes and no full-width row dividers after every item unless needed for scanning.

### Request section
- Remove the impression of a large dark application canvas containing a form card.
- The dark/ink tone may remain as a **section-level brand contrast**, but it must participate in composition rather than act as empty backdrop.
- Desktop: create a linked 5/7 service composition. Left column contains the existing request heading plus concise existing supporting content only; align its top to the beginning of the form and use scale/spacing so the left area feels intentional rather than empty. Do not invent claims.
- Form surface should be quieter and more premium: reduce border frequency, reduce heavy field boxing where native control clarity permits, and eliminate decorative separators that merely imitate a system.
- Form groups remain visibly distinct through heading hierarchy and spacing first; rules second.
- Submit remains the strongest element inside the form.
- The form must not become multi-step visually or behaviorally.
- Mobile: request section starts with a clear chapter break and heading, then moves directly into one continuous light form surface. Avoid a long black gutter around the form; use section contrast only where it creates a deliberate intro/outro frame.

### Typography
- Establish three roles, not a universal technical voice:
  1. **Commercial display** — hero/request headings; strong grotesk, controlled weight, tight but not crushed leading.
  2. **Service/body** — calm readable sans; normal sentence case; softer weight.
  3. **Identifier** — mono/condensed only for true VIN/OEM/step/example identifiers.
- Reduce uppercase/letter-spaced technical labels by at least half from the current visual impression.
- Do not use mono for generic navigation, section decoration or prose.
- Preserve strong Russian glyph quality and mobile wrapping.
- Use only legally available project/system/open fonts; Frontend should inspect current font setup rather than introducing a paid face.

### Color and surfaces
- Paper remains the dominant light field; ink remains primary dark; orange remains the only strong accent.
- Orange is for CTA, tiny service marks, focus/active states and true identifier emphasis — not large decorative fills except the primary CTA.
- Prefer no shadow. Use 1px rules only when they clarify structure.
- Reduce visible bordered rectangles outside actual form controls by at least ~60% compared with PR #14.
- Avoid gradients, glow, glass, metallic simulation and decorative texture.

### Spacing / rhythm
- Hero: largest negative-space budget.
- Process: shortest/quietest act.
- Request intro: regain scale before entering form density.
- On desktop, do not leave a large unarticulated dark void beside the form. Either the intro column is compositionally active or the form width/placement must rebalance the section.
- On mobile, introduce a meaningful rhythm change before the form so the page does not remain in one technical register from hero through submit.

### Imagery — optional evidence layer
`ASSET NEEDED` before any real-business imagery is used.

Preferred capture list:
1. one actual part on a neutral counter, close crop;
2. one real packaging/OEM label with readable number;
3. one part detail showing material/connector/casting geometry;
4. optional real handling/packing moment with no staged pose.

Art direction:
- neutral or actual work surface;
- honest ambient/hard workshop light;
- no fake depth-of-field excess;
- no supercars;
- no generic mechanic stock;
- no AI-generated inventory/team/order imagery;
- captions only describe what is visibly/actually known.

V4 implementation must remain visually complete without these assets.

### Header
- Keep it terse and commercial.
- Wordmark + one primary action remains sufficient.
- Do not add navigation just to fill space.
- Avoid utility/status styling.

### Interaction / motion
- Static by default.
- Short press/hover/focus transitions only.
- No reveal choreography required for character.

### 390px rules
- Primary CTA remains visible early.
- Hero specimen/evidence must not push process materially farther down than the current request preview does; preferably shorter.
- No side-by-side form fields unless already proven usable; preserve approved UX.
- Minimum practical touch targets remain 44–48px.
- Do not shrink identifiers into tiny decorative text.
- Keep section side padding consistent enough for calm, but allow a real future evidence crop to break the text grid deliberately.

### 1440px rules
- Hero must read as one composition at first glance.
- Process must not resemble a table.
- Request section must not contain a dead left half.
- Form width should support fast scanning without becoming a narrow app window floating in a huge shell.

### Explicit anti-patterns for V4
- request-preview card in hero;
- dashboard tiles/statuses;
- table-like process rail;
- dark shell + isolated white app card as the main request metaphor;
- decorative uppercase mono everywhere;
- repeated bordered modules;
- fake technical diagrams/HUD;
- generic luxury-car photography;
- stock/AI proof;
- extra sections to manufacture visual variety.

## 8. What happens to `Parts Sourcing Workstation`

### Retain
- precision of VIN/OEM/photo identification;
- crisp functional controls;
- restrained orange/paper/ink palette;
- practical, no-nonsense tone;
- clear request hierarchy.

### Reject
- workstation as the page-level metaphor;
- interface panels as hero identity;
- system rows/tables as process identity;
- back-office/data-entry visual framing around the request;
- technical labels as decoration;
- visual interest generated mainly by rules, boxes and operational chrome.

New hierarchy:
**brand/service composition first → automotive evidence second → interface only where the customer actually enters information.**

## 9. UI Guard handoff after implementation

Review real renders at minimum 390px + 1440px against these non-negotiables:
- 5-second offer clarity >= 9;
- commercial direction >= 9;
- hero reads as one composition;
- no plausible CRM/admin interpretation;
- process does not read as table/workflow UI;
- request section feels like a service entry point, not back-office data entry;
- mobile has three distinct visual acts;
- orange remains controlled and CTA-dominant;
- no fabricated evidence;
- character, beauty, composition, typography, rhythm, perceived quality and mobile visual UX all meet the V4 audit thresholds.

Visual Director does not issue final product PASS. Independent UI Guard owns rendered approval.

## Research references
- Baymard Institute — Automotive Parts & Specialty UX Research / 2026 benchmark.
- Porsche Classic — Genuine Parts Catalogue, ORIGINALE, Genuine Parts availability request.
- HELLA Tech World — Spare Parts Finder / passenger-car parts.
- Bosch Mobility Aftermarket — parts/product world.
- McMaster-Carr — industrial product presentation and specification discipline.
