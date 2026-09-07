# Synthetic Intentionality / AI-Artifact Ambiguity — Applied Visual Judgment Extension

Date: 2026-09-07
Status: **APPLIED EXTENSION — TARGETED EVALUATION REQUIRED BEFORE CORE PROMOTION**

## Agent Architect decision

Target problem:
A synthetic or fictional object can use realistic material, lighting and physical cues strongly enough that viewers try to interpret it as a real object. If its structure then contains unexplained anomalies, the same ambiguity can be read not as authored abstraction but as a failed depiction / generative artifact.

Classification:
- Visual Taste / visual judgment: **EXTEND**
- Imagery knowledge: **EXTEND**
- UI Guard: **EXTEND** as independent rendered verifier
- 3D Product Visualization Production: **CONSUME / COMPLY**, not own the judgment
- Visual Design / Art Direction professional core in `professional-ai-agents`: **DEFER** until targeted cross-context evidence exists

This is not a universal claim that abstract or AI-assisted imagery is weak. It is a project-relevant perceptual risk that must be tested from the rendered artifact.

## Why the existing rules are insufficient

Existing project knowledge already requires:
- generated/abstract visuals to read as expressive art direction;
- no generic AI decoration;
- intentional rule-breaking rather than accidental inconsistency;
- actual rendered inspection.

The missing diagnostic is **representation-mode clarity**.

A reviewer can currently say:
- "this is abstract";
- "this is realistic";
- "this is generic AI decoration";

but has no explicit test for the unstable middle state:

`realistic surface cues + fictional structure + unexplained anomalies -> failed-depiction / AI-artifact ambiguity`.

That gap matters most for hero objects, product-style CGI, synthetic mechanical forms and other visuals whose credibility depends on physical coherence.

## Valid representation modes

Any of these may be strong when intentional:

1. **Clearly real**
   - documentary/product representation;
   - factual/evidence rules apply.

2. **Clearly stylized / abstract**
   - the viewer is not asked to believe the object is a literal real-world product;
   - deformation, simplification or surrealism reads as authored visual language.

3. **Fictional but physically coherent**
   - no specific real SKU is claimed;
   - construction, material, gravity, joints, thickness, lighting and part relationships are coherent enough that unusual form reads as deliberate industrial/concept design.

No mode is automatically preferred.

## Risk zone

Treat this as a review risk, not an automatic failure:

**pseudo-real + structurally ambiguous**

Typical cues:
- realistic metal/light/texture but impossible or unexplained joints;
- parts that look accidentally fused, broken, melted or detached;
- near-real component silhouettes with malformed details;
- precision rendering that invites literal interpretation while topology does not support it;
- unexplained asymmetry or discontinuity that lacks a construction/art-direction rationale.

The problem is not "strangeness". The problem is **strangeness that reads accidental**.

## Synthetic Intentionality Test

Apply only when the visual is synthetic/fictional and uses enough realism that a viewer could reasonably interpret it as a depiction of a physical object.

### Pass 1 — unprimed read

Inspect the actual artifact without explaining how it was made.

Ask:
- What does this appear to be?
- Which parts look intentional?
- Does anything look broken, malformed, accidentally fused/detached, or like a failed depiction?
- Does the visual world establish abstraction/stylization clearly enough that literal engineering interpretation is unnecessary?

Do not mention "AI artifact" before the first read; that would prime the judgment.

### Pass 2 — intentionality challenge

Only after the unprimed read ask:

> Do the unusual features read as deliberately designed, or could they reasonably be interpreted as errors in representing a real object?

Require evidence from visible form/material/assembly/art direction, not an explanation from source code or prompt.

## Verdict rule

**PASS**
- the representation mode is clear;
- unusual features read authored;
- physical incoherence does not undermine the intended perception;
- no material credibility loss comes from "failed depiction" ambiguity.

**REVISE**
- the visual sits in pseudo-real ambiguity;
- a material feature can reasonably read as accidental/broken/malformed;
- the intended abstraction exists only in the creator's explanation;
- the artifact needs either clearer stylization or stronger physical/construction coherence.

**BLOCK**
- synthetic imagery is being used as factual/product/business proof;
- ambiguity materially creates false evidence or a trust violation.

Default severity for an otherwise truthful hero object: **P1** when the ambiguity damages perceived quality/credibility; **P2** when minor and non-dominant.

## Repair routing

Diagnose before prescribing.

If failure source is:
- concept / unclear representation mode -> Visual Taste / Visual Design;
- geometry / joints / construction -> 3D Product Visualization Production;
- material / lighting making a fictional form look unintentionally literal -> Visual Design + 3D production;
- browser crop/scale hiding the intentional construction -> Frontend integration;
- factual/proof confusion -> credibility/truth owner + UI Guard block.

Do not solve the gate by merely adding more "technical" detail.

## Evaluation requirement before professional-core promotion

This applied extension is not yet a reusable professional-core claim.

Before promotion to `professional-ai-agents`, run a targeted visual-judgment evaluation across multiple contexts, with artifact-first and source-hidden cases where practical:

- clearly real product visual;
- clearly stylized/abstract object;
- fictional physically coherent industrial object;
- pseudo-real structurally ambiguous object;
- intentionally surreal object with strong authored language;
- polished synthetic object with subtle malformed/fused/detached cues.

Evaluate whether the judgment reliably distinguishes:
`intentional abstraction | coherent fiction | accidental-looking failed depiction`
without simply rejecting novelty, surrealism or all synthetic imagery.

Promotion decision after evidence:
`KEEP APPLIED | EXTEND Visual Design / Art Direction Core | REJECT / REVISE CONSTRUCT`.
