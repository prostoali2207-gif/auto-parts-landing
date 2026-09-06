import { test, expect, type Page } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const outputDir = "artifacts/visual-review";
const deployedUrl = process.env.PLAYWRIGHT_TEST_BASE_URL;

test.skip(!deployedUrl, "Visual review runs only against a deployed URL.");

async function openLanding(page: Page, path = "/") {
  await page.goto(path, { waitUntil: "domcontentloaded" });
  await expect(page.locator("main")).toBeVisible();
  await expect(page.locator("#request")).toBeAttached();
  await page.evaluate(() => document.fonts.ready);
}

async function waitForTrustMedia(page: Page) {
  const trust = page.locator(".trustProof");
  await trust.scrollIntoViewIfNeeded();
  await expect(trust).toBeVisible();
  const image = trust.locator(".trustMediaPhotoFrame img");
  await expect.poll(() => image.evaluate((node) => {
    const element = node as HTMLImageElement;
    return element.complete && element.naturalWidth > 0 && element.naturalHeight > 0;
  })).toBe(true);
  await expect(trust.locator(".trustProofVideo")).toBeAttached();
  await page.waitForTimeout(300);
}

async function waitForProgressive3DHero(page: Page) {
  const hero = page.locator(".heroObject");
  await expect(hero).toHaveClass(/hero3dReady/, { timeout: 20_000 });

  const viewerState = await page.locator("model-viewer.hero3dModel").evaluate((node) => {
    const viewer = node as HTMLElement & {
      loaded?: boolean;
      src?: string;
      availableAnimations?: string[];
    };
    return {
      loaded: Boolean(viewer.loaded),
      src: viewer.src ?? "",
      animations: viewer.availableAnimations ?? [],
    };
  });

  expect(viewerState.loaded).toBe(true);
  expect(viewerState.src).toContain("/hero/hero-object.glb");
  expect(viewerState.animations).toHaveLength(6);
  await page.waitForTimeout(2200);
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

async function triggerMobileHero(page: Page) {
  const heroObject = page.locator(".heroObject");
  await expect(heroObject).toHaveClass(/heroMobileMotionArmed/);
  await page.evaluate(() => window.scrollBy(0, 2));
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

  await page.getByLabel("VIN").fill("JT123456789012345");
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

test("capture mobile browser-chrome hero timing and explicit 01 then 02 then 03 process stages", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 390, height: 640 });
  await openLanding(page, "/?hero3d=0");

  await expect(page.locator(".heroObject")).toHaveClass(/heroMobileMotionArmed/);
  await page.screenshot({ path: `${outputDir}/motion-mobile-hero-compact.png`, fullPage: false });

  await triggerMobileHero(page);
  await freezeHeroMotion(page, 700);
  await page.screenshot({ path: `${outputDir}/motion-mobile-hero-mid.png`, fullPage: false });
  await freezeHeroMotion(page, 1500);
  await page.screenshot({ path: `${outputDir}/motion-mobile-hero-final.png`, fullPage: false });

  await page.setViewportSize({ width: 390, height: 844 });
  await captureProcessNumberStages(page, "motion-mobile");
});

test("capture desktop hero and explicit 01 then 02 then 03 process stages", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await openLanding(page, "/?hero3d=0");

  await freezeHeroMotion(page, 150);
  await page.locator(".hero").screenshot({ path: `${outputDir}/motion-desktop-hero-compact.png` });
  await freezeHeroMotion(page, 700);
  await page.locator(".hero").screenshot({ path: `${outputDir}/motion-desktop-hero-mid.png` });
  await freezeHeroMotion(page, 1500);
  await page.locator(".hero").screenshot({ path: `${outputDir}/motion-desktop-hero-final.png` });

  await captureProcessNumberStages(page, "motion-desktop");
});


test("progressive 3D remains disabled for reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await openLanding(page, "/?hero3d=1");

  await expect(page.locator(".heroObject")).not.toHaveClass(/hero3dReady/);
  await expect(page.locator("model-viewer.hero3dModel")).toHaveCount(0);
  await expect(page.locator(".explodedObject")).toBeVisible();
});

test("capture progressive 3D hero on mobile", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 390, height: 844 });
  await openLanding(page, "/?hero3d=1");
  await waitForProgressive3DHero(page);

  const geometry = await page.evaluate(() => {
    const hero = document.querySelector<HTMLElement>(".hero");
    const object = document.querySelector<HTMLElement>(".heroObject");
    const cta = document.querySelector<HTMLElement>(".heroActions .primary");
    const headline = document.querySelector<HTMLElement>(".hero h1");
    if (!hero || !object || !cta || !headline) return null;
    const o = object.getBoundingClientRect();
    const c = cta.getBoundingClientRect();
    const h = headline.getBoundingClientRect();
    return {
      objectLeft: o.left,
      objectRight: o.right,
      ctaBottom: c.bottom,
      headlineBottom: h.bottom,
      viewportWidth: window.innerWidth,
      hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    };
  });

  expect(geometry).not.toBeNull();
  expect(geometry?.hasOverflow).toBe(false);
  expect(geometry?.objectLeft).toBeGreaterThanOrEqual(-80);
  expect(geometry?.objectRight).toBeLessThanOrEqual((geometry?.viewportWidth ?? 390) + 80);
  expect(geometry?.headlineBottom).toBeLessThan(geometry?.ctaBottom ?? 0);

  await page.locator(".hero").screenshot({ path: `${outputDir}/hero-3d-mobile-390.png` });
});

test("capture progressive 3D hero on desktop", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await openLanding(page, "/?hero3d=1");
  await waitForProgressive3DHero(page);

  await expect(page.locator(".heroObject")).toHaveClass(/hero3dReady/);
  await page.locator(".hero").screenshot({ path: `${outputDir}/hero-3d-desktop-1440.png` });
});

test("progressive 3D does not break browser-chrome first screen", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 390, height: 640 });
  await openLanding(page, "/?hero3d=1");
  await waitForProgressive3DHero(page);

  const result = await page.evaluate(() => {
    const header = document.querySelector<HTMLElement>(".topbar");
    const headline = document.querySelector<HTMLElement>(".hero h1");
    const cta = document.querySelector<HTMLElement>(".heroActions .primary");
    if (!header || !headline || !cta) return null;
    const hd = header.getBoundingClientRect();
    const h = headline.getBoundingClientRect();
    const c = cta.getBoundingClientRect();
    return {
      headlineTop: h.top,
      headerBottom: hd.bottom,
      ctaBottom: c.bottom,
      viewportHeight: window.innerHeight,
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    };
  });

  expect(result).not.toBeNull();
  expect(result?.headlineTop).toBeGreaterThanOrEqual((result?.headerBottom ?? 0) - 1);
  expect(result?.ctaBottom).toBeLessThanOrEqual((result?.viewportHeight ?? 640) - 8);
  expect(result?.overflow).toBe(false);

  await page.screenshot({ path: `${outputDir}/hero-3d-mobile-390x640.png`, fullPage: false });
});
