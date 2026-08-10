# Auto Parts Landing Agent Routing

Read the relevant specialist before changing the landing page.

## Priority

1. `.agents/skills/conversion-agent/SKILL.md`
   Use first for page strategy, value proposition, CTA hierarchy, trust, objections, request-form friction, and any decision intended to increase qualified part requests. It defines what the page must accomplish before UX or visual design begins.
2. `.agents/skills/ux-architect/SKILL.md`
   Use before creating or materially changing the landing page structure, request flow, form, CTA placement, navigation, or mobile journey. Define the visitor job, path to request, friction, trust needs, validation, failure states, and mobile behavior before coding.
3. `.agents/skills/ui-guard/SKILL.md`
   Use before visual implementation or redesign. Block generic AI-looking UI, decorative clutter, weak hierarchy, poor mobile behavior, and visual choices that reduce trust or conversion.
4. `.agents/skills/frontend-agent/SKILL.md`
   Use after conversion, UX, and UI direction is clear to implement the page, responsive behavior, forms, uploads, CRM/WhatsApp handoff, performance, and accessibility.
5. `.agents/skills/qa-agent/SKILL.md`
   Use after implementation as the release gate. Test the real visitor journey, mobile devices, form submission, VIN/photo flows, WhatsApp/CRM handoff, performance, accessibility basics, and regressions.

## Working rules

- First version is a focused one-page commercial landing page, not a full ecommerce store.
- Primary business outcome is a qualified part request, not page views or decorative engagement.
- Existing CRM is a downstream system; do not rebuild CRM functionality inside the landing page without a clear business reason.
- Prefer the smallest complete solution that improves trust and reduces time to request.
- Mobile-first is mandatory because a large share of traffic is expected from Instagram and messaging apps.
- Do not invent business claims, reviews, ratings, delivery times, stock levels, partners, guarantees, or prices.
- Unknown business facts must be marked as requiring confirmation.
- Avoid unnecessary catalog, cart, checkout, account, admin, and ecommerce scope in v1.
- Every major section must answer a real customer question or move the visitor closer to a request.
- Use real automotive imagery where appropriate; do not rely on decorative gradients, glassmorphism, dashboard-like blocks, or repetitive rounded cards.
- Keep one dominant primary CTA: `Find My Part` / `Request a Part`.
- For important CRO, ecommerce, buyer-behavior, automotive-parts, marketing, or UX decisions, use current external evidence when tools are available rather than relying only on assumptions.
- Do not publish without QA PASS.

## Current implementation order

Conversion Agent → UX Architect → UI Guard → Frontend Agent → QA Agent.