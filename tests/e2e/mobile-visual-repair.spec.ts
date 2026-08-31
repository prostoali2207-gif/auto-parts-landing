import { expect, test, type Page } from "@playwright/test";

async function heroVisibleRatio(page: Page) {
  return page.locator(".heroObject").evaluate((element) => {
    const rect = element.getBoundingClientRect();
    const top = Math.max(0, rect.top);
    const bottom = Math.min(window.innerHeight, rect.bottom);
    return Math.max(0, bottom - top) / rect.height;
  });
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
    const insetValues = result.clipPath.match(/-?\d*\.?\d+/g)?.map(Number) ?? [];
    expect(insetValues.every((value) => Math.abs(value) < 0.01)).toBe(true);
  }
}

test("mobile hero opens on first meaningful entry in a browser-chrome-constrained viewport", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 390, height: 640 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.evaluate(() => document.fonts.ready);

  const hero = page.locator(".heroObject");
  await expect(hero).toHaveClass(/heroMobileMotionArmed/);
  await expect(hero).not.toHaveClass(/heroMobileMotionRun/);

  const initialRatio = await heroVisibleRatio(page);
  expect(initialRatio).toBeGreaterThanOrEqual(0.19);
  expect(initialRatio).toBeLessThan(0.36);

  await page.evaluate(() => window.scrollBy(0, 2));
  await expect(hero).toHaveClass(/heroMobileMotionRun/);
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
