import React from 'react';
import { StorybookSessions } from './StorybookSessions';

export default {
  title: 'screens/CommunityScreen/StorybookSessions',
  component: StorybookSessions,
};

const mockSessions = [
  {
    id: 0,
    date: 'July 20, 2023 8:30 AM',
    registrationLink: '/#',
  },
  {
    id: 1,
    date: 'Aug 29, 2023 7:00 AM',
    registrationLink: '/#',
  },
  {
    id: 2,
    date: 'Sept 18, 2023 4:00 PM',
    registrationLink: '/#',
  },
  {
    id: 3,
    date: 'Nov 7, 2023 9:00 AM',
    registrationLink: '/#',
  },
];

export const Default = (args) => <StorybookSessions {...args} />;
Default.args = {
  sessions: mockSessions,
};

export const UpcomingAndPast = (args) => <StorybookSessions {...args} />;
UpcomingAndPast.args = {
  sessions: [
    {
      id: 0,
      date: 'June 20, 2023 8:30 AM',
      registrationLink: '/#',
    },
    {
      id: 1,
      date: 'July 3, 2023 7:00 AM',
      registrationLink: '/#',
    },
    mockSessions[2],
    mockSessions[3],
  ],
};

export const PastOnly = (args) => <StorybookSessions {...args} />;
PastOnly.args = {
  sessions: [
    {
      id: 0,
      date: 'June 20, 2023 8:30 AM',
      registrationLink: '/#',
    },
    {
      id: 1,
      date: 'July 3, 2023 7:00 AM',
      registrationLink: '/#',
    },
    {
      id: 0,
      date: 'May 10, 2023 8:30 AM',
      registrationLink: '/#',
    },
    {
      id: 1,
      date: 'Apr 5, 2023 7:00 AM',
      registrationLink: '/#',
    },
  ],
};
