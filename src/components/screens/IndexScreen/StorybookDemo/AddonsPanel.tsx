import React from 'react';
import { motion, MotionProps, MotionValue, useTransform } from 'framer-motion';
import { styled } from '@storybook/theming';

const AddonsWrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  clip-path: polygon(20% 50%, 100% 50%, 100% 100%, 20% 100%);
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

const panels = ['a11y', 'controls', 'design', 'interactions'];

export const AddonsPanel = ({ scrollProgress, activePanel, ...props }: AddonsProps) => {
  const y = useTransform(scrollProgress, [0, 0.15], ['100%', '0%'], { clamp: true });

  return (
    <AddonsWrapper {...props}>
      {panels.map((id) => (
        <Instance
          key={id}
          src={`images/develop/addons-${id}.svg`}
          alt=""
          animate={{ opacity: id === activePanel ? 1 : 0 }}
          style={{ y }}
          transition={{ duration: 0.1 }}
        />
      ))}
    </AddonsWrapper>
  );
};
