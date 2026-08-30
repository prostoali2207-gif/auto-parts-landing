import { expect, test } from "@playwright/test";

const analyticsPattern = "**/functions/v1/track-landing-event";

for (const width of [360, 390]) {
  test(`process numbers do not collide with copy at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.route(analyticsPattern, async (route) => route.fulfill({ status: 204, body: "" }));
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);

    const steps = page.locator(".processStep");
    await expect(steps).toHaveCount(3);

    for (let index = 0; index < 3; index += 1) {
      const step = steps.nth(index);
      const numberBox = await step.locator(".stepNo").boundingBox();
      const copyBox = await step.locator(":scope > div").boundingBox();
      expect(numberBox).not.toBeNull();
      expect(copyBox).not.toBeNull();
      if (!numberBox || !copyBox) continue;
      expect(numberBox.x + numberBox.width + 8).toBeLessThanOrEqual(copyBox.x);
    }
  });
}
