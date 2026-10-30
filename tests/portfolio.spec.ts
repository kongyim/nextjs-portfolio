import { test, expect } from '@playwright/test';
import projects from '../lib/gallery.json';
test('filters, project navigation, full-size viewer, and keyboard controls', async ({page}) => {
 const failures: string[] = [];
 page.on('pageerror', e => failures.push(e.message));
 page.on('response', r => { if (r.status() >= 400) failures.push(`${r.status()} ${r.url()}`); });
 await page.goto('/portfolio/');
 await expect(page.locator('.project-card')).toHaveCount(projects.length);
 await page.getByRole('button', {name:/^IWC/}).click();
 await expect(page.locator('.project-card')).toHaveCount(3);
 await page.locator('.project-card').first().click();
 await expect(page.locator('.gallery-item')).toHaveCount(projects[0].photos.length);
 await page.locator('.gallery-item').first().click();
 await expect(page.getByRole('dialog')).toBeVisible();
 await expect.poll(() => page.locator('.full-image').evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
 await page.keyboard.press('ArrowRight');
 await expect(page.locator('.lightbox-bottom')).toContainText(`2 / ${projects[0].photos.length}`);
 await page.keyboard.press('Escape');
 await expect(page.getByRole('dialog')).not.toBeVisible();
 expect(failures).toEqual([]);
});
test('mobile layout stays within the viewport', async ({page}) => {
 await page.setViewportSize({width:390,height:844});
 await page.goto('/portfolio/');
 expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390);
 await page.screenshot({path:'/tmp/portfolio-mobile.png',fullPage:true});
 await page.setViewportSize({width:1440,height:1000});
 await page.screenshot({path:'/tmp/portfolio-desktop.png',fullPage:false});
});

test('recruiters can explore work and connect without exposed contact details or a CV', async ({page, request}) => {
 await page.goto('/portfolio/');
 await expect(page.getByRole('heading', {level: 1})).toContainText('Senior full-stack');
 await page.getByRole('link', {name: 'Explore engineering work'}).click();
 await expect(page).toHaveURL(/#engineering$/);
 await expect(page.locator('#engineering article')).toHaveCount(4);
 await expect(page.getByRole('link', {name: 'Connect on LinkedIn'})).toHaveAttribute('href', /linkedin.com/);
 await expect(page.locator('a[href^="mailto:"], a[href^="tel:"], a[download]')).toHaveCount(0);
 await expect(page.locator('body')).not.toContainText('kongyim@gmail.com');
 expect((await request.get('/portfolio/Kong_Yim_CV.pdf')).status()).toBe(404);
});
