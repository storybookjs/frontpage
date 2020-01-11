/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Avatar, Link } from '@storybook/design-system';

import Section from './Section';

const CommunityAvatars = styled.div`
  margin-top: 10px;
  margin-left: -10px;
  margin-right: -10px;
  display: flex;
  flex-wrap: wrap;
`;

const AvatarWrapper = styled(Avatar).attrs({ size: 'large' })`
  min-width: 40px;
  margin: 10px;
`;

const StyledLink = styled(Link)`
  margin-top: 10px;
`;

const PureContributors = ({ contributors, contributorCount }) => (
  <Section
    heading={`+${contributorCount} Contributors`}
    description="Storybook is the product of hundreds of community contributors from around the globe."
  >
    <CommunityAvatars>
      {contributors.map(contributor => (
        <AvatarWrapper key={contributor.id} src={contributor.avatar_url} />
      ))}
    </CommunityAvatars>
    <StyledLink
      withArrow
      href="https://github.com/storybookjs/storybook/graphs/contributors"
      target="_blank"
      rel="noopener noreferrer"
    >
      View all on GitHub
    </StyledLink>
  </Section>
);

PureContributors.propTypes = {
  contributors: PropTypes.arrayOf(
    PropTypes.shape({
      avatar_url: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  ),
  contributorCount: PropTypes.string.isRequired,
};

PureContributors.defaultProps = {
  contributors: [],
};

// At the time of implementation, contributor data is not yet available through
// the GitHub GraphQL API. Therefore, just use the REST API to get it.
const contributorsUrl =
  'https://api.github.com/repos/storybookjs/storybook/contributors?per_page=20';
const sessionStorageKey = 'storybookFrontpageGithubContributors';

const Contributors = props => {
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    async function fetchGithubContributors() {
      const response = await fetch(contributorsUrl).then(res => res.json());
      if (response.message) {
        return; // Likely an error
      }
      sessionStorage.setItem(sessionStorageKey, JSON.stringify(response));
      setContributors(response);
    }

    if (sessionStorage.getItem(sessionStorageKey)) {
      // Use the cached version of contributors
      setContributors(JSON.parse(sessionStorage.getItem(sessionStorageKey)));
      return;
    }

    fetchGithubContributors();
  }, []);

  return <PureContributors {...props} contributors={contributors} />;
};

export { PureContributors };
export default Contributors;
