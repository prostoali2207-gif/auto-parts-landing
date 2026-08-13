# Spline — Color & Typography System

Status: approved working system for V1 landing implementation.

## Design intent
Spline should feel precise, mechanical and commercially credible — not like a racing/tuning brand and not like a generic SaaS product.

The logo remains monochrome. Color belongs to the interface system, not to the wordmark geometry itself.

## Color system

### Core neutrals
- `--spline-ink: #151513` — primary text, dark surfaces, strong rules.
- `--spline-paper: #F4F1EA` — primary warm background.
- `--spline-surface: #EAE6DD` — technical panels / secondary surfaces.
- `--spline-muted: #66635C` — secondary text on light backgrounds.
- `--spline-line: #C8C1B5` — dividers / inactive structure.
- `--spline-dark-surface: #1D1D1A` — request-tool / dark functional surface.
- `--spline-dark-muted: #B8B2A8` — secondary text on dark surfaces.

### Brand accent
- `--spline-signal: #E85D24` — controlled signal orange.

Purpose:
- primary CTA emphasis where appropriate;
- active/focus/selected state;
- important request identifiers;
- small high-signal details.

It is **not** a decorative page-wide color and should not become an orange/black motorsport theme.

### Accent usage rules
- Prefer `#151513` text on `#E85D24` fill for controls.
- Do not use signal orange for long body copy or small text on the light background unless contrast is verified.
- Do not color the whole SPLINE wordmark orange by default.
- Avoid gradients, glow, neon, chrome or multiple competing accent colors.

## Why this palette
The current warm paper + charcoal foundation already supports the selected “parts sourcing workstation” direction. The accent adds one controlled recognition/action signal without falling into the default automotive red/black cliché.

All normal text/background combinations must meet WCAG 2.2 AA contrast: 4.5:1 for ordinary text and 3:1 for large text. The logo itself is exempt from the WCAG text-contrast requirement, but practical visibility is still required.

## Typography

### Primary family — IBM Plex Sans
Use **IBM Plex Sans** for:
- hero and section headings;
- body copy;
- buttons;
- form labels;
- navigation.

Reason: IBM Plex is open-source, designed to work well in UI environments, and IBM officially supports Cyrillic. That matters because the current landing is Russian-first and should not silently fall back to a different font for most customer-facing text.

### Technical family — IBM Plex Mono
Use **IBM Plex Mono** only for domain identifiers and machine-like metadata:
- `VIN`;
- `OEM / PART NO.`;
- request numbers;
- step numbers;
- small technical eyebrow labels;
- structured ticket metadata.

Do not use Mono for paragraphs or all UI text.

## Type roles

### Display / Hero
- IBM Plex Sans 700
- tight tracking around `-0.035em` to `-0.045em`
- compact line-height around `0.94–1.0`
- mobile hero should remain approximately 42–46px unless wrapping proves better at a smaller value.

### Section headings
- IBM Plex Sans 600–700
- tracking around `-0.025em` to `-0.035em`
- line-height about `0.98–1.08`

### Body
- IBM Plex Sans 400–500
- 16–19px depending on role
- line-height 1.45–1.6
- no condensed treatment that reduces Russian readability.

### Controls / labels
- IBM Plex Sans 600–700
- avoid artificial all-caps for Russian control text.

### Technical labels
- IBM Plex Mono 600–700
- 10–12px
- uppercase English identifiers where useful
- tracking `0.08em–0.12em`.

## Hierarchy rule
Typography should carry most of the hierarchy. Color is secondary.

Avoid:
- multiple unrelated display fonts;
- sci-fi/futuristic automotive fonts;
- stretched/condensed body copy;
- decorative italics;
- excessive letterspacing on headings;
- all-caps paragraphs.

## Logo relationship
The custom SVG wordmark remains its own asset. Do not recreate it with IBM Plex or other text fonts.

The surrounding UI type should be calmer than the logo, allowing the wordmark’s `SP` connection to remain the distinctive branded gesture.

## Implementation target
Use `next/font/google` with `IBM_Plex_Sans` and `IBM_Plex_Mono`, including Cyrillic and Latin subsets, so Next.js handles font optimization. Expose CSS variables and layer the brand typography/palette over the existing CSS rather than adding another styling framework.

## Sources
- IBM Plex official repository / IBM Design Language — Plex is open-source, designed for UI use, and supports Cyrillic in Sans and Mono.
- W3C WCAG 2.2, Success Criterion 1.4.3 — 4.5:1 minimum contrast for normal text; 3:1 for large text.
