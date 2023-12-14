import path from 'path';

import generateDocsToc from './generateDocsToc';

const prefixPath = (mockPath) => path.join('src/util/generateDocsToc/__mocks__', mockPath);

describe('generateDocsToc', () => {
  it('returns existing TOC', async () => {
    const toc = generateDocsToc(prefixPath('existing-toc'));
    const { toc: existingToc } = await import(
      path.join('../../../', prefixPath('existing-toc'), 'toc.js')
    );
    expect(toc).toEqual(existingToc);
  });

  it('sorts top-level and children items', () => {
    const toc = generateDocsToc(prefixPath('basic'));
    expect(toc).toMatchSnapshot();
  });

  it('uses `navTitle` if provided', () => {
    const toc = generateDocsToc(prefixPath('with-nav-title'));
    const topLevelItem = toc[0];
    expect(topLevelItem).toHaveProperty('title', 'Nav title');
  });

  it('generates a non-routed group, with sorted children items', () => {
    const toc = generateDocsToc(prefixPath('with-non-route-group'));
    expect(toc).toMatchSnapshot();
  });

  it('handles redirects', () => {
    const toc = generateDocsToc(prefixPath('with-redirect'));
    const topLevelItem = toc[0];
    expect(topLevelItem).toHaveProperty('redirectPath', 'parent/target');
  });

  it('parses descriptions', () => {
    const toc = generateDocsToc(prefixPath('with-description'));
    const topLevelItem = toc[0];
    expect(topLevelItem).toHaveProperty('description', 'Description');
  });
});
