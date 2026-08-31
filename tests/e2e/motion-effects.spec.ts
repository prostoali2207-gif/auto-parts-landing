import { expect, test } from "@playwright/test";

test("purposeful motion has readable hero timing and process motion triggers on viewport entry", async ({ page }) => {
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

  const sequence = page.locator(".processSequence");
  await expect(sequence).toHaveClass(/processMotionArmed/);

  await sequence.scrollIntoViewIfNeeded();
  await expect(sequence).toHaveClass(/processMotionRun/);

  const process = await sequence.evaluate((element) => {
    const route = getComputedStyle(element, "::before");
    const tracer = getComputedStyle(element, "::after");
    const numbers = Array.from(element.querySelectorAll<HTMLElement>(".stepNo")).map((number) => {
      const style = getComputedStyle(number);
      return { animationName: style.animationName, animationDelay: style.animationDelay };
    });
    return {
      routeAnimation: route.animationName,
      tracerAnimation: tracer.animationName,
      tracerContent: tracer.content,
      numbers,
    };
  });

  expect(process.routeAnimation).toContain("v7-process-route-draw-y");
  expect(process.tracerAnimation).toContain("v7-process-tracer-y");
  expect(process.tracerContent).not.toBe("none");
  expect(process.numbers.map((item) => item.animationName)).toEqual([
    "v7-process-number-reveal-y",
    "v7-process-number-reveal-y",
    "v7-process-number-reveal-y",
  ]);
  expect(process.numbers.map((item) => item.animationDelay)).toEqual(["0.12s", "0.47s", "0.82s"]);

  await page.waitForTimeout(1500);
  const settled = await sequence.evaluate((element) => {
    const tracer = getComputedStyle(element, "::after");
    const lastNumber = getComputedStyle(element.querySelectorAll<HTMLElement>(".stepNo")[2]);
    return {
      tracerOpacity: tracer.opacity,
      lastNumberClip: lastNumber.clipPath,
    };
  });
  expect(settled.tracerOpacity).toBe("0");
  expect(settled.lastNumberClip).not.toContain("100%");

  const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(hasOverflow).toBe(false);

  await page.getByRole("link", { name: "Запросить запчасть" }).click();
  await expect(page).toHaveURL(/#request$/);
  await expect(page.locator("#request")).toBeInViewport();
});

test("reduced motion keeps the complete static process and never arms the trigger", async ({ page }) => {
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
  await sequence.scrollIntoViewIfNeeded();
  await expect(sequence).not.toHaveClass(/processMotionArmed|processMotionRun/);

  const process = await sequence.evaluate((element) => {
    const line = getComputedStyle(element, "::before");
    const tracer = getComputedStyle(element, "::after");
    const number = getComputedStyle(element.querySelector(".stepNo") as HTMLElement);
    return {
      lineAnimation: line.animationName,
      lineClip: line.clipPath,
      tracerContent: tracer.content,
      tracerAnimation: tracer.animationName,
      numberAnimation: number.animationName,
      numberClip: number.clipPath,
    };
  });

  expect(process.lineAnimation).toBe("none");
  expect(process.numberAnimation).toBe("none");
  expect(process.tracerAnimation).toBe("none");
  expect(process.tracerContent === "none" || process.tracerContent === "normal").toBe(true);
  expect(process.lineClip === "none" || process.lineClip === "inset(0px)").toBe(true);
  expect(process.numberClip === "none" || process.numberClip === "inset(0px)").toBe(true);

  await expect(page.getByRole("link", { name: "Запросить запчасть" })).toBeVisible();
});
