import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';
import fr from '../../src/content/fr.json' with { type: 'json' };
import en from '../../src/content/en.json' with { type: 'json' };

// French is served at the root, English under /en/.
const locales = [
  { lang: 'fr', path: '/', content: fr },
  { lang: 'en', path: '/en/', content: en },
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
  for (const { lang, path } of locales) {
    expect(xml).toContain(`<loc>https://www.acolad.fr${path}</loc>`);
    expect(xml).toContain(`hreflang="${lang}" href="https://www.acolad.fr${path}"`);
  }
  expect(xml).toContain('hreflang="x-default"');
});

test('serves the favicons', async ({ request }) => {
  for (const path of ['/favicon.ico', '/favicon.svg']) {
    expect((await request.get(path)).ok()).toBe(true);
  }
});

test('remembers the language picked in the switch', async ({ page, context }) => {
  await page.goto('/en/');
  await page.getByRole('group', { name: en.ui.languageSwitch }).locator('a[hreflang="fr"]').click();
  await expect(page).toHaveURL(/\/$/);
  const cookie = (await context.cookies()).find((c) => c.name === 'lang');
  expect(cookie?.value).toBe('fr');
});

test('opens screenshots full size and closes them', async ({ page }) => {
  await page.goto('/');
  // On mobile the screenshot sits in the collapsed mission panel.
  if (isMobile(page)) {
    await page.getByRole('button', { name: new RegExp(`^${fr.missions.items[0]!.client}`) }).first().click();
  }
  const trigger = page.getByRole('button', { name: fr.missions.items[0]!.image!.alt });
  const lightbox = page.getByRole('dialog', { name: fr.missions.items[0]!.image!.alt });

  // Escape closes and gives the focus back to the thumbnail.
  await trigger.click();
  await expect(lightbox).toBeVisible();
  await expect(lightbox.locator('img')).toHaveJSProperty('complete', true);
  await page.keyboard.press('Escape');
  await expect(lightbox).toBeHidden();
  await expect(trigger).toBeFocused();

  // The close button closes.
  await trigger.click();
  await lightbox.getByRole('button', { name: fr.ui.closeImage }).click();
  await expect(lightbox).toBeHidden();

  // A click beside the image closes; a click on it does not.
  await trigger.click();
  await lightbox.locator('img').click();
  await expect(lightbox).toBeVisible();
  await page.mouse.click(5, 300);
  await expect(lightbox).toBeHidden();
});

for (const { lang, path, content } of locales) {
  test.describe(path, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(path);
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
      await expect(group.locator('a[aria-current="page"]')).toHaveAttribute('href', path);
      await expect(group.locator('a[hreflang="fr"]')).toHaveAttribute('href', '/');
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

for (const { lang, path, content } of locales) {
  test.describe(content.legal.path, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(content.legal.path);
    });

    test('declares its language, canonical and alternates', async ({ page }) => {
      await expect(page.locator('html')).toHaveAttribute('lang', lang);
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(content.legal.title);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://www.acolad.fr${content.legal.path}`);
      for (const l of locales) {
        await expect(page.locator(`link[rel="alternate"][hreflang="${l.lang}"]`)).toHaveAttribute(
          'href',
          `https://www.acolad.fr${l.content.legal.path}`,
        );
      }
    });

    test('links the language switch to the other legal page', async ({ page }) => {
      const group = page.getByRole('group', { name: content.ui.languageSwitch });
      for (const l of locales) {
        await expect(group.locator(`a[hreflang="${l.lang}"]`)).toHaveAttribute('href', l.content.legal.path);
      }
    });

    test('points the nav back to the home page sections', async ({ page }) => {
      // Checked in the DOM: on mobile the nav sits in the closed menu.
      const first = content.nav[0]!;
      await expect(page.locator('#main-nav a').first()).toHaveAttribute('href', `${path}#${first.id}`);
    });

    test('is reachable from the home page footer', async ({ page }) => {
      await page.goto(path);
      await page.getByRole('contentinfo').getByRole('link', { name: content.legal.linkLabel }).click();
      await expect(page).toHaveURL(new RegExp(`${content.legal.path}$`));
      await expect(page.getByRole('contentinfo').getByRole('link', { name: content.legal.linkLabel }))
        .toHaveAttribute('aria-current', 'page');
    });

    test('has no WCAG AA violations', async ({ page }) => {
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      expect(results.violations).toEqual([]);
    });
  });
}

test('says visits are not measured while Matomo is blocked', async ({ page }) => {
  await page.goto(fr.legal.path);
  await expect(page.getByRole('checkbox', { name: fr.legal.optOut.label })).toBeDisabled();
  await expect(page.getByRole('status')).toHaveText(fr.legal.optOut.unavailable);
});

test('lets visitors opt out of Matomo', async ({ page }) => {
  // Stand-in for matomo.js: replays the queued _paq commands and keeps the opt-out state.
  await page.route('https://stats.acolad.net/js/', (route) =>
    route.fulfill({
      contentType: 'application/javascript',
      body: `(() => {
        const tracker = { out: false, isUserOptedOut() { return this.out; } };
        const queue = window._paq;
        window._paq = { push(c) {
          if (typeof c[0] === 'function') c[0].call(tracker);
          else if (c[0] === 'optUserOut') tracker.out = true;
          else if (c[0] === 'forgetUserOptOut') tracker.out = false;
        } };
        queue.forEach((c) => window._paq.push(c));
        window.__tracker = tracker;
      })();`,
    }),
  );
  await page.goto(fr.legal.path);
  const box = page.getByRole('checkbox', { name: fr.legal.optOut.label });
  await expect(box).toBeChecked();
  await expect(page.getByRole('status')).toHaveText(fr.legal.optOut.on);

  await box.uncheck();
  await expect(page.getByRole('status')).toHaveText(fr.legal.optOut.off);
  expect(await page.evaluate(() => (window as unknown as { __tracker: { out: boolean } }).__tracker.out)).toBe(true);

  await box.check();
  await expect(page.getByRole('status')).toHaveText(fr.legal.optOut.on);
});

test.describe('desktop', () => {
  test.skip(({ page }) => isMobile(page), 'desktop only');

  test('keeps the top border of bordered sections below the sticky header', async ({ page }) => {
    await page.goto('/');
    const header = page.locator('[data-header]');
    for (const id of ['domaines', 'competences', 'certifications']) {
      await page.locator(`#main-nav a[href="#${id}"]`).click();
      await expect(async () => {
        const box = (await header.boundingBox())!;
        const top = (await page.locator(`#${id}`).boundingBox())!.y - (box.y + box.height);
        expect(top).toBeGreaterThanOrEqual(0.5);
        expect(top).toBeLessThanOrEqual(1.5);
      }).toPass();
    }
  });

  test('scrolls back to the top from the footer', async ({ page }) => {
    await page.goto('/');
    const link = page.getByRole('contentinfo').getByRole('link', { name: fr.contact.backToTop });
    await link.scrollIntoViewIfNeeded();
    expect(await page.evaluate(() => scrollY)).toBeGreaterThan(1000);
    await link.click();
    await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
  });

  test('shows every mission panel without toggles', async ({ page }) => {
    await page.goto('/');
    // Anchored: the screenshot buttons' names also contain the client.
    await expect(page.getByRole('button', { name: new RegExp(`^${fr.missions.items[0]!.client}`) })).toHaveCount(0);
    await expect(page.getByText(fr.missions.items[1]!.achievements![0]!)).toBeVisible();
    await expect(page.getByRole('button', { name: fr.ui.openMenu })).toBeHidden();
  });
});

test('shrinks the sticky header and keeps anchors below it', async ({ page }) => {
  await page.goto('/');
  const header = page.locator('[data-header]');
  await expect(header).not.toHaveAttribute('data-stuck');

  const missions = fr.nav.find((item) => item.id === 'missions')!;
  if (isMobile(page)) await page.getByRole('button', { name: fr.ui.openMenu }).click();
  await page.getByRole('navigation', { name: fr.ui.mainNav }).getByRole('link', { name: missions.label }).click();
  await expect(header).toHaveAttribute('data-stuck');

  // Once the smooth scroll settles, the section starts right at the bottom of the header.
  const section = page.locator('#missions');
  await expect(async () => {
    const box = (await header.boundingBox())!;
    expect(Math.abs((await section.boundingBox())!.y - (box.y + box.height))).toBeLessThan(1);
  }).toPass();
});

test.describe('mobile', () => {
  test.skip(({ page }) => !isMobile(page), 'mobile only');

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
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
