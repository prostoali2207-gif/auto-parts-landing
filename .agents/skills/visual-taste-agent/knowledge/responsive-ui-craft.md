# Responsive composition and UI craft

Sources: WCAG 2.2, Apple HIG, Material 3 adaptive layouts/states, Baymard mobile form research.

## Responsive is recomposition
Mobile is not desktop scaled down. Preserve intent and hierarchy while changing composition. At each important width reconsider line breaks, columns, crop, order, density, touch reach, whitespace and CTA position.

Design 390 and 1440 deliberately, then ensure the system behaves between them. Avoid breakpoint patchwork caused by a desktop composition that never had a mobile idea.

WCAG requires content to support reflow at narrow equivalent widths without loss of information/functionality or unnecessary two-dimensional scrolling, and text must resize up to 200% without loss.

## Mobile viewport reality
Keyboard and browser chrome reduce usable context. Keep the active form field, its persistent label, instructions and error understandable together. Baymard research supports labels above fields on mobile and warns against disappearing inline labels.

## Touch targets and interaction
Interactive elements need adequate target size and separation. Do not make a visually elegant tiny control that is hard to tap. Focus must remain visible and not obscured. Hover cannot be the only carrier of essential information.

## Form craft
The request form is a commercial core, not decoration.
- persistent labels;
- helper text next to the relevant field;
- explicit required/optional semantics when useful;
- natural input formats;
- correct keyboard/input modes;
- clear focus, filled, error, disabled, loading and success states;
- user input preserved on recoverable errors;
- no success before confirmed downstream acceptance.

Visual richness may surround the form, but completion must remain calm and legible.

## State system
Material emphasizes consistent visual indicators for enabled, disabled, hover, focus, pressed and other states. Design state changes as part of the same graphic language. Do not bolt on default browser-looking errors/focus rings that visually conflict, but never remove focus visibility.

## Spacing
Use a coherent spatial rhythm, but do not turn it into mechanical repetition. Distinguish micro spacing inside controls, relationship spacing between label/field/help, component spacing, section spacing and dramatic compositional gaps. Related items should be closer than unrelated items.

## Density
Density should match task and moment. Hero can be dramatic; form should optimize scanning and completion. Mobile may need fewer simultaneous decorative elements even when desktop is dense.

## Navigation and CTA
Primary request action must remain findable. Art direction may change its form and placement, but not bury it behind interaction tricks. Sticky/floating CTA is a business decision, not an automatic visual flourish.

## Error and recovery
Errors need location, explanation and next action. Do not communicate error through red alone. Avoid layout jumps that make users lose context. Preserve entered data where recoverable.

## Performance-aware craft
Heavy video, WebGL, huge images and excessive scroll effects have a visual cost when they stutter or delay the offer. Art direction must include a graceful reduced-motion/low-power fallback when relevant.

## Responsive review
At mobile and desktop, plus at least one intermediate width when implemented, inspect hierarchy, crop, line breaks, form width, keyboard context, touch targets, overflow, focus/error states, CTA discovery and whether mobile feels intentionally composed.
