import React from 'react';
import { styled } from '@storybook/theming';
import { motion, useTransform, MotionValue } from 'framer-motion';

const RangeSliderWrapper = styled(motion.div)`
  position: absolute;
  z-index: 2;
  width: 26.23762376%;
  height: 0;
  padding-bottom: 21.48648648%;
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

const Check = styled(motion.img)`
  width: 10%;
  height: auto;
  display: block;
  position: absolute;
  top: -3%;
  right: -1%;
`;

interface RangeSliderProps {
  activeStory: string;
  scrollProgress: MotionValue;
  appearProgress: MotionValue;
}

const stories = ['default', 'input-range', 'no-selection'];

export const RangeSlider = ({
  appearProgress,
  scrollProgress,
  activeStory,
  ...props
}: RangeSliderProps) => {
  const x = useTransform(scrollProgress, [0, 1], ['0%', '-91%'], { clamp: true });
  const y = useTransform(scrollProgress, [0, 1], ['0%', '31%'], { clamp: true });

  const check = useTransform(scrollProgress, [0, 0.5, 1], [0, 0, 1], { clamp: true });

  const filter = useTransform(
    appearProgress,
    [0, 0.5, 1],
    ['grayscale(100%)', 'grayscale(100%)', 'grayscale(0%)'],
    { clamp: true }
  );

  return (
    <RangeSliderWrapper style={{ x, y, opacity: appearProgress, filter }} {...props}>
      {stories.map((id) => (
        <RangeSliderVariant
          key={id}
          src={`images/develop/range-slider-${id}.svg`}
          alt=""
          width="370"
          height="303"
          animate={{ opacity: activeStory === id ? 1 : 0 }}
          transition={{ duration: 0.1 }}
        />
      ))}
      <Check
        src="images/home/automate/ci-check-green.svg"
        alt=""
        style={{ scale: check, opacity: check }}
      />
    </RangeSliderWrapper>
  );
};
