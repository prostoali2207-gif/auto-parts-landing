import { expect, test } from "@playwright/test";

test("purposeful motion is present without blocking the primary CTA", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const heroAnimationName = await page.locator(".partCore").evaluate((element) => getComputedStyle(element).animationName);
  expect(heroAnimationName).toContain("v7-open-core");

  const supportsViewTimeline = await page.evaluate(() => CSS.supports("animation-timeline: view()"));
  if (supportsViewTimeline) {
    const processAnimationName = await page.locator(".processSequence").evaluate((element) => getComputedStyle(element, "::before").animationName);
    expect(processAnimationName).toContain("v7-process-route-draw");
  }

  const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(hasOverflow).toBe(false);

  await page.getByRole("link", { name: "Запросить запчасть" }).click();
  await expect(page).toHaveURL(/#request$/);
  await expect(page.locator("#request")).toBeInViewport();
});

test("reduced motion exposes the same final composition without animation", async ({ page }) => {
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
    const number = getComputedStyle(element.querySelector(".stepNo") as HTMLElement);
    return {
      lineAnimation: line.animationName,
      lineClip: line.clipPath,
      numberAnimation: number.animationName,
      numberClip: number.clipPath,
    };
  });

  expect(process.lineAnimation).toBe("none");
  expect(process.numberAnimation).toBe("none");
  expect(process.lineClip === "none" || process.lineClip === "inset(0px)").toBe(true);
  expect(process.numberClip === "none" || process.numberClip === "inset(0px)").toBe(true);

  await expect(page.getByRole("link", { name: "Запросить запчасть" })).toBeVisible();
});
