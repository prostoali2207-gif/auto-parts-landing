# Typography knowledge

Typography is structural: it controls hierarchy, voice, reading speed, density, rhythm, credibility and perceived quality.

Sources to consult when needed: Matthew Butterick's Practical Typography; Ellen Lupton's Thinking with Type; Robert Bringhurst's The Elements of Typographic Style; Apple HIG Typography; W3C WCAG 2.2.

## Roles before fonts
Define display/hero, section heading, body, supporting/meta, labels/controls, and identifiers only when useful. Every role needs a reason. One excellent family can be stronger than several pairings.

## Typeface selection
Judge personality fit, apparent size/x-height, width and paragraph texture, weights/variable axes, numerals, punctuation, mobile readability, availability and compatibility with any second face. Render real Spline copy before approval.

## Pairing
Pair by purposeful contrast such as serif/sans, width, construction, texture or historical voice. Avoid pairs that clash or are too similar to establish hierarchy. Test headline, body, form labels, VIN/OEM and CTA together.

## Apparent size
Nominal CSS size is not visual size. Fonts at the same size can appear materially different. Tune by rendered appearance. Butterick gives roughly 15–25px as a broad web body-text starting range, not a fixed token.

## Measure
Long lines hurt tracking. Butterick recommends roughly 45–90 characters including spaces for general text. Use this as a diagnostic range, not a rule for headlines or labels. Bound body and help-copy width on desktop.

## Leading
Butterick gives roughly 120–145% of type size for much ordinary text. Actual leading depends on face, x-height, measure and weight. Display type can be tighter. Never apply one line-height ratio to every role.

WCAG text-spacing values are resilience tests: content must not break when users increase spacing. They are not mandatory authored values.

## Tracking and kerning
Do not use letter-spacing as a generic style. Body lowercase usually needs restrained/default tracking; large display may need optical tightening; small uppercase labels may need more tracking. Judge major display words optically at final size.

## Weight
Weight changes hierarchy and texture. Avoid excessively thin small text. Do not default mechanically to bold headings and regular body.

## Hierarchy
Use size, weight, width, value/color, case, spacing, placement and typeface selectively. Do not max every signal. A squint test should reveal primary promise, explanation and action immediately. Preserve hierarchy across responsive sizes rather than scaling all text equally.

## Display typography
Treat large type as composition. Inspect text-block silhouette, semantic line breaks, rag, viewport-edge relationships, crops/overlaps, counters/negative space and relationship to imagery. Bigger is not automatically stronger.

## Body typography
Keep paragraphs comfortable and credible. Reject tiny gray text, overlong measure, excessive caps, forced justification and decorative paragraph faces.

## Forms
Persistent labels must stay visible; placeholder is not a label. Baymard research supports labels above fields on mobile to preserve width and context. Keep helper/error text adjacent to the field. Ensure entered VIN/OEM/phone data is readable and not clipped.

## Identifiers
Monospace can be appropriate for VIN/OEM when it improves character scanning. Check 0/O, 1/I/l. Never use monospace merely to make the site feel technical.

## Responsive
Do not merely shrink desktop type. Recompose line breaks, max-width, leading, tracking and columns. Test long words. WCAG requires text resizing to 200% without loss of content/functionality and reflow without unnecessary two-dimensional scrolling.

## Optical alignment
Geometric alignment is not always optical alignment. Major display typography can use optical compensation where robust, but avoid brittle pixel hacks.

## Failure modes
Reject too many families/weights; giant type without compositional purpose; tiny low-contrast copy; arbitrary uppercase; decorative monospace; random tracking; one line-height everywhere; forced desktop line breaks on mobile; typography that competes with the CTA; and font choices made from specimens without real-copy testing.

## Render review at 390 and 1440
Check: reading order; personality; role coherence; body apparent size/measure/leading; intentional line breaks; display scale; labels/helper/errors; numeral/identifier differentiation; mobile hierarchy; zoom/reflow resilience; and whether any choice exists only because it is fashionable.
