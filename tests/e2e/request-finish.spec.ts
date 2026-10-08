import { test, expect } from "@playwright/test";

test("final request introduction no longer pretends to be another step", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const section = page.locator("#request");
  const intro = section.locator(".requestThreshold");

  await expect(intro.getByRole("heading", { name: "Что нужно найти?" })).toBeVisible();
  await expect(intro).toContainText("Укажите автомобиль и нужную деталь — менеджер продолжит подбор.");
  await expect(intro.locator(".requestTitleRow > span")).toHaveCount(0);
  await expect(section.getByRole("button", { name: "Отправить заявку" })).toBeVisible();
  await expect(section.locator(".formGroup")).toHaveCount(3);

  const thresholdHeight = await intro.evaluate((element) => element.getBoundingClientRect().height);
  expect(thresholdHeight).toBeLessThan(360);
  await expect(section.locator(".requestAfterNote")).toBeVisible();
});

test("compact mobile request retains 3-step flow and avoids premature submission note", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const section = page.locator("#request");
  await section.scrollIntoViewIfNeeded();
  await expect(section.locator(".requestTitleRow > span")).toHaveCount(0);
  const intro = section.locator(".requestThreshold");
  const height = await intro.evaluate((element) => element.getBoundingClientRect().height);
  expect(height).toBeLessThan(295);
  await expect(section.locator('[data-form-step="1"]')).toBeVisible();
  await expect(section.locator('[data-form-step="2"]')).toBeHidden();
  await expect(section.locator(".requestAfterNote")).toBeHidden();

  await page.getByLabel("VIN").fill("JT123456789012345");
  await section.getByRole("button", { name: "Далее →" }).click();
  await expect(section.locator('[data-form-step="2"]')).toBeVisible();
  await page.getByLabel("Название детали").fill("Передняя фара");
  await section.getByRole("button", { name: "Далее →" }).click();
  await expect(section.locator('[data-form-step="3"]')).toBeVisible();
  await expect(section.locator(".requestAfterNote")).toBeVisible();
  await expect(section.getByRole("button", { name: "Отправить заявку" })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
});

test("the compact footer uses verified contact destinations", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/");
  const footer = page.locator(".requestFooter");
  await expect(footer).toBeVisible();
  await expect(footer.getByRole("link", { name: /WhatsApp/ })).toHaveAttribute("href", "https://wa.me/971544550149");
  await expect(footer.getByRole("link", { name: /Telegram/ })).toHaveAttribute("href", "https://t.me/dasmotors_dxb");
  const text = await footer.innerText();
  expect(text).not.toMatch(/\d+ заказов|отзывов|доставка за/i);
});
