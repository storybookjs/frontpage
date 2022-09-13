import React, { useRef } from 'react';
import { styled } from '@storybook/theming';
import { styles, IntegrationsCarousel, AspectRatio } from '@storybook/components-marketing';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Player } from './Player';

const { breakpoints } = styles;

const TimeFramePicker = styled(motion.img)`
  display: block;
  width: 46%;
  max-width: 440px;
  height: auto;
  position: absolute;
  z-index: 1;
  top: 18%;
  left: 37%;

  @media (min-width: ${breakpoints[2]}px) {
    top: 15%;
    left: 25%;
  }
`;
TimeFramePicker.defaultProps = {
  src: 'images/embed/time-frame-picker.svg',
  alt: '',
};

const PublishIntegrationsWrapper = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 800px;

  @media (min-width: ${breakpoints[2]}px) {
    width: 150%;
    grid-column: 2 / 3;
  }
`;

const Storybook = styled.img`
  display: block;
  width: 100%;
  height: auto;
`;
Storybook.defaultProps = {
  src: 'images/home/storybook-mock-ui.svg',
  alt: '',
};

const Arrow = styled(motion.img)`
  position: absolute;
  top: 64%;
  left: 20%;
  width: auto;
  height: 5%;

  @media (min-width: ${breakpoints[1]}px) {
    left: 10%;
  }
`;
Arrow.defaultProps = { src: 'images/home/arrow.svg', alt: '' };
const PointerHand = styled(motion.img)`
  position: absolute;
  top: 10%;
  left: 32%;
  width: auto;
  height: 5%;
`;
PointerHand.defaultProps = { src: 'images/home/pointerhand.svg', alt: '' };
const Caret = styled(motion.img)`
  position: absolute;
  top: 20%;
  left: 66%;
  width: auto;
  height: 5%;
`;
Caret.defaultProps = { src: 'images/home/caret.svg', alt: '' };

const symbolVariants = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
};

export const PublishIntegrations = React.forwardRef(({ timeFrameStyles }, ref) => {
  return (
    <PublishIntegrationsWrapper whileInView="animate" initial="initial" viewport={{ once: true }}>
      <Storybook />
      <TimeFramePicker initial={false} style={timeFrameStyles} width="458" height="244" />
      <TimeFramePicker ref={ref} width="458" height="244" style={{ opacity: 0 }} />
      <PointerHand variants={symbolVariants} transition={{ duration: 0.4, delay: 0.8 }} />
      <Player type="blue" x="6%" y="-12%" delay={1} count={2} />
      <Arrow variants={symbolVariants} transition={{ duration: 0.4, delay: 1.6 }} />
      <Player type="red" x="-7%" y="45%" delay={1.8} count={4} />
      <Player type="yellow" x="30%" y="56%" delay={3} count={2} />
      <Caret variants={symbolVariants} transition={{ duration: 0.4, delay: 3.6 }} />
      <Player type="purple" x="65%" y="9%" delay={3.8} count={1} />
    </PublishIntegrationsWrapper>
  );
});
