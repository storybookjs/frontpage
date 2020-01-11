import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import { styles } from '@storybook/design-system';
import PageLayout from '../../layout/PageLayout';
import PageTitle from '../../layout/PageTitle';
import SteeringCommittee from './SteeringCommittee';
import Maintainers from './Maintainers';

import Contributors from './Contributors';

import useSiteMetadata from '../../lib/useSiteMetadata';
import { SocialGraph } from '../../basics';

const { breakpoint, pageMargin, pageMargins } = styles;

const Layout = styled.div`
  ${pageMargins};
  padding-bottom: 4rem;

  @media (min-width: ${breakpoint * 1}px) {
    margin: 0 ${pageMargin * 3}%;
    padding-bottom: 6rem;
  }
  @media (min-width: ${breakpoint * 2}px) {
    margin: 0 ${pageMargin * 4}%;
  }
`;

export default function TeamScreen({
  data: {
    github,
    gitHubRepoData: { contributorCount },
  },
  data,
  ...props
}) {
  const { title, ogImage, urls = {} } = useSiteMetadata();

  return (
    <PageLayout {...props}>
      <SocialGraph
        title={`Team | ${title}`}
        desc="Storybook is maintained by hundreds of contributors worldwide and guided by a steering committee."
        url={`${urls.home}/team`}
        image={ogImage}
      />

      <PageTitle
        heading="Team"
        title="Meet the team"
        desc="Storybook is maintained by hundreds of contributors worldwide and guided by a steering committee."
        color="purple"
      />

      <Layout>
        <SteeringCommittee />
        {github && <Maintainers teams={github.organization.team.childTeams} />}
        <Contributors contributorCount={contributorCount} />
      </Layout>
    </PageLayout>
  );
}

TeamScreen.propTypes = {
  data: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
};

export const fragmentGitHubRepoData = graphql`
  fragment TeamScreenGitHubRepoData on GitHubRepoData {
    contributorCount
  }
`;
