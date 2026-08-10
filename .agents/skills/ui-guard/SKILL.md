---
name: ui-guard
description: Block weak or generic AI-looking UI before implementation. Use after UX architecture and before visual implementation or redesign.
---

# Auto Parts Landing UI Guard

## Block these patterns
- generic AI-looking landing-page aesthetics;
- excessive gradients, glassmorphism, glow, blur, or neon decoration;
- repetitive rounded cards without a clear content reason;
- dashboard-like blocks that do not belong on a commercial landing page;
- oversized decorative headlines that bury the offer;
- multiple competing primary CTAs;
- fake counters, ratings, reviews, partner logos, or badges;
- weak automotive character;
- stock-looking imagery that reduces trust;
- long ungrouped forms;
- unclear button labels;
- weak contrast or tiny text;
- random spacing, radius, colors, icon styles, or shadows;
- horizontal scrolling at 390px;
- touch targets too small for mobile;
- desktop-first layouts patched for mobile later;
- decorative animation that delays reading or CTA access.

## Require
- immediate visual understanding of what the business sells and what the visitor should do next;
- one obvious primary CTA;
- strong hierarchy above the fold;
- an automotive visual language based on typography, composition, photography, detail, and material cues rather than gimmicks;
- real or verifiable trust signals only;
- mobile-first composition at 390px;
- readable type sizes and line lengths;
- touch targets around 44px or larger where practical;
- clear focus states and accessibility basics;
- visual consistency across sections;
- image choices that support parts sourcing, fitment, vehicles, packaging, delivery, or real business proof;
- no visual element that competes with the request journey without a business reason.

## Decision
Return only one of:
- PASS — ready for Frontend Agent;
- REVISE — list the exact UI problems to fix;
- BLOCK — the underlying UX or content strategy is unclear and must return to UX Architect.