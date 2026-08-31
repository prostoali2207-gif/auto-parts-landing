# V7 Hero Object — Material / Form Polish Contract

Status: `VISUAL TASTE: READY FOR FRONTEND`

Scope: **hero-object only**. This is a narrow polish of the already-approved V7 mechanical object, not a reset.

## Source of truth inspected

Exact main source commit: `27e1dd51ad6497dc87fe03fc5f02f1e89b1e1e11`.

Rendered evidence inspected:
- exact CI render at `390px`;
- exact CI render at `1440px`;
- user-supplied real mobile screenshot of the deployed page.

Relevant V7 research mechanisms remain authoritative:
- engineered-object restraint rather than decorative UI;
- the physical object carries identity;
- material close-up / surface hierarchy creates perceived quality;
- no generic AI glow, HUD, orb or fake technical evidence.

No new visual direction is required.

## Verdict

`PASS CONCEPT / REVISE CRAFT`.

The previous mechanical-legibility refinement succeeded: the object now reads as an automotive/mechanical housing rather than a camera/lens. The remaining gap is surface and construction craft, not concept.

Observed craft gaps in the current render:
- several major surfaces read as stacked clipped polygons rather than one cast / machined assembly;
- the exploded layers visually collapse together, so assembly depth is weaker than the V7 signature moment intends;
- surface lighting is not yet sufficiently consistent across housing, bracket, flange and cap;
- the front cap's dark slot insert carries slightly too much contrast versus the surrounding mechanical structure;
- small fasteners still read partly as detached shapes instead of belonging to visible mounting points;
- depth is produced more by silhouette stacking than by lips, seams, ribs, recesses and material thickness.

## Refinement concept

**Keep the exact abstract automotive module, but make it feel fabricated rather than illustrated: cast shell + structural bracket + recessed carrier + machined flange + shallow service cap, all sharing one light direction and one assembly axis.**

It remains fictional art direction. It must not become a realistic depiction of a specific part, SKU, fitment, brand or technical drawing.

## Exact frontend contract

### Preserve completely
- V7 hero layout and object scale class;
- headline, supporting copy and CTA;
- palette roles;
- current overall asymmetric automotive silhouette;
- one coordinated exploded interaction;
- mobile crop intent;
- `aria-hidden` treatment;
- reduced-motion behavior;
- every section outside `.heroObject`;
- form, validation, analytics, endpoint, CRM mapping and request lifecycle.

### 1. One lighting model
Apply one restrained top-left / front light direction across all object surfaces.

Required effect:
- top / left planes: lighter satin highlight;
- main planes: cool mid-metal / graphite;
- lower / right edges: controlled shadow;
- no independent glossy highlights or unrelated gradients.

Do not add glow, glass, neon, bloom or photoreal texture.

### 2. Replace paper-cut depth with construction depth
Keep the existing polygonal silhouette, but surface hierarchy must come from mechanical cues:
- shallow lips / flange edges;
- recessed pockets;
- structural ribs;
- cast-shell seams;
- visible thickness through inset edge shading.

Avoid adding more unrelated nested polygons solely to create complexity.

### 3. Increase exploded readability
Keep the same diagonal assembly axis.

Increase separation modestly between:
- housing → carrier;
- carrier → flange;
- flange → front cap.

The gaps should be clearly visible at desktop and still readable at ~390px, but the module must continue to feel like one assembly, not floating fragments.

Do not introduce unrelated rotations.

### 4. Front cap refinement
Keep the cap as a shallow service / protective cover.

- reduce the visual dominance of the dark slotted insert;
- make the outer cap belong to the same satin-metal / dark-polymer family as the rest of the assembly;
- retain slots/ribs as mechanical ventilation / grip language only, not electronic-screen language;
- no lens, sensor, status light or luminous detail.

### 5. Fasteners belong to mounting points
- reduce fastener scale and brightness slightly;
- position the three bolt heads closer to bracket / housing tabs;
- use steel/washer/hex geometry;
- no isolated floating bolt composition.

### 6. Material budget
Use only three visual material families:
1. dark cast / graphite housing;
2. satin cool-metal bracket/flange/cap;
3. restrained steel fasteners / connector pins.

Acid remains outside the object and is reserved for CTA/action hierarchy.

### 7. Mobile acceptance
At ~390px:
- the housing must remain the dominant silhouette;
- at least one visible exploded gap must survive the crop;
- cap must not become a gadget-like focal object;
- no object overlap with headline, lead or CTA;
- no horizontal overflow.

## Acceptance criteria

The exact rendered result must:
- remain abstract and mechanically automotive;
- retain the already-achieved no-camera / no-lens / no-AI look;
- feel more fabricated / industrial and less like stacked CSS illustration;
- show one consistent material and lighting grammar;
- expose controlled construction details rather than decorative facets;
- preserve one coherent exploded axis;
- keep mounting logic visible;
- preserve all commercial and request behavior unchanged.

Release route remains:

`Visual Taste → Frontend → exact 390/1440 render → Independent UI Guard → targeted QA`.
