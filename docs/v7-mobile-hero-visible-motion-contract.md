# V7 Mobile Hero Visible-Motion Refinement Contract

Status: **VISUAL TASTE: READY FOR FRONTEND**

## Routing and evidence

This is a narrow `REFINE` task, not a new visual reset.

Authoritative project route:
- `AGENTS.md`
- `.agents/skills/visual-taste-agent/SKILL.md`
- `.agents/skills/visual-taste-agent/knowledge/responsive-ui-craft.md`
- `.agents/skills/visual-taste-agent/knowledge/motion.md`
- `.agents/skills/frontend-agent/SKILL.md`
- `.agents/skills/ui-guard/SKILL.md`
- `.agents/skills/qa-agent/SKILL.md`

Agent Architect methodology was used for failure classification and repair discipline. The reusable `visual-design-art-direction-core@0.2.0-candidate` remains explicitly NOT QUALIFIED, so it does not replace the project-local Visual Taste Agent. Its `REFINE` model is used only as supporting methodology: observe the produced artifact, classify the responsible layer, make a bounded repair, then re-observe.

Observed artifacts:
- exact current `main` full-page render at 390px and 1440px, source commit `8e178b98bc1ca85688e0a154bb1e16dc12175ef4`;
- real phone recording supplied by the user from the production site.

## Observed gap

Desktop and mobile contain the same approved mechanical opening animation, but the produced experience is not equivalent.

On desktop the hero object is already a major visible focal point when the page loads, so the one-shot mechanical opening is seen immediately and contributes strongly to the first impression.

On the real phone recording the first viewport is dominated by headline, explanation and CTA. Only a small lower portion of the hero object is initially visible. The existing hero animation begins on page load anyway, so most or all of the opening completes before the user scrolls far enough to see the object as a meaningful composition.

This is an **IMPLEMENTATION / MOBILE** failure, not a concept failure and not an argument for adding new decoration.

## Thesis

**On mobile, preserve the exact V7 mechanical hero object and its existing opening language, but trigger the opening at the moment the object becomes meaningfully visible during real user scroll instead of spending the animation off-screen.**

The mobile signature moment should feel like the object is briefly held in a compact mechanical state and then opens into the already-approved exploded assembly as the visitor reaches it.

## Protected invariants

Do not change:
- desktop hero composition or desktop hero timing;
- hero copy, wrapping intent, CTA hierarchy or CTA destination;
- static final geometry/material treatment of the hero object;
- process `01 -> 02 -> 03` route/tracer/number sequence;
- evidence section;
- request form layout or behavior;
- validation;
- analytics;
- endpoint;
- CRM mapping/request lifecycle;
- success/error semantics;
- accessibility of the primary request path.

No new glow, particles, parallax, scroll-jacking, pinned scene, WebGL, 3D library, looping motion or decorative effect.

## Mobile motion contract

Applies only at `max-width: 600px` and only when `prefers-reduced-motion: no-preference`.

1. The no-JS/default visual state remains the current final static object. The decorative object must never disappear or become functionally required.
2. After hydration, while the object is still outside meaningful attention, arm the object into the existing compact/assembled start positions.
3. Do not release the opening merely because a small sliver intersects the initial viewport.
4. Require real user scroll before release.
5. Release once the hero object is meaningfully visible (target: roughly one third to two fifths of the object visible, with the object inside the usable viewport).
6. Run exactly once.
7. Use the existing V7 opening keyframes and mechanical axis. Do not invent a second visual language.
8. The final frame must be pixel-equivalent in layout/geometry to the current approved mobile final state; the repair changes *when* the motion is seen, not the static composition.
9. The CTA and text are available immediately and never wait for the animation.
10. If `IntersectionObserver` is unavailable, use a small scroll/geometry fallback. Do not depend on experimental scroll-timeline CSS.

## Reduced motion

With `prefers-reduced-motion: reduce`:
- no hero opening animation;
- no compact armed state;
- show the complete final static hero object;
- preserve the complete static process and request path.

## Acceptance evidence

Frontend verification must prove on an exact PR head:
- at 390px before user scroll, the mobile hero is armed and the hero part animation is not already running to completion off-screen;
- after real scroll reaches the trigger zone, the hero transitions to a run state and the existing mechanical opening animation starts;
- compact, midpoint and final mobile frames are captured after the viewport-triggered release;
- at 1440px the existing load-time hero animation remains unchanged;
- full-page reduced-motion 390px and 1440px renders retain the current static composition;
- no horizontal overflow;
- primary CTA remains usable;
- `01 -> 02 -> 03` behavior remains unchanged;
- reduced-motion remains complete/static;
- no form/request code or CRM contract changes.

## Ready-state gates

- FUNCTION: PASS — request action and content are not delayed or changed.
- MOBILE: PASS by contract — the strong mechanical moment is moved into the mobile attention window rather than copied blindly from desktop timing.
- AUTHORITY: PASS — visual/motion timing only; no UX/CRO/product logic is changed.
- TRUTH: PASS — decorative abstract mechanical object remains non-evidentiary.
- ADVANCED MEDIA: PASS / not escalated — native CSS + `IntersectionObserver`; no heavier media capability is justified.

Frontend implements only this bounded repair. Independent UI Guard must judge the produced mobile motion and desktop non-regression before QA.