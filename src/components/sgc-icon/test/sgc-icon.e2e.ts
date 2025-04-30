import { test, expect } from '@playwright/test';

test.describe('sgc-icon', () => {
  test('renders', async ({ page }) => {
    await page.setContent('<sgc-icon name="plus"></sgc-icon>');
    const element = page.locator('sgc-icon >> svg');
    expect(element).toBeTruthy();
  });
});
