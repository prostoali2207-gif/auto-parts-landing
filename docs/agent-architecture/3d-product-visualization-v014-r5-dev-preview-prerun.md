# 3D Product Visualization v0.1.4 — R5 Development Preview Pre-Run

Date: 2026-09-06
Behavioral candidate: `c524ed85fe8c8c07f6fca595b6c95772b1a9926c`
Stage: **development preview before formal Rendered Practical R5**
Execution chain: `hero-3d-v014-dev-preview`

## Decision value

R4 failed on one narrow structural issue: the large closed satin bracket kept the object in a nested-panel language. v0.1.4:
- opens the bracket into a structural frame;
- reduces the cap ~20%;
- exposes more of the machined interface;
- increases cast-vs-satin material separation.

The cheapest discriminating evidence is a preview render, not another full 96-sample R5.

## PRE-RUN BUDGET GATE

Objective:
Determine whether v0.1.4 materially changes the bracket/cap hierarchy enough to justify a full-quality R5.

Resources:
- one GitHub Actions Blender job;
- 960×720;
- preview mode / 32 samples;
- three renders + .blend + report;
- no GLB.

Stop condition:
- if preview still reads as nested plates/armor or introduces a new P1, do not run full R5;
- if the structural-frame mechanism is visibly successful, preregister and run formal full-quality R5.

This preview is development evidence only and cannot produce a professional PASS.
