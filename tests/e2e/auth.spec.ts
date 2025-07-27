import { test, expect } from '@playwright/test';

test('homepage loads correctly', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Zenorizon/);
});

test('signup page loads', async ({ page }) => {
  await page.goto('/signup');
  await expect(page.locator('h1')).toContainText('Sign');
});

// Note: Auth flow tests should be added with proper environment setup