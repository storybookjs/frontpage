import React from 'react';
import { styled } from '@storybook/theming';
import { styles } from '@storybook/components-marketing';
import { motion, useTransform } from 'framer-motion';

const { breakpoints } = styles;

const Img = styled(motion.img)`
  display: block;
  height: auto;
  position: absolute;
  width: 97.2%;
  top: -2.2%;
  left: 50%;

  @media (min-width: ${breakpoints[2]}px) {
    width: 101%;
    top: -5%;
  }
`;

const Clip = styled(motion.div)`
  background: #232a35;
  position: absolute;
  top: 9%;
  left: 75%;
  width: 50%;
  height: 89.9%;

  @media (min-width: ${breakpoints[2]}px) {
    top: 5%;
    left: 76%;
    width: 60%;
    height: 96.1%;
  }
`;

export const VSCode = ({ scrollProgress, appearProgress }) => {
  const x = useTransform(scrollProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollProgress, [0, 0.5, 1], [1, 1, 0]);
  const scaleY = useTransform(appearProgress, [0, 1], [1, 0]);

  return (
    <>
      <Img src="images/develop/vscode.svg" width="1280" height="993" style={{ x, opacity }} />
      <Clip style={{ transformOrigin: 'center bottom', x, opacity, scaleY }} />
    </>
  );
};
