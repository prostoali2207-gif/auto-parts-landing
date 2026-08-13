# Auto Parts Landing Agent Routing

Read the relevant specialist before changing the landing page.

## Priority

1. `.agents/skills/conversion-agent/SKILL.md`
   Use first for page strategy, value proposition, CTA hierarchy, trust, objections, request-form friction, and any decision intended to increase qualified part requests. It defines what the page must accomplish before UX or visual design begins.
2. `.agents/skills/ux-architect/SKILL.md`
   Use before creating or materially changing the landing page structure, request flow, form, CTA placement, navigation, or mobile journey. Define the visitor job, path to request, friction, trust needs, validation, failure states, and mobile behavior before coding.
3. `.agents/skills/visual-taste-agent/SKILL.md`
   Use when the user says the rendered page looks sterile, weak, generic, wireframe-like, visually cheap, or simply not beautiful enough. This agent is external-reference-first: it must inspect current renders and current high-quality websites/galleries before defining a strong visual direction. It owns taste, visual magnetism, composition, typography, visual richness, and the implementation-ready aesthetic blueprint without changing product logic.
4. `.agents/skills/visual-director/SKILL.md`
   Use for substantial visual direction where the primary problem is implementation of an already understood visual thesis, automotive art direction, asset direction, visual-system consistency, or formal design-contract work. Do not use it as a substitute for Visual Taste Agent when the core complaint is lack of beauty, taste, originality, or visual impact.
5. `.agents/skills/frontend-agent/SKILL.md`
   Use after conversion, UX, and visual direction are clear to implement the page, responsive behavior, forms, uploads, CRM/WhatsApp handoff, performance, and accessibility.
6. `.agents/skills/ui-guard/SKILL.md`
   Use after implementation as an independent rendered visual quality gate. It does not approve source code alone and does not rubber-stamp the visual creator. It compares real rendered output at mobile + desktop against the approved direction and `docs/visual-quality-scorecard.md`, then returns PASS / REVISE / BLOCK.
7. `.agents/skills/qa-agent/SKILL.md`
   Use after UI Guard PASS as the independent release gate. Test the real visitor journey, mobile devices, form submission, VIN/photo flows, WhatsApp/CRM handoff, performance, accessibility basics, and regressions.

## Working rules

- First version is a focused one-page commercial landing page, not a full ecommerce store.
- Primary business outcome is a qualified part request, not page views or decorative engagement.
- Existing CRM is a downstream system; do not rebuild CRM functionality inside the landing page without a clear business reason.
- Prefer the smallest complete solution that improves trust and reduces time to request.
- Mobile-first is mandatory because a large share of traffic is expected from Instagram and messaging apps.
- Do not invent business claims, reviews, ratings, delivery times, stock levels, partners, guarantees, prices, or fake business imagery.
- Unknown business facts must be marked as requiring confirmation.
- Avoid unnecessary catalog, cart, checkout, account, admin, and ecommerce scope in v1.
- Every major section must answer a real customer question or move the visitor closer to a request.
- Use real automotive imagery where appropriate; do not rely on decorative gradients, glassmorphism, dashboard-like blocks, or repetitive rounded cards.
- Keep one dominant primary CTA: `Find My Part` / `Request a Part`.
- For important CRO, ecommerce, buyer-behavior, automotive-parts, marketing, UX, or visual-direction decisions, use current external evidence when tools are available rather than relying only on assumptions.
- For substantial aesthetic work, current external visual research is mandatory when browsing is available. User-supplied competitor/reference URLs must be inspected, not merely acknowledged.
- Visual quality is not defined only by absence of defects. A page can be functional and still receive UI Guard REVISE for mediocre composition, hierarchy, rhythm, typography, perceived quality, visual magnetism, or mobile art direction.
- Do not publish without both UI Guard PASS and QA PASS unless the user explicitly chooses a faster visual-only iteration and accepts that those gates were skipped.

## Visual quality system

For a beauty/taste problem:

`Visual Taste Agent → Frontend Agent → rendered review`

Add Conversion / UX only if the task actually changes strategy, structure, fields, or interaction. Do not turn a visual rescue into a full multi-agent pipeline by default.

For substantial product/visual work that changes more than appearance:

`Conversion Agent → UX Architect → Visual Taste Agent / Visual Director → Frontend Agent → UI Guard → QA Agent`

Visual creator and final rendered reviewer should remain separate for launch-critical substantial redesigns.

Use `docs/visual-quality-scorecard.md` for consistent comparison against strong external references and previous Spline iterations.

## Current implementation order

Choose the smallest specialist path that matches the actual problem. For "сделай красиво / выглядит слабо / не хватает насмотренности": Visual Taste Agent first.
