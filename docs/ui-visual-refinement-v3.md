# Spline Landing — Visual Refinement V3

## Scope

This is a visual/UI refinement only.

Do not redesign the funnel, change the approved page order, add marketing sections, or change the request-form contract.

Preserve:
- header → hero → compact process → request form;
- early `Find My Part / Request a Part` access;
- current request fields, validation, success/error behavior, analytics, `create-landing-request`, and CRM handoff;
- Spline wordmark;
- warm paper / ink / orange brand palette;
- IBM Plex Sans / Mono roles;
- technical parts-sourcing identity.

## Problem

The current UI has a clear character, but too many elements speak with the same visual intensity:
- hard borders;
- hard shadows;
- technical labels;
- boxed surfaces;
- repeated rules;
- dense instructional treatment.

The result is credible and distinctive, but visually heavier than necessary. The page needs more beauty, compositional contrast, and breathing room without becoming a generic design-showcase landing page.

Target change: remove roughly 25–30% of visual weight while preserving the industrial character and conversion clarity.

## Direction

### Selected direction — `Precision Editorial Automotive`

Keep the current parts-sourcing workstation foundation, but combine it with a calmer editorial composition:
- one strong focal object per viewport;
- stronger scale contrast;
- fewer simultaneous borders/shadows;
- more quiet negative space;
- technical language used selectively, not everywhere;
- orange reserved for actions and one or two high-value accents;
- typography and layout carry more of the personality.

This is not luxury minimalism. It must still feel mechanical, practical, and specific to part identification.

## Visual calibration

- Visual boldness: 6.5/10
- Density: 4/10
- Motion: 1.5/10
- Industrial character: 6.5/10
- Trust formality: 7/10

Compared with the current UI, reduce density and decorative mechanical treatment, not commercial confidence.

## Hero

The hero should become the most visually beautiful and memorable part of the page.

Keep:
- current proposition;
- one dominant CTA;
- sourcing ticket as the domain-specific visual object.

Refine:
- increase whitespace around headline and CTA;
- reduce the amount of small technical text visible at once;
- let headline typography do more of the visual work;
- make the ticket visually quieter and more precise;
- remove unnecessary heavy shadow/border competition between CTA and ticket;
- preserve clear separation between offer and supporting technical object.

The ticket should read as one intentional artifact, not another dense information panel.

## Technical ticket

Keep the object because it gives Spline automotive sourcing identity.

Reduce visual load:
- one strong outer rule instead of multiple competing treatments;
- lighter internal separators;
- smaller number of orange accents;
- softer or smaller hard shadow;
- clearer spacing between code, strong label, and helper text;
- maintain high legibility at 390px.

Do not turn it into a rounded SaaS card.

## Process strip

The process remains compact and functional.

Refine:
- reduce divider dominance;
- use spacing and type hierarchy before extra rules;
- step numbers can remain mono/orange, but should not compete with headings;
- on mobile, rows must scan immediately and feel lighter than the ticket and form.

The process is support content, not a fourth hero element.

## Request section

The request surface remains the strongest functional area after the hero.

Current weakness: the form has too much simultaneous visual weight from dark surround + light panel + thick rules + hard shadow + dense field borders.

Refine:
- keep the dark section transition;
- reduce form-panel shadow and outer-border intensity;
- preserve a clear form surface but make it calmer;
- use field spacing, labels, and section grouping as the primary structure;
- reduce unnecessary contrast between every field and the form background;
- retain clear focus, invalid, upload, disabled, loading, and success states;
- keep submit button unmistakably dominant.

Do not use floating labels, glassmorphism, gradients, pills, or multi-step wizard styling.

## Typography

Typography should contribute more beauty than decoration.

- Preserve IBM Plex Sans / Mono.
- Keep strong headline scale but avoid overly compressed wrapping.
- Increase hierarchy through whitespace and weight before adding graphic devices.
- Mono labels should feel like identifiers, not decorative captions attached to everything.
- Avoid introducing another font family.

## Borders, shadows, and surfaces

New rule: every hard rule or shadow must have a structural reason.

Use:
- 1px rules by default;
- 2px only for a major boundary or focal object;
- hard shadows only on one or two priority elements per viewport;
- square or very small-radius surfaces.

Reduce:
- stacked border + shadow + color accent on the same object;
- equal visual treatment for ticket, process, form, and controls;
- decorative rule density.

## Color

Keep the current palette.

Orange remains a signal, not a background decoration.

Priority for orange:
1. primary CTA / submit;
2. key step or identifier accent;
3. focus/interaction where useful.

Do not add gradients, extra accent colors, metallic effects, or glow.

## Mobile 390px

Primary goal: lighter and more premium without adding scroll length.

Require:
- CTA remains visible early;
- no extra sections;
- no larger vertical gaps that delay the request form;
- ticket remains compact;
- process remains shorter than one viewport;
- form fields remain single-column and thumb-friendly;
- no horizontal overflow;
- visual reduction must improve scanning, not merely make elements smaller.

## Desktop 1440px

Primary goal: stronger composition and more intentional empty space.

Require:
- hero feels designed, not merely arranged in two columns;
- ticket does not visually equal the headline/CTA;
- large empty areas must feel intentional rather than unfinished;
- process acts as a transition, not a full content section;
- request form remains dominant and balanced against the intro column.

## What not to copy from inspiration sites

Do not import visual effects simply because they look impressive in portfolio/personal-brand landing pages.

Reject unless justified:
- cinematic intro sequences;
- large decorative photography unrelated to real parts sourcing;
- oversized inspirational copy;
- scrolling text marquees;
- decorative blobs/gradients;
- animation-first storytelling;
- pseudo-luxury whitespace that delays the task;
- generic premium cards.

Transfer only the useful mechanisms:
- stronger focal hierarchy;
- contrast of scale;
- compositional rhythm;
- controlled negative space;
- fewer simultaneous visual devices;
- more deliberate typography.

## Acceptance criteria

At 390px:
- no new vertical section or additional conversion step;
- request section begins at least as early as V2;
- hero feels visually cleaner than V2;
- ticket has visibly less border/shadow density;
- process scans faster than V2;
- form feels calmer while retaining strong grouping and field clarity;
- CTA and submit remain the strongest orange elements.

At 1440px:
- hero has one clear focal hierarchy: headline → CTA → ticket;
- no object uses border + heavy shadow + multiple accent treatments without necessity;
- visual rhythm varies intentionally between hero, process, and request;
- the interface retains automotive/parts identity after removing the wordmark and `auto parts` wording;
- no generic SaaS, luxury, or AI-template look.

## Handoff boundary

This document is owned by UI Guard / Automotive Visual Director.

Frontend Agent may implement only these visual refinements and must not:
- alter product strategy;
- change form requirements;
- add sections;
- change CRM integration;
- change validation/analytics/success/error logic.

After implementation:
1. build;
2. existing e2e;
3. rendered screenshots at 390px and 1440px;
4. UI Guard rendered review;
5. QA release gate.
