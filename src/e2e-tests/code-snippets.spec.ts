import { test, expect, takeArchive } from '@chromaui/test-archiver';

test('Snippets on writing-stories/introduction', async ({ page }, testInfo) => {
  await page.goto('/docs/react/writing-stories/introduction');

  await expect(page).toHaveTitle(/How to write stories/);
  await takeArchive(page, 'With TS snippets', testInfo);

  const codeLanguageSelector = await page.getByRole('button', { name: 'TypeScript' });
  await codeLanguageSelector.click();
  const itemJavaScript = await page.getByRole('menuitem', { name: 'JavaScript' });
  await itemJavaScript.click();
});
