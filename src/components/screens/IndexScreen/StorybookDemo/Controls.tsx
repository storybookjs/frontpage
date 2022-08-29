import React from 'react';
import { motion, MotionProps, MotionValue } from 'framer-motion';
import { styled } from '@storybook/theming';

const AddonsWrapper = styled(motion.div)`
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
  height: 100%;
`;

interface AddonsProps extends MotionProps {
  activePanel: string;
  scrollProgress: MotionValue;
}

export const Controls = ({ scrollProgress, activePanel, ...props }: AddonsProps) => {
  return (
    <AddonsWrapper {...props}>
      <Instance src="images/develop/time-frame-controls.svg" alt="" />
    </AddonsWrapper>
  );
};
