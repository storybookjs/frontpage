import React from 'react';
import { styled } from '@storybook/theming';
import { Button, Icon } from '@storybook/design-system';
import { styles, NavItem, Menu } from '@storybook/components-marketing';
import { motion } from 'framer-motion';

const { color, breakpoints, pageMargins } = styles;

const Wrapper = styled(motion.div)`
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 9999;
`;

const Content = styled.section`
  ${pageMargins};
  height: 40px;
  display: flex;
  justify-content: space-between;

  @media (min-width: ${breakpoints[2]}px) {
    height: 72px;
  }
`;

const JumpLink = styled(NavItem)`
  display: none;
  svg {
    width: 12px;
    height: 12px;
    margin-right: 6px;
  }

  @media (min-width: ${breakpoints[2]}px) {
    display: inline-flex;
  }
`;

const LeftLinks = styled.div`
  display: none;
  align-items: center;
  gap: 10px;

  @media (min-width: ${breakpoints[2]}px) {
    display: flex;
  }
`;
const RightLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const MobileMenu = styled(Menu)`
  && {
    color: ${color.lightest};

    @media (min-width: ${breakpoints[2]}px) {
      display: none;
    }
  }
`;

interface StickyNavProps {
  docs: string;
  isVisible?: boolean;
  animationDisabled?: boolean;
  activeSection: 'who' | 'automate' | 'share' | 'document' | 'test' | 'develop';
}

const items = [
  { id: 'develop', label: 'Develop', link: { url: '#develop' } },
  { id: 'test', label: 'Test', link: { url: '#test' } },
  { id: 'document', label: 'Document', link: { url: '#document' } },
  { id: 'share', label: 'Share', link: { url: '#share' } },
  { id: 'automate', label: 'Automate', link: { url: '#automate' } },
  { id: 'who', label: "Who's it for", link: { url: '#who' } },
];

export const StickyNav = ({
  docs,
  isVisible,
  animationDisabled = false,
  activeSection,
  ...props
}: StickyNavProps) => {
  const activeItem = items.find((item) => item.id === activeSection);

  return (
    <Wrapper animate={{ opacity: isVisible ? 1 : 0 }} {...props}>
      <Content>
        <MobileMenu items={items} label={activeItem?.label || items[0].label} />
        <LeftLinks>
          {items.map((item) => (
            <NavItem
              key={item.id}
              variant="inverse"
              href={item.link.url}
              active={activeSection === item.id}
            >
              {item.label}
            </NavItem>
          ))}
        </LeftLinks>
        <RightLinks>
          <JumpLink variant="inverse" href="#page-top">
            <Icon icon="arrowupalt" />
            Jump to top
          </JumpLink>
          <Button appearance="secondary" isLink size="small" href={docs}>
            Get started
          </Button>
        </RightLinks>
      </Content>
    </Wrapper>
  );
};
