import { expect, test } from '@playwright/test';

test('homepage displays the portfolio introduction', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Alfaz Khan/);
  await expect(page.getByRole('main')).toBeVisible();
  await expect(
    page.getByRole('heading', {
      name: 'Hi! I am Alfaz, Frontend Engineer with React & Typescript',
    }),
  ).toBeVisible();
  await expect(page.locator('#home').getByAltText('Alfaz Profile')).toBeVisible();
});

test.describe('mobile visitors', () => {
  test.use({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });

  test('can open the CV language menu', async ({ page }) => {
    await page.goto('/');

    const intro = page.locator('#home');
    await intro.getByText('Download CV').tap();

    await expect(intro.getByText('Choose Language')).toBeVisible();
    await expect(intro.getByRole('button', { name: /English Version/ })).toBeVisible();
    await expect(intro.getByRole('button', { name: /German Version/ })).toBeVisible();
  });
});
