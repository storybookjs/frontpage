import React from 'react';
import { styled } from '@storybook/theming';
import { motion, AnimatePresence } from 'framer-motion';

const TimeFrameWrapper = styled(motion.div)`
  position: absolute;
  width: 41.415%;
  height: 0;
  padding-bottom: 22.1121663%;
  top: 16.5%;
  left: 38%;
`;

const TimeFrameVariant = styled(motion.img)`
  display: block;
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  left: 0;
`;
TimeFrameVariant.defaultProps = {
  width: '370',
  height: '303',
};

interface TimeFrameProps {
  activeStory: string;
}

const variants = {
  initial: (controls) => {
    return controls ? { opacity: 0 } : { scale: 0.9, opacity: 0 };
  },
  animate: (controls) => {
    return controls ? { opacity: 1 } : { scale: 1, opacity: 1 };
  },
};

export const TimeFrame = ({ activeStory, ...props }: TimeFrameProps) => {
  return (
    <TimeFrameWrapper {...props}>
      <AnimatePresence initial={false} custom={['start-time', 'end-time'].includes(activeStory)}>
        <TimeFrameVariant
          key={activeStory}
          src={`images/develop/time-frame-${activeStory}.svg`}
          alt=""
          width="370"
          height="303"
          custom={['start-time', 'end-time'].includes(activeStory)}
          initial="initial"
          animate="animate"
          variants={variants}
          transition={{ duration: 0.4 }}
        />
      </AnimatePresence>
    </TimeFrameWrapper>
  );
};
