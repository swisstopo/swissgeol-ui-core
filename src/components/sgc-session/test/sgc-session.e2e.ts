import { test, expect } from '@playwright/test';

test.describe('sgc-session', () => {
  test('renders', async ({ page }) => {
    await page.setContent('<sgc-session></sgc-session>');
    const element = page.locator('sgc-session');
    expect(element.locator('sgc-button')).toBeTruthy();
  });
});
