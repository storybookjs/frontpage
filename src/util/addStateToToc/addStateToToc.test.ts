import path from 'path';

import generateDocsToc from '../generateDocsToc/generateDocsToc';
import addStateToToc from './addStateToToc';

const getToc = (mockPath) =>
  generateDocsToc(path.join('src/util/generateDocsToc/__mocks__', mockPath));

describe('addStateToToc', () => {
  it('adds state to basic TOC', () => {
    const result = addStateToToc(getToc('basic'));
    expect(result).toMatchSnapshot();
  });

  it('handles heading index items', () => {
    const result = addStateToToc(getToc('basic'));
    const headingItem = result.find((item) => item.type === 'heading');
    expect(headingItem).toHaveProperty(
      'githubUrl',
      'https://github.com/storybookjs/storybook/tree/next/docs/writing-stories/index.md'
    );
  });

  it('handles redirects', () => {
    const result = addStateToToc(getToc('with-redirect'));
    const redirectedItem = result.find((item) => item.redirectPath);
    expect(redirectedItem).toHaveProperty('path', '/docs/parent/target');
  });

  it('handles sub-pages', () => {
    const result = addStateToToc(getToc('with-sub-pages'));
    expect(result).toMatchSnapshot();
  });

  it('handles nested sub-pages', () => {
    const result = addStateToToc(getToc('with-nested-sub-pages'));
    expect(result).toMatchSnapshot();
  });
});
