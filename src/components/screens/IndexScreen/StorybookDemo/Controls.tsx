import React from 'react';
import { AnimationControls, motion, MotionProps, MotionValue } from 'framer-motion';
import { styled } from '@storybook/theming';

const ControlsWrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  clip-path: polygon(20% 50%, 100% 50%, 100% 92%, 20% 92%);
`;

const Instance = styled(motion.img)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;

const StartTime = styled(motion.svg)`
  position: absolute;
  font-size: 11px;
  top: 79.7%;
  left: 81.7%;
  width: 13.6%;
  height: auto;
`;

const EndTime = styled(motion.svg)`
  position: absolute;
  font-size: 11px;
  top: 86.7%;
  left: 81.7%;
  width: 13.6%;
  height: auto;
`;

interface ControlsProps extends MotionProps {
  startTimeControls: AnimationControls;
  endTimeControls: AnimationControls;
}

const charVariants = {
  initial: { opacity: 0 },
  visible: (i) => ({
    opacity: 1,
    transition: {
      duration: 0,
      delay: 1.4 + i * 0.15,
    },
  }),
};

const bgVariants = { initial: { opacity: 0 }, visible: { opacity: 1 } };

export const Controls = ({ startTimeControls, endTimeControls, ...props }: ControlsProps) => {
  return (
    <ControlsWrapper {...props}>
      <Instance src="/images/develop/time-frame-controls.svg" alt="" />
      <StartTime viewBox="0 0 140 24" xmlns="http://www.w3.org/2000/svg">
        <motion.rect
          x="2"
          y="2"
          width="120"
          height="20"
          fill="#fff"
          initial="initial"
          animate={startTimeControls}
          variants={bgVariants}
          transition={{ duration: 0.1, delay: 0.4 }}
        />
        <text x="8" y="16">
          {'07:30'.split('').map((v, index) => (
            <motion.tspan
              // eslint-disable-next-line react/no-array-index-key
              key={`${v}-${index}`}
              custom={index}
              initial="initial"
              animate={startTimeControls}
              variants={charVariants}
            >
              {v}
            </motion.tspan>
          ))}
        </text>
      </StartTime>
      <EndTime
        viewBox="0 0 140 24"
        xmlns="http://www.w3.org/2000/svg"
        initial="initial"
        animate={endTimeControls}
        variants={bgVariants}
        transition={{ duration: 0.1, delay: 0.4 }}
      >
        <rect x="2" y="2" width="120" height="20" fill="#fff" />
        <text x="8" y="16">
          {'16:30'.split('').map((v, index) => (
            <motion.tspan
              // eslint-disable-next-line react/no-array-index-key
              key={`${v}-${index}`}
              custom={index}
              initial="initial"
              animate={endTimeControls}
              variants={charVariants}
            >
              {v}
            </motion.tspan>
          ))}
        </text>
      </EndTime>
    </ControlsWrapper>
  );
};
