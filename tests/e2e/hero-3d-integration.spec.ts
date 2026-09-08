import { expect, test } from "@playwright/test";

test("switching to reduced motion restores the complete CSS fallback", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/?hero3d=1");
  await expect(page.locator(".heroObject")).toHaveClass(/hero3dReady/, { timeout: 30_000 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("model-viewer")).toHaveCount(0);
  await expect(page.locator(".explodedObject")).toHaveCSS("opacity", "1");
  await expect(page.locator(".hero3dStage")).toHaveAttribute("data-hero-3d", "fallback");
  await page.getByRole("link", { name: "Запросить запчасть" }).click();
  await expect(page.locator("#request")).toBeInViewport();
});

test("initial reduced motion does not request the GLB", async ({ page }) => {
  let requests = 0;
  page.on("request", request => { if (request.url().endsWith("/hero-object.glb")) requests++; });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/?hero3d=1");
  await expect(page.locator(".explodedObject")).toHaveCSS("opacity", "1");
  await expect(page.locator("model-viewer")).toHaveCount(0);
  expect(requests).toBe(0);
});

test("failed GLB leaves the CSS object and request action usable", async ({ page }) => {
  await page.route("**/hero/hero-object.glb", route => route.fulfill({ status: 404, body: "" }));
  await page.emulateMedia({ reducedMotion: "no-preference" });
  const response = page.waitForResponse("**/hero/hero-object.glb");
  await page.goto("/?hero3d=1");
  expect((await response).status()).toBe(404);
  await expect(page.locator(".explodedObject")).toHaveCSS("opacity", "1");
  await expect(page.locator(".heroObject")).not.toHaveClass(/hero3dReady/);
  await page.getByRole("link", { name: "Запросить запчасть" }).click();
  await expect(page.locator("#request")).toBeInViewport();
});
