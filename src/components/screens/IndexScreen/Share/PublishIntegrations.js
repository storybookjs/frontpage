import React, { useRef } from 'react';
import { styled } from '@storybook/theming';
import { styles, IntegrationsCarousel, AspectRatio } from '@storybook/components-marketing';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Player } from './Player';

const { breakpoints } = styles;

const TimeFramePicker = styled(motion.img)`
  display: block;
  width: 56%;
  max-width: 440px;
  height: auto;
  position: absolute;
  top: 15%;
  left: 30%;
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
  left: 10%;
  width: auto;
  height: 5%;
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

export const PublishIntegrations = React.forwardRef(({ isInView }, ref) => {
  return (
    <PublishIntegrationsWrapper
      ref={ref}
      whileInView="animate"
      initial="initial"
      viewport={{ once: true }}
    >
      <Storybook />
      {isInView && (
        <TimeFramePicker
          key="TimeFramePicker"
          layoutId="TimeFramePicker"
          transition={{ duration: 0.8 }}
          width="458"
          height="244"
        />
      )}
      <PointerHand variants={symbolVariants} transition={{ duration: 0.4, delay: 0.8 }} />
      <Player type="blue" x="6%" y="-12%" delay={1} />
      <Arrow variants={symbolVariants} transition={{ duration: 0.4, delay: 2.6 }} />
      <Player type="red" x="-7%" y="45%" delay={2.8} />
      <Caret variants={symbolVariants} transition={{ duration: 0.4, delay: 4.8 }} />
      <Player type="purple" x="65%" y="9%" delay={5} />
      <Player type="yellow" x="30%" y="56%" delay={7} />
    </PublishIntegrationsWrapper>
  );
});
