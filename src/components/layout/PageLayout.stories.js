import React from 'react';
import { storiesOf } from '@storybook/react';
import { StaticQueryContext } from 'gatsby';

import PageLayout from './PageLayout';

storiesOf('layout/PageLayout', module)
  .addDecorator(story => (
    <StaticQueryContext.Provider
      value={{
        '755544856': {
          data: {
            site: {
              siteMetadata: { title: 'Tom' },
            },
          },
        },
      }}
    >
      {story()}
    </StaticQueryContext.Provider>
  ))
  .add('not subscribed', () => <PageLayout>children</PageLayout>)
  .add('subscribed', () => <PageLayout>children</PageLayout>);
