/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';

import Maintainers from './Maintainers';

const avatarUrl = 'https://avatars0.githubusercontent.com/u/132554?s=400&v=4';

const userWithMultipleTeams = {
  id: ':member1',
  name: 'Tom Coleman',
  avatarUrl,
};

// eslint-disable-next-line import/prefer-default-export
export const github = {
  organization: {
    team: {
      childTeams: {
        edges: [
          {
            node: {
              id: 'team1',
              name: 'Team 1',
              members: {
                edges: [
                  {
                    node: { ...userWithMultipleTeams },
                  },
                  {
                    node: {
                      id: ':member2',
                      name: 'Michael Shilman',
                      avatarUrl,
                    },
                  },
                ],
              },
            },
          },
          {
            node: {
              id: 'team2',
              name: 'Team 2',
              members: {
                edges: [
                  {
                    node: { ...userWithMultipleTeams },
                  },
                  {
                    node: {
                      id: ':member3',
                      name: 'Norbert de Langen',
                      avatarUrl,
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    },
  },
};

storiesOf('Frontpage|screens/TeamScreen/Maintainers', module).add('default', () => (
  <Maintainers teams={github.organization.team.childTeams} />
));
