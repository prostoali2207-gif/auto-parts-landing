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


test("approved hero artwork is visible and request CTA remains actionable on mobile", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const image = page.locator(".heroConceptImage");
  await expect(image).toBeVisible();
  await expect(image).toHaveAttribute("src", "/hero/deconstructed-front.webp");
  await expect.poll(() => image.evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  await expect(page.getByRole("heading", { name: /Нужна запчасть\? Покажите машину и деталь/ })).toBeVisible();
  await page.getByRole("link", { name: "Запросить запчасть" }).click();
  await expect(page).toHaveURL(/#request$/);
  await expect(page.locator("#request")).toBeInViewport();
});

test("approved hero is static with reduced motion and process stays readable", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const artwork = page.locator(".heroConceptImage");
  const animation = await artwork.evaluate((element) => getComputedStyle(element).animationName);
  expect(animation).toBe("none");
  const steps = page.locator(".processStep");
  await scrollFirstProcessStepIntoTriggerZone(page);
  await expect(page.locator(".processSequence")).not.toHaveClass(/processMotionArmed|processMotionRun/);
  await expect(steps.nth(0)).not.toHaveClass(/processStepPending|processStepVisible/);
  await expect(steps.nth(2)).not.toHaveClass(/processStepPending|processStepVisible/);
});
