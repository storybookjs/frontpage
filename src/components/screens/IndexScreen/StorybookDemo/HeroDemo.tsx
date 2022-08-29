import React, { useEffect, useState } from 'react';
import { styled } from '@storybook/theming';
import { styles } from '@storybook/components-marketing';
import { motion, MotionValue, useAnimationControls, AnimationControls } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { Controls } from './Controls';
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
  overflow: hidden;

  @media (min-width: ${breakpoints[1]}px) {
    margin-top: -12.625rem;
  }
`;

interface HeroDemoProps {
  isolationProgress: MotionValue;
  addonsProgress: MotionValue;
  dropInProgress: MotionValue;
  storyIndex: MotionValue;
  panelIndex: MotionValue;
}

const Pointer = styled(motion.img)`
  display: block;
  width: 5.66%;
  height: auto;
  position: absolute;
  top: 100%;
  left: 50%;
`;

const click = async (controls: AnimationControls, callback: () => void) => {
  return Promise.all([
    new Promise((res) => setTimeout(res, 525)).then(callback),
    controls.start({
      scale: [1, 0.9, 1],
      transition: { type: 'spring', stiffness: 700, damping: 80, duration: 0.3, delay: 0.4 },
    }),
  ]);
};

export const HeroDemo = ({ ...props }: HeroDemoProps) => {
  const [activeStory, setActiveStory] = useState('no-selection');

  const pointerControls = useAnimationControls();
  const startTimeControls = useAnimationControls();
  const endTimeControls = useAnimationControls();

  useEffect(() => {
    const sequence = async () => {
      // Cycle through stories
      await pointerControls.start({
        opacity: [0, 1],
        x: '-730%',
        y: '-466%',
        transition: {
          delay: 1,
          duration: 1,
          opacity: { duration: 0.4 },
        },
      });
      await click(pointerControls, () => {
        setActiveStory('last-hour');
      });
      await pointerControls.start({
        y: '-434%',
        transition: {
          delay: 1,
          duration: 0.4,
        },
      });
      await click(pointerControls, () => {
        setActiveStory('all-day');
      });
      // Update startTime control
      await pointerControls.start({
        x: '520%',
        y: '-294%',
        transition: { delay: 1, duration: 1 },
      });
      await Promise.all([
        pointerControls.start({
          scale: 0.9,
          opacity: 0,
          transition: {
            scale: {
              type: 'spring',
              stiffness: 700,
              damping: 80,
              duration: 0.4,
              delay: 0.4,
            },
            opacity: { delay: 0.4, duration: 0.1 },
          },
        }),
        startTimeControls.start('visible'),
      ]);
      setActiveStory('start-time');
      // Update endTime control
      await pointerControls.start({
        opacity: 1,
        x: '520%',
        y: '-220%',
        transition: { delay: 1, duration: 1, opacity: { duration: 0.2 } },
      });
      await Promise.all([
        pointerControls.start({
          scale: 0.9,
          opacity: 0,
          transition: {
            scale: {
              type: 'spring',
              stiffness: 700,
              damping: 80,
              duration: 0.4,
              delay: 0.4,
            },
            opacity: { delay: 0.4, duration: 0.1 },
          },
        }),
        endTimeControls.start('visible'),
      ]);
      setActiveStory('end-time');

      // Show docs
      await pointerControls.start({
        opacity: 1,
        x: '-730%',
        y: '-532%',
        transition: { delay: 1, duration: 1, opacity: { duration: 0.2 } },
      });
      await click(pointerControls, () => {
        setActiveStory('overview');
      });

      // Reset state
      await pointerControls.start({
        x: '-730%',
        y: '-498%',
        transition: {
          delay: 1,
          duration: 1,
        },
      });
      await click(pointerControls, () => {
        setActiveStory('no-selection');
      });
      await Promise.all([
        pointerControls.start({
          x: '0%',
          y: '0%',
          opacity: 0,
          transition: { delay: 1, duration: 1, opacity: { duration: 0.4 } },
        }),
        endTimeControls.start('initial'),
        startTimeControls.start('initial'),
      ]);
    };

    sequence();
  }, [pointerControls, startTimeControls, endTimeControls]);

  return (
    <Wrapper {...props}>
      <Frame src="images/develop/storybook-frame.svg" alt="" />
      <Sidebar type="timeFrame" activeStory={activeStory} />
      <Controls startTimeControls={startTimeControls} endTimeControls={endTimeControls} />
      <TimeFrame activeStory={activeStory} />
      <Pointer
        animate={pointerControls}
        src="images/develop/pointer.svg"
        alt=""
        width="68"
        height="74"
      />
    </Wrapper>
  );
};
