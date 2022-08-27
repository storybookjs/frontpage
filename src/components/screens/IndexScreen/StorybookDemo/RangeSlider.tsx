import React from 'react';
import { styled } from '@storybook/theming';
import { motion, AnimatePresence } from 'framer-motion';

const RangeSliderWrapper = styled(motion.div)`
  position: absolute;
  /* width: 32%; */
  width: 26.23762376%;
  top: 12%;
  left: 24%;
`;

const RangeSliderVariant = styled(motion.img)`
  display: block;
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  left: 0;
`;
RangeSliderVariant.defaultProps = {
  width: '370',
  height: '303',
};

interface RangeSliderProps {
  activeStory: string;
}

export const RangeSlider = ({ activeStory, ...props }) => {
  return (
    <RangeSliderWrapper
      whileInView={{
        opacity: [0, 0.5, 1],
        filter: ['grayscale(100%)', 'grayscale(100%)', 'grayscale(0%)'],
      }}
      viewport={{ amount: 'some' }}
      {...props}
    >
      <AnimatePresence initial={false}>
        <RangeSliderVariant
          key={activeStory}
          src={`images/develop/range-slider-${activeStory}.svg`}
          alt=""
        />
      </AnimatePresence>
    </RangeSliderWrapper>
  );
};
