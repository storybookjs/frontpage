import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { Avatar, LazyLoad, Link, Icon, styles } from './../../basics';

const { color, typography, breakpoint } = styles;

const Heading = styled.div`
  font-size: ${typography.size.s3}px;
  font-weight: ${typography.weight.black};
  color: ${color.darkest};
  margin-bottom: 1rem;
`;

const Contributor = styled(Avatar)``;

const Contributors = styled.div`
  margin: -5px;

  ${Contributor} {
    margin: 5px;
  }
`;

const ContributorsWrapper = styled.div`
  margin-bottom: 1rem;
  @media (min-width: ${breakpoint * 1}px) {
    width: 140px;
    margin: 0 auto 1rem;
  }
`;

const Wrapper = styled.div`
  font-size: ${typography.size.s2}px;
  line-height: 20px;
  position: relative;
  display: block;

  @media (min-width: ${breakpoint * 1}px) {
    text-align: center;
  }
`;

export default function ContributorItem({ contributors, contributorCount, gitHubUrl, ...props }) {
  const count = contributorCount - 5;
  return (
    <Wrapper {...props}>
      <Heading>+{count} contributors</Heading>
      <ContributorsWrapper>
        <Contributors>
          {contributors.map(({ name, avatarUrl }, index) => (
            <Contributor key={name} size="large" username={name} src={avatarUrl} />
          ))}
        </Contributors>
      </ContributorsWrapper>
      <Link withArrow href={gitHubUrl}>
        View all on GitHub
      </Link>
    </Wrapper>
  );
}

ContributorItem.propTypes = {
  contributors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
  contributorCount: PropTypes.number.isRequired,
  gitHubUrl: PropTypes.string.isRequired,
};

ContributorItem.defaultProps = {};
