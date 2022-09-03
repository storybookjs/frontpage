import React from 'react';
import { motion, AnimatePresence, MotionProps } from 'framer-motion';
import { styled } from '@storybook/theming';

const SidebarWrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
`;

const Instance = styled(motion.img)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
`;

interface SidebarProps extends MotionProps {
  type: 'rangeSlider' | 'timeFrame';
  activeStory: string;
}

const rangeSliderStories = ['default', 'input-range', 'no-selection'];
const timeFrameStories = ['all-day', 'last-hour', 'no-selection', 'overview'];

export const Sidebar = ({ activeStory, type = 'rangeSlider', ...props }: SidebarProps) => {
  const modifyingControls = ['start-time', 'end-time'].includes(activeStory);
  const storyID = modifyingControls ? 'all-day' : activeStory;

  return (
    <SidebarWrapper {...props}>
      {type === 'rangeSlider' &&
        rangeSliderStories.map((id) => (
          <Instance
            key={id}
            src={`images/develop/sidebar-rs-${id}.svg`}
            alt=""
            animate={{ opacity: storyID === id ? 1 : 0 }}
            transition={{ duration: 0.1 }}
          />
        ))}
      {type === 'timeFrame' &&
        timeFrameStories.map((id) => (
          <Instance
            key={id}
            src={`images/develop/sidebar-tf-${id}.svg`}
            alt=""
            animate={{ opacity: storyID === id ? 1 : 0 }}
            transition={{ duration: 0.1 }}
          />
        ))}
    </SidebarWrapper>
  );
};
