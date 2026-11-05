import { test, expect, type Page } from '@playwright/test';

function watchErrors(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => {
    if (message.type() === 'error') errors.push(message.text());
  });
  return errors;
}

async function openPortfolio(page: Page) {
  await page.goto('/');
  await expect(page.locator('#intro')).toHaveCount(0, { timeout: 5_000 });
  await expect(page.getByRole('heading', { name: 'Salman Faris', exact: true })).toBeVisible();
}

test('@desktop filters projects, traps modal focus, restores it on Escape, and navigates from a project', async ({ page }) => {
  const errors = watchErrors(page);
  await openPortfolio(page);
  const cards = page.locator('.project-card');
  await expect(cards).toHaveCount(5);
  const filters = page.getByRole('group', { name: 'Filter projects' });
  for (const [category, count] of [['Film & motion', 2], ['Development', 2], ['Experiments', 1], ['All work', 5]] as const) {
    const filter = filters.getByRole('button', { name: new RegExp(category.replace('&', '&')) });
    await filter.click();
    await expect(filter).toHaveAttribute('aria-pressed', 'true');
    await expect(cards).toHaveCount(count);
    await expect(page.getByRole('status').filter({ hasText: `${count} projects in ${category}` })).toBeVisible();
  }
  const opener = page.getByRole('button', { name: 'Explore After Hours', exact: true });
  await opener.click();
  const dialog = page.getByRole('dialog', { name: 'After Hours' });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('button', { name: 'Close project' })).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(dialog.getByRole('link', { name: 'Let’s create something like this' })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(dialog.getByRole('button', { name: 'Close project' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(opener).toBeFocused();
  await expect(page.locator('html')).not.toHaveClass(/modal-open/);
  await opener.click();
  await dialog.getByRole('link', { name: 'Let’s create something like this' }).click();
  await expect(dialog).toHaveCount(0);
  await expect(page).toHaveURL(/#contact$/);
  await expect(page.locator('#contact-title')).toBeFocused();
  await expect(page.locator('#contact-title')).toBeInViewport();
  expect(errors).toEqual([]);
});

test('@desktop process responds to scroll and retains a usable viewport', async ({ page }) => {
  const errors = watchErrors(page);
  await openPortfolio(page);
  const target = page.locator('.process-step[data-step="3"]');
  await target.evaluate(element => {
    const box = element.getBoundingClientRect();
    window.scrollTo({ top: window.scrollY + box.top + box.height / 2 - window.innerHeight * .6, behavior: 'instant' });
  });
  await expect(page.locator('.process-number')).toHaveText('03');
  await expect(target).toHaveClass(/is-active/);
  await expect(page.locator('.process-visual')).toBeInViewport();
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});

test('@mobile reduced motion has usable navigation, skill disclosures, and no page overflow', async ({ page }) => {
  const errors = watchErrors(page);
  await openPortfolio(page);
  await expect(page.locator('.band-track')).toHaveCSS('animation-name', 'none');
  const menu = page.getByRole('button', { name: 'Open menu' });
  const navigation = page.getByRole('navigation', { name: 'Mobile navigation' });
  await menu.click();
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await expect(navigation).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await expect(menu).toBeFocused();
  await menu.click();
  await navigation.getByRole('link', { name: /The toolkit/ }).click();
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await expect(page).toHaveURL(/#skills$/);
  const categories = page.locator('.skill-discipline');
  await expect(categories).toHaveCount(3);
  for (const category of await categories.all()) {
    const summary = category.locator('summary');
    await expect(summary).toBeVisible();
    await expect(category).toHaveAttribute('open', '');
    await summary.click();
    await expect(category).not.toHaveAttribute('open', '');
    await expect(category.locator('.skill-tags')).toBeHidden();
    await summary.press('Enter');
    await expect(category).toHaveAttribute('open', '');
    await expect(category.locator('.skill-tags')).toBeVisible();
  }
  for (const skill of ['Adobe After Effects', 'DaVinci Resolve', 'Golang', 'REST APIs', 'SQL', 'Figma', 'Creative Direction']) {
    await expect(page.locator('.skill-tags').getByText(skill, { exact: true })).toBeVisible();
  }
  for (const id of ['home', 'work', 'about', 'skills', 'process', 'journey', 'contact']) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `No document overflow in ${id}`).toBe(true);
  }
  expect(errors).toEqual([]);
});

test('@nojs projects remain navigable and core content remains available', async ({ page }) => {
  const errors = watchErrors(page);
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Salman Faris', exact: true })).toBeVisible();
  await expect(page.locator('#intro')).toBeHidden();
  await expect(page.locator('#project-gallery .project-card')).toHaveCount(5);
  await page.locator('#project-gallery').getByRole('link', { name: /After Hours/ }).click();
  await expect(page).toHaveURL(/\/projects\/after-hours\/?$/);
  await expect(page.getByRole('heading', { name: 'After Hours', exact: true })).toBeVisible();
  await expect(page.getByText('Concept showcase', { exact: false })).toBeVisible();
  expect(errors).toEqual([]);
});
