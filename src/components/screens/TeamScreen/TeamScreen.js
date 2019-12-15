import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

import { styles } from '@storybook/design-system';
import PageLayout from '../../layout/PageLayout';
import PageTitle from '../../layout/PageTitle';
import TeamItem from './TeamItem';
import TeamList, { Layout } from './TeamList';

import Contributors from './Contributors';

import useSiteMetadata from '../../lib/useSiteMetadata';
import { SocialGraph } from '../../basics';

const { breakpoint } = styles;

const Team = styled(TeamList)`
  @media (min-width: ${breakpoint * 1}px) {
    margin-bottom: 1rem;
  }
`;

const ContributorsWrapper = styled(Layout)``;

export function PureTeamScreen({ ...props }) {
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
      <Team>
        <TeamItem
          name="Norbert de Langen"
          title="Open source"
          company="Chroma"
          companyUrl="https://hichroma.com"
          location="Zwolle, Netherlands"
          avatarUrl="https://avatars2.githubusercontent.com/u/3070389?s=200&v=4"
          gitHubUrl="https://github.com/ndelangen"
          twitterUrl="https://twitter.com/NorbertdeLangen"
        />
        <TeamItem
          name="Filipp Riabchun"
          title="Engineering"
          company="Jetbrains"
          companyUrl="https://www.jetbrains.com"
          location="Bayern, Germany"
          avatarUrl="https://avatars0.githubusercontent.com/u/6651625?s=200&v=4"
          gitHubUrl="https://github.com/Hypnosphi"
          twitterUrl="https://twitter.com/hypnos_phi"
        />
        <TeamItem
          name="Michael Shilman"
          title="Engineering"
          company="Chroma"
          companyUrl="https://hichroma.com"
          location="San Francisco, USA"
          avatarUrl="https://avatars0.githubusercontent.com/u/488689?s=200&v=4"
          gitHubUrl="https://github.com/shilman"
          twitterUrl="https://twitter.com/mshilman"
        />
        <TeamItem
          name="Igor Davydkin"
          title="Engineering"
          company="ClimaCell"
          companyUrl="https://www.climacell.co/"
          location="Tel Aviv, Israel"
          avatarUrl="https://avatars1.githubusercontent.com/u/7867954?s=200&v=4"
          gitHubUrl="https://github.com/igor-dv"
          twitterUrl="https://twitter.com/IgorDavydkin"
        />
        <TeamItem
          name="Tom Coleman"
          title="Engineering"
          company="Chroma"
          companyUrl="https://hichroma.com"
          location="Melbourne, Australia"
          avatarUrl="https://avatars0.githubusercontent.com/u/132554?s=200&v=4"
          gitHubUrl="https://github.com/tmeasday"
          twitterUrl="https://twitter.com/tmeasday"
        />
      </Team>
      <ContributorsWrapper>
        <Contributors />
      </ContributorsWrapper>
    </PageLayout>
  );
}

PureTeamScreen.propTypes = {
  data: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default function TeamScreen({ ...props }) {
  return (
    <StaticQuery
      query={graphql`
        query TeamScreenQuery {
          gitHubRepoData {
            contributorCount
            url
          }
        }
      `}
      render={data => <PureTeamScreen data={data} {...props} />}
    />
  );
}
