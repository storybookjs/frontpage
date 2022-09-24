import React from 'react';
import { rgba } from 'polished';
import { styled } from '@storybook/theming';
import { styles, NavItem, Menu } from '@storybook/components-marketing';
import { TableOfContents } from '@storybook/design-system';
import StorybookBadgeSVG from '../../../images/community/storybook-badge.svg';

const { color, text, subheading, breakpoints } = styles;

const sections = [
  {
    id: 'support',
    title: '⭐  Support',
    path: '#support',
    type: 'link' as any,
  },
  {
    id: 'events',
    title: '🎪  Events & streams',
    path: '#events-streams',
    type: 'link' as any,
  },
  {
    id: 'brand',
    title: '⚡️  Brand & resources',
    path: '#brand-resources',
    type: 'link' as any,
  },
  {
    id: 'maintainers',
    title: '🌎  Maintainer team',
    path: '#maintainer-team',
    type: 'link' as any,
  },
  {
    id: 'contribute',
    title: '🛠  Contribute',
    path: '#contribute',
    type: 'link' as any,
  },
  {
    id: 'sponsors',
    title: '💅  Sponsor',
    path: '#sponsor',
    type: 'link' as any,
  },
];
const mobileItems = sections.map((section) => ({
  id: section.id,
  label: section.title,
  link: { url: section.path },
}));

const DesktopWrapper = styled.div`
  display: none;
  flex: none;

  @media (min-width: ${breakpoints[3]}px) {
    display: block;
    padding-bottom: 4rem;
    max-width: 200px;
  }
`;

const StickyWrapper = styled.div`
  position: sticky;
  top: 0;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  z-index: 9999;

  padding-top: 4px;
  padding-bottom: 4px;
  display: block;

  @media (min-width: ${breakpoints[2]}px) {
    padding-top: 19px;
    padding-bottom: 19px;
    margin-bottom: 3rem;
  }

  @media (min-width: ${breakpoints[3]}px) {
    display: none;
  }
`;

const Inner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  @media (min-width: ${breakpoints[3]}px) {
    flex-direction: column;
    position: sticky;
    top: 2rem;
  }
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
  width: 100%;
  max-width: 150px;
  display: none;

  @media (min-width: ${breakpoints[3]}px) {
    display: block;
  }
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

const BadgeContainer = styled.div`
  display: none;

  @media (min-width: ${breakpoints[3]}px) {
    display: block;
  }
`;

const MobileMenu = styled(Menu)`
  && {
    @media (min-width: ${breakpoints[2]}px) {
      display: none;
    }
  }
`;

const TabletMenu = styled.div`
  display: none;

  @media (min-width: ${breakpoints[2]}px) {
    display: flex;
    gap: 10px;
  }

  @media (min-width: ${breakpoints[3]}px) {
    display: none;
  }
`;

const SmallScreenTitle = styled(Title)`
  display: block;

  @media (min-width: ${breakpoints[3]}px) {
    display: none;
  }
`;

interface CommunitySidebarProps {
  badgeUrl: string;
  activeSectionId: string;
}

export function CommunitySidebar({ badgeUrl, activeSectionId, ...props }: CommunitySidebarProps) {
  const activeSection = sections.find((item) => item.id === activeSectionId);

  return (
    <>
      <SmallScreenTitle>Community</SmallScreenTitle>
      <StickyWrapper>
        <MobileMenu items={mobileItems} label={activeSection?.title} />
        <TabletMenu>
          {sections.map((item) => (
            <NavItem key={item.path} href={item.path} active={item.id === activeSection?.id}>
              {item.title}
            </NavItem>
          ))}
        </TabletMenu>
      </StickyWrapper>

      <DesktopWrapper {...props}>
        <Inner>
          <Title>Community</Title>
          <TableOfContents items={sections} currentPath={activeSection?.path} />
          <Divider />
          <BadgeContainer>
            <Text>Get a badge for your readme</Text>
            <StorybookBadgeOuter href={badgeUrl}>
              <StorybookBadge src={StorybookBadgeSVG} alt="Storybook badge" />
            </StorybookBadgeOuter>
          </BadgeContainer>
        </Inner>
      </DesktopWrapper>
    </>
  );
}
