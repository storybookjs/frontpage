import React, { useRef } from 'react';
import { styled } from '@storybook/theming';
import { styles, IntegrationsCarousel, AspectRatio } from '@storybook/components-marketing';
import { motion, useInView } from 'framer-motion';

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

const PublishIntegrationsWrapper = styled.div`
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

export const PublishIntegrations = React.forwardRef(({ isInView }, ref) => {
  return (
    <PublishIntegrationsWrapper ref={ref}>
      <Storybook />
      {isInView && <TimeFramePicker layoutId="TimeFramePicker" transition={{ duration: 0.8 }} />}
    </PublishIntegrationsWrapper>
  );
});
