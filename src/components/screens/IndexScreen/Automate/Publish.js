import React from 'react';
import { styled } from '@storybook/theming';
import { motion } from 'framer-motion';
import { styles } from '@storybook/components-marketing';

const { breakpoints, pageMargins } = styles;

const Figure = styled.figure`
  ${pageMargins};
`;

const Content = styled.div`
  position: relative;
  margin-top: 3rem;
  margin-left: auto;
  margin-right: auto;
  max-width: 400px;

  @media (min-width: ${breakpoints[1]}px) {
    margin-top: 4rem;
  }
`;

const CalendarComponent = styled(motion.img)`
  display: block;
  width: 100%;
`;

const Status = styled(motion.div)`
  display: block;
  position: absolute;
  width: 8%;
  height: 0;
  padding-bottom: 8%;
  top: 0;
  right: 0;
  perspective: 1000px;
  transform-style: preserve-3d;
`;
const PublishingImg = styled.img`
  transform: rotateY(0deg);
  backface-visibility: hidden;
  width: 100%;
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
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Arrow = styled(motion.img)`
  position: absolute;
  width: 8%;
  height: auto;
  top: 73%;
  right: 15%;
  z-index: 2;
`;
const PointerHand = styled(motion.img)`
  position: absolute;
  width: 10%;
  height: auto;
  left: 14%;
  bottom: 50%;
  z-index: 2;
`;

const calendarVariants = {
  initial: { opacity: 0.5, filter: 'grayscale(100%)' },
  animate: { opacity: 1, filter: 'grayscale(0%)' },
};
const statusVariants = {
  initial: { x: '50%', y: '-50%' },
  spin: { rotate: 1440, x: '50%', y: '-50%', transition: { duration: 0.8 } },
  animate: { rotateY: 180, x: '50%', y: '-50%', transition: { delay: 1.6, duration: 0.8 } },
};
const decorationVariants = {
  initial: { y: '15%', opacity: 0 },
  animate: { y: 0, opacity: 1 },
};

export function Publish({ docs, ...props }) {
  return (
    <Figure data-chromatic="ignore" {...props}>
      <Content>
        <Arrow
          variants={decorationVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 'all' }}
          transition={{ duration: 0.3, delay: 1.8 }}
          src="images/home/arrow.svg"
          alt=""
        />
        <PointerHand
          variants={decorationVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 'all' }}
          transition={{ duration: 0.3, delay: 1.8 }}
          src="images/home/pointerhand.svg"
          alt=""
        />
        <CalendarComponent
          src="images/home/automate/datepicker-compact-week.svg"
          alt=""
          variants={calendarVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 'all' }}
          transition={{ duration: 0.8 }}
        />
        <Status
          initial="initial"
          variants={statusVariants}
          whileInView={['spin', 'animate']}
          viewport={{ once: true, amount: 'all' }}
        >
          <PublishingImg src="images/home/automate/status-publishing.svg" alt="" />
          <PublishedImg src="images/home/automate/status-published.svg" alt="" />
        </Status>
      </Content>
    </Figure>
  );
}
