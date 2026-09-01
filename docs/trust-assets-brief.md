# Spline — Trust Asset Capture Brief

Purpose: replace generic visual trust with real evidence from the business. Do not use AI-generated or stock images as proof.

## Highest-priority assets

1. 3–5 real parts or completed sourcing orders photographed cleanly.
2. At least one close photo with a readable OEM / Part Number label.
3. One real handling / checking / packaging scene.
4. One real counter, shop, storage, or working environment photo if it accurately represents the business.
5. Confirmed Instagram / WhatsApp / Telegram links intended for customers.

## Photo rules

- Phone camera is sufficient.
- Use daylight or bright neutral light.
- Keep backgrounds simple.
- Photograph the actual part, box, connector, label or order — not an unrelated car.
- Avoid customer personal data, VINs, phone numbers, addresses or invoices unless intentionally redacted.
- Capture vertical and horizontal versions where practical.

## What these assets should prove

- Spline works with real automotive parts.
- Parts can be identified using real labels / numbers / physical details.
- There is a real sourcing and handling process behind the form.

## Current selected proof set — 2026-09-01

Verified by the business owner as real supplier locations used for sourcing, with permission to publish.

- primary motion proof: `public/proof/supplier-walkthrough-8s.mp4` — selected 8-second excerpt from the uploaded supplier walkthrough;
- motion poster: `public/proof/supplier-walkthrough-poster.jpg`;
- supporting environment photo, desktop: `public/proof/supplier-environment-desktop.webp`;
- supporting environment photo, mobile: `public/proof/supplier-environment-mobile.webp`.

Use exactly one video + one supporting photo in the existing trust chapter. Do not turn this into a gallery, carousel, catalogue, inventory browser or hero replacement.

The media supports only the bounded statement that these are real supplier locations in the UAE where parts are searched. It does not prove own-warehouse status, universal stock, specific part availability, official brand affiliation, delivery time, condition of an unseen customer part, or that every visible item is for sale to the current visitor.

## Release gate for this proof pass

Before merge, inspect the exact PR head render at:

- 360px narrow mobile;
- 390px primary mobile;
- 768px intermediate;
- 1440px desktop.

Required sequence: CI/build + focused proof assertions -> exact-head rendered review -> independent UI Guard -> scoped QA -> merge only on PASS.

## Do not fabricate

No invented reviews, order counts, client counts, ratings, suppliers, guarantees, delivery times, prices or stock claims.
