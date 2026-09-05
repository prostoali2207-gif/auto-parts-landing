import { expect, test } from "@playwright/test";

test.describe.configure({ retries: 0 });

test("one live BayerCRM request accepts two parts", async ({ request }) => {
  const marker = "QA-LIVE-20260905-2317";
  const response = await request.post(
    "https://ybjoayhahbifcrrrykln.supabase.co/functions/v1/create-landing-request",
    {
      multipart: {
        contact: marker,
        clientName: "QA MULTIPART DELETE ME",
        vin: "TESTVIN20260905001",
        website: "",
        analyticsSession: "",
        parts: JSON.stringify([
          {
            partName: "QA Front Lamp",
            partNumber: "QA-001",
            description: "live multi-part verification",
            photoKeys: [],
          },
          {
            partName: "QA Rear Lamp",
            partNumber: "QA-002",
            description: "live multi-part verification",
            photoKeys: [],
          },
        ]),
      },
    },
  );

  const body = await response.json();
  console.log("LIVE_CRM_REQUEST", JSON.stringify(body));
  expect(response.status()).toBe(201);
  expect(body.ok).toBe(true);
  expect(body.requestId).toBeTruthy();
});
