import { test, expect, type Page } from '@playwright/test';
import { readFileSync } from 'node:fs';

function watchErrors(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  return errors;
}

const routes = ['/', '/about/', '/services/', '/services/full-stack-development/', '/services/seo-services/', '/services/video-editor-calicut/', '/projects/', '/projects/lectern/', '/projects/after-hours/', '/courses/', '/courses/ai-web-development/', '/locations/kozhikode/', '/blog/', '/contact/', '/best-developer-in-kerala/', '/ml/', '/hi/courses/', '/ar/', '/workshops/', '/privacy/'];

test('@desktop home page shows the brand, real H1 and working sections', async ({ page }) => {
  const errors = watchErrors(page);
  await page.goto('/?intro=off');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Salman Faris');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Full Stack Developer, AI Web Developer & Video Editor in Calicut');
  await expect(page.locator('.hero-wordmark text')).toHaveText('PORTFOLIO');
  for (const id of ['about', 'services', 'flagships', 'matrix', 'stack', 'courses', 'process', 'insights', 'faq', 'contact']) await expect(page.locator(`#${id}`)).toHaveCount(1);
  expect(errors).toEqual([]);
});

test('@desktop layer tabs switch by mouse and keyboard', async ({ page }) => {
  await page.goto('/?intro=off');
  const tabs = page.getByRole('tab');
  await expect(tabs).toHaveCount(7);
  await tabs.nth(3).click();
  await expect(tabs.nth(3)).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tabpanel')).toContainText('non-destructive editing engine');
  await page.keyboard.press('ArrowRight');
  await expect(tabs.nth(4)).toBeFocused();
  await expect(page.getByRole('tabpanel')).toContainText('One compositor for preview and export');
  await page.keyboard.press('Home');
  await expect(tabs.nth(0)).toHaveAttribute('aria-selected', 'true');
});

test('@desktop project filter shows the right cards and announces the count', async ({ page }) => {
  await page.goto('/?intro=off');
  const cards = page.locator('#matrix .bento-card:visible');
  const group = page.getByRole('group', { name: 'Filter projects' });
  await expect(cards).toHaveCount(10);
  await group.getByRole('button', { name: 'Film & motion' }).click();
  await expect(cards).toHaveCount(2);
  await expect(page.locator('#matrix-status')).toHaveText('2 projects in Film & motion');
  await group.getByRole('button', { name: 'Experiments' }).click();
  await expect(cards).toHaveCount(3);
  await group.getByRole('button', { name: /All work/ }).click();
  await expect(cards).toHaveCount(10);
});

test('@desktop copy email button confirms with a toast', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/?intro=off#contact');
  await page.getByRole('button', { name: 'Copy email address' }).click();
  await expect(page.locator('#toast')).toHaveClass(/is-on/);
  await expect(page.locator('#toast-text')).toContainText('salmanfariskalm@gmail.com');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('salmanfariskalm@gmail.com');
});

test('@desktop build intro rebuilds the page, then leaves nothing hidden', async ({ page }) => {
  const errors = watchErrors(page);
  await page.goto('/?intro=1');
  await expect(page.locator('.bi-pill')).toBeVisible();
  await expect.poll(() => page.locator('.bi-pending').count(), { timeout: 8000 }).toBeGreaterThan(50);
  await expect(page.locator('.bi-cursor svg:visible').first()).toBeVisible();
  await expect(page).toHaveURL(/\/$/);
  await page.keyboard.press('Escape');
  await expect(page.locator('.bi-pending')).toHaveCount(0);
  await expect(page.locator('.bi-pill, .bi-stage, .bi-veil')).toHaveCount(0);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  expect(errors).toEqual([]);
});

test('@desktop scrolling past a build shows everything above the viewport', async ({ page }) => {
  await page.goto('/?intro=1');
  await expect.poll(() => page.locator('.bi-pending').count(), { timeout: 8000 }).toBeGreaterThan(50);
  await page.mouse.wheel(0, 3000);
  await page.waitForTimeout(1200);
  const hiddenAbove = await page.evaluate(() => [...document.querySelectorAll('.bi-pending')].filter((el) => el.getBoundingClientRect().bottom < 0).length);
  expect(hiddenAbove).toBe(0);
});

test('@desktop project enquiry validates, then opens email with the message', async ({ page }) => {
  await page.goto('/contact/?service=Video%20editing#project');
  const form = page.locator('#enquiry-project');
  await expect(form.getByLabel('Service required')).toHaveValue('Video editing');
  await form.getByRole('button', { name: 'Send enquiry' }).click();
  await expect(form.locator('[data-form-status]')).toContainText('Check the highlighted fields');
  await expect(form.getByLabel('Name')).toBeFocused();
  await form.getByLabel('Name').fill('Test Person');
  await form.getByLabel('Email').fill('test@example.com');
  await form.getByLabel('Project description').fill('A short film edit.');
  const mail = page.waitForEvent('framenavigated', { timeout: 1500 }).catch(() => null);
  await form.getByRole('button', { name: 'Send enquiry' }).click();
  await mail;
  await expect(form.locator('[data-form-status]')).toContainText('email app');
});

test('@desktop course links carry the course into the enquiry form', async ({ page }) => {
  await page.goto('/courses/ai-web-development/');
  await expect(page.getByText('Details being confirmed').first()).toBeVisible();
  await expect(page.getByText('40,000')).toHaveCount(0);
  await page.getByRole('link', { name: 'Enquire about this course' }).first().click();
  await expect(page).toHaveURL(/\/contact\/\?course=AI%20Web%20Development#course/);
  await expect(page.locator('#enquiry-course').getByLabel('Course')).toHaveValue('AI Web Development');
});

test('@desktop every key route loads cleanly', async ({ page }) => {
  test.setTimeout(90_000);
  const errors = watchErrors(page);
  for (const route of routes) {
    const response = await page.goto(`${route}${route === '/' ? '?intro=off' : ''}`);
    expect(response?.status(), route).toBe(200);
    await expect(page.locator('h1'), route).toHaveCount(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `no overflow on ${route}`).toBe(true);
    const broken = await page.evaluate(() => [...document.images].filter((img) => img.complete && !img.naturalWidth).map((img) => img.src));
    expect(broken, route).toEqual([]);
  }
  expect(errors).toEqual([]);
});

test('@desktop language pages set lang, direction and reciprocal hreflang', async ({ page }) => {
  await page.goto('/ar/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.locator('link[hreflang="ml"]')).toHaveAttribute('href', /\/ml\/$/);
  await expect(page.locator('link[hreflang="x-default"]')).toHaveAttribute('href', /salmanfaris\.in\/$/);
  await page.goto('/ml/courses/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'ml');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('മലയാളത്തിൽ');
});

test('@desktop concepts stay labelled and planned courses stay out of search', async ({ page }) => {
  await page.goto('/projects/after-hours/');
  await expect(page.getByText('Concept. Not client work.')).toBeVisible();
  await page.goto('/courses/golang-development/');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  await expect(page.getByText('This is a proposed course')).toBeVisible();
  await page.goto('/workshops/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('No Workshops Scheduled Right Now');
});

test('@mobile reduced motion skips the build and has no overflow', async ({ page }) => {
  const errors = watchErrors(page);
  await page.goto('/');
  await page.waitForTimeout(1200);
  await expect(page.locator('.bi-pill')).toHaveCount(0);
  await expect(page.locator('.bi-pending')).toHaveCount(0);
  await expect(page.locator('.pulse').first()).toHaveCSS('animation-name', 'none');
  for (const id of ['home', 'about', 'services', 'flagships', 'matrix', 'courses', 'process', 'faq', 'contact']) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `no overflow in ${id}`).toBe(true);
  }
  await expect(page.getByRole('link', { name: 'Start a project' })).toBeVisible();
  expect(errors).toEqual([]);
});

test('@mobile FAQ opens and closes from the keyboard', async ({ page }) => {
  await page.goto('/services/seo-services/');
  const second = page.locator('.faq').nth(1);
  await expect(second).not.toHaveAttribute('open', '');
  await second.locator('summary').press('Enter');
  await expect(second).toHaveAttribute('open', '');
});

test('@nojs all content is present without JavaScript', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Salman Faris');
  await expect(page.locator('#matrix .bento-card')).toHaveCount(10);
  await expect(page.locator('.layer-panel:visible')).toHaveCount(7);
  await expect(page.locator('.bento-controls')).toBeHidden();
  await page.getByRole('link', { name: 'After Hours' }).click();
  await expect(page).toHaveURL(/\/projects\/after-hours\/$/);
  await expect(page.getByText('Concept. Not client work.')).toBeVisible();
});

test('@nojs sitemap and robots use the real domain', async ({ request }) => {
  const sitemap = await (await request.get('/sitemap.xml')).text();
  expect(sitemap).toContain('https://www.salmanfaris.in/services/full-stack-development/');
  expect(sitemap).not.toContain('chatgpt.site');
  expect(await (await request.get('/robots.txt')).text()).toContain('Sitemap: https://www.salmanfaris.in/sitemap.xml');
});

test('@nojs every old URL idea has a permanent redirect', async () => {
  const config = JSON.parse(readFileSync('vercel.json', 'utf8'));
  const sources = config.redirects.map((item: { source: string }) => item.source);
  for (const source of ['/portfolio', '/case-studies', '/about-salman-faris', '/full-stack-developer-calicut', '/seo-expert-calicut', '/video-editor-calicut', '/locations/calicut']) expect(sources).toContain(source);
  expect(config.redirects.every((item: { permanent: boolean }) => item.permanent)).toBe(true);
});

test('@desktop course catalogue filters independently and keeps checkout honest', async ({ page }) => {
  await page.goto('/?intro=off');
  const catalogue = page.locator('[data-course-catalogue]');
  await expect(catalogue.locator('.learn-card:visible')).toHaveCount(7);
  await catalogue.getByRole('button', { name: 'Video editing', exact: true }).click();
  await expect(catalogue.locator('.learn-card:visible')).toHaveCount(2);
  await expect(page.locator('#matrix .bento-card:visible')).toHaveCount(10);
  await catalogue.getByRole('button', { name: 'Free', exact: true }).click();
  await expect(catalogue.locator('[data-course-empty]')).toBeVisible();
  await expect(catalogue.locator('.learn-card:visible')).toHaveCount(0);
  await catalogue.getByRole('button', { name: 'All courses' }).click();
  await expect(catalogue.locator('.learn-card:visible')).toHaveCount(7);
  await page.goto('/courses/ai-reel-automation/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('AI Reel Automation');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  await expect(page.getByRole('link', { name: 'Enrol with Razorpay' })).toHaveCount(0);
});

test('@mobile course cards and mentorship fit the screen', async ({ page }) => {
  await page.goto('/courses/');
  await expect(page.locator('.learn-card')).toHaveCount(7);
  await page.getByRole('link', { name: 'Explore mentorship', exact: true }).click();
  await expect(page.locator('#mentorship')).toBeInViewport();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: '/tmp/portfolio-courses-mobile.png', fullPage: true });
  await page.getByRole('link', { name: 'Ask about mentorship', exact: true }).click();
  await expect(page.locator('#enquiry-course').getByLabel('Course', { exact: true })).toHaveValue('One-to-one mentorship');
});
