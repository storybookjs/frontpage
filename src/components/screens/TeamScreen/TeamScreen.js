import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

import { styles } from '@storybook/design-system';
import PageLayout from '../../layout/PageLayout';
import PageTitle from '../../layout/PageTitle';
import TeamItem from './TeamItem';
import ContributorItem from './ContributorItem';
import TeamList from './TeamList';

import useSiteMetadata from '../../../lib/useSiteMetadata';
import { SocialGraph } from '../../basics';

const { breakpoint } = styles;

const Team = styled(TeamList)`
  @media (min-width: ${breakpoint * 1}px) {
    margin-bottom: 5rem;
  }
`;

const contributors = [
  {
    name: 'Daniel Duan',
    avatarUrl: 'https://avatars1.githubusercontent.com/u/1474548',
  },
  {
    name: 'Kai Röder',
    avatarUrl: 'https://pbs.twimg.com/profile_images/1167896480373362689/CRgdWRVh.jpg',
  },
  {
    name: 'Chak Shun Yu',
    avatarUrl: 'https://avatars0.githubusercontent.com/u/5955441',
  },
  {
    name: 'Gavin King',
    avatarUrl: 'https://avatars2.githubusercontent.com/u/651122',
  },
  {
    name: 'Carlos Vega',
    avatarUrl: 'https://avatars1.githubusercontent.com/u/1593752',
  },
  {
    name: 'Gytis Vinclovas',
    avatarUrl: 'https://avatars3.githubusercontent.com/u/3867635',
  },
  {
    name: 'Rob Halff',
    avatarUrl: 'https://avatars1.githubusercontent.com/u/274358',
  },
  {
    name: 'Thomas Bertet',
    avatarUrl: 'https://avatars3.githubusercontent.com/u/2551574',
  },
  {
    name: 'Oleg Proskurin',
    avatarUrl: 'https://avatars3.githubusercontent.com/u/14885189',
  },
];

export function PureTeamScreen({ data: { gitHubRepoData }, ...props }) {
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
        color="green"
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
        <ContributorItem
          contributors={contributors}
          contributorCount={`+${gitHubRepoData.contributorCount}`}
          gitHubUrl={`${gitHubRepoData.url}/graphs/contributors`}
        />
      </Team>
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
