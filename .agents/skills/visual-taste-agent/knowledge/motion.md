# Motion knowledge

Sources: Material 3 Expressive motion guidance, Apple design guidance, and WCAG motion/accessibility requirements.

Motion needs a job: orient, reveal hierarchy, connect states, communicate causality, or create a deliberate emotional beat. If an animation has no job, remove it.

Avoid the generic pattern where every element independently fades upward. Choreograph related movement as one composition.

Motion character comes from acceleration, duration, distance and sequencing. Small state changes should feel immediate; large spatial transitions may take longer. Do not use one easing and duration for every event.

Scroll effects can reveal scale, layering and sequence but must justify complexity. Avoid scroll-jacking and excessive pinned scenes that reduce user control, reading speed or performance.

Motion must not delay access to the primary request action. Never make users wait for decorative choreography before they can understand or act.

Design hover, focus, pressed, loading and success transitions as part of the same visual language while preserving clear state recognition.

Provide a coherent reduced-motion behavior. Removing animation must not remove content, meaning, status or access. Avoid motion patterns that create unnecessary vestibular discomfort.

Performance is part of motion quality. Stutter, late-loading effects and unstable layout destroy perceived craft. Prefer fewer well-executed motions over many fragile effects.

Review real motion in-browser, not from code. Check purpose, timing, sequencing, interruption, scroll control, reduced-motion completeness, mobile performance and whether the page remains usable before/while animations run.
