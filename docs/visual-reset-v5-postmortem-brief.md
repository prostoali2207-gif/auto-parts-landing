# Spline — Visual Reset V5 Post-mortem & Art Direction Brief

Status: **VISUAL RESET REQUIRED**

## Why V4 is being reopened
V4 successfully removed most CRM/dashboard/workstation cues, but the final rendered result was incorrectly passed by UI Guard. A second visual inspection of the actual 390px and 1440px renders found that the implementation over-corrected toward a sparse/wireframe-like commercial UI.

The previous PASS is withdrawn as a visual-quality judgment. Functional/CI checks remain valid.

## Actual rendered diagnosis
Approximate visual score after re-review:
- Character: 7.5
- Clarity: 9.2
- Beauty: 6.8
- Visual lightness: 7.5
- Composition: 6.7
- Typography: 7.3
- Page rhythm: 6.5
- Perceived quality: 6.5
- Commercial direction: 9.1
- Mobile visual UX: 7.6
- Overall visual quality: ~7.0

### What V4 fixed
- Page no longer reads primarily as CRM/dashboard/internal software.
- Mini request/application preview was removed from hero.
- Process stopped looking like a table/rail.
- Commercial CTA and request clarity remain strong.
- Mobile no longer sits inside a continuous dark application shell.

These gains must not be reversed.

### What V4 broke or failed to solve
1. **Sparse is being mistaken for premium.** Large empty areas are not sufficiently composed; they read as missing design rather than controlled negative space.
2. **Hero lacks a decisive visual event.** VIN/OEM/PHOTO specimen is category-relevant but visually weak and somewhat arbitrary. It does not balance the headline or create memorable composition.
3. **Process has insufficient visual authorship.** It is clear but looks like lightly styled explanatory copy rather than a crafted commercial transition.
4. **Request transition is fragmented.** The dark `What do you need to find?` intro reads like a separate inserted block rather than a powerful chapter transition into the request experience.
5. **Form presentation is too close to baseline web-form styling.** Native/file controls and repeated inputs dominate long mobile scroll; perceived craftsmanship drops sharply after the request intro.
6. **Page rhythm is weak.** The sequence is clear but visually monotone: large type → sparse metadata → text beats → long form. There are too few intentional changes of scale, density, alignment, and surface.
7. **Typography is not carrying enough art direction.** Removing technical mono language was correct, but the replacement hierarchy is not distinctive enough.

## Critical correction to the agent system
A written art-direction contract is NOT evidence of visual quality.

From V5 onward:
- Visual Director may propose scores for hypotheses, but those scores are provisional only.
- No concept may be called visually successful until implemented and compared using exact-head rendered screenshots.
- UI Guard must first answer a binary question: **does this look like an unusually strong, finished commercial landing page when seen without implementation context?**
- Contract compliance is secondary to actual visual quality.
- `clean`, `clear`, `minimal`, `on-brand`, or `no regressions` are not sufficient reasons for PASS.
- UI Guard must compare the rendered page side-by-side with the agreed high visual benchmark and explicitly identify where Spline wins/loses in composition, rhythm, typography, visual richness and perceived finish.

## V5 objective
Create a visual system that preserves V4's clarity and anti-CRM gains while restoring:
- visual richness;
- memorable composition;
- page rhythm;
- typographic authorship;
- perceived craftsmanship;
- premium finish.

This is NOT permission to add decorative clutter.

## Hard constraints
Preserve:
- header → hero → compact process → request form;
- early dominant Request a Part CTA;
- existing request fields and useful lead-quality signals;
- validation, analytics, success/error behavior;
- create-landing-request and CRM contract;
- mobile-first usability;
- no fake reviews, metrics, partners, inventory, guarantees or business evidence;
- no catalogue/cart/accounts/ecommerce expansion;
- no return to CRM/dashboard/workstation aesthetics.

## Assets rule
Real Spline material evidence is desirable but **not a prerequisite for a strong V5 composition**.

The base art direction must reach a high visual bar using typography, composition, spacing, surface, proportion and genuine identification semantics alone. Real assets should later improve trust and character, not rescue a weak layout.

Do not use fake/stock business evidence as a substitute.

## Required external research
Before selecting V5 direction:
1. inspect the exact current Spline 390px + 1440px rendered state;
2. revisit the user's previously supplied high-visual-quality benchmark sites;
3. research at least 4 current strong references across automotive, industrial/product, premium service and editorial commerce;
4. identify transferable mechanisms, not layouts to copy;
5. explicitly study how strong sites create richness without cards/dashboard chrome or dependence on photography.

## Required explorations
Develop at least 3 genuinely different compositions. Do not merely rename V4 variants.

At least one direction must explore each of these mechanisms:

### 1. Typographic / graphic automotive composition
Use type, scale, cropping, rules, numbers/identifiers and deliberate overlap/alignment as graphic material. It must feel authored, not like metadata floating in whitespace.

### 2. Service + editorial rhythm
Treat the page as distinct commercial acts with meaningful shifts in scale, density and alignment. Preserve conversion clarity while creating visual narrative.

### 3. Industrial material language without fake imagery
Derive visual character from authentic automotive/parts semantics: label proportions, packaging geometry, stamped/engraved identifier logic, measurement/crop conventions, physical-material cues expressed abstractly — without simulating a CRM, fake product photo, fake document, or decorative HUD.

Directions may combine mechanisms only after each is explored distinctly.

## Specific surfaces to redesign
### Hero
Must have one memorable composition visible in the first viewport. The right/secondary region cannot be merely loose VIN/OEM/PHOTO labels. It needs deliberate graphic mass, tension, alignment or typographic objecthood while remaining category-specific.

### Process
Must remain compact but become a real transition. Avoid three generic cards and avoid a plain text list. Use rhythm/scale/alignment to create progression.

### Request transition
Must feel like one intentional chapter change into the core conversion surface. Avoid a floating dark card or giant empty dark shell.

### Form
Do not change information architecture or fields. Visually redesign the form system so it feels intentionally designed end-to-end:
- custom but accessible file-upload presentation;
- stronger group hierarchy;
- more deliberate field proportions and alignment;
- better density variation;
- refined focus/error/success states;
- submit remains dominant;
- mobile scroll should have visual pacing without adding steps or friction.

## Anti-patterns
Reject directions that rely on:
- huge empty whitespace with little compositional tension;
- generic SaaS minimalism;
- CRM/dashboard patterns;
- generic three-card sections;
- browser-default-looking controls;
- arbitrary metadata floating in space;
- decorative automotive clichés, racing stripes, speedometers, carbon-fiber textures, neon/glow;
- unrelated supercars;
- fake photos/evidence;
- animation used to compensate for weak static composition.

## Evaluation scorecard
Rendered V5 must be judged on:
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
- Trust credibility (only evidence-backed)
- Mobile visual UX

Hard visual targets after implementation:
- Clarity >= 9.0
- Commercial direction >= 9.0
- Character >= 8.5
- Beauty >= 8.7
- Composition >= 8.7
- Typography >= 8.7
- Page rhythm >= 8.7
- Perceived quality >= 8.7
- Mobile visual UX >= 8.7

Scores are invalid unless based on exact-head rendered screenshots.

## Benchmark gate
Before PASS, UI Guard must compare exact-head Spline renders against the agreed competitor benchmark on the same dimensions.

Spline does not need to imitate the competitor. But if it is visibly behind in beauty, composition, rhythm and perceived finish, it must not receive PASS merely because Spline is clearer or more conversion-oriented.

Target outcome: Spline should retain its advantage in commercial clarity while reaching a comparable professional visual ceiling.

## Deliverable for Visual Director
Produce `docs/visual-reset-v5-art-direction.md` containing:
- current rendered diagnosis;
- external research with transferable mechanisms;
- 3 genuinely distinct directions;
- concrete desktop + mobile compositions for each;
- form visual-system direction, not just hero styling;
- provisional scorecard with risks;
- anti-CRM and anti-wireframe tests;
- selected direction with rationale;
- implementation-ready visual contract;
- explicit `ASSET NEEDED` only where real evidence would materially improve the result.

Do not touch frontend code in the Visual Director stage.
