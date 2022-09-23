import React from 'react';
import { CommunityMaintainers } from './CommunityMaintainers';

export default {
  title: 'screens/CommunityScreen/CommunityMaintainers',
  component: CommunityMaintainers,
};

const contributors = [
  {
    name: 'Daniel Duan',
    avatarUrl: 'https://avatars1.githubusercontent.com/u/1474548',
    githubUrl: '/daniel-duan',
  },
  {
    name: 'Kai Röder',
    avatarUrl: 'https://pbs.twimg.com/profile_images/1167896480373362689/CRgdWRVh.jpg',
    githubUrl: '/kai-röder',
  },
  {
    name: 'Chak Shun Yu',
    avatarUrl: 'https://avatars0.githubusercontent.com/u/5955441',
    githubUrl: '/chak-shun-yu',
  },
  {
    name: 'Gavin King',
    avatarUrl: 'https://avatars2.githubusercontent.com/u/651122',
    githubUrl: '/gavin-king',
  },
  {
    name: 'Carlos Vega',
    avatarUrl: 'https://avatars1.githubusercontent.com/u/1593752',
    githubUrl: '/carlos-vega',
  },
  {
    name: 'Gytis Vinclovas',
    avatarUrl: 'https://avatars3.githubusercontent.com/u/3867635',
    githubUrl: '/gytis-vinclovas',
  },
  {
    name: 'Rob Halff',
    avatarUrl: 'https://avatars1.githubusercontent.com/u/274358',
    githubUrl: '/rob-halff',
  },
  {
    name: 'Thomas Bertet',
    avatarUrl: 'https://avatars3.githubusercontent.com/u/2551574',
    githubUrl: '/thomas-bertet',
  },
  {
    name: 'Oleg Proskurin',
    avatarUrl: 'https://avatars3.githubusercontent.com/u/14885189',
    githubUrl: '/oleg-proskurin',
  },
];

export const Default = (args) => <CommunityMaintainers {...args} />;
Default.args = {
  contributorsUrl: '/contributors',
  contributors: [
    ...contributors,
    ...contributors,
    ...contributors,
    ...contributors,
    ...contributors,
    ...contributors.slice(0, 3),
  ],
};
Default.storyName = 'CommunityMaintainers';
