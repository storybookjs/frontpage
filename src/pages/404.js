import React, { Fragment } from 'react';
import { global } from '@storybook/design-system';
import { NotFoundScreen } from '@storybook/components-marketing';
import { graphql } from 'gatsby';

const { GlobalStyle } = global;

const ALGOLIA_API_KEY = process.env.GATSBY_ALGOLIA_API_KEY;

const Page404 = ({ data }) => (
  <Fragment>
    <GlobalStyle />
    <NotFoundScreen
      repoUrl="https://github.com/storybookjs/frontpage/"
      // eslint-disable-next-line react/prop-types
      latestVersionString={data.dxData.latestVersion}
      apiKey={ALGOLIA_API_KEY}
    />
  </Fragment>
);

export default Page404;

// prettier-ignore
export const query = graphql`
  query Page404 {
    dxData {
      latestVersion
    }
  }
`;
