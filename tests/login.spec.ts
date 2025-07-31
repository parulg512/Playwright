import { test, expect } from '@playwright/test';

test('Check Login is successful', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');
  // await page.locator('[data-test="nav-sign-in"]').click();;
  await page.getByTestId("nav-sign-in").click();
  // await page.locator('[data-test="email"]').fill('admin@practicesoftwaretesting.com');
  await page.getByPlaceholder("Your email").fill('admin@practicesoftwaretesting.com');
  await page.locator('[data-test="password"]').fill('welcome01');
  await page.locator('[data-test="login-submit"]').click();
  await expect(page.locator('[data-test="nav-menu"]')).toContainText('John Doe');
});