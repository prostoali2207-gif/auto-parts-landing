# V7 — Purposeful Motion / Visual Effects Contract

Status: `VISUAL TASTE: READY FOR FRONTEND`

Scope: **narrow motion/effects refinement only**. No visual reset.

Exact source inspected: `d55299ade202888fd4e48474f9642a79dfe9050a`.

Rendered review inspected at mobile `390px` and desktop `1440px` from the exact-main CI artifact, plus the user-provided current production screenshots.

## Visual Taste verdict

The current V7 static composition is already coherent and mechanically legible. The remaining opportunity is not more decoration; it is a small amount of authored motion that reinforces the existing `EXPLODED OBJECT` concept and the vehicle → part → contact sequence.

Do **not** add generic visual-effects language such as glow, particles, cursor trails, parallax theatre, floating gradients, SaaS reveal stacks, or independent fade-up animations.

## Motion jobs

Every effect must do one of these jobs:
1. explain the hero as one mechanical assembly opening in space;
2. connect the three request inputs as one ordered sequence.

Nothing else needs motion in this pass.

## Exact frontend contract

### 1. Hero — one mechanical opening event
- On first paint only, the main exploded layers start slightly closer to the housing and settle into the existing exploded pose.
- Animate the existing backplate / bracket / housing / carrier / flange / front cap / connector along the already established assembly axis.
- One coordinated event: no unrelated spins, bouncing, glow, blur or opacity fade.
- Target duration: about `700–800ms` with a controlled deceleration.
- Headline, lead, CTA and header remain immediately static/readable/clickable. Motion must never delay the request action.
- Existing pointer hover may still extend the separation after the intro completes.
- No looping.

### 2. Process — one connected scroll sequence
- As `Три шага — одна заявка` enters the viewport, the existing connector line draws across the composition from step 01 toward step 03.
- The large numerals `01 / 02 / 03` reveal in the same direction as the connector reaches them.
- This must read as one sequence, not three independent component animations.
- Use mask/clip/translation rather than generic opacity + upward fade.
- Keep all step copy readable even before/without animation; numbers and line are expressive support, not required information.
- No scroll-jacking, pinning or forced pacing.

### 3. Form remains calm
- Do not animate form groups, labels, fields or the evidence chapter in this pass.
- Preserve the existing CTA press/focus/loading/success behaviors.
- Do not turn the request surface into an animated showcase.

### 4. Accessibility / fallback
- Under `prefers-reduced-motion: reduce`, show the final static state immediately and disable the hero intro and scroll-sequence animation.
- Unsupported scroll-animation browsers must receive the complete static process composition; no hidden numbers or missing connector.
- Motion must not cause horizontal overflow, layout shift, focus displacement or pointer/touch blocking.

### 5. Performance
- CSS-first; no WebGL, video, canvas, animation library or new runtime dependency.
- Prefer transform / clip-path on already-rendered decorative elements.
- No continuous animation after the one-time hero opening.

## Acceptance criteria

- Current V7 hierarchy and current hero-object visual design remain intact after motion settles.
- Hero opening visibly reinforces one mechanical assembly rather than AI/sci-fi decoration.
- Process motion visibly reinforces `01 → 02 → 03` continuity.
- No generic fade-up stack, particles, glow, parallax theatre or looping ambient movement.
- Mobile `390px`, intermediate `768px`, desktop `1440px` remain compositionally stable.
- Primary CTA is usable during hero motion.
- `prefers-reduced-motion` produces the same final visual composition without motion.
- Copy, form structure, CRM, validation, analytics, endpoint and request flow are unchanged.

After implementation: exact PR-head rendered review by Independent UI Guard, then targeted QA protecting request flow and reduced-motion/mobile behavior.
