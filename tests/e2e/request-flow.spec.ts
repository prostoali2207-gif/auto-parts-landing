import { expect, test, type Page } from "@playwright/test";

const endpointPattern = "**/functions/v1/create-landing-request";
const analyticsPattern = "**/functions/v1/track-landing-event";

async function mockAcceptedRequest(page: Page, requestNumber = 999) {
  await page.route(endpointPattern, async (route) => {
    const request = route.request();
    expect(request.method()).toBe("POST");
    const postData = request.postData() || "";
    expect(postData).toContain("contact");
    expect(postData).toContain("parts");

    await route.fulfill({
      status: 201,
      contentType: "application/json",
      body: JSON.stringify({ ok: true, requestNumber }),
    });
  });
}

test.beforeEach(async ({ page }) => {
  await page.route(analyticsPattern, async (route) => {
    await route.fulfill({ status: 204, body: "" });
  });
  await page.goto("/");
});

test("mobile first screen keeps offer and primary CTA clear", async ({ page }) => {
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Нужна запчасть");
  await expect(page.getByRole("link", { name: "Запросить запчасть" })).toBeVisible();

  const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(hasOverflow).toBe(false);
});

test("vehicle validation returns the user to VIN when vehicle identity is missing", async ({ page }) => {
  await page.getByRole("button", { name: "Отправить заявку" }).click();

  const vin = page.getByLabel("VIN");
  await expect(page.locator("#vehicle-error")).toHaveText("Укажите VIN или марку, модель и год автомобиля.");
  await expect(vin).toBeFocused();
  await expect(vin).toHaveAttribute("aria-invalid", "true");
});

test("part validation returns the user to part name after vehicle is identified", async ({ page }) => {
  await page.getByLabel("VIN").fill("JT123456789012345");
  await page.getByRole("button", { name: "Отправить заявку" }).click();

  const partName = page.getByLabel("Название детали");
  await expect(page.locator("#part-error")).toHaveText("Добавьте название, OEM/Part Number, описание или фото детали.");
  await expect(partName).toBeFocused();
  await expect(partName).toHaveAttribute("aria-invalid", "true");
});

test("contact validation happens after vehicle and part are valid", async ({ page }) => {
  await page.getByLabel("VIN").fill("JT123456789012345");
  await page.getByLabel("Название детали").fill("Передняя фара");
  await page.getByRole("button", { name: "Отправить заявку" }).click();

  const contact = page.getByLabel("Телефон / WhatsApp / Telegram");
  await expect(page.locator("#contact-error")).toHaveText("Укажите телефон, WhatsApp или Telegram.");
  await expect(contact).toBeFocused();
  await expect(contact).toHaveAttribute("aria-invalid", "true");
});

test("invalid year is rejected without losing fallback vehicle data", async ({ page }) => {
  await page.getByLabel("Марка").fill("Toyota");
  await page.getByLabel("Модель").fill("Camry");
  await page.getByLabel("Год").fill("1899");
  await page.getByLabel("Название детали").fill("Передняя фара");
  await page.getByLabel("Телефон / WhatsApp / Telegram").fill("+971500000000");
  await page.getByRole("button", { name: "Отправить заявку" }).click();

  const year = page.getByLabel("Год");
  await expect(page.locator("#year-error")).toHaveText("Проверьте год автомобиля.");
  await expect(year).toBeFocused();
  await expect(year).toHaveAttribute("aria-invalid", "true");
  await expect(page.getByLabel("Марка")).toHaveValue("Toyota");
  await expect(page.getByLabel("Модель")).toHaveValue("Camry");
});

test("invalid photo type returns field feedback before submission", async ({ page }) => {
  await page.getByLabel("VIN").fill("JT123456789012345");
  await page.locator('input[name="photo"]').setInputFiles({
    name: "part.txt",
    mimeType: "text/plain",
    buffer: Buffer.from("not an image"),
  });
  await page.getByRole("button", { name: "Отправить заявку" }).click();

  await expect(page.locator("#photo-error")).toHaveText("Можно загружать только изображения.");
  await expect(page.locator('input[name="photo"]')).toHaveAttribute("aria-invalid", "true");
});

test("recoverable server error preserves entered data and allows retry", async ({ page }) => {
  let attempt = 0;
  await page.route(endpointPattern, async (route) => {
    attempt += 1;
    if (attempt === 1) {
      await route.fulfill({
        status: 503,
        contentType: "application/json",
        body: JSON.stringify({ ok: false, error: "Временная ошибка CRM" }),
      });
      return;
    }
    await route.fulfill({
      status: 201,
      contentType: "application/json",
      body: JSON.stringify({ ok: true, requestNumber: 1001 }),
    });
  });

  await page.getByLabel("VIN").fill("JT123456789012345");
  await page.getByLabel("Название детали").fill("Передняя фара");
  await page.getByLabel("Телефон / WhatsApp / Telegram").fill("+971500000000");
  await page.getByRole("button", { name: "Отправить заявку" }).click();

  await expect(page.locator("p.error[role=alert]")).toHaveText("Временная ошибка CRM");
  await expect(page.getByLabel("VIN")).toHaveValue("JT123456789012345");
  await expect(page.getByLabel("Название детали")).toHaveValue("Передняя фара");
  await expect(page.getByLabel("Телефон / WhatsApp / Telegram")).toHaveValue("+971500000000");

  await page.getByRole("button", { name: "Отправить заявку" }).click();
  await expect(page.getByRole("status")).toContainText("Заявка №1001");
});

test("VIN path reaches confirmed success without creating a real CRM record", async ({ page }) => {
  await mockAcceptedRequest(page, 999);

  await page.getByLabel("VIN").fill("JT123456789012345");
  await page.getByLabel("Название детали").fill("Передняя фара");
  await page.getByLabel("Телефон / WhatsApp / Telegram").fill("+971500000000");
  await page.getByRole("button", { name: "Отправить заявку" }).click();

  await expect(page.getByRole("status")).toContainText("Заявка №999");
  await expect(page.getByRole("status")).toContainText("Менеджер продолжит подбор");
});

test("make model year fallback remains a valid vehicle path", async ({ page }) => {
  await mockAcceptedRequest(page, 1000);

  await page.getByLabel("Марка").fill("Toyota");
  await page.getByLabel("Модель").fill("Camry");
  await page.getByLabel("Год").fill("2022");
  await page.getByLabel("OEM / Part Number").fill("81110-00000");
  await page.getByLabel("Телефон / WhatsApp / Telegram").fill("@qa_test");
  await page.getByRole("button", { name: "Отправить заявку" }).click();

  await expect(page.getByRole("status")).toContainText("Заявка №1000");
});
