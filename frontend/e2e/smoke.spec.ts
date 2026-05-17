import { test, expect } from '@playwright/test';

test('home loads', { tag: ['@flow:public-home'] }, async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/tenndalux/i);
});
