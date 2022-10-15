import React from 'react';
import { styled } from '@storybook/theming';
import { Icon } from '@storybook/design-system';

export const DiscordIcon = styled(Icon)`
  color: #5a65ea;
`;
DiscordIcon.defaultProps = {
  icon: 'discord',
  'aria-label': 'Discord',
};

export const GithubIcon = styled(Icon)`
  color: #333333;
`;
GithubIcon.defaultProps = {
  icon: 'github',
  'aria-label': 'Github',
};

export const TwitterIcon = styled(Icon)`
  color: #4999e9;
`;
TwitterIcon.defaultProps = {
  icon: 'twitter',
  'aria-label': 'Twitter',
};

const YouTubeIconWrapper = styled.div`
  position: relative;

  svg {
    color: #ea3223;
  }

  &:before {
    content: '';
    background: #fff;
    position: absolute;
    width: 50%;
    height: 50%;
    top: 25%;
    left: 25%;
  }
`;

export const YouTubeIcon = () => (
  <YouTubeIconWrapper>
    <Icon icon="youtube" aria-label="YouTube" />
  </YouTubeIconWrapper>
);

export const StorybookIcon = styled(Icon)`
  color: #ff4785;
`;
StorybookIcon.defaultProps = {
  icon: 'storybook',
  'aria-label': 'Storybook',
};
