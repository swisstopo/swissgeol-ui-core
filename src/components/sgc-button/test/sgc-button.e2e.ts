import { test, expect } from '@playwright/test';

test.describe('sgc-button', () => {
  test('renders', async ({ page }) => {
    await page.setContent('<sgc-button></sgc-button>');
    const element = page.locator('sgc-button');
    expect(element.getByRole('button')).toBeTruthy();
  });
});
