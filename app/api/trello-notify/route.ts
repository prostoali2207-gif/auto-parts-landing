type NotificationPart = {
  partName?: unknown;
  partNumber?: unknown;
  description?: unknown;
};

type NotificationPayload = {
  requestNumber?: unknown;
  contact?: unknown;
  clientName?: unknown;
  vin?: unknown;
  carMake?: unknown;
  carModel?: unknown;
  carYear?: unknown;
  parts?: unknown;
};

type PublicRequestStatus = {
  request_number?: unknown;
  car_make?: unknown;
  car_model?: unknown;
  manager_username?: unknown;
};

const MAX_BODY_BYTES = 32 * 1024;
const MAX_PARTS = 20;
const BREVO_EMAIL_ENDPOINT = "https://api.brevo.com/v3/smtp/email";

function cleanText(value: unknown, maxLength = 500) {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\r\n\t]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function cleanParts(value: unknown) {
  if (!Array.isArray(value)) return [];

  return value
    .slice(0, MAX_PARTS)
    .map((value) => {
      const part = value && typeof value === "object" ? (value as NotificationPart) : {};
      return {
        partName: cleanText(part.partName, 180),
        partNumber: cleanText(part.partNumber, 180),
        description: cleanText(part.description, 700),
      };
    })
    .filter((part) => part.partName || part.partNumber || part.description);
}

function requiredEnv(name: string) {
  const value = process.env[name]?.trim();
  return value || null;
}

function supabaseHeaders(publishableKey: string) {
  return {
    apikey: publishableKey,
    Authorization: `Bearer ${publishableKey}`,
    "Content-Type": "application/json",
  };
}

async function verifyCrmRequest(
  requestNumber: number,
  contact: string,
  managerUsername: string,
  supabaseUrl: string,
  publishableKey: string,
) {
  const baseUrl = supabaseUrl.replace(/\/$/, "");
  const headers = supabaseHeaders(publishableKey);

  const lookupResponse = await fetch(`${baseUrl}/rest/v1/rpc/find_public_request_status`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      p_username: managerUsername,
      p_request_number: requestNumber,
      p_contact: contact,
    }),
    cache: "no-store",
  });

  if (!lookupResponse.ok) {
    throw new Error("crm_lookup_unavailable");
  }

  const requestId: unknown = await lookupResponse.json();
  if (typeof requestId !== "string" || !requestId) return null;

  const statusResponse = await fetch(`${baseUrl}/rest/v1/rpc/get_public_request_status`, {
    method: "POST",
    headers: {
      ...headers,
      Accept: "application/vnd.pgrst.object+json",
    },
    body: JSON.stringify({ p_request_id: requestId }),
    cache: "no-store",
  });

  if (!statusResponse.ok) {
    throw new Error("crm_status_unavailable");
  }

  const status = (await statusResponse.json()) as PublicRequestStatus;
  if (
    Number(status.request_number) !== requestNumber ||
    cleanText(status.manager_username, 120).toLowerCase() !== managerUsername.toLowerCase()
  ) {
    return null;
  }

  return {
    requestId,
    carMake: cleanText(status.car_make, 80),
    carModel: cleanText(status.car_model, 80),
  };
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || "0");
  if (contentLength > MAX_BODY_BYTES) {
    return Response.json({ ok: false, error: "Payload too large" }, { status: 413 });
  }

  const supabaseUrl = requiredEnv("BAYERCRM_SUPABASE_URL");
  const publishableKey = requiredEnv("BAYERCRM_SUPABASE_PUBLISHABLE_KEY");
  const managerUsername = requiredEnv("BAYERCRM_MANAGER_USERNAME");
  const brevoApiKey = requiredEnv("BREVO_API_KEY");
  const senderEmail = requiredEnv("LEAD_EMAIL_FROM");
  const trelloEmail = requiredEnv("TRELLO_LEAD_EMAIL");

  if (
    !supabaseUrl ||
    !publishableKey ||
    !managerUsername ||
    !brevoApiKey ||
    !senderEmail ||
    !trelloEmail
  ) {
    return Response.json({ ok: false, error: "Notification is not configured" }, { status: 503 });
  }

  let raw: NotificationPayload;
  try {
    raw = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const requestNumber = Number(raw.requestNumber);
  const contact = cleanText(raw.contact, 180);
  const clientName = cleanText(raw.clientName, 180);
  const vin = cleanText(raw.vin, 40);
  const fallbackMake = cleanText(raw.carMake, 80);
  const fallbackModel = cleanText(raw.carModel, 80);
  const carYear = cleanText(raw.carYear, 10);
  const parts = cleanParts(raw.parts);

  if (!Number.isInteger(requestNumber) || requestNumber <= 0 || !contact) {
    return Response.json({ ok: false, error: "Invalid notification payload" }, { status: 400 });
  }

  let verified;
  try {
    verified = await verifyCrmRequest(
      requestNumber,
      contact,
      managerUsername,
      supabaseUrl,
      publishableKey,
    );
  } catch {
    return Response.json({ ok: false, error: "CRM verification unavailable" }, { status: 502 });
  }

  if (!verified) {
    return Response.json({ ok: false, error: "CRM request was not verified" }, { status: 403 });
  }

  const carMake = verified.carMake || fallbackMake;
  const carModel = verified.carModel || fallbackModel;
  const vehicle = [carMake, carModel, carYear].filter(Boolean).join(" ") || (vin ? `VIN ${vin}` : "Автомобиль");
  const firstPart = parts[0]?.partName || parts[0]?.partNumber || "запчасть";
  const subject = `Новая заявка #${requestNumber} — ${vehicle} — ${firstPart}`.slice(0, 180);

  const partLines =
    parts.length > 0
      ? parts.flatMap((part, index) => {
          const lines = [`Деталь ${index + 1}`];
          if (part.partName) lines.push(`Название: ${part.partName}`);
          if (part.partNumber) lines.push(`OEM / Part Number: ${part.partNumber}`);
          if (part.description) lines.push(`Описание: ${part.description}`);
          return [...lines, ""];
        })
      : ["Детали: смотрите в CRM", ""];

  const textContent = [
    `Заявка CRM: #${requestNumber}`,
    clientName ? `Клиент: ${clientName}` : "",
    `Контакт: ${contact}`,
    `Автомобиль: ${vehicle}`,
    vin ? `VIN: ${vin}` : "",
    "",
    ...partLines,
    "Источник: лендинг Das Motors",
  ]
    .filter((line, index, all) => line !== "" || (index > 0 && all[index - 1] !== ""))
    .join("\n");

  const emailResponse = await fetch(BREVO_EMAIL_ENDPOINT, {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": brevoApiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      sender: {
        name: requiredEnv("LEAD_EMAIL_FROM_NAME") || "Das Motors Landing",
        email: senderEmail,
      },
      to: [{ email: trelloEmail }],
      subject,
      textContent,
    }),
    cache: "no-store",
  });

  if (!emailResponse.ok) {
    return Response.json({ ok: false, error: "Email delivery failed" }, { status: 502 });
  }

  return Response.json({ ok: true }, { status: 202 });
}
