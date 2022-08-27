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

const Wrapper = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 71.81889149%;
`;

interface StorybookDemoProps {
  type: 'rangeSlider' | 'timeFrame';
  isolationProgress: MotionValue;
  addonsProgress: MotionValue;
  dropInProgress: MotionValue;
  storyIndex: MotionValue;
  panelIndex: MotionValue;
}

const rangeSlider = {
  stories: ['default', 'no-selection', 'input-range', 'default'],
  addons: ['controls', 'interactions', 'design', 'a11y', 'controls'],
};

export const StorybookDemo = ({
  type = 'rangeSlider',
  isolationProgress,
  addonsProgress,
  dropInProgress,
  storyIndex,
  panelIndex,
  ...props
}: StorybookDemoProps) => {
  const [activeStory, setActiveStory] = useState('default');
  const [activePanel, setActivePanel] = useState('controls');

  useEffect(() => {
    function updateId() {
      setActiveStory(rangeSlider.stories[storyIndex.get()]);
    }
    const unsubscribeStoryIndex = storyIndex.onChange(updateId);

    function updatePanel() {
      setActivePanel(rangeSlider.addons[panelIndex.get()]);
    }
    const unsubscribePanel = panelIndex.onChange(updatePanel);

    return () => {
      unsubscribeStoryIndex();
      unsubscribePanel();
    };
  }, []);

  // const zoom = useTransform(
  //   [isolationProgress, dropInProgress],
  //   ([latestIsolationProgress, latestDropInProgress]: number[]) =>
  //     latestIsolationProgress - latestDropInProgress
  // );

  const scale = useTransform(isolationProgress, [0, 1], [1, 1.5], { clamp: true });
  const x = useTransform(isolationProgress, [0, 1], ['0%', '25%'], { clamp: true });
  const y = useTransform(isolationProgress, [0, 1], ['0%', '25%'], { clamp: true });

  const frameScale = useTransform(dropInProgress, [0, 1], [1, 0], { clamp: true });
  const frameOpacity = useTransform(dropInProgress, [0, 1], [1, 0.25], { clamp: true });

  return (
    <Wrapper style={{ scale, x, y }} transition={{ delay: 0.4 }} {...props}>
      <Frame
        src="images/develop/storybook-frame.svg"
        alt=""
        style={{
          scale: frameScale,
          opacity: frameOpacity,
        }}
      />
      <Sidebar
        type={type}
        activeStory={activeStory}
        style={{
          scale: frameScale,
          opacity: frameOpacity,
        }}
      />
      <AddonsPanel
        scrollProgress={addonsProgress}
        activePanel={activePanel}
        style={{
          scale: frameScale,
          opacity: frameOpacity,
        }}
      />
      <MotionConfig transition={{ duration: 1 }}>
        <RangeSlider activeStory={activeStory} />
        <VSCode scrollProgress={isolationProgress} />
      </MotionConfig>
    </Wrapper>
  );
};
