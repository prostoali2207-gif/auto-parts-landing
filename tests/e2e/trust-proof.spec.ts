import { test, expect } from "@playwright/test";

test("uses authentic supplier photographs without weakening the trust claims", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Das Motors — автозапчасти из ОАЭ в Россию и СНГ");

  const trust = page.locator(".trustProof");
  await expect(trust.getByRole("heading", { name: "Сначала покажем деталь. Потом выкупим." })).toBeVisible();
  await expect(trust).toContainText("Новые оригинальные, б/у оригинальные и новые аналоги.");
  await expect(trust).toContainText("Обычно 1–3 дня.");
  await expect(trust).toContainText("Это срок поиска детали, не доставки.");
  await expect(trust).toContainText("Из ОАЭ в Россию и страны СНГ.");
  await expect(trust).toContainText("14 дней с момента получения");
  await expect(trust).toContainText("+10% к стоимости детали");
  await expect(trust).not.toContainText("20%");

  const gallery = trust.locator(".supplierGallery");
  await expect(gallery).toBeVisible();
  await expect(gallery.locator(".supplierSlide")).toHaveCount(5);
  await expect(gallery).toContainText("Снято у поставщиков в ОАЭ, где ищем детали.");
  await expect(gallery.getByRole("link", { name: /Подобрать запчасть/ })).toHaveAttribute("href", "#request");
  await expect(gallery.locator("img")).toHaveCount(5);
  await expect(gallery.locator("img").first()).toHaveAttribute("alt", /BMW/);
  await expect(gallery).not.toContainText("В наличии");
  await expect(gallery.locator("video")).toHaveCount(0);
});

test("gallery can be scrolled by buttons and photos expanded then dismissed", async ({ page }) => {
  await page.goto("/");
  const gallery = page.locator(".supplierGallery");
  const next = gallery.getByRole("button", { name: "Следующее фото" });
  const previous = gallery.getByRole("button", { name: "Предыдущее фото" });
  await expect(previous).toBeDisabled();
  await expect(gallery.locator(".supplierGalleryCounter")).toContainText("01");

  await next.click();
  await expect(gallery.locator(".supplierGalleryCounter")).toContainText("02");
  await expect(previous).toBeEnabled();

  await gallery.getByRole("button", { name: /Открыть фото 2/ }).click();
  const dialog = page.getByRole("dialog", { name: "Просмотр фотографии" });
  await expect(dialog).toBeVisible();
  await expect(dialog.locator("img")).toHaveAttribute("alt", /Audi/);
  await dialog.getByRole("button", { name: "Следующее увеличенное фото" }).click();
  await expect(dialog.locator("img")).toHaveAttribute("alt", /Mercedes-Benz/);
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
});

test("supplier gallery and request CTA fit narrow mobile without page overflow", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/");
  const gallery = page.locator(".supplierGallery");
  await gallery.scrollIntoViewIfNeeded();
  await expect(gallery).toBeVisible();

  const dimensions = await gallery.evaluate((node) => {
    const rect = node.getBoundingClientRect();
    return { x: rect.x, right: rect.right };
  });
  expect(dimensions.x).toBeGreaterThanOrEqual(-1);
  expect(dimensions.right).toBeLessThanOrEqual(361);

  const track = gallery.locator(".supplierGalleryTrack");
  const scrollable = await track.evaluate((node) => node.scrollWidth > node.clientWidth);
  expect(scrollable).toBe(true);
  await gallery.getByRole("button", { name: "Следующее фото" }).click();
  await expect(gallery.locator(".supplierGalleryCounter")).toContainText("02");
  await expect(gallery.getByRole("link", { name: /Подобрать запчасть/ })).toHaveAttribute("href", "#request");
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
});
