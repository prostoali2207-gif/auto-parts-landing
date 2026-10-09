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

async function waitForTrustMedia(page: Page) {
  const trust = page.locator(".trustProof");
  await trust.scrollIntoViewIfNeeded();
  await expect(trust).toBeVisible();
  const gallery = trust.locator(".supplierGallery");
  await expect(gallery.locator(".supplierSlide")).toHaveCount(5);
  const image = gallery.locator("img").first();
  await image.scrollIntoViewIfNeeded();
  await expect.poll(() => image.evaluate((node) => {
    const element = node as HTMLImageElement;
    return element.complete && element.naturalWidth > 0 && element.naturalHeight > 0;
  })).toBe(true);
  await page.waitForTimeout(150);
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

test("capture opened manager contact disclosure on mobile", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await openLanding(page);

  await page.locator(".managerContactSummary").click();
  await expect(page.locator(".managerContactDisclosure")).toHaveAttribute("open", "");
  await page.locator(".hero").screenshot({ path: `${outputDir}/hero-mobile-manager-contact-open.png` });
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

test("capture mobile request steps with sticky header", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await openLanding(page);

  const form = page.locator("#request-form");
  await form.scrollIntoViewIfNeeded();
  await expect(page.locator(".topbar")).toBeVisible();
  await page.screenshot({ path: outputDir + "/request-mobile-step-01.png", fullPage: false });

  await page.getByLabel("Марка").fill("Toyota");
  await page.getByLabel("Модель").fill("Camry");
  await page.getByLabel("Год").fill("2022");
  await page.getByLabel("VIN").fill("JTNB11HK5K3001234");
  await page.getByRole("button", { name: "Далее →" }).click();
  await expect(page.locator('[data-form-step="2"]')).toHaveAttribute("data-active", "true");
  await page.screenshot({ path: outputDir + "/request-mobile-step-02.png", fullPage: false });

  await page.getByLabel("Название детали").fill("Передняя фара");
  await page.getByRole("button", { name: "Далее →" }).click();
  await expect(page.locator('[data-form-step="3"]')).toHaveAttribute("data-active", "true");
  await page.screenshot({ path: outputDir + "/request-mobile-step-03.png", fullPage: false });
});
test("capture loaded trust proof at all release widths", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const [width, height, label] of [
    [360, 800, "mobile-360"],
    [390, 844, "mobile-390"],
    [768, 960, "intermediate-768"],
    [1440, 1000, "desktop-1440"],
  ] as const) {
    await page.setViewportSize({ width, height });
    await openLanding(page);
    await waitForTrustMedia(page);
    await page.locator(".trustProof").screenshot({ path: `${outputDir}/trust-${label}.png` });
  }
});


test("capture approved hero at compact/mobile widths and process stages", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 390, height: 640 });
  await openLanding(page);
  const art = page.locator(".heroConceptImage");
  await expect.poll(() => art.evaluate((el) => (el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  await page.screenshot({ path: `${outputDir}/hero-approved-mobile-compact.png`, fullPage: false });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator(".heroConcept").screenshot({ path: `${outputDir}/hero-approved-mobile.png` });
  await captureProcessNumberStages(page, "motion-mobile");
});

test("capture approved desktop hero and existing process stages", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await openLanding(page);
  const art = page.locator(".heroConceptImage");
  await expect.poll(() => art.evaluate((el) => (el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  await page.locator(".heroConcept").screenshot({ path: `${outputDir}/hero-approved-desktop.png` });
  await captureProcessNumberStages(page, "motion-desktop");
});
