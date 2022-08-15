import React from 'react';
import { styled } from '@storybook/theming';
import { Link } from '@storybook/design-system';
import { motion } from 'framer-motion';
import { styles, FeatureStep, StepIcon } from '@storybook/components-marketing';
import GitlabLogoSVG from '../../../../images/logos/user/logo-gitlab.svg';

const { color, marketing, breakpoints, pageMargins } = styles;

const Wrapper = styled.div`
  position: relative;
  margin-top: 3rem;
  margin-left: auto;
  margin-right: auto;
  max-width: 400px;

  @media (min-width: ${breakpoints[1]}px) {
    margin-top: 5rem;
  }
`;

const CalendarComponent = styled(motion.img)`
  display: block;
  width: 100%;
`;

const Status = styled(motion.div)`
  display: block;
  position: absolute;
  width: 32px;
  height: 32px;
  top: -16px;
  right: -16px;
  perspective: 1000px;
  transform-style: preserve-3d;
`;

const PublishingImg = styled.img`
  transform: rotateY(0deg);
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
`;
const PublishedImg = styled.img`
  transform: rotateY(180deg);
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
const Arrow = styled.img`
  position: absolute;
  width: 40px;
  height: 40px;
  left: -36px;
  bottom: -8px;
`;

const calendarVariants = {
  initial: { opacity: 0.5, filter: 'grayscale(100%)' },
  animate: { opacity: 1, filter: 'grayscale(0%)' },
};

const statusVariants = {
  spin: { rotate: 720, transition: { delay: 1, duration: 1 } },
  animate: { rotateY: 180, transition: { delay: 3, duration: 1 } },
};

export function Publish({ docs, ...props }) {
  return (
    <Wrapper {...props}>
      <CalendarComponent
        src="images/home/automate/datepicker-compact-week.svg"
        alt=""
        variants={calendarVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 'all' }}
        transition={{ duration: 1, delay: 1 }}
      />
      <Status
        variants={statusVariants}
        whileInView={['spin', 'animate']}
        viewport={{ once: true, amount: 'all' }}
      >
        <PublishingImg src="images/home/automate/status-publishing.svg" alt="" />
        <PublishedImg src="images/home/automate/status-published.svg" alt="" />
      </Status>
      <Arrow src="images/home/automate/arrow.svg" alt="" />
    </Wrapper>
  );
}
