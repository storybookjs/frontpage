import React from 'react';
import PropTypes from 'prop-types';
import { css, styled } from '@storybook/theming';
import { AspectRatio, styles } from '@storybook/components-marketing';
import { motion } from 'framer-motion';

const { breakpoints } = styles;

const AvatarWrapper = styled(motion(AspectRatio))`
  width: 28%;
  position: absolute;
  left: ${(props) => props.x};
  top: ${(props) => props.y};

  @media (min-width: ${breakpoints[1]}px) {
    width: 20%;
  }

  @media (min-width: ${breakpoints[3]}px) {
    width: 14%;
  }
`;
AvatarWrapper.propTypes = { x: PropTypes.string.isRequired, y: PropTypes.string.isRequired };

const Avatar = styled.img`
  border: 2px solid #fff;
  border-radius: 50%;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.15);
  display: block;
  width: 28%;
  height: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Wave = styled(motion.div)`
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;

  ${(props) =>
    props.size === 'small' &&
    css`
      width: 28%;
      height: 28%;
      opacity: 0.3;
    `}

  ${(props) =>
    props.size === 'medium' &&
    css`
      width: 60%;
      height: 60%;
      opacity: 0.3;
    `}

    ${(props) =>
    props.size === 'big' &&
    css`
      width: 100%;
      height: 100%;
      opacity: 0.1;
    `}

  ${(props) =>
    props.color === 'purple' &&
    css`
      background: radial-gradient(100% 100% at 50% 50%, rgba(111, 44, 172, 0) 0%, #6f2cac 100%);
    `}
  ${(props) =>
    props.color === 'yellow' &&
    css`
      background: radial-gradient(100% 100% at 50% 50%, rgba(255, 174, 0, 0) 0%, #ffae00 100%);
    `}
  ${(props) =>
    props.color === 'red' &&
    css`
      background: radial-gradient(
        100% 100% at 50% 50%,
        rgba(255, 71, 133, 0.0001) 0%,
        #ff4785 100%
      );
    `}
  ${(props) =>
    props.color === 'blue' &&
    css`
      background: radial-gradient(
        100% 100% at 50% 50%,
        rgba(30, 167, 253, 0.0001) 0%,
        #1ea7fd 100%
      );
    `}
`;

const players = {
  blue: 'images/home/avatar-1.png',
  red: 'images/home/avatar-2.png',
  yellow: 'images/home/avatar-3.png',
  purple: 'images/home/avatar-4.png',
};

const transition = (delay, count = 4) => ({
  ease: 'linear',
  repeat: count,
  repeatType: 'loop',
  duration: 0.3,
  delay: delay + 0.4,
  repeatDelay: 0,
});

export const Player = ({ x, y, type, delay, count }) => (
  <AvatarWrapper
    ratio={`${1} / ${1}`}
    x={x}
    y={y}
    variants={{
      initial: { scale: 0, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
    }}
    initial="initial"
    whileInView="animate"
    viewport={{ once: true }}
    transition={{ type: 'pop', delay, duration: 0.4 }}
  >
    <Wave
      color={type}
      size="big"
      style={{ x: '-50%', y: '-50%' }}
      variants={{
        initial: { opacity: 0.1 },
        animate: { opacity: 0 },
      }}
      transition={transition(delay, count)}
    />
    <Wave
      color={type}
      size="medium"
      style={{ x: '-50%', y: '-50%' }}
      variants={{
        initial: { scale: 1, opacity: 0.3 },
        animate: { scale: 1.66666667, opacity: 0.1 },
      }}
      transition={transition(delay, count)}
    />
    <Wave
      color={type}
      size="small"
      style={{ x: '-50%', y: '-50%' }}
      variants={{
        initial: { scale: 1, opacity: 0 },
        animate: { scale: 2.14285714, opacity: 0.3 },
      }}
      transition={transition(delay, count)}
    />
    <Avatar src={players[type]} />
  </AvatarWrapper>
);

Player.propTypes = {
  x: PropTypes.string.isRequired,
  y: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['blue', 'red', 'yellow', 'purple']).isRequired,
};
