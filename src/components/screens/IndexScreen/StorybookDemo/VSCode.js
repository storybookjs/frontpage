/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/self-closing-comp */
import React from 'react';
import { styled } from '@storybook/theming';
import { motion, useTransform } from 'framer-motion';

const Img = styled(motion.img)`
  display: block;
  width: 101%;
  height: auto;
  position: absolute;
  top: -5%;
  left: 50%;
`;

const Clip = styled(motion.div)`
  background: #232a35;
  position: absolute;
  top: 6%;
  left: 79%;
  width: 50%;
  height: 91%;
`;

export const VSCode = ({ scrollProgress }) => {
  const x = useTransform(scrollProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollProgress, [0, 0.5, 1], [1, 1, 0]);

  return (
    <>
      <Img src="images/develop/vscode.svg" width="1280" height="993" style={{ x, opacity }} />
      <Clip
        style={{ transformOrigin: 'center bottom', x, opacity }}
        initial={{ scaleY: 1 }}
        whileInView={{ scaleY: 0 }}
        viewport={{ amount: 'some' }}
        transition={{ duration: 0.5 }}
      />
    </>
  );
};
