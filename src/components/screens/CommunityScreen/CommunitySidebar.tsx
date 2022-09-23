import React from 'react';
import { rgba } from 'polished';
import { styled } from '@storybook/theming';
import { styles } from '@storybook/components-marketing';
import { TableOfContents } from '@storybook/design-system';
import StorybookBadgeSVG from '../../../images/community/storybook-badge.svg';

const { color, text, subheading } = styles;

const sections = [
  {
    title: '⭐  Support',
    path: '#support',
    type: 'link' as any,
  },
  {
    title: '🎪  Events & streams',
    path: '#events-streams',
    type: 'link' as any,
  },
  {
    title: '⚡️  Brand & resources',
    path: '#brand-resources',
    type: 'link' as any,
  },
  {
    title: '🌎  Maintainer team',
    path: '/data-maintainer-team',
    type: 'link' as any,
  },
  {
    title: '🛠  Contribute',
    path: '#contribute',
    type: 'link' as any,
  },
  {
    title: '💅  Sponsor',
    path: '#sponsor',
    type: 'link' as any,
  },
];

const Wrapper = styled.div`
  max-width: 200px;
`;

const StorybookBadge = styled.img`
  display: block;
`;
const StorybookBadgeOuter = styled.a`
  background: ${rgba(color.purple, 0.1)};
  border: 1px dashed ${rgba(color.purple, 0.3)};
  padding: 15px;
  border-radius: 4px;
  margin-right: 15px;

  display: inline-block;

  transition: all 150ms ease-out;

  ${StorybookBadge} {
    transition: all 150ms ease-out 75ms;
    transform: translate3d(0, 0, 0);
  }

  &:hover {
    background: ${rgba(color.purple, 0.2)};

    ${StorybookBadge} {
      transform: translate3d(0, -2px, 0);
      box-shadow: rgba(0, 0, 0, 0.2) 0 2px 6px 0;
    }
  }

  &:active {
    background: ${rgba(color.purple, 0.25)};
    box-shadow: ${rgba(color.purple, 0.3)} 0 0 3px 0 inset;

    ${StorybookBadge} {
      transform: translate3d(0, 0, 0);
    }
  }
`;
const Divider = styled.div`
  border-top: 1px solid ${color.border};
  margin-top: 20px;
  margin-bottom: 30px;
  max-width: 150px;
`;

const Text = styled.div`
  ${text.regular};
  color: #586368;
  margin-bottom: 12px;
`;

const Title = styled.div`
  ${subheading.regular};
  text-transform: uppercase;
  color: ${color.mediumdark};
  margin-bottom: 16px;
`;

interface CommunitySidebarProps {
  badgeUrl: string;
  activeSection: string;
}

export function CommunitySidebar({ badgeUrl, activeSection, ...props }: CommunitySidebarProps) {
  return (
    <Wrapper {...props}>
      <Title>Community</Title>
      <TableOfContents items={sections} currentPath={activeSection} />
      <Divider />
      <Text>Get a badge for your readme</Text>
      <StorybookBadgeOuter href={badgeUrl}>
        <StorybookBadge src={StorybookBadgeSVG} alt="Storybook badge" />
      </StorybookBadgeOuter>
    </Wrapper>
  );
}
