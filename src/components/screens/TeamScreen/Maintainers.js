import { graphql } from 'gatsby';
import React from 'react';
import PropTypes from 'prop-types';

import TeamList from './TeamList';
import TeamItem from './TeamItem';

export default function Maintainers({ teams }) {
  const teamMembers = {};

  teams.edges.forEach(team => {
    team.node.members.edges.forEach(({ node: memberNode }) => {
      const existingMember = teamMembers[memberNode.id];

      teamMembers[memberNode.id] = existingMember
        ? { ...existingMember, roles: existingMember.roles.concat(team.node.name) }
        : { ...memberNode, roles: [team.node.name] };
    });
  });

  return (
    <TeamList
      heading="Maintainers"
      description="Storybook relies on the regular contribution from dedicated maintainers to evolve and keep up to date. Maintainers are experts in different areas of the project."
    >
      {Object.keys(teamMembers).map(memberId => {
        const teamMember = teamMembers[memberId];

        return (
          <TeamItem
            key={teamMember.id}
            name={teamMember.name}
            title={teamMember.roles.join(', ')}
            avatarUrl={teamMember.avatarUrl}
          />
        );
      })}
    </TeamList>
  );
}

Maintainers.propTypes = {
  teams: PropTypes.shape({
    edges: PropTypes.arrayOf(
      PropTypes.shape({
        node: PropTypes.shape({
          name: PropTypes.string.isRequired,
          members: PropTypes.shape({
            edges: PropTypes.arrayOf(
              PropTypes.shape({
                node: PropTypes.shape({
                  id: PropTypes.string.isRequired,
                  avatarUrl: PropTypes.string.isRequired,
                  name: PropTypes.string.isRequired,
                }).isRequired,
              }).isRequired
            ).isRequired,
          }).isRequired,
        }).isRequired,
      }).isRequired
    ).isRequired,
  }).isRequired,
};

export const fragmentGitHub = graphql`
  fragment TeamScreenGithub on GitHub {
    organization(login: "storybookjs") {
      id
      team(slug: "team") {
        childTeams(first: 25) {
          edges {
            node {
              id
              name
              members {
                edges {
                  node {
                    id
                    avatarUrl
                    name
                  }
                }
              }
              name
            }
          }
        }
      }
    }
  }
`;
