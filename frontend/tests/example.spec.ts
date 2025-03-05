import { test, expect } from '@playwright/test';

test('can start', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle("Lf10StarterNew");
});
