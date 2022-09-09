import React, { useEffect, useRef, useState } from 'react';
import { styled } from '@storybook/theming';
import { Link, Button, Icon, WithModal } from '@storybook/design-system';
import { styles, NavItem, Menu } from '@storybook/components-marketing';
import { motion, useScroll } from 'framer-motion';

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
  gap: 9px;

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
  animationDisabled?: boolean;
  activeSection: 'who' | 'automate' | 'share' | 'document' | 'test' | 'develop';
}

export const StickyNav = ({
  docs,
  animationDisabled = false,
  activeSection,
  ...props
}: StickyNavProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['end end', 'start start'],
  });
  const [stickyNavVisible, setStickyNavVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      if (latest === 1) {
        setStickyNavVisible(true);
      } else if (latest === 0) {
        setStickyNavVisible(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const opacity = stickyNavVisible ? 1 : 0;

  return (
    <Wrapper ref={ref} animate={{ opacity: animationDisabled ? 1 : opacity }} {...props}>
      <Content>
        <MobileMenu
          items={[
            { label: 'Develop', link: { url: '#develop' } },
            { label: 'Test', link: { url: '#test' } },
            { label: 'Document', link: { url: '#document' } },
            { label: 'Share', link: { url: '#share' } },
            { label: 'Automate', link: { url: '#automate' } },
            { label: "Who's it for", link: { url: '#who' } },
          ]}
          label="Develop"
        />
        <LeftLinks>
          <NavItem variant="inverse" href="#develop" active={activeSection === 'develop'}>
            Develop
          </NavItem>
          <NavItem variant="inverse" href="#test" active={activeSection === 'test'}>
            Test
          </NavItem>
          <NavItem variant="inverse" href="#document" active={activeSection === 'document'}>
            Document
          </NavItem>
          <NavItem variant="inverse" href="#share" active={activeSection === 'share'}>
            Share
          </NavItem>
          <NavItem variant="inverse" href="#automate" active={activeSection === 'automate'}>
            Automate
          </NavItem>
          <NavItem variant="inverse" href="#who" active={activeSection === 'who'}>
            Who's it for
          </NavItem>
        </LeftLinks>
        <RightLinks>
          <JumpLink variant="inverse" href="#page-hero">
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
