# V7 product-specific refinement

## Frozen input

- Spline base: `572cd2e663e15acf438e02cd86f5dad7b43a0674`
- Fresh provider-backed Visual Taste run: `professional-ai-agents` Actions `33365069863`
- Frozen Visual Design / Art Direction core commit used by runtime: `0116d20f99fde919fa6e39c700726d16310d010b`
- Runtime model: `gemini-3.5-flash-lite`

The run captured the exact Spline base at 390px and 1440px plus direct 390px Chromium renders of the four user-supplied references:

- `https://shamsiiii19.github.io/sh/`
- `https://albinagas.github.io/lll/`
- `https://samirka11.github.io/smm/`
- `https://nissanr34ol.github.io/samirprobrand/`

## Independent Visual Taste verdict

`REFINE` — not reset.

P1 findings:

1. The exploded hero object reads too close to an optical/camera lens and needs an unmistakable automotive-mechanical anchor.
2. The request surface drops from the V7 dark editorial art direction into a flat utility-white form surface.

## Exact implementation contract

- Keep the current hero composition, monumental typography, acid primary actions, process structure, evidence chapter, and V7 palette roles.
- Refine the exploded object toward a headlamp-projector / mounting-bracket / precision-machined-flange visual identity without implying a real SKU, supplier, fitment, availability, or technical specification.
- Keep the object abstract/CSS-authored; use automotive-mechanical silhouette and mounting geometry rather than generic orbital/lens decoration.
- Make the request work surface deep graphite (`#101419`) with steel-grey framing and cold-white typography/controls while preserving clear single-line control geometry and high contrast.
- Mobile inputs remain at least 48px high, single-column, non-overflowing, and clearly separated into 01/02/03 form groups.
- Preserve the asymmetric 1440px hero composition.

## Hard do-not-touch

- Request workflow and all fields.
- Validation and upload behavior.
- Analytics.
- `create-landing-request` endpoint and CRM mapping.
- Success/error semantics.
- Acid primary CTA color.
- `Unbounded` display and `Manrope` body/control typography.
- No infoproduct/course layouts, generic SaaS cards, fake urgency, stock-coach imagery, or glow/blob imitation from references.

## Release route

`Frontend implementation -> exact rendered review -> independent UI Guard -> independent QA -> merge -> production smoke`
