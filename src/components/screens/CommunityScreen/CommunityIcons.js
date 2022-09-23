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
