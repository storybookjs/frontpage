import React from 'react';
import { motion, AnimatePresence, MotionProps } from 'framer-motion';
import { styled } from '@storybook/theming';

const SidebarWrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
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

export const Sidebar = ({ activeStory, type = 'rangeSlider', ...props }: SidebarProps) => {
  return (
    <SidebarWrapper {...props}>
      {type === 'rangeSlider' && (
        <AnimatePresence initial={false}>
          <Instance key={activeStory} src={`images/develop/sidebar-rs-${activeStory}.svg`} alt="" />
        </AnimatePresence>
      )}
      {type === 'timeFrame' && (
        <>
          <Instance key={activeStory} src={`images/develop/sidebar-tf-${activeStory}.svg`} alt="" />
          {/* <Instance
            src="images/develop/sidebar-tf-overview.svg"
            style={{ opacity: tfOverviewOpacity }}
          />
          <Instance
            src="images/develop/sidebar-tf-no-selection.svg"
            style={{ opacity: tfNoSelectionOpacity }}
          />
          <Instance
            src="images/develop/sidebar-tf-afternoon.svg"
            style={{ opacity: tfAfternoonOpacity }}
          />
          <Instance
            src="images/develop/sidebar-tm-all-day.svg"
            style={{ opacity: tfAllDayOpacity }}
          /> */}
        </>
      )}
    </SidebarWrapper>
  );
};