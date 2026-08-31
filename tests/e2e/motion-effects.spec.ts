import { expect, test, type Page } from "@playwright/test";

async function scrollFirstProcessStepIntoTriggerZone(page: Page) {
  await page.evaluate(() => {
    const step = document.querySelector<HTMLElement>(".processStep");
    if (!step) return;
    const absoluteTop = step.getBoundingClientRect().top + window.scrollY;
    window.scrollTo(0, Math.max(0, absoluteTop - window.innerHeight * 0.52));
  });
}

async function assertNumberSequence(page: Page, width: number, height: number) {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width, height });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const sequence = page.locator(".processSequence");
  const steps = page.locator(".processStep");

  await expect(sequence).toHaveClass(/processMotionArmed|processMotionRun/);
  await expect(steps.nth(0)).toHaveClass(/processStepPending/);
  await expect(steps.nth(1)).toHaveClass(/processStepPending/);
  await expect(steps.nth(2)).toHaveClass(/processStepPending/);
  await expect(steps.nth(0)).not.toHaveClass(/processStepVisible/);
  await expect(steps.nth(1)).not.toHaveClass(/processStepVisible/);
  await expect(steps.nth(2)).not.toHaveClass(/processStepVisible/);

  await scrollFirstProcessStepIntoTriggerZone(page);

  await expect(steps.nth(0)).toHaveClass(/processStepVisible/);
  await expect(steps.nth(1)).toHaveClass(/processStepPending/);
  await expect(steps.nth(2)).toHaveClass(/processStepPending/);

  const firstStage = await steps.evaluateAll((items) =>
    items.map((item) => Number.parseFloat(getComputedStyle(item.querySelector(".stepNo") as HTMLElement).opacity)),
  );
  expect(firstStage[0]).toBeGreaterThanOrEqual(0);
  expect(firstStage[1]).toBe(0);
  expect(firstStage[2]).toBe(0);

  await page.waitForTimeout(680);
  await expect(steps.nth(1)).toHaveClass(/processStepVisible/);
  await expect(steps.nth(2)).toHaveClass(/processStepPending/);

  const secondStage = await steps.evaluateAll((items) =>
    items.map((item) => Number.parseFloat(getComputedStyle(item.querySelector(".stepNo") as HTMLElement).opacity)),
  );
  expect(secondStage[0]).toBeGreaterThan(0.5);
  expect(secondStage[2]).toBe(0);

  await page.waitForTimeout(680);
  await expect(steps.nth(2)).toHaveClass(/processStepVisible/);

  const finalStage = await steps.evaluateAll((items) =>
    items.map((item) => Number.parseFloat(getComputedStyle(item.querySelector(".stepNo") as HTMLElement).opacity)),
  );
  expect(finalStage[0]).toBeGreaterThan(0.9);
  expect(finalStage[1]).toBeGreaterThan(0.9);
  expect(finalStage[2]).toBeGreaterThan(0);

  const tracer = await sequence.evaluate((element) => getComputedStyle(element, "::after").animationName);
  expect(tracer).toContain(width <= 600 ? "v7-process-tracer-y" : "v7-process-tracer-x");
}

test("mobile process numbers visibly stage 01 then 02 then 03 after real scroll", async ({ page }) => {
  await assertNumberSequence(page, 390, 844);
});

test("desktop process numbers visibly stage 01 then 02 then 03 after real scroll", async ({ page }) => {
  await assertNumberSequence(page, 1440, 1000);
});

test("hero timing remains unchanged and primary CTA stays usable", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const hero = await page.locator(".partCore").evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      animationName: style.animationName,
      animationDuration: style.animationDuration,
      animationDelay: style.animationDelay,
    };
  });
  expect(hero.animationName).toContain("v7-open-core");
  expect(hero.animationDuration).toBe("1.18s");
  expect(Number.parseFloat(hero.animationDelay)).toBeGreaterThanOrEqual(0.17);

  const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(hasOverflow).toBe(false);

  await page.getByRole("link", { name: "Запросить запчасть" }).click();
  await expect(page).toHaveURL(/#request$/);
  await expect(page.locator("#request")).toBeInViewport();
});

test("reduced motion keeps the complete static process and never arms number staging", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const hero = await page.locator(".partCore").evaluate((element) => {
    const style = getComputedStyle(element);
    return { animationName: style.animationName, translate: style.translate };
  });
  expect(hero.animationName).toBe("none");
  expect(hero.translate === "none" || hero.translate === "0px" || hero.translate.startsWith("0px 0px")).toBe(true);

  const sequence = page.locator(".processSequence");
  const steps = page.locator(".processStep");
  await scrollFirstProcessStepIntoTriggerZone(page);
  await expect(sequence).not.toHaveClass(/processMotionArmed|processMotionRun/);
  await expect(steps.nth(0)).not.toHaveClass(/processStepPending|processStepVisible/);
  await expect(steps.nth(1)).not.toHaveClass(/processStepPending|processStepVisible/);
  await expect(steps.nth(2)).not.toHaveClass(/processStepPending|processStepVisible/);

  const numbers = await steps.evaluateAll((items) =>
    items.map((item) => {
      const style = getComputedStyle(item.querySelector(".stepNo") as HTMLElement);
      return { animationName: style.animationName, opacity: style.opacity, clipPath: style.clipPath };
    }),
  );
  expect(numbers.every((item) => item.animationName === "none")).toBe(true);
  expect(numbers.every((item) => item.opacity === "1")).toBe(true);
  expect(numbers.every((item) => item.clipPath === "none" || item.clipPath === "inset(0px)")).toBe(true);

  await expect(page.getByRole("link", { name: "Запросить запчасть" })).toBeVisible();
});
