# V7 mobile hero timing + process numeral fit repair

Status: VISUAL TASTE: READY FOR FRONTEND
Mode: REFINE
Scope: mobile-only implementation repair

## Observed rendered evidence

From the real production phone screenshots/video:

1. The hero mechanical object is already positioned correctly in the mobile composition, but the viewport-triggered opening waits until too much of the object is visible. The perceived signature moment therefore happens lower than intended.
2. In the mobile process sequence, `02` and `03` remain visibly cropped on their right edge after reveal. This is not an intentional final-state treatment. The current mobile collision repair constrains `.stepNo` to a 92px track while the animated `clip-path` clips to that box.
3. Desktop is strong and must not be changed by this repair.

## Root-cause classification

- Hero timing: `IMPLEMENTATION / MOBILE`
- Process numerals: `IMPLEMENTATION / MOBILE`
- Concept: unchanged
- Upstream conversion/UX: unchanged

## Protected invariants

Do not change:
- hero headline, lead, CTA, microcopy or their mobile layout;
- hero-object static final position, scale, silhouette or material treatment;
- desktop hero motion/timing;
- process route/tracer mechanism or `01 -> 02 -> 03` stagger logic;
- process copy/content;
- form, validation, analytics, endpoint, CRM mapping or request flow;
- reduced-motion complete/static fallback.

## Correction contract

### A. Mobile hero timing

Keep the existing one-shot mechanical opening, but release it earlier as the object first becomes meaningfully visible.

Acceptance intent:
- do not run merely on page load;
- require real user scroll;
- do not wait for roughly one-third of the object to be visible;
- target release around the first meaningful entry of the object (~20% visible), so the user watches the opening while scrolling into the hero object rather than after reaching it;
- preserve the exact desktop behavior.

### B. Mobile process numeral fit

Keep the sequential reveal and current visual scale.

Repair the number track so the full `02` and `03` glyphs fit inside the animated clipping box in their final visible state.

Preferred bounded correction:
- increase the mobile number track from 92px to a width that safely contains all two-digit glyphs;
- reduce the inter-column gap proportionally so the text column begins at nearly the same horizontal position;
- do not shrink the numeral typography merely to hide the defect;
- no permanent crop is allowed after reveal.

## Acceptance criteria

At 390px and 360px:
- hero remains armed before user scroll;
- with only a trivial sliver visible, hero remains armed;
- around ~20% object visibility after real scroll, hero opening runs;
- final hero composition is unchanged;
- `01`, `02`, `03` still reveal in sequence;
- after each numeral settles, its rendered text fits inside its `.stepNo` box with no right-edge clipping;
- process copy does not collide with numerals and wrapping remains acceptable;
- no horizontal overflow;
- CTA remains usable;
- reduced motion remains complete/static.

At 1440px:
- no visual or motion change.

## Ready-state gates

FUNCTION: PASS expected
MOBILE: repair required, then re-observe
AUTHORITY: PASS
TRUTH: PASS
ADVANCED MEDIA: existing motion only; no new capability routed
