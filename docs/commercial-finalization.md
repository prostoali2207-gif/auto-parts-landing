# Spline — Commercial Landing Finalization Contract

Status: ACTIVE implementation contract for `finalize-commercial-landing`
Base: `main` at `ce6348b31c0dae325d96058890222c13326a700f`

## Professional-core inputs

### Conversion Messaging & Web Copy
Use the frozen `conversion-messaging-web-copy` 0.1.0-candidate at commit `7019f6717b1b61806f4a221a297d049a4ad3b8cb`, artifact digest `sha256:da7662f95dcf132d9a9875849b7bb5d5d831d1d54821f0b109b543a1f299e1d2`.

The candidate owns exact language only. It does not redefine CRO strategy, UX semantics, business policy, or unsupported proof.

### Visual Design / Art Direction
Use `visual-design-art-direction-core` `0.2.0-candidate` plus its base professional model and v0.2 P0 repair model.

Operating mode: `DIRECT -> REFINE`, not DISCOVER. The approved thesis is already `THE UNBOXING`; broad reset has low decision value. FUNCTION, MOBILE, AUTHORITY and TRUTH are veto gates.

## Evidence / truth ledger

VERIFIED from current project contracts and implementation:
- Spline is a focused UAE auto-parts request landing, not ecommerce.
- Primary outcome is a qualified `Request a Part` submission accepted by the existing `create-landing-request` path and delivered to the manager workflow/CRM.
- Vehicle identification: VIN OR make + model + year.
- Part identification: at least one of part name, OEM / Part Number, description, or photo.
- Contact is required.
- Customer does not need every technical identifier to start a request.
- Success is shown only after the endpoint returns accepted success.

PROHIBITED without new evidence:
- inventory/availability claims;
- prices or savings;
- delivery/response-time promises;
- guaranteed fitment;
- supplier/partner claims;
- reviews, ratings, order counts or popularity;
- fabricated tracking/order/logistics proof.

## Commercial message contract

User job:
`I need a part; help me send enough information about my car and the part so a manager can continue the search even if I do not know the exact technical name.`

First comprehension:
1. Spline helps start an auto-part request.
2. The visitor can identify the vehicle with VIN or make/model/year.
3. The visitor can identify the part with any useful supported signal.
4. A contact is required so the manager can continue.
5. The primary action is `Запросить запчасть`.

Required copy repair:
- remove wording that can imply one total signal is sufficient for the whole request;
- prefer explicit alternatives over automotive jargon;
- remove unsupported precision language such as implying a guaranteed “точный” search;
- success copy must explain that the request was accepted and what happens next, without promising timing.

## UX contract

No architecture reset is justified. Preserve the current single-page flow and existing information requirements.

Flow:
`hero CTA -> vehicle (VIN OR make/model/year) -> part (name/OEM/description/photo) -> contact -> submit -> accepted success OR actionable recovery`.

Required UX refinements are copy/state clarity only unless rendered evidence exposes a functional defect.

Preserve:
- current validation precedence;
- entered data across client validation and recoverable network/server errors;
- double-submit protection;
- visible field-level errors and focus return;
- photo type/size feedback;
- success only after endpoint acceptance;
- mobile single-column form behavior.

## Visual contract

Preserve `THE UNBOXING` and the current paper / ink / packing-orange identity.

Protected function:
- offer + primary CTA clear in the first mobile screen;
- request surface remains conventional and usable;
- no visual mechanism hides labels, errors, controls or submit;
- 360/390/768/1440 states are intentionally composed;
- no desktop-only spectacle;
- no fabricated proof imagery.

Current benchmark check, 2026-08-30:
- Scout Motors: dominant statement/product focal point with tightly limited primary actions — TAKE focal discipline, REJECT category-specific vehicle theatre.
- Teenage Engineering: object-led industrial character and functional typography with low decorative chrome — ADAPT object/label confidence, REJECT ecommerce/product-grid semantics.
- RIMOWA: strong product hierarchy, editorial pacing and controlled whitespace — ADAPT finish/rhythm, REJECT luxury proof/commerce claims that are not Spline facts.

Do not introduce a new motif. The route/tape remains the single signature continuity device and should terminate at the submit action.

## Implementation scope

Smallest complete finalization:
1. repair customer-facing copy against the evidence ledger;
2. inspect exact-head renders before visual edits;
3. correct only observed P0/P1 visual/functional issues while preserving THE UNBOXING;
4. keep CRM request payload and endpoint semantics unchanged unless an observed defect requires otherwise;
5. update automated assertions that intentionally depend on changed copy;
6. run build + E2E + exact-head visual capture;
7. independent UI Guard on the rendered artifact;
8. independent QA, including confirmed CRM delivery evidence before final release PASS.

## Release gates

Visual candidate self-review may only end `RENDER READY FOR INDEPENDENT REVIEW` when FUNCTION/MOBILE/AUTHORITY/TRUTH pass.

Independent UI Guard: no unresolved P0/P1 and score against `docs/visual-quality-scorecard.md` on actual renders.

Independent QA: PASS only when tested release-critical paths pass and CRM acceptance is confirmed. `BLOCKED/UNVERIFIED` is not PASS.
