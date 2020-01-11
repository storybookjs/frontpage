import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { global } from '@storybook/design-system';

import TeamScreen from '../components/screens/TeamScreen/TeamScreen';

const { GlobalStyle } = global;

export default function TeamPage({ data }) {
  return (
    <Fragment>
      <GlobalStyle />
      <TeamScreen data={data} />
    </Fragment>
  );
}

TeamPage.propTypes = {
  data: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
};

export const query = graphql`
  query TeamPageQuery($hasGitHubToken: Boolean!) {
    gitHubRepoData {
      ...TeamScreenGitHubRepoData
    }
    github @include(if: $hasGitHubToken) {
      ...TeamScreenGithub
    }
  }
`;
