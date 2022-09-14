import React from 'react';
import { styled } from '@storybook/theming';
import { motion, useTransform, MotionValue } from 'framer-motion';

const Img = styled(motion.img)`
  display: block;
  width: 84%;
  height: auto;
  position: absolute;
  z-index: 2;
  top: -2%;
  left: 100%;
`;

interface AppProps {
  scrollProgress: MotionValue;
}

export const App = ({ scrollProgress }: AppProps) => {
  const x = useTransform(scrollProgress, [0, 1], ['0%', '-109%']);
  const opacity = useTransform(scrollProgress, [0, 0.5, 1], [0, 1, 1]);

  return <Img src="images/develop/app.svg" width="1280" height="1000" style={{ x, opacity }} />;
};
