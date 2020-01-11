import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Avatar, Icon, Link, styles } from '@storybook/design-system';
import { LazyLoad } from '../../basics';

const { breakpoint, color, typography } = styles;

const Profile = styled(Avatar)`
  height: 50px;
  width: 50px;
`;

const Name = styled.div`
  font-size: ${typography.size.s3}px;
  font-weight: ${typography.weight.extrabold};
  color: ${color.darkest};
`;
const Title = styled.div``;
const Company = styled.span``;

const Social = styled.div`
  margin-top: 0.2rem;

  > a {
    margin-right: 10px;

    svg {
      height: 1rem;
      width: 1rem;
    }
  }
`;

const Meta = styled.div`
  margin: 0.1em 0 0 1em;
  color: ${color.dark};
`;

const Item = styled.div`
  font-size: ${typography.size.s2}px;
  line-height: 20px;
  position: relative;
  display: block;
  text-align: left;
  padding: 2rem 10px 0 0;
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-start;

  @media (min-width: ${breakpoint * 1.3}px) {
    width: 50%;
    justify-content: flex-start;
  }

  img {
    width: 50px;
    height: 50px;
  }
`;

export default function TeamItem({
  name,
  title,
  company,
  companyUrl,
  avatarUrl,
  gitHubUrl,
  twitterUrl,
  ...props
}) {
  return (
    <Item {...props}>
      <LazyLoad once placeholder={<Profile loading />} height="100%">
        <Profile size="large" username={name} src={avatarUrl} />
      </LazyLoad>
      <Meta>
        <Name>{name}</Name>
        <Title>
          {title}
          {company && companyUrl && (
            <Company>
              {' at '}
              <Link secondary href={companyUrl} target="_blank">
                <b>{company}</b>
              </Link>
            </Company>
          )}
        </Title>

        {(gitHubUrl || twitterUrl) && (
          <Social>
            {gitHubUrl && (
              <Link tertiary href={gitHubUrl} target="_blank" containsIcon>
                <Icon icon="github" />
              </Link>
            )}
            {twitterUrl && (
              <Link tertiary href={twitterUrl} target="_blank" containsIcon>
                <Icon icon="twitter" />
              </Link>
            )}
          </Social>
        )}
      </Meta>
    </Item>
  );
}

TeamItem.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  company: PropTypes.string,
  companyUrl: PropTypes.string,
  avatarUrl: PropTypes.string.isRequired,
  gitHubUrl: PropTypes.string,
  twitterUrl: PropTypes.string,
};

TeamItem.defaultProps = {
  company: null,
  companyUrl: null,
  gitHubUrl: null,
  twitterUrl: null,
};
