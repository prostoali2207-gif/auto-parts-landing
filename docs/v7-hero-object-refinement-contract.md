# V7 Hero Object — Mechanical Legibility Refinement Contract

Status: `VISUAL TASTE: READY FOR FRONTEND`

Scope: **hero-object only**. This is a narrow V7 refinement, not a visual reset.

## Render inspected

Exact source commit: `e7dc94016009fe637365cf0a626f31587f0acdc5`.

Rendered review artifact from CI was inspected at:
- mobile `390px`;
- desktop `1440px`.

## Verdict

`REVISE` — the current object is coherent enough to retain, but its dominant read is optical/camera-like rather than mechanically automotive.

The failure is concentrated in the hero object:
- concentric glossy `core + ring + lens` own too much visual mass;
- translucent blue lens treatment creates an orb/camera/sci-fi read;
- isolated circular fasteners read as floating decorative nodes;
- guide lines and luminous treatment add generic technical/AI decoration;
- the housing/bracket silhouette exists, but it is visually subordinate to the optical face;
- mobile crop amplifies the circular lens and hides too much of the mounting structure.

## Refinement concept

**One abstract automotive mechanical module built from a cast housing, mounting bracket, machined flange, front cap, connector and fasteners, separated on one assembly axis.**

It must remain expressive art direction and must not represent a real SKU, fitment, stock item, brand or technical proof.

## Exact frontend contract

### Preserve
- V7 hero layout, copy, typography, CTA, palette roles and first-screen hierarchy;
- current hero-object container scale class and right-side composition;
- one coordinated exploded interaction;
- `aria-hidden` decorative treatment;
- reduced-motion behavior;
- all page sections and request behavior outside the hero object.

### Rebuild the object read
1. **Housing is the primary mass.**
   - Keep the asymmetric cast-housing silhouette large and readable.
   - Use stepped/chamfered polygonal geometry rather than round or orb geometry.
   - Give the mounting bracket visible tabs/ears and structural ribs so it reads as a part that attaches to something.

2. **Replace the camera/lens hierarchy.**
   - `partCore` becomes a recessed mechanical carrier, not a circular optical core.
   - `partRing` becomes an irregular machined flange with an inner opening and keyed/bolted geometry, not a perfect camera ring.
   - `partLens` becomes a shallow front cap/cover with slots/ribs and metal/plastic material cues; no transparent blue glass orb.
   - The circular/optical face must no longer dominate the silhouette on desktop or mobile.

3. **Fasteners must belong to the assembly.**
   - Replace glossy circular floating nodes with small bolt/fastener heads.
   - Use hex/washer-like geometry and positions that align with mounting points.
   - No glow, orb, jewel or status-light treatment.

4. **One material language.**
   - Dark cast housing / graphite polymer;
   - satin cool metal for flange/bracket;
   - restrained edge highlights for depth;
   - no glassy cobalt lens, neon internal dot, decorative glow or unrelated material effect.
   - Acid remains a CTA/action color and must not become decoration inside the object.

5. **Remove generic sci-fi decoration.**
   - Remove/hide free-floating guide lines from the hero object.
   - Convert the old halo into a quiet backing/edge contour only, with no luminous orb/field behavior.
   - No pseudo-measurements, HUD language or technical labels.

6. **Exploded logic.**
   - All parts separate along one consistent diagonal assembly axis.
   - Gaps are controlled and mechanically plausible.
   - Hover may increase separation slightly, but pieces must not rotate independently in unrelated directions.
   - Reduced motion freezes the useful separated pose.

7. **Mobile composition.**
   - At ~390px, preserve a large cropped object but expose enough housing/bracket mass that the object reads mechanical before optical.
   - Avoid a crop where a round front element becomes the dominant visible shape.
   - Do not interfere with headline, lead or CTA.

## Acceptance criteria

The exact rendered result must satisfy all of the following:
- abstract, but mechanically legible;
- immediately belongs to automotive/mechanical visual language without claiming a specific real part;
- no dominant camera/lens/orb read;
- one coherent assembly axis and mounting logic;
- one consistent material family;
- no generic AI glow/HUD decoration;
- desktop and mobile both preserve V7 hierarchy and CTA access;
- no copy, form, CRM, validation, analytics, endpoint or request-flow change.

After implementation: exact rendered `390px` + `1440px` review by Independent UI Guard, then targeted QA protecting the request flow.
