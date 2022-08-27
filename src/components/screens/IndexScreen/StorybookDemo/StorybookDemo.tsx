import React, { useEffect, useState } from 'react';
import { styled } from '@storybook/theming';
import { motion, MotionConfig, MotionValue, useTransform } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { AddonsPanel } from './AddonsPanel';
import { RangeSlider } from './RangeSlider';
import { VSCode } from './VSCode';

const Frame = styled(motion.img)`
  display: block;
  height: auto;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;

const opacity = {
  defaultStory: [1, 0, 0, 1],
  noSelectionStory: [0, 1, 0, 0],
  inputRangeStory: [0, 0, 1, 0],
};

const Wrapper = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 71.81889149%;
  overflow: hidden;
`;

interface StorybookDemoProps {
  type: 'rangeSlider' | 'timeFrame';
  isolationProgress: MotionValue;
  addonsProgress: MotionValue;
  storyIndex: MotionValue;
  panelIndex: MotionValue;
}

export const StorybookDemo = ({
  type = 'rangeSlider',
  isolationProgress,
  addonsProgress,
  storyIndex,
  panelIndex,
  ...props
}: StorybookDemoProps) => {
  const [activeStory, setActiveStory] = useState('default');
  const [activePanel, setActivePanel] = useState('controls');

  useEffect(() => {
    function updateId() {
      setActiveStory(['default', 'no-selection', 'input-range', 'default'][storyIndex.get()]);
    }
    const unsubscribeStoryIndex = storyIndex.onChange(updateId);

    function updatePanel() {
      setActivePanel(['controls', 'interactions', 'design', 'a11y', 'controls'][panelIndex.get()]);
    }
    const unsubscribePanel = panelIndex.onChange(updatePanel);

    return () => {
      unsubscribeStoryIndex();
      unsubscribePanel();
    };
  }, []);

  const scale = useTransform(isolationProgress, [0, 1], [1, 1.5], { clamp: true });
  const x = useTransform(isolationProgress, [0, 1], ['0%', '25%'], { clamp: true });
  const y = useTransform(isolationProgress, [0, 1], ['0%', '25%'], { clamp: true });

  return (
    <Wrapper style={{ scale, x, y, z: isolationProgress }} transition={{ delay: 0.4 }} {...props}>
      <Frame src="images/develop/storybook-frame.svg" />
      <Sidebar type={type} activeStory={activeStory} />
      <AddonsPanel scrollProgress={addonsProgress} activePanel={activePanel} />
      <MotionConfig transition={{ duration: 1 }}>
        <RangeSlider activeStory={activeStory} />
        <VSCode scrollProgress={isolationProgress} />
      </MotionConfig>
    </Wrapper>
  );
};
