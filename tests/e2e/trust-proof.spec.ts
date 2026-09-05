import { test, expect } from "@playwright/test";

const proofAssets = [
  ["/proof/video", "video/mp4"],
  ["/proof/poster", "image/webp"],
  ["/proof/photo-desktop", "image/webp"],
  ["/proof/photo-mobile", "image/webp"],
] as const;

test("renders only the approved verified trust facts and real supplier media", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Das Motors — автозапчасти из ОАЭ в Россию и СНГ");

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

  const media = trust.locator(".trustProofMedia");
  await expect(media).toBeVisible();
  await expect(media).toContainText("Снято у поставщиков в ОАЭ, где ищем детали.");
  const video = media.locator("video");
  await expect(video).toHaveAttribute("src", "/proof/video");
  await expect(video).toHaveAttribute("poster", "/proof/poster");
  expect(await video.evaluate((node) => {
    const element = node as HTMLVideoElement;
    return element.muted && element.loop && element.playsInline;
  })).toBe(true);
  const duration = await video.evaluate(async (node) => {
    const element = node as HTMLVideoElement;
    if (element.readyState < 1) {
      await new Promise<void>((resolve, reject) => {
        const timer = window.setTimeout(() => reject(new Error("supplier proof video metadata timeout")), 5000);
        element.addEventListener("loadedmetadata", () => {
          window.clearTimeout(timer);
          resolve();
        }, { once: true });
        element.addEventListener("error", () => {
          window.clearTimeout(timer);
          reject(new Error("supplier proof video failed to decode"));
        }, { once: true });
        element.load();
      });
    }
    return element.duration;
  });
  expect(duration).toBeGreaterThan(5);
  expect(duration).toBeLessThanOrEqual(10.5);
  await expect(media.locator("img")).toHaveAttribute("src", "/proof/photo-desktop");
  await expect(media.locator("source")).toHaveAttribute("srcset", "/proof/photo-mobile");
});

test("serves every selected proof asset with the expected media type", async ({ request }) => {
  for (const [path, type] of proofAssets) {
    const response = await request.get(path);
    expect(response.ok(), `${path} should resolve`).toBe(true);
    expect(response.headers()["content-type"] ?? "").toContain(type);
  }
});

test("reduced motion keeps supplier video paused on its poster", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const video = page.locator(".trustProofVideo");
  await expect(video).toBeAttached();
  await expect.poll(() => video.evaluate((node) => (node as HTMLVideoElement).paused)).toBe(true);
});

test("trust proof fits narrow mobile without horizontal overflow", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/");

  const trust = page.locator(".trustProof");
  await trust.scrollIntoViewIfNeeded();
  await expect(trust).toBeVisible();

  const box = await trust.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.x).toBeGreaterThanOrEqual(-0.5);
  expect(box!.x + box!.width).toBeLessThanOrEqual(360.5);

  const mediaBox = await trust.locator(".trustProofMedia").boundingBox();
  expect(mediaBox).not.toBeNull();
  expect(mediaBox!.x).toBeGreaterThanOrEqual(-0.5);
  expect(mediaBox!.x + mediaBox!.width).toBeLessThanOrEqual(360.5);

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});
