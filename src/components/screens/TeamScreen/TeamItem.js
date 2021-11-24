import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@storybook/theming';

import { Avatar, Icon, Link, styles } from '@storybook/design-system';
import { LazyLoad } from '../../basics';

const { color, typography, breakpoint } = styles;

const Profile = styled(Avatar)`
  height: 80px;
  width: 80px;
  @media (min-width: ${breakpoint * 1}px) {
    height: 120px;
    width: 120px;
  }
`;

const ImageOuter = styled.div`
  margin-right: 20px;

  @media (min-width: ${breakpoint * 1}px) {
    margin-right: 0;
    margin-bottom: 1.25rem;
  }
`;

const Name = styled.div`
  font-size: ${typography.size.s3}px;
  font-weight: ${typography.weight.extrabold};
  color: ${color.darkest};
  margin-bottom: 0.25rem;
`;
const Title = styled.div``;
const Company = styled.span``;
const Location = styled.div``;

const Social = styled.div`
  margin-top: 0.25rem;
  @media (min-width: ${breakpoint * 1}px) {
    margin-top: 0.5rem;
  }

  > a {
    margin-right: 15px;

    @media (min-width: ${breakpoint * 1}px) {
      margin: 0 7.5px;
    }

    svg {
      height: 1rem;
      width: 1rem;
    }
  }
`;

const Meta = styled.div`
  color: ${color.dark};
`;

const Item = styled.div`
  font-size: ${typography.size.s2}px;
  line-height: 20px;
  position: relative;
  display: block;
  text-align: left;

  display: flex;
  flex-direction: row;

  @media (min-width: ${breakpoint * 1}px) {
    flex-direction: column;
    text-align: center;
  }
`;

export default function TeamItem({
  name,
  title,
  company,
  companyUrl,
  location,
  avatarUrl,
  gitHubUrl,
  twitterUrl,
  ...props
}) {
  return (
    <Item {...props}>
      <ImageOuter>
        <LazyLoad once placeholder={<Profile loading />} height="100%">
          <Profile size="large" username={name} src={avatarUrl} />
        </LazyLoad>
      </ImageOuter>
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
        <Location>{location}</Location>

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
  location: PropTypes.string.isRequired,
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
