import React, { useEffect, useState } from 'react';
import { styled } from '@storybook/theming';
import { styles } from '@storybook/components-marketing';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { Controls } from './Controls';
import { useMediaQuery } from '../../../lib/useMediaQuery';
import { TimeFrame } from './TimeFrame';

const { breakpoints } = styles;

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
  z-index: 999;
`;

const Scrim = styled(motion.div)`
  position: absolute;
  height: 135%;
  top: -25%;
  left: 0;
  right: 0;
  background: linear-gradient(0deg, rgba(23, 28, 35, 0%) 0%, rgba(23, 28, 35, 100%) 10%);
`;

interface HeroDemoProps {
  isolationProgress: MotionValue;
  addonsProgress: MotionValue;
  dropInProgress: MotionValue;
  storyIndex: MotionValue;
  panelIndex: MotionValue;
}

const timeFrame = {
  stories: ['no-selection', 'last-hour', 'all-day'],
  addons: ['controls', 'interactions', 'design', 'a11y', 'controls'],
};

export const HeroDemo = ({
  isolationProgress,
  addonsProgress,
  dropInProgress,
  storyIndex,
  panelIndex,
  ...props
}: HeroDemoProps) => {
  const [activeStory, setActiveStory] = useState('no-selection');
  const [activePanel, setActivePanel] = useState('controls');

  useEffect(() => {
    function updateId() {
      setActiveStory(timeFrame.stories[storyIndex.get()]);
    }
    const unsubscribeStoryIndex = storyIndex.onChange(updateId);

    function updatePanel() {
      setActivePanel(timeFrame.addons[panelIndex.get()]);
    }
    const unsubscribePanel = panelIndex.onChange(updatePanel);

    return () => {
      unsubscribeStoryIndex();
      unsubscribePanel();
    };
  }, []);

  const zoom = useTransform(
    [isolationProgress, dropInProgress],
    ([latestIsolationProgress, latestDropInProgress]: number[]) =>
      latestIsolationProgress - latestDropInProgress
  );

  const [stacked] = useMediaQuery(`(min-width: ${breakpoints[2]}px)`);

  const scale = useTransform(zoom, [0, 1], [1, stacked ? 1.5 : 1.25], { clamp: true });
  const x = useTransform(zoom, [0, 1], ['0%', stacked ? '25%' : '12.5%'], { clamp: true });
  const y = useTransform(zoom, [0, 1], ['0%', stacked ? '25.5%' : '12.5%'], { clamp: true });

  return (
    <Wrapper style={{ scale, x, y }} transition={{ delay: 0.4 }} {...props}>
      <Frame src="images/develop/storybook-frame.svg" alt="" />
      <Sidebar type="timeFrame" activeStory={activeStory} />
      <Controls scrollProgress={addonsProgress} activePanel={activePanel} />
      <TimeFrame activeStory={activeStory} />
    </Wrapper>
  );
};
