import { test, expect } from "@playwright/test";

test("renders only the approved verified trust facts", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Spline — автозапчасти из ОАЭ в Россию и СНГ");

  const trust = page.locator(".trustProof");
  await expect(trust).toBeVisible();
  await expect(page.getByRole("heading", { name: "Сначала покажем деталь. Потом выкупим." })).toBeVisible();
  await expect(trust).toContainText("Новые оригинальные, б/у оригинальные и новые аналоги.");
  await expect(trust).toContainText("Обычно 1–3 дня.");
  await expect(trust).toContainText("Это срок поиска детали, не доставки.");
  await expect(trust).toContainText("Из ОАЭ в Россию и страны СНГ.");
  await expect(trust).toContainText("14 дней с момента получения");
  await expect(trust).toContainText("+10% к стоимости детали");
  await expect(trust).not.toContainText("20%");
});

test("trust proof fits narrow mobile without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/");

  const trust = page.locator(".trustProof");
  await trust.scrollIntoViewIfNeeded();
  await expect(trust).toBeVisible();

  const box = await trust.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.x).toBeGreaterThanOrEqual(-0.5);
  expect(box!.x + box!.width).toBeLessThanOrEqual(360.5);

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});
