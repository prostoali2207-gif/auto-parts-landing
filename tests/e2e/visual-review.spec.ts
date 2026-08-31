import { test, expect, type Page } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const outputDir = "artifacts/visual-review";
const deployedUrl = process.env.PLAYWRIGHT_TEST_BASE_URL;

test.skip(!deployedUrl, "Visual review runs only against a deployed URL.");

async function openLanding(page: Page) {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator("main")).toBeVisible();
  await expect(page.locator("#request")).toBeAttached();
  await page.evaluate(() => document.fonts.ready);
}

async function freezeHeroMotion(page: Page, currentTime: number) {
  await page.evaluate((time) => {
    document.querySelectorAll<HTMLElement>(".heroObject .part").forEach((element) => {
      element.getAnimations().forEach((animation) => {
        animation.pause();
        animation.currentTime = time;
      });
    });
  }, currentTime);
}

async function scrollProcessToMidpoint(page: Page) {
  const top = await page.locator(".process").evaluate((element) => element.getBoundingClientRect().top + window.scrollY);
  const viewportHeight = await page.evaluate(() => window.innerHeight);
  await page.evaluate((y) => window.scrollTo(0, y), Math.max(0, top - viewportHeight * 0.25));
  await page.waitForTimeout(80);
}

test.beforeAll(async () => {
  await mkdir(outputDir, { recursive: true });
});

test("capture full landing on narrow mobile", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 360, height: 800 });
  await openLanding(page);
  await page.screenshot({ path: `${outputDir}/landing-mobile-360.png`, fullPage: true });
});

test("capture full landing on mobile", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await openLanding(page);
  await page.screenshot({ path: `${outputDir}/landing-mobile-390.png`, fullPage: true });
});

test("capture full landing at intermediate width", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 768, height: 960 });
  await openLanding(page);
  await page.screenshot({ path: `${outputDir}/landing-intermediate-768.png`, fullPage: true });
});

test("capture full landing on desktop", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await openLanding(page);
  await page.screenshot({ path: `${outputDir}/landing-desktop-1440.png`, fullPage: true });
});

test("capture mobile motion checkpoints", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 390, height: 844 });
  await openLanding(page);
  await freezeHeroMotion(page, 330);
  await page.locator(".hero").screenshot({ path: `${outputDir}/motion-mobile-hero-mid.png` });
  await freezeHeroMotion(page, 1000);
  await scrollProcessToMidpoint(page);
  await page.screenshot({ path: `${outputDir}/motion-mobile-process-mid.png`, fullPage: false });
});

test("capture desktop motion checkpoints", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await openLanding(page);
  await freezeHeroMotion(page, 330);
  await page.locator(".hero").screenshot({ path: `${outputDir}/motion-desktop-hero-mid.png` });
  await freezeHeroMotion(page, 1000);
  await scrollProcessToMidpoint(page);
  await page.screenshot({ path: `${outputDir}/motion-desktop-process-mid.png`, fullPage: false });
});
