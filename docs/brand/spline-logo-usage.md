# Spline — logo usage rules

Status: production usage contract for the approved A1 wordmark.

## Primary logo
Use `public/spline-wordmark.svg` as the canonical logo asset.

The logo is a monochrome custom `SPLINE` wordmark. The `SP` connection is the only signature intervention. Do not add a separate icon, badge, gear, car silhouette, shield, speed line, or secondary emblem unless a later channel constraint proves it necessary.

## Color behavior
The SVG uses `currentColor` and a true transparent knockout in the `SP` connection.

Approved behavior:
- dark mark on light backgrounds;
- light mark on dark backgrounds;
- one-color reproduction only.

Do not bake a white rectangle into the `SP` gap. The gap must remain transparent so the background shows through.

## Minimum size
Digital production minimum:
- preferred header height: 24–30 px;
- minimum approved rendered height: 24 px;
- 16 px is stress-test territory only and should not be used as the normal wordmark size.

If the logo must appear smaller than 24 px, do not invent a micro-logo automatically. First test whether the context can use plain text `Spline` or a larger placement.

## Clear space
Use the cap-height of the `I` stem width as the base unit `x`.

Minimum clear space around the wordmark:
- left/right: at least `2x`;
- top/bottom: at least `1.5x`.

For headers, CTA buttons, menu icons, and container edges must not enter this clear-space zone.

## Backgrounds
Approved:
- solid light neutral background with dark logo;
- solid dark/graphite background with light logo;
- quiet photographic areas only when contrast remains strong and the wordmark is fully readable.

Avoid:
- busy part photography directly behind the logo;
- gradients crossing through letter counters;
- low-contrast mid-tone-on-mid-tone combinations;
- placing the mark over visual texture that obscures the `SP` knockout.

## Geometry protection
Never:
- stretch or condense the SVG;
- alter individual letter widths;
- change spacing between letters in CSS;
- redraw the `SP` connection in CSS;
- rotate, skew, outline, shadow, bevel, chrome, or add 3D effects;
- recolor individual letters independently;
- add a bounding badge around the wordmark.

Always preserve the SVG aspect ratio.

## Accessibility / implementation
When the logo is inside a link, the link must have an accessible name such as `aria-label="Spline"`.

If the SVG is decorative inside an already-labelled link, use an empty alt or hide the image from assistive technology rather than repeating the brand twice.

## Current header implementation
Target production use:
- mobile: approximately 24 px rendered logo height;
- desktop: approximately 28–30 px rendered logo height;
- logo remains visually secondary to the primary `Find My Part` / request CTA.

The brand must support conversion, not dominate the header.

## Final acceptance gate
Before approving any new placement, verify:
1. `SPLINE` reads immediately;
2. the `SP` gap remains visibly open;
3. contrast is strong;
4. aspect ratio is untouched;
5. no other element crowds the clear space;
6. the mark still looks like a serious automotive-parts brand rather than tuning, gaming, or software branding.
