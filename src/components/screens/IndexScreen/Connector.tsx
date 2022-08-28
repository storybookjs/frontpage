import React from 'react';
import { styled } from '@storybook/theming';
import { motion, MotionValue, useTransform } from 'framer-motion';

const SVG = styled(motion.svg)`
  display: block;
`;

interface ConnectorProps {
  name: string;
  progress: MotionValue;
}

export const Connector = ({ name, progress, ...props }: ConnectorProps) => {
  const pathLength = useTransform(progress, [0, 0.75], [0, 1], { clamp: true });
  const scale = useTransform(progress, [0.75, 1], [0, 1], { clamp: true });

  return (
    <SVG
      width="263"
      height="145"
      viewBox="0 0 263 145"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <motion.circle cx="256" cy="140" r="5" fill="#1EA7FD" style={{ scale }} />
      <path
        mask={`url(#${name}-connector-mask)`}
        d="M252.5 134.5C195.5 53.001 98.4998 0.999337 10.0003 0.999647"
        stroke="#1EA7FD"
        strokeWidth="2"
        strokeDasharray="6 4"
      />
      <defs>
        <mask id={`${name}-connector-mask`} maskUnits="userSpaceOnUse">
          <motion.path
            d="M10.0003,0.999647C98.4998,0.999337 195.5,53.001 252.5,134.5"
            stroke="#fff"
            strokeWidth="4"
            strokeDasharray="0 1"
            style={{ pathLength }}
          />
        </mask>
      </defs>
    </SVG>
  );
};
