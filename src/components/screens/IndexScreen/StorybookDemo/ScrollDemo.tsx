import React, { useEffect, useState } from 'react';
import { styled } from '@storybook/theming';
import { styles } from '@storybook/components-marketing';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { AddonsPanel } from './AddonsPanel';
import { RangeSlider } from './RangeSlider';
import { VSCode } from './VSCode';
import { App } from './App';
import { Connector } from '../Connector';
import { useMediaQuery } from '../../../lib/useMediaQuery';

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
  padding-bottom: 69.10907577%;
`;

const Scrim = styled(motion.div)`
  position: absolute;
  height: 75vh;
  top: -35vh;
  left: 0;
  right: 0;
  background: linear-gradient(0deg, rgba(14, 12, 42, 0%) 0%, rgba(14, 12, 42, 100%) 10%);
  pointer-events: none;
  user-select: none;
`;

interface ScrollDemoProps {
  appearProgress: MotionValue;
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

const StyledConnector = styled(Connector)`
  width: 24%;
  height: auto;
  position: absolute;
  top: 20%;
  left: 17.8%;
  transform: rotate(-56deg);
  z-index: 2;
`;

export const ScrollDemo = ({
  appearProgress,
  isolationProgress,
  addonsProgress,
  dropInProgress,
  storyIndex,
  panelIndex,
  ...props
}: ScrollDemoProps) => {
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

  const zoom = useTransform(
    [isolationProgress, dropInProgress],
    ([latestIsolationProgress, latestDropInProgress]: number[]) =>
      latestIsolationProgress - latestDropInProgress
  );

  const [stacked] = useMediaQuery(`(min-width: ${breakpoints[2]}px)`);

  const scale = useTransform(zoom, [0, 1], [1, stacked ? 1.25 : 1], { clamp: true });
  const x = useTransform(zoom, [0, 1], ['0%', stacked ? '12.5%' : '0%'], { clamp: true });
  const scrimY = useTransform(zoom, [0, 1], ['0%', '-5%'], { clamp: true });
  const scrimOpacity = useTransform(isolationProgress, [0, 0.25], [0, 1], { clamp: true });

  const frameScale = useTransform(dropInProgress, [0, 1], [1, 0], { clamp: true });
  const frameOpacity = useTransform(dropInProgress, [0, 1], [1, 0.25], { clamp: true });

  const connectorProgress = useTransform(dropInProgress, [0.75, 1], [0, 1], { clamp: true });

  return (
    <Wrapper style={{ scale, x }} transition={{ delay: 0.4 }} {...props}>
      <Scrim style={{ y: scrimY, opacity: scrimOpacity }} />
      <Frame
        src="/images/develop/storybook-frame.svg"
        alt=""
        style={{
          scale: frameScale,
          opacity: frameOpacity,
        }}
      />
      <Sidebar
        type="rangeSlider"
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
      <App scrollProgress={dropInProgress} />
      <StyledConnector name="rs-to-app" progress={connectorProgress} />
      <RangeSlider
        activeStory={activeStory}
        scrollProgress={dropInProgress}
        appearProgress={appearProgress}
      />
      <VSCode appearProgress={appearProgress} scrollProgress={isolationProgress} />
    </Wrapper>
  );
};
