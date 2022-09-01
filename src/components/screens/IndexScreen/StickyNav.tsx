import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@storybook/theming';
import { Link, Button, Icon, WithModal } from '@storybook/design-system';
import { styles, NavItem } from '@storybook/components-marketing';
import { motion, useInView, useScroll } from 'framer-motion';

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
  display: flex;
  align-items: center;
  gap: 9px;
  height: 40px;

  @media (min-width: ${breakpoints[2]}px) {
    height: 72px;
  }
`;

export const StickyNav = ({ ...props }) => {
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

  return (
    <Wrapper ref={ref} animate={{ opacity: stickyNavVisible ? 1 : 0 }} {...props}>
      <Content>
        <Link inverse href="#id">
          Develop
        </Link>
        <Link inverse href="#id">
          Test
        </Link>
        <Link inverse href="#id">
          Document
        </Link>
        <Link inverse href="#id">
          Share
        </Link>
        <Link inverse href="#id">
          Automate
        </Link>
        <Link inverse href="#id">
          Who's it for
        </Link>
      </Content>
    </Wrapper>
  );
};
