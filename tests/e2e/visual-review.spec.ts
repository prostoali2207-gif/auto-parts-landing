import { test, expect } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const outputDir = "artifacts/visual-review";

async function openLanding(page: Parameters<Parameters<typeof test>[1]>[0]["page"]) {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator("main")).toBeVisible();
  await expect(page.locator("#request")).toBeAttached();
  await page.evaluate(() => document.fonts.ready);
}

test.beforeAll(async () => {
  await mkdir(outputDir, { recursive: true });
});

test("capture full landing on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openLanding(page);
  await page.screenshot({ path: `${outputDir}/landing-mobile-390.png`, fullPage: true });
});

test("capture full landing on desktop", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await openLanding(page);
  await page.screenshot({ path: `${outputDir}/landing-desktop-1440.png`, fullPage: true });
});
