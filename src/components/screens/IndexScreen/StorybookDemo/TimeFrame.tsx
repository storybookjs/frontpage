import React from 'react';
import { styled } from '@storybook/theming';
import { motion } from 'framer-motion';

const TimeFrameWrapper = styled(motion.div)`
  position: absolute;
  width: 41.415%;
  height: 0;
  padding-bottom: 22.1121663%;
  top: 17%;
  left: 39.5%;
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

const Overview = styled(motion.img)`
  display: block;
  position: absolute;
  top: 4%;
  left: 20.9%;
  width: 78.9%;
  border-radius: 4px;
`;

const stories = ['no-selection', 'all-day', 'last-hour', 'start-time', 'end-time'];

export const TimeFrame = ({ activeStory }: TimeFrameProps) => {
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
            initial={false}
            animate={{ opacity: activeStory === id ? 1 : 0 }}
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
