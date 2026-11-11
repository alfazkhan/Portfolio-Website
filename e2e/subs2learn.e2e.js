import { expect, test } from '@playwright/test';

test('/2subs2learn renders product landing page without runtime errors', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (err) => errors.push(err.message));
  page.on('console', (message) => {
    if (message.type() === 'error') {
      errors.push(message.text());
    }
  });

  await page.goto('/2subs2learn');

  await expect(page).toHaveTitle('2Subs2Learn | Bilingual Subtitle Browser Extension');
  await expect(
    page.getByRole('heading', {
      level: 1,
      name: /Learn languages faster with dual subtitles/i,
    }),
  ).toBeVisible();

  const previewImg = page.getByRole('img', {
    name: /2Subs2Learn dual-subtitle overlay preview on YouTube/i,
  });
  await expect(previewImg).toBeVisible();
  expect(await previewImg.evaluate((img) => img.naturalWidth)).toBeGreaterThan(0);

  await expect(page.getByRole('link', { name: /Install for Chrome/i }).first()).toHaveAttribute(
    'href',
    'https://chromewebstore.google.com/detail/egkapkomakndamdhmlgknamdhmfnmkbf',
  );
  await expect(page.getByRole('link', { name: /Install for Firefox/i }).first()).toHaveAttribute(
    'href',
    'https://addons.mozilla.org/en-US/firefox/addon/2subs2learn/',
  );
  await expect(page.getByRole('link', { name: /GitHub Repo/i }).first()).toHaveAttribute(
    'href',
    'https://github.com/alfazkhan/2Subs2Learn',
  );

  await expect(page.getByRole('heading', { name: 'YouTube' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'ZDF Mediathek' })).toBeVisible();

  const toggleButton = page.getByRole('button', { name: 'Toggle color mode' });
  await expect(toggleButton).toBeVisible();
  const initialIsDark = await page.evaluate(() =>
    document.documentElement.classList.contains('dark'),
  );
  await toggleButton.click();
  const toggledIsDark = await page.evaluate(() =>
    document.documentElement.classList.contains('dark'),
  );
  expect(toggledIsDark).toBe(!initialIsDark);

  expect(errors).toEqual([]);
});

test('2subs2learn.localhost subdomain rewrites to the 2Subs2Learn page in dev', async ({ page }, testInfo) => {
  const baseUrl = new URL(testInfo.project.use.baseURL || 'http://localhost:3000');
  const subdomainUrl = `${baseUrl.protocol}//2subs2learn.localhost${baseUrl.port ? `:${baseUrl.port}` : ''}/`;

  await page.goto(subdomainUrl);
  await expect(page).toHaveTitle('2Subs2Learn | Bilingual Subtitle Browser Extension');
  await expect(
    page.getByRole('heading', {
      level: 1,
      name: /Learn languages faster with dual subtitles/i,
    }),
  ).toBeVisible();
});

test.describe('mobile /2subs2learn', () => {
  test.use({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });

  test('renders cleanly without horizontal overflow', async ({ page }) => {
    await page.goto('/2subs2learn');
    await expect(
      page.getByRole('heading', { level: 1, name: /Learn languages faster with dual subtitles/i }),
    ).toBeVisible();

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    expect(hasHorizontalOverflow).toBe(false);
  });
});
