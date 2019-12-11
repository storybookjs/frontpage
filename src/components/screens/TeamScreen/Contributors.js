/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Avatar, styles, Link } from '@storybook/design-system';

const { typography } = styles;

const Heading = styled.div`
  font-size: ${typography.size.m2}px;
  font-weight: ${typography.weight.extrabold};
  line-height: 28px;
`;

const Text = styled.h1`
  font-size: ${typography.size.s3}px;
  line-height: 28px;
  margin-top: 12px;
`;

const Wrapper = styled.div`
  padding: 1rem;
`;

const CommunityAvatars = styled.div`
  margin-top: 24px;
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
  margin-top: 12px;
`;

const PureContributors = ({ contributors }) => (
  <Wrapper>
    <section>
      <Heading>+{parseInt(contributors.length / 3, 10)} Contributors</Heading>
      <Text>
        Storybook the product of hundreds of community contributors from around the globe.
      </Text>
      <CommunityAvatars>
        {contributors.slice(0, contributors.length / 3).map(contributor => (
          <AvatarWrapper key={contributor.id} src={contributor.avatar_url} />
        ))}
      </CommunityAvatars>
      <StyledLink withArrow href="https://github.com/storybookjs/frontpage/graphs/contributors">
        View all on GitHub
      </StyledLink>
    </section>
  </Wrapper>
);

PureContributors.propTypes = {
  contributors: PropTypes.arrayOf(
    PropTypes.shape({
      avatar_url: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  ),
};

PureContributors.defaultProps = {
  contributors: [],
};

const contributorsUrl = 'https://api.github.com/repos/storybookjs/frontpage/contributors';
const sessionStorageKey = 'lsbGithubContributors';

const Contributors = () => {
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

  return <PureContributors contributors={contributors} />;
};

export { PureContributors };
export default Contributors;
