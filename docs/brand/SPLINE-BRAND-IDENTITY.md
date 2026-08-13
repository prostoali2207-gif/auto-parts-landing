# Spline — Brand Identity Spec

Status: **canonical V1 brand identity specification — FINAL**

This document consolidates the approved Spline identity system. If another branding note conflicts with this file, this file is the canonical V1 reference.

## 1. Brand core

**Brand:** Spline

**Core idea:** precision / fit / connection.

The name has a real mechanical association: spline geometry is about compatible mating surfaces and controlled transfer. The identity should use that meaning subtly rather than literally illustrating a spline shaft.

Spline should feel:
- precise;
- mechanical;
- practical;
- controlled;
- modern;
- commercially credible.

Spline should not feel:
- motorsport/tuning;
- luxury-car lifestyle;
- gaming;
- generic SaaS/3D software;
- fake industrial cosplay.

## 2. Primary logo

Canonical asset:

`public/spline-wordmark.svg`

**Approved construction:** `A1.1 BALANCED`.

The primary identity is the custom uppercase `SPLINE` wordmark.

### Signature idea
The opening `SP` relationship carries one restrained precision/connection intervention.

Rule:

**Read SPLINE first. Notice the connection second.**

The logo must never sacrifice immediate readability to demonstrate the mechanical metaphor.

### Production validation
The approved A1.1 geometry has been checked at:
- 48 px rendered height — PASS;
- 32 px — PASS;
- 24 px — PASS;
- light background — PASS;
- reverse/light mark on dark background — PASS.

Production SVG is path-based and has no runtime font dependency.

### Header sizing
Current V1 mobile header implementation: approximately `103 × 24 px`.
Preferred desktop rendered height: `28–30 px` where space allows.

### Logo color
The logo is **monochrome only**.

Approved:
- Spline Ink / dark mark on light backgrounds;
- light/white mark on dark backgrounds.

The signal orange is not the default logo color.

### Logo restrictions
Do not:
- recolor individual letters;
- stretch or condense;
- alter spacing;
- redraw the SP connection in CSS;
- recreate the logo with a live font;
- add shadow, bevel, chrome or 3D effects;
- add a car silhouette, gear, shield, wing, speed line or badge;
- place the wordmark inside a decorative emblem.

### Minimum size
Digital minimum rendered height: **24 px**.

Preferred:
- mobile header: ~24 px;
- desktop header: ~28–30 px.

16 px is a stress-test size, not normal production use.

### Clear space
Use the `I` stem width as base unit `x`.
Minimum:
- left/right: `2x`;
- top/bottom: `1.5x`.

### Compact use
No separate monogram, badge or secondary symbol is approved in V1.

For physically constrained applications only, reuse the opening `S` geometry directly from the approved wordmark.

Approved compact use cases:
- favicon / browser icon;
- small circular Instagram / Telegram avatar;
- very small square profile image;
- tiny document/app stamp where the full wordmark becomes unreadable.

The compact `S` is not a new logo architecture. It is a constrained derivative of the primary production wordmark.

Do not:
- invent an `SP` monogram;
- add a notch or decorative cut to the `S`;
- put it inside a shield, gear, hexagon or outlined badge;
- alter its proportions independently of the primary wordmark.

## 3. Color system

### Core neutrals
- `Spline Ink` — `#151513`
- `Spline Paper` — `#F4F1EA`
- `Spline Surface` — `#EAE6DD`
- `Spline Muted` — `#66635C`
- `Spline Line` — `#C8C1B5`
- `Spline Dark Surface` — `#1D1D1A`
- `Spline Dark Muted` — `#B8B2A8`

### Signal color
- `Spline Signal` — `#E85D24`
- interactive hover working token — `#F06A32`

Use Signal orange for primary action/state emphasis and small brand signals; never as page-wide decoration or a default orange/black automotive theme.

### Contrast
Normal UI text/background combinations must meet WCAG 2.2 AA:
- 4.5:1 for ordinary text;
- 3:1 for large text.

## 4. Typography

### Primary family
**IBM Plex Sans** — headings, body, buttons, navigation, form labels and general UI.

### Technical family
**IBM Plex Mono** — VIN, OEM/PART NO., request/reference numbers, step numbers and technical metadata only.

Do not use Mono for normal paragraphs.

### Type hierarchy
Hero/display:
- IBM Plex Sans 700;
- tracking about `-0.035em` to `-0.045em`;
- line-height `0.94–1.0`.

Section headings:
- weight 600–700;
- tracking around `-0.025em` to `-0.035em`.

Body:
- weight 400–500;
- 16–19 px;
- line-height 1.45–1.6.

Technical labels:
- IBM Plex Mono 600–700;
- 10–12 px;
- uppercase English identifiers where useful;
- tracking `0.08em–0.12em`.

Typography should carry hierarchy before color or decoration.

## 5. Graphic language

The visual system is built around:

**PRECISION / FIT / CONNECTION**

Approved supporting devices, used sparingly:
- short alignment/index ticks;
- datum-like lines;
- small numbered references;
- matched positive/negative shapes;
- aligned interruptions in rules;
- thin straight rules;
- open frames;
- hard rectangular crops;
- asymmetric technical layouts.

These devices must structure information or reinforce fit/identification. They must not become fake engineering decoration.

## 6. Photography

Priority subjects:
1. Real auto parts.
2. OEM / part-number labels and real packaging where safe to show.
3. Connectors, mounting points, teeth, housings, seals, machined surfaces and fasteners.
4. Real inspection / part-in-hand moments.
5. Genuine shelves, boxes, receiving/sourcing context.
6. Vehicle context only when useful for fitment/identification.

Prefer believable color, neutral light, tight/medium crops and one clear subject.

Avoid cinematic grading, HDR, chrome glow, generic supercars, racing/drifting imagery, staged mechanics and AI-generated fake inventory/facilities presented as real.

## 7. Brand applications

### Landing page
Use full A1.1 wordmark, Paper/Ink foundation, Signal orange sparingly, IBM Plex Sans + Mono roles, useful technical rules/index marks and real part photography where available.

### Instagram / Telegram
Preferred composition:
- full wordmark where space allows;
- compact approved `S` derivative only for the profile/avatar constraint;
- one strong real image;
- short headline;
- optional small technical identifier;
- one Signal orange accent maximum.

Avoid badge/sticker overload, gradients and tuning-poster aesthetics.

### Documents / quotes / request sheets
Use wordmark top-left, visible request/reference number, monochrome-first hierarchy and orange only as a small status/reference signal.

### Packaging / stickers
Future only when required. Prioritize wordmark, reference/OEM/request data, one- or two-color reproduction, durability and legibility.

## 8. Explicit exclusions

Do not introduce without a new documented brand decision:
- gear/cog symbols;
- car silhouettes;
- wings;
- shields;
- checkered flags;
- speed lines;
- carbon-fibre texture;
- chrome logo effects;
- neon glow;
- generic red/black tuning palette;
- fake CAD/HUD graphics;
- repeated spline-shaft patterns;
- glassmorphism;
- generic SaaS gradient language;
- AI-generated fake inventory/facilities.

## 9. Identity consistency test

Any new Spline visual should pass these questions:
1. Does it feel precise, practical and mechanical without an automotive cliché?
2. Does it support fit / connection / identification or provide real evidence?
3. Is the communication still simple?
4. Is the A1.1 logo geometry protected?
5. Is Signal orange being used as a signal rather than decoration?
6. Is typography following the Plex Sans / Mono role split?
7. Would removing this visual element make the communication worse?

If the answer to #7 is no, remove it.

## 10. V1 identity status

The core Spline brand identity system is **complete and frozen for V1**.

Approved V1 deliverables:
- brand name: Spline;
- primary wordmark: A1.1 BALANCED;
- canonical path-based SVG asset;
- 24/32/48 px production validation;
- light/reverse validation;
- constrained compact `S` derivative for tiny square/circular placements;
- logo usage rules;
- color system;
- typography system;
- graphic language;
- photography direction;
- application rules;
- exclusions and consistency test.

Future brand work should be application-driven, not another exploration round.

Possible later tasks only when actually needed:
- physical signage;
- packaging/sticker system;
- business cards;
- bilingual Arabic identity typography review;
- trademark/legal clearance beyond preliminary naming research.
