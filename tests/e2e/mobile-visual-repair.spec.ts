import { expect, test, type Page } from "@playwright/test";

async function scrollHeroToVisibleRatio(page: Page, ratio: number) {
  await page.evaluate((targetRatio) => {
    const object = document.querySelector<HTMLElement>(".heroObject");
    if (!object) return;
    const rect = object.getBoundingClientRect();
    const absoluteTop = rect.top + window.scrollY;
    const targetTop = window.innerHeight - rect.height * targetRatio;
    window.scrollTo(0, Math.max(1, absoluteTop - targetTop));
  }, ratio);
}

async function scrollProcessIntoView(page: Page) {
  await page.evaluate(() => {
    const step = document.querySelector<HTMLElement>(".processStep");
    if (!step) return;
    const absoluteTop = step.getBoundingClientRect().top + window.scrollY;
    window.scrollTo(0, Math.max(0, absoluteTop - window.innerHeight * 0.52));
  });
}

async function assertNumeralsFit(page: Page) {
  const results = await page.locator(".processStep").evaluateAll((items) =>
    items.map((item) => {
      const numeral = item.querySelector<HTMLElement>(".stepNo");
      const copy = item.querySelector<HTMLElement>("div");
      if (!numeral || !copy) return null;
      const range = document.createRange();
      range.selectNodeContents(numeral);
      const textRect = range.getBoundingClientRect();
      const numeralRect = numeral.getBoundingClientRect();
      const copyRect = copy.getBoundingClientRect();
      return {
        textRight: textRect.right,
        numeralRight: numeralRect.right,
        copyLeft: copyRect.left,
        clientWidth: numeral.clientWidth,
        scrollWidth: numeral.scrollWidth,
        clipPath: getComputedStyle(numeral).clipPath,
      };
    }),
  );

  for (const result of results) {
    expect(result).not.toBeNull();
    if (!result) continue;
    expect(result.textRight).toBeLessThanOrEqual(result.numeralRight + 0.75);
    expect(result.scrollWidth).toBeLessThanOrEqual(result.clientWidth + 1);
    expect(result.copyLeft - result.textRight).toBeGreaterThanOrEqual(4);
    expect(result.clipPath === "none" || result.clipPath === "inset(0px)").toBe(true);
  }
}

test("mobile hero opens around first meaningful object visibility, not lower in the page", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const hero = page.locator(".heroObject");
  await expect(hero).toHaveClass(/heroMobileMotionArmed/);

  await scrollHeroToVisibleRatio(page, 0.08);
  await page.waitForTimeout(100);
  await expect(hero).toHaveClass(/heroMobileMotionArmed/);
  await expect(hero).not.toHaveClass(/heroMobileMotionRun/);

  await scrollHeroToVisibleRatio(page, 0.22);
  await expect(hero).toHaveClass(/heroMobileMotionRun/);

  const visibleRatio = await hero.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    const top = Math.max(0, rect.top);
    const bottom = Math.min(window.innerHeight, rect.bottom);
    return Math.max(0, bottom - top) / rect.height;
  });
  expect(visibleRatio).toBeGreaterThanOrEqual(0.19);
  expect(visibleRatio).toBeLessThan(0.3);
});

for (const viewport of [{ width: 390, height: 844 }, { width: 360, height: 800 }]) {
  test(`mobile process numerals fit after reveal at ${viewport.width}px`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.setViewportSize(viewport);
    await page.goto("/", { waitUntil: "domcontentloaded" });

    await scrollProcessIntoView(page);
    const steps = page.locator(".processStep");
    await expect(steps.nth(0)).toHaveClass(/processStepVisible/);
    await page.waitForTimeout(1900);
    await expect(steps.nth(2)).toHaveClass(/processStepVisible/);
    await assertNumeralsFit(page);

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    expect(overflow).toBe(false);
  });
}
