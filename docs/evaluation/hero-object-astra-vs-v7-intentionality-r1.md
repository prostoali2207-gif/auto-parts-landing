# Hero Object A/B — Synthetic Intentionality Evaluation R1

Date: 2026-09-07
Evaluation type: artifact-first comparative visual judgment
Scope: **hero object only** — page copy, typography, CTA, layout and overall landing composition excluded.
Evaluator route:
`Visual Taste -> Synthetic Intentionality gate -> UI Guard-style artifact review`

## Artifacts

### Artifact A
Current V7 production hero-object from exact `main`:
`525776580e2bcfe5a3a9fdcb3cc921f92a09f834`

Rendered evidence:
- CI run `34141386655`
- artifact `visual-review`
- desktop 1440 and mobile 390 available.

### Artifact B
User-supplied Astra hero-object render from the current project conversation.

The comparison uses the rendered artifact, not Astra's explanation or source prompt.

## Blindness note

The review uses neutral A/B labels and artifact-first criteria, but this is **not claimed as a fully blind independent judge** because artifact provenance is known in the current conversation.

The useful evidence is therefore the explicit perceptual comparison and gate behavior, not a claim of evaluator independence.

## Synthetic Intentionality gate

### Artifact A — PASS

Representation mode:
**clearly stylized / fictional**

Observed:
- faceted/low-poly material treatment makes authored stylization obvious;
- geometry does not ask the viewer to believe it is a photograph or literal catalog part;
- unusual shape therefore reads primarily as design language rather than failed depiction;
- no dominant fused/broken/melted/detached cue requires an explanation from the creator.

Failure risk:
low-to-moderate generic synthetic/AI decoration risk, but **not** failed-real-object ambiguity.

Gate verdict:
**PASS**

### Artifact B — REVISE (P1)

Representation mode:
**pseudo-real / fictional physical object**

Observed:
- cast-metal roughness, specular response, realistic thickness and product-CGI lighting strongly invite literal physical interpretation;
- the large black form has strong plausible automotive mounting language;
- the detached silver element does not clearly reveal a designed mating interface, seat, fastener path or removal axis;
- its edge relationship can reasonably read as a fractured/cut/broken piece rather than an intentionally removable component;
- the lower eye / arch / cast shape also pushes the object toward a recognizable suspension/control-arm/knuckle family.

Because the rendering mode is near-photoreal, these structural ambiguities carry more perceptual penalty than they would in a clearly graphic abstraction.

Gate verdict:
**REVISE — P1 synthetic-intentionality ambiguity**

The problem is not that Artifact B is strange, synthetic or impossible.
The problem is that its realistic depiction mode makes one material feature plausibly read as an error/break rather than authored construction.

## Pairwise professional comparison

| Criterion | Artifact A — current V7 | Artifact B — Astra | Pairwise |
|---|---|---|---|
| Representation-mode clarity | Clearly stylized | Pseudo-real / ambiguous | **A** |
| Synthetic intentionality | PASS | REVISE P1 | **A** |
| Automotive/mechanical category read | Moderate | Immediate/strong | **B** |
| Subsystem ambiguity | Stronger | Weaker; suspension-family read emerges | **A** |
| Silhouette character | Competent, less memorable | Strong sculptural negative-space silhouette | **B** |
| Material credibility | Stylized / limited | Strong cast + machined physicality | **B** |
| Construction-depth potential | Moderate | High | **B** |
| Assembly/separation readability | More clearly intentional layered module | Silver piece can read as broken fragment | **A** |
| Memorability / visual magnetism | Moderate | Strong | **B** |
| Risk of "AI tried to make a real part and failed" | Low | Materially present | **A** |
| Current release suitability | Safer | Needs visual-concept repair | **A** |
| Directional upside after repair | Limited-to-good | High | **B** |

## Core finding

The new gate successfully distinguishes a case that the previous visual criteria could blur:

- Artifact A is **less physically impressive**, but its representation mode is legible.
- Artifact B is **more physically impressive and more memorable**, but its realism raises the burden of structural intentionality and exposes a new P1.

Therefore:

> **More realism did not automatically improve the hero object. It increased the requirement for visibly coherent construction.**

This validates the project-level usefulness of the Synthetic Intentionality construct on at least one live comparison.

## Current decision

### Best object for production today
**Artifact A — current V7**, because Artifact B has an unresolved P1 under the new gate.

### Stronger candidate direction
**Artifact B — Astra**, because it materially outperforms Artifact A in:
- sculptural character;
- automotive immediacy;
- physical/material credibility;
- memorability.

This is not a contradiction.

The evidence says:
`A = safer resolved artifact`
`B = stronger unresolved direction`

## What would change the decision

Artifact B should be reevaluated after an independent Astra-led revision cycle if it can preserve its sculptural/material strengths while making its representation mode unambiguously intentional.

Do **not** prescribe the exact geometry from this evaluation to Astra.
The evaluation should return only the observed failure:
- near-photoreal depiction;
- silver separation can read as fracture/break;
- subsystem family becomes too inferable.

Astra/Visual Design should own the repair direction.

## Construct status

Synthetic Intentionality / AI-Artifact Ambiguity:
**SUPPORTED BY ONE LIVE PROJECT COMPARISON — NOT YET CORE-GENERALIZED**

Do not promote to `professional-ai-agents` from this case alone.
