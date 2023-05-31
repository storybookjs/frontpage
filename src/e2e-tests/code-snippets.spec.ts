import { test, expect } from '@playwright/test';

test('Snippets on writing-stories/introduction', async ({ page }) => {
  await page.goto('/docs/react/writing-stories/introduction');

  await expect(page).toHaveTitle(/How to write stories/);

  const codeLanguageSelector = await page.getByRole('button', { name: 'TypeScript' });
  await codeLanguageSelector.click();
  const itemJavaScript = await page.getByRole('menuitem', { name: 'JavaScript' });
  await itemJavaScript.click();
});
