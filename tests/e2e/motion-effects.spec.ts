import { expect, test } from "@playwright/test";

test("purposeful motion has readable hero timing without blocking the primary CTA", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
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

  const supportsViewTimeline = await page.evaluate(() => CSS.supports("animation-timeline: view()"));
  if (supportsViewTimeline) {
    const process = await page.locator(".processSequence").evaluate((element) => {
      const route = getComputedStyle(element, "::before");
      const tracer = getComputedStyle(element, "::after");
      return { routeAnimation: route.animationName, tracerAnimation: tracer.animationName, tracerContent: tracer.content };
    });
    expect(process.routeAnimation).toContain("v7-process-route-draw");
    expect(process.tracerAnimation).toContain("v7-process-tracer");
    expect(process.tracerContent).not.toBe("none");
  }

  const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(hasOverflow).toBe(false);

  await page.getByRole("link", { name: "Запросить запчасть" }).click();
  await expect(page).toHaveURL(/#request$/);
  await expect(page.locator("#request")).toBeInViewport();
});

test("reduced motion exposes the same final composition without animation or tracer", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const hero = await page.locator(".partCore").evaluate((element) => {
    const style = getComputedStyle(element);
    return { animationName: style.animationName, translate: style.translate };
  });
  expect(hero.animationName).toBe("none");
  expect(hero.translate === "none" || hero.translate === "0px" || hero.translate.startsWith("0px 0px")).toBe(true);

  const process = await page.locator(".processSequence").evaluate((element) => {
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
