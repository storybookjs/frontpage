import React, { useEffect, useRef, useState } from 'react';
import { styled } from '@storybook/theming';
import { styles } from '@storybook/components-marketing';
import {
  motion,
  MotionValue,
  useAnimationControls,
  AnimationControls,
  useInView,
} from 'framer-motion';
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
  z-index: 2;
`;

const Wrapper = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 69.10907577%;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    border-radius: 8px;

    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 10px 20px 0px rgba(0, 0, 0, 0.1),
      0px 20px 40px 0px rgba(0, 0, 0, 0.05), 0px 40px 30px 0px rgba(0, 0, 0, 0.05);
  }

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
  z-index: 2;
  top: 100%;
  left: 50%;
`;

const click = async (controls: AnimationControls, callback: () => void) => {
  return Promise.all([
    new Promise((res) => setTimeout(res, 440)).then(callback),
    controls.start({
      scale: [1, 0.9, 1],
      transition: { type: 'spring', stiffness: 700, damping: 80, duration: 0.3, delay: 0.4 },
    }),
  ]);
};

export const HeroDemo = ({ ...props }: HeroDemoProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5 });

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
        y: '-402%',
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
        x: '-700%',
        y: '-368%',
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
        x: '560%',
        y: '-214%',
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
        x: '580%',
        y: '-148%',
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
        x: '-720%',
        y: '-470%',
        transition: { delay: 1, duration: 1, opacity: { duration: 0.2 } },
      });
      await click(pointerControls, () => {
        setActiveStory('overview');
      });

      // Reset state
      await pointerControls.start({
        x: '-730%',
        y: '-436%',
        transition: {
          delay: 2,
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
          transition: { delay: 1, duration: 1 },
        }),
        endTimeControls.set('initial'),
        startTimeControls.set('initial'),
      ]);

      if (inView) {
        sequence();
      }
    };

    const stop = async () => {
      // Reset state
      setActiveStory('no-selection');
      pointerControls.set({ x: '0%', y: '0%', opacity: 0 });
      endTimeControls.set('initial');
      startTimeControls.set('initial');
      // stop animations
      pointerControls.stop();
      startTimeControls.stop();
      endTimeControls.stop();
    };

    if (inView) {
      sequence();
    } else {
      stop();
    }
  }, [pointerControls, startTimeControls, endTimeControls, inView]);

  return (
    <Wrapper data-chromatic="ignore" ref={ref} {...props}>
      <Frame src="images/develop/storybook-frame.svg" width="1201" height="830" alt="" />
      <Sidebar type="timeFrame" activeStory={activeStory} />
      <Controls startTimeControls={startTimeControls} endTimeControls={endTimeControls} />
      <TimeFrame activeStory={activeStory} />
      <Pointer
        data-chromatic="ignore"
        animate={pointerControls}
        src="images/develop/pointer.svg"
        alt=""
      />
    </Wrapper>
  );
};
