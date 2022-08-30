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

const Overview = styled(motion.img)`
  display: block;
  position: absolute;
  top: 5.8%;
  left: 22.8%;
  width: 73.8%;
  border-radius: 4px;
`;

export const TimeFrame = ({ activeStory, ...props }: TimeFrameProps) => {
  const modifyingControls = ['start-time', 'end-time'].includes(activeStory);

  return activeStory === 'overview' ? (
    <Overview
      src="images/develop/time-frame-overview.svg"
      alt=""
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
    />
  ) : (
    <TimeFrameWrapper {...props}>
      <AnimatePresence initial={false} custom={modifyingControls}>
        <TimeFrameVariant
          key={activeStory}
          src={`images/develop/time-frame-${activeStory}.svg`}
          alt=""
          width="370"
          height="303"
          custom={modifyingControls}
          initial="initial"
          animate="animate"
          variants={variants}
          transition={{ duration: 0.4 }}
        />
      </AnimatePresence>
    </TimeFrameWrapper>
  );
};
