import { test, expect } from '@playwright/test';

test('home loads', { tag: ['@flow:public-home'] }, async ({ page }) => {
  // quality: allow-no-interaction (static landing home: loading it is the flow; the title assertion is a real content check)
  await page.goto('/');
  await expect(page).toHaveTitle(/tenndalux/i);
});
