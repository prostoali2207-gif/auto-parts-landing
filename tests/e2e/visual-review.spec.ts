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

async function scrollMobileHeroToVisibleRatio(page: Page, ratio: number) {
  await page.evaluate((targetRatio) => {
    const object = document.querySelector<HTMLElement>(".heroObject");
    if (!object) return;
    const rect = object.getBoundingClientRect();
    const absoluteTop = rect.top + window.scrollY;
    const targetTop = window.innerHeight - rect.height * targetRatio;
    window.scrollTo(0, Math.max(1, absoluteTop - targetTop));
  }, ratio);
}

async function triggerMobileHero(page: Page) {
  const heroObject = page.locator(".heroObject");
  await expect(heroObject).toHaveClass(/heroMobileMotionArmed/);
  await scrollMobileHeroToVisibleRatio(page, 0.22);
  await expect(heroObject).toHaveClass(/heroMobileMotionRun/);
}

async function triggerProcessAtFirstStep(page: Page) {
  const sequence = page.locator(".processSequence");
  const steps = page.locator(".processStep");
  await expect(steps.nth(0)).toHaveClass(/processStepPending/);
  await page.evaluate(() => {
    const step = document.querySelector<HTMLElement>(".processStep");
    if (!step) return;
    const absoluteTop = step.getBoundingClientRect().top + window.scrollY;
    window.scrollTo(0, Math.max(0, absoluteTop - window.innerHeight * 0.52));
  });
  await expect(sequence).toHaveClass(/processMotionRun/);
  await expect(steps.nth(0)).toHaveClass(/processStepVisible/);
}

async function captureProcessNumberStages(page: Page, prefix: string) {
  await triggerProcessAtFirstStep(page);
  await page.waitForTimeout(180);
  await page.screenshot({ path: `${outputDir}/${prefix}-process-01.png`, fullPage: false });
  await page.waitForTimeout(620);
  await page.screenshot({ path: `${outputDir}/${prefix}-process-02.png`, fullPage: false });
  await page.waitForTimeout(620);
  await page.screenshot({ path: `${outputDir}/${prefix}-process-03.png`, fullPage: false });
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

test("capture mobile viewport-triggered hero and explicit 01 then 02 then 03 process stages", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 390, height: 844 });
  await openLanding(page);

  await expect(page.locator(".heroObject")).toHaveClass(/heroMobileMotionArmed/);
  await page.screenshot({ path: `${outputDir}/motion-mobile-hero-compact.png`, fullPage: false });

  await triggerMobileHero(page);
  await freezeHeroMotion(page, 700);
  await page.screenshot({ path: `${outputDir}/motion-mobile-hero-mid.png`, fullPage: false });
  await freezeHeroMotion(page, 1500);
  await page.screenshot({ path: `${outputDir}/motion-mobile-hero-final.png`, fullPage: false });

  await captureProcessNumberStages(page, "motion-mobile");
});

test("capture desktop hero and explicit 01 then 02 then 03 process stages", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await openLanding(page);

  await freezeHeroMotion(page, 150);
  await page.locator(".hero").screenshot({ path: `${outputDir}/motion-desktop-hero-compact.png` });
  await freezeHeroMotion(page, 700);
  await page.locator(".hero").screenshot({ path: `${outputDir}/motion-desktop-hero-mid.png` });
  await freezeHeroMotion(page, 1500);
  await page.locator(".hero").screenshot({ path: `${outputDir}/motion-desktop-hero-final.png` });

  await captureProcessNumberStages(page, "motion-desktop");
});
