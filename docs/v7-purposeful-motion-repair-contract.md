# V7 — Purposeful Motion Legibility Repair

Status: `VISUAL DESIGN / ART DIRECTION REFINE — READY FOR FRONTEND REPAIR`

Source of professional judgment: current frozen `visual-design-art-direction-core@0.2.0-candidate` from `professional-ai-agents`, used in REFINE mode. Candidate remains NOT QUALIFIED; this document is a project refinement contract, not qualification evidence.

Exact production source observed before repair: `f9134b9154ba30717e3b02b23d6fc0418d8f1f25`.

Observed evidence: user mobile screen recording `Screen_Recording_20260831_130209_Brave.mp4`, 390-class Android/Brave viewport, plus exact-main motion implementation and prior CI screenshots.

## Diagnosis

The selected motion concept remains valid, but its implementation failed perceptual legibility in normal use.

### Hero
The first implementation moved layers only a small fraction of the existing exploded distance. In the real recording the object appeared effectively already exploded, so the intended event `compact mechanical assembly -> authored exploded pose` was not perceptible enough.

Classification: `IMPLEMENTATION`.

### Process 01 -> 02 -> 03
The scroll-linked line and numeral reveal existed technically, but the cobalt line and clipped black numerals were too low-salience during ordinary mobile scrolling to register as one connected sequence.

Classification: `IMPLEMENTATION`.

## Protected constraints

- no new visual reset;
- preserve final static V7 composition exactly after motion settles;
- preserve hero copy, CTA hierarchy, form, CRM, validation, analytics, endpoint and request flow;
- no glow, particles, cursor effects, ambient loops, parallax theatre, scroll-jacking, video, canvas or WebGL;
- no fabricated automotive/product evidence;
- primary CTA must remain immediately usable;
- reduced-motion must show the complete final static composition.

## Bounded repair contract

### 1. Hero opening — increase state contrast, not decoration

Use the current final transforms as the approved end state.

Change only the start state and timing:
- start the major layers close enough to cancel most of the existing exploded separation, so the first readable state is one compact mechanical mass;
- resolve outward along the already-established mechanical axis into the unchanged final pose;
- use one coordinated event with a short first-paint hold and controlled deceleration;
- target roughly `1.1–1.2s` after a short `~0.12–0.2s` hold, because the prior ~760ms/small-displacement implementation under-read in real capture;
- no opacity fade, spin, bounce, blur or loop.

Removal criterion: if the larger opening reads as spectacle instead of assembly logic, reduce displacement/timing rather than add secondary effects.

### 2. Process sequence — make direction visible

Keep the existing cobalt construction route and `01 / 02 / 03` sequence.

Strengthen only the communication cue:
- increase numeral reveal travel so each number visibly arrives from the route direction;
- add one narrow acid-green tracer traveling on the same existing connector route;
- tracer is temporary: it disappears after the route is communicated and leaves the original cobalt static line;
- desktop uses horizontal route logic; mobile uses the actual vertical recomposition breakpoint (`<=600px`);
- no independent fades or unrelated per-card animation.

The tracer is justified because it communicates ordered progression; it is not ambient decoration.

### 3. Fallback / accessibility / performance

- `prefers-reduced-motion: reduce`: no hero opening, no process tracer/reveal; final static state only;
- unsupported scroll-timeline browsers: complete static process remains visible;
- CSS-only; no dependency or runtime JS added;
- no horizontal overflow or layout shift;
- no pointer/touch blocking.

## Acceptance evidence

A source/build PASS is insufficient. The repair must be observed in produced browser artifacts.

Required before merge:
1. exact PR-head static renders at 390px and 1440px;
2. hero temporal checkpoints showing materially distinct compact -> intermediate -> final states;
3. process checkpoints showing visible route direction and ordered numeral reveal;
4. reduced-motion static equivalence;
5. CTA and mobile overflow regression checks;
6. Independent UI Guard `PASS / REVISE` from the rendered evidence;
7. QA regression protecting the request flow.

The pass condition is not `animation exists`; it is `the intended mechanical/sequence meaning is visibly legible during ordinary viewing`.
