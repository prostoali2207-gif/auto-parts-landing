# Spline — Visual Reset V5 Art Direction

Status: **VISUAL DIRECTION: APPROVED FOR IMPLEMENTATION**

This document is an implementation contract, not a visual PASS. All concept scores below are provisional hypotheses. Final quality must be judged from exact-head 390px + 1440px renders after implementation.

## 1. Source state reviewed

Visual baseline reviewed from the `visual-review` artifact for production/main commit `4e21c133841b623b32b8a266e397592c9152c48e`, which is also the frontend parent of `design/visual-reset-v5`. The V5 branch currently changes documentation only, so these renders are the exact current frontend state.

Reviewed:
- `landing-mobile-390.png`
- `landing-desktop-1440.png`
- artifact `source-commit.txt` = `4e21c133841b623b32b8a266e397592c9152c48e`

### Rendered diagnosis

V4 solved the wrong problem correctly, then stopped one step too early.

What remains strong:
- offer is immediate;
- CTA is obvious;
- page no longer resembles CRM/dashboard software;
- request fields remain legible and commercially useful;
- orange / paper / ink palette has enough contrast to become a real identity.

What is visibly weak in the renders:
- desktop hero has no authored counterweight to the headline; the VIN/OEM/PHOTO cluster reads as loose notes rather than a designed object;
- large blank areas have no tension, crop, mass, or alignment event, so they feel unfinished rather than premium;
- process is three pieces of copy arranged horizontally/vertically, not a memorable transition;
- the black request intro is an isolated rectangle rather than a chapter boundary;
- the form drops to ordinary browser-form quality, especially the native file input;
- mobile becomes a long sequence of similar white fields with almost no density modulation;
- typography is competent but not identity-bearing;
- visual authorship is concentrated in the headline while the rest of the page behaves like a wireframe.

The correction is **not more decoration**. V5 needs stronger graphic mass, deliberate alignment, typography-led objecthood, controlled density changes, and a form system designed as one commercial composition.

## 2. External research — mechanisms to transfer

Research was refreshed for V5 across automotive aftermarket, industrial identity, editorial commerce and premium commercial design.

### A. SKF Automotive / SKF identity refresh

Pattern:
- typography and brand geometry carry identity, not interface chrome;
- strong headline scale and deliberately irregular/technical letterforms create industrial character;
- large content acts are visually separated instead of being normalized into one component system.

Why it works:
- the industrial identity feels proprietary before product photography does any work;
- technical confidence is communicated through proportion and typography rather than fake instrumentation.

Transfer to Spline:
- make typography, identifiers and hard-edged geometry the primary art-direction material;
- allow one or two category-specific identifier treatments to become signature graphic objects.

Risk:
- proprietary SKF typography cannot be imitated; Spline must achieve character through composition and available legal typefaces, not copy letterforms.

Decision: **ADAPT mechanism, reject imitation.**

### B. Bosch Mobility Aftermarket

Pattern:
- the commercial job is stated plainly and product/parts semantics remain obvious;
- information hierarchy is practical and category-first rather than lifestyle-first;
- technical breadth is made approachable through disciplined structure.

Why it works:
- visitors do not have to decode what the business does;
- industrial credibility and usability coexist.

Transfer to Spline:
- preserve V4's immediate request clarity;
- every graphic device must remain subordinate to `Request a Part` and actual vehicle/part identification semantics.

Risk:
- Bosch can rely on enormous brand equity and photography; copying its restraint would leave Spline visually anonymous.

Decision: **TAKE clarity, exceed its visual authorship for this small landing.**

### C. Corequip editorial industrial system

Pattern:
- bold typography, monochromatic/solid color fields and editorial composition create richness without dashboard cards;
- visual narrative changes density and alignment between sections.

Why it works:
- a supplier can feel designed and premium without becoming a luxury brochure;
- strong color blocks create chapter changes instead of isolated cards.

Transfer to Spline:
- use orange/ink as full compositional fields at selected moments, not small decorative accents everywhere;
- use editorial shifts in scale and alignment to create page rhythm.

Risk:
- too much editorial drama could delay the request flow.

Decision: **ADAPT strongly.**

### D. FERRO / contemporary industrial editorial references

Pattern:
- large typographic masses are locked to product/industrial geometry;
- thin rules, cropped modules and asymmetric grids create precision without software chrome;
- sections change from high-impact to quiet and back again.

Why it works:
- whitespace has edges and relationships, so it feels composed;
- visual richness comes from scale contrast and crop rather than ornament.

Transfer to Spline:
- convert VIN/OEM/PHOTO from floating metadata into one cropped identification composition;
- make process progression a graphic movement across a rule/field rather than three cards.

Risk:
- faux engineering diagrams or fake product renderings would violate trust.

Decision: **TAKE grid/rhythm mechanisms; reject invented machinery imagery.**

### E. BMW-style premium editorial restraint — useful counterexample

Pattern:
- very restrained UI lets high-quality photography carry most perceived value.

Why it works there:
- the product itself supplies visual richness.

Why it fails as the base for Spline V5:
- Spline currently lacks equivalent real imagery;
- V4 already demonstrated that restraint without a strong visual event becomes sparse/wireframe-like.

Decision: **REJECT as primary direction until real Spline material assets exist.**

## 3. Benchmark comparison gate

The agreed high-visual benchmark remains a ceiling reference, not a layout template. V4 currently wins on request clarity but loses visibly in:
- first-viewport visual event;
- compositional tension;
- section-to-section rhythm;
- form craftsmanship;
- perceived finish.

V5 must not trade clarity for spectacle. It must close those visual gaps while keeping the request action more obvious than the benchmark.

UI Guard must repeat this comparison on exact-head renders. Contract compliance alone is insufficient.

## 4. Three genuinely different directions

### Direction A — IDENTIFICATION POSTER

Thesis: turn the act of identifying a vehicle/part into a bold typographic automotive poster.

Desktop composition:
- hero uses an asymmetric 7/5 grid;
- headline occupies the left mass;
- right side becomes one large vertical identification object, not three labels: oversized `VIN / OEM / PHOTO` typography cropped by the viewport/grid, with one orange datum rule and small explanatory copy locked to it;
- the object behaves like packaging/parts-label graphic design, not a form preview;
- process becomes a horizontal progression where `01 → 02 → 03` changes scale and baseline across one continuous field;
- request chapter begins with a full-width ink band that contains the request title and a large orange index, then physically opens into the light form surface.

Mobile composition:
- hero headline remains first;
- identification object becomes a compact full-width graphic strip below CTA, with large cropped identifiers stacked tightly rather than scattered labels;
- process is a vertical progression with alternating indentation, not equal rows;
- request band spans edge-to-edge and hands directly into the first form group.

Typography:
- assertive grotesk/display sans for hero and section numerals;
- readable neutral sans for body;
- mono only for actual VIN/OEM examples or entered identifiers.

Signature idea:
- **oversized identification typography cropped like a physical label/specimen**.

Commercial advantage:
- strongest first-viewport memory while staying category-specific and asset-independent.

Risk:
- if identifier typography becomes fake technical decoration, it will regress into workstation cosplay.

Provisional potential: Character 9.0 / Clarity 9.2 / Beauty 8.8 / Composition 9.0 / Typography 9.0 / Rhythm 8.8 / Perceived quality 8.8 / Commercial 9.2 / Mobile 8.8.

### Direction B — SERVICE EDITORIAL

Thesis: present Spline as a highly edited specialist service with a sequence of distinct commercial chapters.

Desktop composition:
- hero is mostly typographic with a strong left edge and a narrow orange side field containing the CTA/support line;
- process becomes an editorial spread: one large `01` anchor, then two smaller beats crossing the page with changing alignments;
- request transition uses a large typographic sentence crossing ink → paper rather than a contained panel;
- form alternates wide and narrow field rows to create pacing.

Mobile composition:
- strong editorial chapter titles with intentional vertical pauses;
- process uses oversized numerals as anchors;
- form groups are separated by typographic chapter breaks rather than boxes.

Typography:
- strongest emphasis on type scale, line breaks and editorial measure;
- minimal technical styling.

Signature idea:
- **chapter typography crossing surface boundaries**.

Commercial advantage:
- mature and service-led; least likely to look like software.

Risk:
- without imagery or stronger automotive semantics it can drift toward design-agency/editorial minimalism.

Provisional potential: Character 8.5 / Clarity 9.3 / Beauty 8.8 / Composition 8.8 / Typography 9.2 / Rhythm 9.1 / Perceived quality 8.8 / Commercial 9.2 / Mobile 8.9.

### Direction C — PARTS LABEL / MATERIAL SYSTEM

Thesis: derive the entire visual language from physical automotive-part labels, packaging proportions and stamped identification — abstractly, without fake photos or fake documents.

Desktop composition:
- hero is built from interlocking paper/ink/orange slabs with hard crop edges and label-like proportion changes;
- identifiers sit in defined physical zones with barcode-like spacing rhythm but no fake barcode or invented data;
- process uses a continuous packaging-strip geometry with three unequal stages;
- request area resembles an opened label/packing system through surface proportion only, never a dashboard.

Mobile composition:
- slabs become stacked edge-to-edge bands;
- form groups use label-header geometry and inset fields;
- upload becomes a deliberate drop surface resembling an attachment zone, not a native control.

Typography:
- compact industrial hierarchy, restrained mono for real identifiers, strong sans for all commercial language.

Signature idea:
- **physical label proportions and registration marks reduced to abstract layout geometry**.

Commercial advantage:
- most category-specific without requiring photography.

Risk:
- easiest direction to overdo; excessive boxes/rules could become fake technical UI or packaging cosplay and hurt lightness.

Provisional potential: Character 9.2 / Clarity 8.9 / Beauty 8.6 / Composition 8.8 / Typography 8.7 / Rhythm 8.8 / Perceived quality 8.8 / Commercial 8.9 / Mobile 8.6.

## 5. Selected direction

**SELECTED: Direction A — IDENTIFICATION POSTER, with the chapter rhythm discipline of Direction B.**

Why:
- it directly fixes V4's weakest surface: the first viewport;
- it is strong without real photography;
- it creates automotive identity from genuine request semantics rather than clichés;
- it gives Frontend one memorable signature system instead of asking for generic polish;
- it preserves V4's commercial clarity better than the more abstract material system;
- the editorial rhythm borrowed from B prevents the poster idea from becoming a one-section trick.

Do **not** merge Direction C's slab/box density into the selected direction. Its lesson is physical proportion, not more containers.

## 6. Implementation-ready contract

### 6.1 Global visual thesis

**Precision Identification Service**

Spline should feel like a specialist service that can identify and source a part from imperfect customer evidence. The page is commercial, decisive and tactile in proportion, but not an app, catalogue, dashboard or luxury-car brochure.

Primary signatures:
1. oversized identification typography used as a composed graphic object;
2. chapter-scale shifts using ink/orange/paper surfaces with hard, intentional boundaries.

No third signature system is needed.

### 6.2 Grid and width

Desktop 1440 baseline:
- content max width: approximately 1200–1240px;
- page gutters: approximately 64–80px depending on viewport;
- hero: asymmetric grid near 7/5, but allow the identification object to break the internal column line deliberately;
- do not center every section to the same text measure;
- process may span almost the full content width;
- form content should remain readable at roughly 720–780px effective input width while the surrounding chapter composition uses the larger grid.

Mobile 390 baseline:
- 18–20px page gutters for reading/form surfaces;
- selected chapter bands may run edge-to-edge;
- no arbitrary horizontal overflow;
- identifiers may crop visually only when the text is decorative/category labeling, never when it is user-entered or required information.

### 6.3 Color and surfaces

Retain current family:
- warm paper/off-white foundation;
- near-black ink;
- Spline orange as the only strong accent.

Change usage:
- orange must appear in fewer, larger, more intentional moments;
- avoid peppering tiny orange labels throughout every section;
- ink surface is a chapter device, not a card color;
- no gradients, glow, glass, fake metal, carbon fibre or textured image backgrounds.

Recommended visual rhythm:
`paper hero → paper/ink process tension → decisive ink request threshold → paper form → orange submit termination`.

### 6.4 Hero

Must fit the commercial message and one memorable visual event in the first desktop viewport.

Left:
- keep existing offer/copy/CTA semantics;
- preserve immediate `Request a Part` dominance;
- headline remains the primary mass, but tighten line-height and control wrapping intentionally;
- support copy should have a clear maximum measure and not float far from CTA.

Right:
- remove the current loose VIN/OEM/PHOTO specimen arrangement;
- build one graphic identification object approximately 360–440px wide and 330–430px tall on desktop;
- object is primarily typography + rules + surface blocks, not a card stack;
- use the literal concepts `VIN`, `OEM / PART NO.`, `PHOTO` only because they are real accepted request signals;
- at least one identifier word should be large enough to act as graphic mass and may be partially cropped by the object's edge;
- small helper phrases remain human-readable and aligned to the larger type;
- one orange vertical/horizontal datum rule may bind the object;
- no fake VIN value, fake barcode, fake stock code, fake status, fake document or fake part image.

Mobile:
- headline → copy → full-width primary CTA → short support line → identification strip/object;
- the object should be approximately 150–190px tall, dense and authored;
- do not reproduce desktop as tiny two-column metadata;
- target: first viewport should show offer + CTA and at least the beginning/majority of the signature object without excessive empty space.

### 6.5 Process

Keep exactly the same three semantic jobs: vehicle → part → contact.

Do not use three cards and do not use three equal columns with identical visual weight.

Desktop:
- use one continuous composition across the width;
- `01`, `02`, `03` are the progression anchors;
- vary vertical baseline and/or scale: 01 largest/left anchor, 02 central pivot, 03 resolves toward the request direction;
- connect stages with one restrained rule/path generated by layout, not an icon illustration;
- copy remains short and readable;
- process should visually accelerate toward the request chapter.

Mobile:
- vertical progression with deliberate indentation or alternating alignment;
- one continuous rule may connect the sequence;
- each stage should feel like a beat, not a bordered row;
- keep total process height materially shorter than the current long explanatory stack where possible without reducing readability.

### 6.6 Request transition

The current isolated black rectangle must disappear.

Desktop:
- create a full-width or near-full-width ink chapter threshold immediately before the form;
- the threshold and first form group must visually touch/overlap through alignment so they read as one request experience;
- title `Что нужно найти?` / current equivalent remains large and decisive;
- a large `REQUEST / 01` or existing truthful request label may be used only as navigation/section language, never as fake system status;
- orange is used as one strong registration accent, not multiple badges.

Mobile:
- ink threshold runs edge-to-edge;
- no beige gap between threshold and first form group;
- first group begins as the continuation of the chapter, creating a clear `now fill this in` handoff.

### 6.7 Form visual system

Do not change fields, validation, order, CRM contract or success/error logic.

The form must stop looking like browser-default controls placed in a document.

Group hierarchy:
- Vehicle / Part / Contact each receive a strong numbered heading row;
- heading row uses large section title + small orange index, not a bordered card;
- helper copy sits close to the group heading;
- groups separated by generous but controlled vertical rhythm and a single rule only where useful.

Inputs:
- consistent custom surface treatment across text, textarea and upload;
- minimum mobile control height ~52–56px;
- desktop heights may be slightly tighter but should not look cramped;
- borders should be crisp and slightly darker than V4 so controls feel deliberate, while avoiding boxed heaviness;
- focus state: clear orange/ink emphasis with accessible contrast; no glow;
- placeholder contrast must remain readable but secondary;
- entered VIN/OEM values may use mono only when actual user input is present.

Field proportions on desktop:
- VIN full width;
- make/model/year row may remain grouped, but year is intentionally narrow;
- part name and OEM can use unequal widths only if current DOM/UX permits safely; otherwise keep full width and create rhythm through spacing, not architecture changes;
- contact full width; optional name may be slightly shorter only if this can be done without changing semantics.

Mobile:
- one column;
- reduce visual fatigue by changing spacing between labels, fields and group boundaries rather than introducing cards/steps;
- field labels should be visibly stronger than helper text;
- no tiny uppercase technical labels for ordinary form copy.

### 6.8 File upload

Replace browser-default visual presentation while preserving native accessible input behavior underneath.

Required presentation:
- full-width upload surface;
- clear photo/upload icon only if already available from one coherent icon family;
- primary line: action such as current truthful `Фото детали` / choose-photo language;
- secondary line can explain accepted photo role, not invent file limits unless technically true;
- selected filename/state must be visible;
- keyboard/focus state must be obvious;
- error state integrated with same component;
- do not create a fake drag-and-drop promise unless drag/drop actually works.

### 6.9 Submit termination

Submit is the strongest form action.

Desktop:
- full or near-full effective form width;
- strong orange field with high-contrast label;
- sufficient top separation to feel like the resolution of the request, not another field.

Mobile:
- full width;
- at least ~56px high;
- visually terminate the long form with a confident orange block and adequate bottom breathing room.

### 6.10 Typography

Do not add a paid font dependency.

Frontend should inspect currently available legal fonts and choose the strongest existing/open option that supports Cyrillic and Latin consistently.

Roles:
- Display: bold contemporary grotesk/sans, tight tracking, strong Cyrillic shapes; hero desktop roughly 72–88px depending on actual wrap, mobile roughly 42–48px;
- Section display: 38–52px desktop, 28–34px mobile;
- Body: approximately 16–18px with comfortable line-height;
- Labels: 13–15px, strong but not shouty;
- Mono: only actual identifiers or compact truthful identifier labels.

Rules:
- no all-page mono;
- no fake engineering uppercase everywhere;
- avoid five or more nearby font sizes doing nearly the same job;
- line breaks in hero and request threshold must be deliberately tested at 390 and 1440.

### 6.11 Borders, radius, shadow

- prefer 0–4px radius; do not create soft SaaS cards;
- use 1px rules as structural alignment devices;
- no decorative shadows in hero/process;
- form fields may use no shadow or only a state-specific treatment if needed for accessibility;
- no nested card-on-card surfaces.

### 6.12 Motion

Static composition must work without motion.

Allowed only:
- 120–180ms control/button state transitions;
- subtle focus/hover transitions;
- no scroll choreography, parallax, marquees, auto-moving identifiers or animated fake scanning.

## 7. Anti-CRM test

Implementation fails this direction if any of these become true:
- hero secondary object resembles a dashboard widget or application preview;
- request headings resemble wizard tabs/status steps;
- form is enclosed in a giant application shell;
- identifiers look like fake system telemetry;
- repeated bordered panels become the main layout language.

## 8. Anti-wireframe test

Implementation also fails if:
- hero right side can be removed without materially changing the composition;
- whitespace is large but has no edge/alignment relationship;
- process could be mistaken for unstyled three-column copy;
- request threshold looks like an inserted card;
- native file control remains visually exposed;
- mobile is only heading + identical rectangular inputs for most of the page;
- orange is limited to CTA buttons and tiny labels, with no larger compositional role;
- typography below the hero returns to generic default hierarchy.

## 9. Assets

**No asset is required to implement V5.** The base direction must be strong without photography.

ASSET NEEDED later, not blocking V5:
- 3–5 real Spline part/order photographs on a clean actual surface;
- one real readable OEM/part-number label;
- one real handling/packaging scene if available.

When these exist, they may replace or augment selected graphic zones. They must not be fabricated or sourced as fake business evidence.

## 10. Provisional selected-direction scorecard

These are design-risk estimates only, not PASS scores:

| Dimension | V5 target hypothesis | Main implementation risk |
|---|---:|---|
| Character | 9.0 | identifier object becomes decorative metadata |
| Clarity | 9.2 | graphic hero competes with CTA |
| Beauty | 8.8 | typography/font execution lacks refinement |
| Visual lightness | 8.6 | too many rules/labels accumulate |
| Composition | 9.0 | desktop works but mobile collapses into stacking |
| Typography | 9.0 | Cyrillic face/wrapping is not tested carefully |
| Page rhythm | 9.0 | process/request transition remain isolated components |
| Perceived quality | 8.9 | form controls receive only superficial CSS |
| Originality | 8.8 | label semantics drift into generic industrial template |
| Commercial direction | 9.2 | no regression expected if CTA hierarchy is preserved |
| Trust credibility | 8.5 | invented identifiers/proof would invalidate this |
| Mobile visual UX | 8.9 | long form pacing is not deliberately tuned |

## 11. Frontend handoff

Frontend Agent must implement the selected direction as the smallest complete visual change and preserve:
- header → hero → compact process → request form;
- copy/CTA semantics;
- fields and information architecture;
- validation;
- analytics;
- success/error behavior;
- `create-landing-request`;
- CRM contract.

Required verification after implementation:
1. build/checks;
2. exact-head 390px render;
3. exact-head 1440px render;
4. visual-review artifact tied to the implementation SHA;
5. independent UI Guard comparison against this contract **and** the high visual benchmark.

UI Guard's first question must be: **Does this look like an unusually strong, finished commercial landing page without knowing the implementation history?**

Only after a rendered YES should contract compliance and score thresholds be considered.

## Final decision

**VISUAL DIRECTION: APPROVED FOR IMPLEMENTATION**

Selected: **Identification Poster + Service Editorial Rhythm**.

This is not final product PASS. Final visual judgment belongs to independent UI Guard after exact-head implementation renders.