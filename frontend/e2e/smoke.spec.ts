import { test, expect } from '@playwright/test';

test('home loads coming soon', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /tenndalux/i })).toBeVisible();
});
