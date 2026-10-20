# Trello lead email notification

## Goal

Create a Trello card by email after — and only after — the existing BayerCRM request has been accepted.

The current `create-landing-request` multipart flow remains authoritative. Photos continue directly to Supabase and are never proxied through Vercel.

## Flow

1. Landing submits the existing request to `create-landing-request`.
2. Only after confirmed CRM success, the browser sends a small JSON notification to `/api/trello-notify`.
3. The server validates `request number + contact + configured manager username` through BayerCRM's existing public RPCs:
   - `find_public_request_status`;
   - `get_public_request_status`.
4. Only a verified CRM request may trigger the transactional email.
5. Email is sent to the Trello email-to-board address.
6. Notification failure is secondary and must not turn an already accepted CRM request into a false customer-facing failure.

## Required Vercel environment variables

- `BAYERCRM_SUPABASE_URL`
- `BAYERCRM_SUPABASE_PUBLISHABLE_KEY`
- `BAYERCRM_MANAGER_USERNAME`
- `BREVO_API_KEY`
- `LEAD_EMAIL_FROM` — verified transactional-email sender
- `LEAD_EMAIL_FROM_NAME` — optional
- `TRELLO_LEAD_EMAIL` — Trello email-to-board address supplied by the business owner

Do not prefix any of these with `NEXT_PUBLIC_`.

## Security notes

- The Trello recipient never appears in browser code or browser payloads.
- A public call to `/api/trello-notify` cannot create a card unless BayerCRM confirms the request number/contact pair for the configured manager.
- The route sends no photo bytes.
- The request body is capped and text fields are normalized/length-limited.
- Because the existing CRM function source is not present in this repository, this integration deliberately does not replace or reconstruct that live function.

## Release gate

Do not merge/release until:
1. build and request-flow E2E pass;
2. Vercel environment variables are configured;
3. the exact Das Motors BayerCRM manager username is confirmed;
4. one real controlled landing submission creates both the CRM request and one Trello card;
5. a rejected CRM submission creates no Trello card.
