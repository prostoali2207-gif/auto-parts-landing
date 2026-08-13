# Spline — Visual Refinement V3 Revision

## Owner
Automotive Visual Director.

This revision responds to the independent UI Guard review of PR #14. It is a visual-only correction. Do not change funnel structure, request fields, validation, analytics, CRM integration, or add marketing sections.

## Rendered diagnosis
PR #14 improved the interface materially, but the rendered result remains below the launch visual bar.

Independent score snapshot:
- Character 8.2
- Clarity 9.1
- Beauty 7.8
- Visual lightness 7.4
- Composition 8.0
- Typography 8.2
- Page rhythm 7.6
- Perceived quality 7.8
- Originality 8.1
- Commercial direction 9.2
- Trust credibility 6.5
- Mobile visual UX 8.3

The problem is not lack of decoration. The page still uses too much of one technical/editorial register and does not create enough contrast between major acts.

## Preserve
- header → hero → compact process → request form;
- early dominant `Request a Part` action;
- Spline orange / paper / ink identity;
- IBM Plex Sans / Mono roles;
- sourcing ticket as the domain-specific hero object;
- dark request-section transition;
- all existing request logic and CRM contract;
- strong commercial clarity achieved by V3.

## P1 visual corrections

### 1. Desktop hero — create one composed scene
Current issue: headline/CTA and ticket still read as two objects placed in columns rather than one intentional composition.

Direction:
- keep headline as dominant focal point;
- reduce ticket visual mass another step and align it optically to the headline/CTA rather than simply to the grid column;
- use asymmetric spacing so the ticket feels attached to the sourcing story, not like a sidebar card;
- increase contrast between the large headline shape and quiet supporting object;
- do not add decorative imagery or a new panel.

Success test: at 1440px the eye path is headline → CTA → ticket, with no ambiguity and no large area that feels accidentally empty.

### 2. Process — make it a transition, not a flat mini-section
Current issue: lighter than V2, but still visually flat and repetitive.

Direction:
- compress its vertical footprint slightly;
- reduce the sense of three equal cells;
- use typography/spacing to create progression rather than repeated boxes/rules;
- retain all three steps and copy;
- on mobile keep it extremely scannable and clearly subordinate to hero/request.

Success test: process reads in one sweep and creates momentum into the request section.

### 3. Request section — remove dead desktop space
Current issue: the narrow intro column leaves a large inactive dark area while the form carries nearly all information and visual mass.

Direction:
- keep the same two conceptual elements: request intro + form;
- rebalance grid proportions and vertical alignment so the intro participates in the composition;
- allow the heading/supporting copy to occupy a more deliberate area without adding new content;
- the dark negative space must frame the form, not look unfinished;
- form remains the dominant functional surface.

Success test: at 1440px the dark section feels intentionally composed across the full width, not like a form pushed to the right of an empty column.

### 4. Form — raise perceived quality without increasing visual load
Current issue: calm and usable, but still reads as a competent technical form rather than a highly finished sourcing product surface.

Direction:
- strengthen fieldset hierarchy through spacing and typography, not heavier borders;
- make vehicle identification, part identification, and contact groups feel like deliberate stages while remaining one-page;
- further harmonize input/background/border tones;
- reserve the strongest contrast for labels that matter, focus states, and submit;
- keep submit unmistakably dominant;
- do not introduce floating labels, cards, steps, progress UI, gradients, pills, icons, or new interaction.

Success test: the form feels quieter and more expensive while scanning faster.

### 5. Mobile — vary the rhythm
Current issue: mobile is commercially strong, but hero → ticket → process → form still repeats technical labels/rules at a similar cadence.

Direction:
- preserve early CTA and current scroll economy;
- reduce one more layer of small-label/rule emphasis where it is redundant;
- create a clearer quiet beat between the ticket and process/request transitions;
- do not achieve lightness by shrinking important text or touch targets.

Success test: 390px feels deliberate and paced, not like a sequence of technical modules.

## Visual load budget
Per viewport, prioritize hard emphasis in this order:
1. primary CTA / submit;
2. hero headline;
3. one structural hero artifact (ticket);
4. request form boundary.

Everything else should be quieter.

Avoid simultaneous heavy border + hard shadow + orange accent on supporting content. Mono/uppercase labels are identifiers, not decoration.

## Benchmark mechanisms to beat
Do not copy the reference sites. Match or exceed their transferable strengths:
- stronger focal composition;
- controlled negative space;
- scale contrast;
- clear changes of rhythm between page acts;
- typography carrying visual interest instead of decorative UI;
- a finished/premium feel without reducing task clarity.

Spline must remain stronger than the references on commercial direction and request clarity.

## Target score after revision
Independent UI Guard should target:
- Character >= 8.5
- Clarity >= 9.0
- Beauty >= 8.5
- Visual lightness >= 8.0
- Composition >= 8.5
- Typography >= 8.5
- Page rhythm >= 8.5
- Perceived quality >= 8.5
- Commercial direction >= 9.0
- Mobile visual UX >= 8.5

Trust credibility is constrained by missing real business evidence. Do not fabricate proof to raise it.

## Implementation boundary
Frontend should make the smallest complete visual correction on top of PR #14. Prefer modifying the V3 visual layer rather than refactoring unrelated styles/components.

Do not change:
- page order;
- copy unless a purely typographic line-break treatment requires no semantic change;
- form fields or required signals;
- validation/error/success behavior;
- analytics;
- `create-landing-request`;
- CRM integration.

## Required verification
After implementation:
1. build;
2. existing e2e;
3. rendered screenshots at 390px and 1440px from the revision head;
4. independent UI Guard scorecard against the PR #14 baseline;
5. PASS / REVISE / BLOCK;
6. QA only after UI Guard PASS.

VISUAL DIRECTION: APPROVED FOR IMPLEMENTATION
