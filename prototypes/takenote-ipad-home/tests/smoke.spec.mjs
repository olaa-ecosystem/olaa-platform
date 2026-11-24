// Smoke tests for the iPad home prototype. They use a mouse; Apple Pencil behaviour still needs a real iPad.
import { test, expect } from '@playwright/test';
import { writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

test.beforeEach(async ({ page }, info) => {
  const problems = [];
  page.on('pageerror', e => problems.push(`script error: ${e.message}`));
  page.on('console', m => { if (m.type() === 'error' || /Content Security Policy/i.test(m.text())) problems.push(m.text()); });
  info.problems = problems;
  await page.goto('/');
  await expect(page.locator('#noteMeta')).toContainText('Draft');
});

test.afterEach(async ({}, info) => { expect(info.problems, 'no script errors or CSP violations').toEqual([]); });

test('draws a stroke on the note', async ({ page }) => {
  const r = await page.locator('#sheet .paper').boundingBox();
  await page.mouse.move(r.x + 100, r.y + 200); await page.mouse.down();
  await page.mouse.move(r.x + 300, r.y + 230, { steps: 12 }); await page.mouse.up();
  await expect(page.locator('#noteMeta')).toContainText('1 stroke');
});

test('picks a feeling and shows its line in the top bar', async ({ page }) => {
  await page.click('#moodBtn');
  await page.locator('#eAll button[title="Calm"]').click();
  await expect(page.locator('#moodName')).toHaveText('Slow is fine today.');
});

test('long-press on empty space opens the file menu', async ({ page }) => {
  await page.mouse.move(860, 600); await page.mouse.down(); await page.waitForTimeout(800); await page.mouse.up();
  await expect(page.locator('#ctxMenu [data-bg="select"]')).toBeVisible();
});

test('imports a text file as a new file', async ({ page }) => {
  const file = join(tmpdir(), 'olaa-smoke.txt'); writeFileSync(file, 'hello from the smoke test');
  const [chooser] = await Promise.all([page.waitForEvent('filechooser'), page.click('#qImport')]);
  await chooser.setFiles(file);
  await expect(page.locator('#files > .item', { hasText: 'olaa-smoke.txt' })).toBeVisible();
});

test('escapes HTML in imported file names', async ({ page }) => {
  const file = join(tmpdir(), '<img src=x onerror=alert(1)>.txt'); writeFileSync(file, 'x');
  let dialog = false; page.on('dialog', d => { dialog = true; d.dismiss(); });
  const [chooser] = await Promise.all([page.waitForEvent('filechooser'), page.click('#qImport')]);
  await chooser.setFiles(file);
  await expect(page.locator('#files > .item', { hasText: '<img src=x' })).toBeVisible();
  expect(dialog).toBe(false);
  expect(await page.locator('#files img[src="x"]').count()).toBe(0);
});
