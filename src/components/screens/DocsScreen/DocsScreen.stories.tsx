import React from 'react';
import { storiesOf } from '@storybook/react';

import DocsScreen from './DocsScreen';

const data = {
  currentPage: {
    html: 'html content',
    frontmatter: {
      title: 'Docs Screen Title',
    },
  },
};

const tocItem = { githubUrl: 'github.com' };

const nextTocItem = { path: '/path', title: 'Title', description: 'This is a description.' };

storiesOf('Frontpage|screens/DocsScreen', module)
  .add('default', () => <DocsScreen data={data} pageContext={{ tocItem: {} }} />)
  .add('with guide link', () => <DocsScreen data={data} pageContext={{ nextTocItem }} />)
  .add('with guide link, no description', () => (
    <DocsScreen
      data={data}
      pageContext={{ nextTocItem: { ...nextTocItem, description: undefined } }}
    />
  ))
  .add('with github link', () => <DocsScreen data={data} pageContext={{ tocItem }} />)
  .add('with github link and guide link', () => (
    <DocsScreen data={data} pageContext={{ tocItem, nextTocItem }} />
  ));
