import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';
import { alternates, getSite, href, isServiceId, langs, pageIds, pageTitle, serviceIds, type Lang, type PageId } from '../../src/site';

const fr = getSite('fr');
const en = getSite('en');
const origin = 'https://www.acolad.fr';

// Below this width the header menu is folded behind a button.
const isMobile = (page: Page) => (page.viewportSize()?.width ?? 0) < 1200;

function meta(lang: Lang, id: PageId) {
  const site = getSite(lang);
  if (isServiceId(id)) return site.services[id].meta;
  return site[id].meta;
}

function h1(lang: Lang, id: PageId) {
  const site = getSite(lang);
  return isServiceId(id) ? site.services[id].h1 : site[id].h1;
}

const axe = async (page: Page) => (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations;

// The build embeds the Matomo tracker: keep test runs out of the stats.
test.beforeEach(async ({ page }) => {
  await page.route('https://stats.acolad.net/**', (route) => route.abort());
});

test('serves a robots.txt that points at the sitemap', async ({ request }) => {
  const response = await request.get('/robots.txt');
  expect(response.ok()).toBe(true);
  expect(await response.text()).toContain(`Sitemap: ${origin}/sitemap.xml`);
});

test('lists every page of every locale in the sitemap with its alternates', async ({ request }) => {
  const response = await request.get('/sitemap.xml');
  expect(response.ok()).toBe(true);
  const xml = await response.text();
  for (const id of pageIds) {
    for (const lang of langs) {
      expect(xml).toContain(`<loc>${origin}${href(id, lang)}</loc>`);
      expect(xml).toContain(`hreflang="${lang}" href="${origin}${href(id, lang)}"`);
    }
  }
  expect(xml.match(/<url>/g)).toHaveLength(pageIds.length * langs.length);
  expect(xml).toContain('hreflang="x-default"');
  expect(xml).toContain(`<lastmod>${fr.legal.updatedAt}</lastmod>`);
});

test('serves the favicons', async ({ request }) => {
  for (const path of ['/favicon.ico', '/favicon.svg']) {
    expect((await request.get(path)).ok()).toBe(true);
  }
});

for (const lang of langs) {
  const site = getSite(lang);

  for (const id of pageIds) {
    test.describe(href(id, lang), () => {
      test.beforeEach(async ({ page }) => {
        await page.goto(href(id, lang));
      });

      test('declares its language, title, canonical and alternates', async ({ page }) => {
        await expect(page.locator('html')).toHaveAttribute('lang', lang);
        await expect(page).toHaveTitle(pageTitle(site, meta(lang, id)));
        await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', meta(lang, id).description);
        await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `${origin}${href(id, lang)}`);
        for (const l of langs) {
          await expect(page.locator(`link[rel="alternate"][hreflang="${l}"]`)).toHaveAttribute(
            'href',
            `${origin}${alternates(id)[l]}`,
          );
        }
        await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveCount(1);
      });

      test('has a single h1 and fits the viewport', async ({ page }) => {
        await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
        await expect(page.getByRole('heading', { level: 1 })).toHaveText(h1(lang, id));
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        expect(overflow).toBeLessThanOrEqual(0);
      });

      test('exposes the skip link as the first focusable element', async ({ page }) => {
        await page.keyboard.press('Tab');
        await expect(page.getByRole('link', { name: site.ui.skipLink })).toBeFocused();
      });

      test('sizes every image to avoid layout shifts', async ({ page }) => {
        expect(await page.locator('img:not([width]), img:not([height])').count()).toBe(0);
      });

      test('has no WCAG AA violations', async ({ page }) => {
        expect(await axe(page)).toEqual([]);
      });
    });
  }

  test.describe(`404 page (${lang})`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(lang === 'fr' ? '/404.html' : '/en/404/');
    });

    test('stays out of search results and leads home', async ({ page }) => {
      await expect(page.locator('html')).toHaveAttribute('lang', lang);
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(site.notFound.h1);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
      await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
      await expect(page.getByRole('main').getByRole('link', { name: site.notFound.cta })).toHaveAttribute(
        'href',
        href('home', lang),
      );
    });

    test('has no WCAG AA violations', async ({ page }) => {
      expect(await axe(page)).toEqual([]);
    });
  });
}

test('answers unknown URLs with a 404 and the error page', async ({ page }) => {
  const response = await page.goto('/cette-page-n-existe-pas/');
  expect(response!.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(fr.notFound.h1);
});

test('describes the company on the home page and the service on its page in JSON-LD', async ({ page }) => {
  const graph = async () =>
    JSON.parse((await page.locator('script[type="application/ld+json"]').textContent())!)['@graph'] as Record<string, unknown>[];

  await page.goto('/');
  const home = await graph();
  expect(home.map((node) => node['@type'])).toEqual(['WebSite', 'ProfessionalService', 'Person']);
  expect(home[1]).toMatchObject({ name: 'Acolad Développement', foundingDate: '2014-11-14' });

  await page.goto(href('drupal', 'fr'));
  const [service, faq] = await graph();
  expect(service).toMatchObject({ '@type': 'Service', name: fr.services.drupal.name });
  // Answers that are still placeholders stay out of the structured data.
  expect(JSON.stringify(faq)).not.toMatch(/\[[A-ZÀ-Ý]/);
});

test('links every service from the home page, the menu and the footer', async ({ page }) => {
  await page.goto('/');
  for (const id of serviceIds) {
    const link = `a[href="${href(id, 'fr')}"]`;
    expect(await page.getByRole('main').locator(link).count()).toBeGreaterThanOrEqual(2);
    // By id: on mobile the menu is folded, so it has no accessible role to look up.
    await expect(page.locator('#main-nav').locator(link)).toHaveCount(1);
    await expect(page.getByRole('contentinfo').locator(link)).toHaveCount(1);
  }
});

test('marks the current page in the menu', async ({ page }) => {
  await page.goto(href('tma', 'fr'));
  // By id: on mobile the menu is folded, so it has no accessible role to look up.
  const nav = page.locator('#main-nav');
  await expect(nav.locator('ul a[aria-current="page"]')).toHaveText(fr.services.tma.navLabel);
  // The case study belongs to the work section.
  await page.goto(href('caseStudy', 'fr'));
  await expect(nav.locator('ul a[aria-current="page"]')).toHaveText(fr.nav.work);
});

test('switches language on the same page and remembers the choice', async ({ page, context }) => {
  await page.goto(href('hosting', 'en'));
  if (isMobile(page)) await page.getByRole('button', { name: en.ui.openMenu }).click();
  await page.getByRole('group', { name: en.ui.languageSwitch }).locator('a[hreflang="fr"]').click();
  await expect(page).toHaveURL(href('hosting', 'fr'));
  const cookie = (await context.cookies()).find((c) => c.name === 'lang');
  expect(cookie?.value).toBe('fr');
});

test('keeps the call to action band off the contact and legal pages', async ({ page }) => {
  await page.goto(href('about', 'fr'));
  await expect(page.getByRole('heading', { name: fr.cta.title })).toBeVisible();
  for (const id of ['contact', 'legal'] as const) {
    await page.goto(href(id, 'fr'));
    await expect(page.getByRole('heading', { name: fr.cta.title })).toHaveCount(0);
  }
});

test('requires a name, an e-mail and a message before preparing the e-mail', async ({ page }) => {
  await page.goto(href('contact', 'fr'));
  const form = page.locator('[data-contact-form]');
  const valid = () => form.evaluate((element: HTMLFormElement) => element.checkValidity());
  expect(await valid()).toBe(false);
  await page.getByLabel(fr.contact.form.name).fill('Ada Lovelace');
  await page.getByLabel(fr.contact.form.email).fill('ada@example.org');
  await page.getByLabel(fr.contact.form.message).fill('Bonjour');
  expect(await valid()).toBe(true);
  // The select lists the six services and "other".
  await expect(page.getByLabel(fr.contact.form.need).locator('option')).toHaveCount(serviceIds.length + 1);
  // Submitting hands over to the mail application: the page itself does not move.
  await page.getByRole('button', { name: fr.contact.form.submit }).click();
  await expect(page).toHaveURL(href('contact', 'fr'));
});

test('says visits are not measured while Matomo is blocked', async ({ page }) => {
  await page.goto(href('legal', 'fr'));
  await expect(page.getByRole('checkbox', { name: fr.legal.optOut.label })).toBeDisabled();
  await expect(page.getByRole('main').getByRole('status')).toHaveText(fr.legal.optOut.unavailable);
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
  await page.goto(href('legal', 'fr'));
  const box = page.getByRole('checkbox', { name: fr.legal.optOut.label });
  await expect(box).toBeChecked();
  await expect(page.getByRole('main').getByRole('status')).toHaveText(fr.legal.optOut.on);

  await box.uncheck();
  await expect(page.getByRole('main').getByRole('status')).toHaveText(fr.legal.optOut.off);
  expect(await page.evaluate(() => (window as unknown as { __tracker: { out: boolean } }).__tracker.out)).toBe(true);

  await box.check();
  await expect(page.getByRole('main').getByRole('status')).toHaveText(fr.legal.optOut.on);
});

test.describe('desktop', () => {
  test.skip(({ page }) => isMobile(page), 'desktop only');

  test('shows the whole menu on one line', async ({ page }) => {
    for (const lang of langs) {
      await page.goto(href('home', lang));
      const site = getSite(lang);
      await expect(page.getByRole('button', { name: site.ui.openMenu })).toBeHidden();
      const tops = await page
        .getByRole('navigation', { name: site.ui.mainNav })
        .locator('a')
        .evaluateAll((links) => links.map((link) => Math.round(link.getBoundingClientRect().top + link.getBoundingClientRect().height / 2)));
      expect(new Set(tops).size).toBe(1);
    }
  });
});

test.describe('mobile', () => {
  test.skip(({ page }) => !isMobile(page), 'mobile only');

  test('opens and closes the menu', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: fr.ui.mainNav });
    const open = page.getByRole('button', { name: fr.ui.openMenu });
    await expect(nav).toBeHidden();
    await open.click();
    await expect(nav).toBeVisible();
    await expect(page.getByRole('button', { name: fr.ui.closeMenu })).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Escape');
    await expect(nav).toBeHidden();
    await expect(open).toBeFocused();
    await open.click();
    await nav.getByRole('link', { name: fr.nav.work }).click();
    await expect(page).toHaveURL(href('work', 'fr'));
  });
});
