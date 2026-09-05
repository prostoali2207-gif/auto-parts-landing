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

async function expectStep(page: Page, step: 1 | 2 | 3) {
  await expect(page.locator(`[data-form-step="${step}"]`)).toHaveAttribute("data-active", "true");
  await expect(page.locator("#request-form")).toHaveAttribute("data-active-step", String(step));
}

async function nextStep(page: Page) {
  await page.getByRole("button", { name: "Далее →" }).click();
}

async function fillVinVehicle(page: Page) {
  await page.getByLabel("VIN").fill("JT123456789012345");
  await nextStep(page);
  await expectStep(page, 2);
}

async function fillPrimaryPart(page: Page, name = "Передняя фара") {
  await page.getByLabel("Название детали").fill(name);
  await nextStep(page);
  await expectStep(page, 3);
}

test.beforeEach(async ({ page }) => {
  await page.route(analyticsPattern, async (route) => {
    await route.fulfill({ status: 204, body: "" });
  });
  await page.goto("/");
});

test("mobile first screen keeps offer clear and sticky request CTA remains available after scroll", async ({ page }) => {
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Нужна запчасть");
  await expect(page.getByRole("link", { name: "Запросить запчасть" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Запросить", exact: true })).toBeVisible();

  const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(hasOverflow).toBe(false);

  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight * 0.6));
  const headerTop = await page.locator(".topbar").evaluate((element) => element.getBoundingClientRect().top);
  const position = await page.locator(".topbar").evaluate((element) => getComputedStyle(element).position);
  expect(position).toBe("sticky");
  expect(headerTop).toBeGreaterThanOrEqual(0);
  expect(headerTop).toBeLessThan(2);
  await expect(page.getByRole("link", { name: "Запросить", exact: true })).toBeVisible();
});

test("unverified manager contact destination is not rendered as a dead link", async ({ page }) => {
  await expect(page.getByRole("link", { name: "Есть вопрос? Связаться с менеджером" })).toHaveCount(0);
});

test("vehicle step blocks progress and returns focus to VIN when vehicle identity is missing", async ({ page }) => {
  await expectStep(page, 1);
  await nextStep(page);

  const vin = page.getByLabel("VIN");
  await expect(page.locator("#vehicle-error")).toHaveText("Укажите VIN или марку, модель и год автомобиля.");
  await expectStep(page, 1);
  await expect(vin).toBeFocused();
  await expect(vin).toHaveAttribute("aria-invalid", "true");
});

test("invalid year is rejected on vehicle step without losing fallback vehicle data", async ({ page }) => {
  await page.getByLabel("Марка").fill("Toyota");
  await page.getByLabel("Модель").fill("Camry");
  await page.getByLabel("Год").fill("1899");
  await nextStep(page);

  const year = page.getByLabel("Год");
  await expect(page.locator("#year-error")).toHaveText("Проверьте год автомобиля.");
  await expect(year).toBeFocused();
  await expect(year).toHaveAttribute("aria-invalid", "true");
  await expect(page.getByLabel("Марка")).toHaveValue("Toyota");
  await expect(page.getByLabel("Модель")).toHaveValue("Camry");
});

test("part step blocks progress when the current part has no useful signal", async ({ page }) => {
  await fillVinVehicle(page);
  await nextStep(page);

  const partName = page.getByLabel("Название детали");
  await expect(page.locator("#part-0-error")).toContainText("Добавьте название");
  await expectStep(page, 2);
  await expect(partName).toBeFocused();
  await expect(partName).toHaveAttribute("aria-invalid", "true");
});

test("invalid photo type returns field feedback on the parts step", async ({ page }) => {
  await fillVinVehicle(page);
  await page.locator('input[name="part-0-photo"]').setInputFiles({
    name: "part.txt",
    mimeType: "text/plain",
    buffer: Buffer.from("not an image"),
  });
  await nextStep(page);

  await expect(page.locator("#part-0-photo-error")).toHaveText("Можно загружать только изображения.");
  await expect(page.locator('input[name="part-0-photo"]')).toHaveAttribute("aria-invalid", "true");
  await expectStep(page, 2);
});

test("back and forward navigation preserves entered vehicle and part data", async ({ page }) => {
  await fillVinVehicle(page);
  await page.getByLabel("Название детали").fill("Передняя фара");
  await nextStep(page);
  await expectStep(page, 3);

  await page.getByLabel("Телефон / WhatsApp / Telegram").fill("+971500000000");
  await page.getByRole("button", { name: "← Назад" }).click();
  await expectStep(page, 2);
  await expect(page.getByLabel("Название детали")).toHaveValue("Передняя фара");

  await page.getByRole("button", { name: "← Назад" }).click();
  await expectStep(page, 1);
  await expect(page.getByLabel("VIN")).toHaveValue("JT123456789012345");

  await nextStep(page);
  await expectStep(page, 2);
  await nextStep(page);
  await expectStep(page, 3);
  await expect(page.getByLabel("Телефон / WhatsApp / Telegram")).toHaveValue("+971500000000");
});

test("one vehicle can submit two part items in the same CRM request payload", async ({ page }) => {
  let captured = "";
  await page.route(endpointPattern, async (route) => {
    captured = route.request().postData() || "";
    await route.fulfill({
      status: 201,
      contentType: "application/json",
      body: JSON.stringify({ ok: true, requestNumber: 2001 }),
    });
  });

  await fillVinVehicle(page);
  await page.getByLabel("Название детали").fill("Передняя фара");
  await page.getByRole("button", { name: "+ Добавить ещё деталь" }).click();
  await page.getByLabel("Название детали 2").fill("Задний фонарь");
  await page.getByLabel("Фото детали 2").setInputFiles({
    name: "rear-light.jpg",
    mimeType: "image/jpeg",
    buffer: Buffer.from([0xff, 0xd8, 0xff, 0xd9]),
  });
  await nextStep(page);
  await expectStep(page, 3);
  await page.getByLabel("Телефон / WhatsApp / Telegram").fill("+971500000000");
  await page.getByRole("button", { name: "Отправить заявку" }).click();

  await expect(page.getByRole("status")).toContainText("Заявка №2001");
  expect(captured).toContain("Передняя фара");
  expect(captured).toContain("Задний фонарь");
  expect((captured.match(/partName/g) || []).length).toBe(2);
  expect(captured).toContain("part-1-photo-0");
});

test("an explicitly added empty part must be completed or removed before progress", async ({ page }) => {
  await fillVinVehicle(page);
  await page.getByLabel("Название детали").fill("Передняя фара");
  await page.getByRole("button", { name: "+ Добавить ещё деталь" }).click();
  await nextStep(page);

  await expect(page.locator("#part-1-error")).toContainText("либо удалите пустую деталь");
  await expect(page.getByLabel("Название детали 2")).toBeFocused();

  await page.locator(".partEntry").last().getByRole("button", { name: "Удалить" }).click();
  await nextStep(page);
  await expectStep(page, 3);
});

test("contact validation happens only after vehicle and part steps are valid", async ({ page }) => {
  await fillVinVehicle(page);
  await fillPrimaryPart(page);
  await page.getByRole("button", { name: "Отправить заявку" }).click();

  const contact = page.getByLabel("Телефон / WhatsApp / Telegram");
  await expect(page.locator("#contact-error")).toHaveText("Укажите телефон, WhatsApp или Telegram.");
  await expect(contact).toBeFocused();
  await expect(contact).toHaveAttribute("aria-invalid", "true");
  await expectStep(page, 3);
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

  await fillVinVehicle(page);
  await fillPrimaryPart(page);
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

  await fillVinVehicle(page);
  await fillPrimaryPart(page);
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
  await nextStep(page);
  await expectStep(page, 2);

  await page.getByLabel("OEM / Part Number").fill("81110-00000");
  await nextStep(page);
  await expectStep(page, 3);

  await page.getByLabel("Телефон / WhatsApp / Telegram").fill("@qa_test");
  await page.getByRole("button", { name: "Отправить заявку" }).click();

  await expect(page.getByRole("status")).toContainText("Заявка №1000");
});
