import { expect, test } from '@playwright/test';

test('info page has expected h1', async ({ page }) => {
	await page.goto('/info');
	expect(await page.textContent('h1')).toBe('Info page');
});
