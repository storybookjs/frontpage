import React from 'react';
import { motion, AnimatePresence, MotionProps, MotionValue, useTransform } from 'framer-motion';
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

export const AddonsPanel = ({ scrollProgress, activePanel, ...props }: AddonsProps) => {
  const y = useTransform(scrollProgress, [0, 0.85, 1], ['100%', '100%', '0%'], { clamp: true });

  return (
    <AddonsWrapper {...props}>
      <AnimatePresence initial={false}>
        <Instance
          key={activePanel}
          src={`images/develop/addons-${activePanel}.svg`}
          alt=""
          style={{ y }}
        />
      </AnimatePresence>
    </AddonsWrapper>
  );
};
