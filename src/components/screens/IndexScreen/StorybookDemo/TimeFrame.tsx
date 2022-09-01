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

const stories = ['no-selection', 'all-day', 'last-hour', 'start-time', 'end-time'];

export const TimeFrame = ({ activeStory, ...props }: TimeFrameProps) => {
  const modifyingControls = ['start-time', 'end-time'].includes(activeStory);

  return (
    <>
      <TimeFrameWrapper>
        {stories.map((id) => (
          <TimeFrameVariant
            key={id}
            src={`images/develop/time-frame-${id}.svg`}
            alt=""
            width="370"
            height="303"
            // custom={modifyingControls}
            initial={false}
            animate={{ opacity: activeStory === id ? 1 : 0 }}
            // variants={variants}
            transition={{ duration: 0.1 }}
          />
        ))}
      </TimeFrameWrapper>
      <Overview
        src="images/develop/time-frame-overview.svg"
        alt=""
        initial={false}
        animate={{ opacity: activeStory === 'overview' ? 1 : 0 }}
        transition={{ duration: 0.1 }}
      />
    </>
  );
};
