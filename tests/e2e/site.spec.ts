import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';
import fr from '../../src/content/fr.json' with { type: 'json' };
import en from '../../src/content/en.json' with { type: 'json' };

const locales = [
  { lang: 'fr', content: fr },
  { lang: 'en', content: en },
] as const;

const isMobile = (page: Page) => (page.viewportSize()?.width ?? 0) <= 960;

// The build embeds the Matomo tracker: keep test runs out of the stats.
test.beforeEach(async ({ page }) => {
  await page.route('https://stats.acolad.net/**', (route) => route.abort());
});

test('serves a robots.txt that points at the sitemap', async ({ request }) => {
  const response = await request.get('/robots.txt');
  expect(response.ok()).toBe(true);
  expect(await response.text()).toContain('Sitemap: https://www.acolad.fr/sitemap.xml');
});

test('lists every locale in the sitemap with its alternates', async ({ request }) => {
  const response = await request.get('/sitemap.xml');
  expect(response.ok()).toBe(true);
  const xml = await response.text();
  for (const lang of ['fr', 'en']) {
    expect(xml).toContain(`<loc>https://www.acolad.fr/${lang}/</loc>`);
    expect(xml).toContain(`hreflang="${lang}" href="https://www.acolad.fr/${lang}/"`);
  }
  expect(xml).toContain('hreflang="x-default"');
});

test('serves the favicons', async ({ request }) => {
  for (const path of ['/favicon.ico', '/favicon.svg']) {
    expect((await request.get(path)).ok()).toBe(true);
  }
});

test('redirects the root to the French page', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/fr\/$/);
});

for (const { lang, content } of locales) {
  test.describe(`/${lang}/`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`/${lang}/`);
    });

    test('declares its language and alternates', async ({ page }) => {
      await expect(page.locator('html')).toHaveAttribute('lang', lang);
      await expect(page).toHaveTitle(content.meta.title);
      for (const l of ['fr', 'en', 'x-default']) {
        await expect(page.locator(`link[rel="alternate"][hreflang="${l}"]`)).toHaveCount(1);
      }
    });

    test('has a single h1 and an anchor for every nav item', async ({ page }) => {
      await expect(page.locator('h1')).toHaveCount(1);
      for (const item of content.nav) {
        await expect(page.locator(`#${item.id}`)).toHaveCount(1);
      }
    });

    test('links the language switch to both locales', async ({ page }) => {
      const group = page.getByRole('group', { name: content.ui.languageSwitch });
      await expect(group.locator('a[aria-current="page"]')).toHaveAttribute('href', `/${lang}/`);
      await expect(group.locator('a[hreflang="fr"]')).toHaveAttribute('href', '/fr/');
      await expect(group.locator('a[hreflang="en"]')).toHaveAttribute('href', '/en/');
    });

    test('exposes the skip link as the first focusable element', async ({ page }) => {
      await page.keyboard.press('Tab');
      const skip = page.getByRole('link', { name: content.ui.skipLink });
      await expect(skip).toBeFocused();
      await expect(skip).toBeInViewport();
    });

    test('sizes every image to avoid layout shifts', async ({ page }) => {
      const unsized = await page.locator('img:not([width]), img:not([height])').count();
      expect(unsized).toBe(0);
    });

    test('has no WCAG AA violations', async ({ page }) => {
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      expect(results.violations).toEqual([]);
    });
  });
}

test.describe('desktop', () => {
  test.skip(({ page }) => isMobile(page), 'desktop only');

  test('shows every mission panel without toggles', async ({ page }) => {
    await page.goto('/fr/');
    await expect(page.getByRole('button', { name: fr.missions.items[0]!.client })).toHaveCount(0);
    await expect(page.getByText(fr.missions.items[1]!.achievements![0]!)).toBeVisible();
    await expect(page.getByRole('button', { name: fr.ui.openMenu })).toBeHidden();
  });
});

test.describe('mobile', () => {
  test.skip(({ page }) => !isMobile(page), 'mobile only');

  test.beforeEach(async ({ page }) => {
    await page.goto('/fr/');
  });

  test('opens and closes the menu', async ({ page }) => {
    const nav = page.getByRole('navigation', { name: fr.ui.mainNav });
    const open = page.getByRole('button', { name: fr.ui.openMenu });
    await expect(nav).toBeHidden();
    await open.click();
    await expect(nav).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(nav).toBeHidden();
    await expect(open).toBeFocused();
    await open.click();
    await nav.getByRole('link', { name: fr.nav[3]!.label }).click();
    await expect(nav).toBeHidden();
  });

  test('toggles mission, project and experience panels', async ({ page }) => {
    const toggles = [
      fr.missions.items[1]!.client,
      fr.otherProjects.items[0]!.client,
      fr.experience.items[0]!.company,
    ];
    for (const name of toggles) {
      const button = page.getByRole('button', { name: new RegExp(`^${name}`) });
      const panel = page.locator(`#${await button.getAttribute('aria-controls')}`);
      await expect(button).toHaveAttribute('aria-expanded', 'false');
      await expect(panel).toBeHidden();
      await button.click();
      await expect(button).toHaveAttribute('aria-expanded', 'true');
      await expect(panel).toBeVisible();
    }
  });

  test('shows the skill toggle only on overflowing groups', async ({ page }) => {
    const toggle = (group: string) => page.getByRole('button', { name: `${fr.skills.expandLabel} — ${group}` });
    // "IA & Engineering" has two chips that fit on one line.
    await expect(toggle(fr.skills.groups[5]!.title)).toHaveCount(0);

    const frontEnd = toggle(fr.skills.groups[0]!.title);
    await expect(frontEnd).toBeVisible();
    const list = page.locator('#skills-0');
    const height = async () => (await list.boundingBox())!.height;
    expect(await height()).toBeLessThanOrEqual(28);
    await frontEnd.click();
    await expect(
      page.getByRole('button', { name: `${fr.skills.collapseLabel} — ${fr.skills.groups[0]!.title}` }),
    ).toHaveAttribute('aria-expanded', 'true');
    expect(await height()).toBeGreaterThan(28);
  });
});
