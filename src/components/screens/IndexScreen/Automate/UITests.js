import React, { useEffect, useState, useRef } from 'react';
import { styles } from '@storybook/components-marketing';
import { css, keyframes, styled } from '@storybook/theming';
import { useReducedMotion, useInView } from 'framer-motion';
import PropTypes from 'prop-types';

import Boolean from '../../../../images/home/Boolean.svg';
import Cascade from '../../../../images/home/Cascade.svg';
import DatePicker from '../../../../images/home/DatePicker.svg';
import Headings from '../../../../images/home/Headings.svg';
import Histogram from '../../../../images/home/Histogram.svg';
import Icons from '../../../../images/home/Icons.svg';
import LineGraphCoral from '../../../../images/home/LineGraph-coral.svg';
import LineGraphTeal from '../../../../images/home/LineGraph-teal.svg';
import MarketingButtons from '../../../../images/home/MarketingButtons.svg';
import PieChart from '../../../../images/home/PieChart.svg';
import Slider from '../../../../images/home/Slider.svg';

const { color, breakpoints, pageMargins } = styles;

const workflowWidth = 210;
const initialAnimationLength = 0;
const eachWorkflowAnimationLength = 4000;
const easing = 'ease-in-out';

/**
 * Note: the z-index and relative positioning on the Wrapper should not be
 * deleted. While it has no visual effect, it solved a problem where the
 * animation was causing a repaint at the very end.
 */

const Figure = styled.figure`
  ${pageMargins};
`;

const Wrapper = styled.div`
  position: relative;
  z-index: 1;
  margin-top: 3rem;

  @media (min-width: ${breakpoints[1]}px) {
    margin-top: 4rem;
  }

  ${(props) =>
    props.isPaused &&
    `
    && * {
      animation-play-state: paused;
    }
  `}
`;

const WorkflowComponents = styled.div`
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  color: ${color.lightest};
  height: ${workflowWidth}px;
`;

function getWorkflowTranslateValue(currentIndexOffset) {
  const base = currentIndexOffset * workflowWidth;
  const modifier = 25;
  if (currentIndexOffset > 0) return base + modifier;
  if (currentIndexOffset < 0) return base - modifier;
  return base;
}

const WorkflowWrapper = styled.div`
  position: absolute;
  left: 50%;
  margin-left: -${workflowWidth / 2}px;
  width: ${workflowWidth}px;
  height: ${workflowWidth}px;
  display: flex;
  justify-content: center;
  transition: transform 350ms ${easing};
  transform: translateX(${(props) => getWorkflowTranslateValue(props.currentIndexOffset)}px);
  will-change: transform;
`;

const Workflow = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  transition: transform 350ms ${easing}, box-shadow 350ms ${easing};
  transform: ${(props) =>
    props.isActive ? 'scale(1) translateY(0)' : 'scale(0.76) translateY(33px)'};
  background-color: ${color.lightest};
  opacity: ${(props) => (props.done ? 1 : 0.5)};
  box-shadow: ${(props) =>
    props.isActive
      ? `
        0 1.7px 2.2px rgba(0, 0, 0, 0.028),
        0 4px 5.3px rgba(0, 0, 0, 0.04),
        0 7.5px 10px rgba(0, 0, 0, 0.05),
        0 13.4px 17.9px rgba(0, 0, 0, 0.06),
        0 25.1px 33.4px rgba(0, 0, 0, 0.072),
        0 60px 80px rgba(0, 0, 0, 0.1)
      `
      : `
        0 0.6px 2.2px rgba(0, 0, 0, 0.02),
        0 1.3px 5.3px rgba(0, 0, 0, 0.028),
        0 2.5px 10px rgba(0, 0, 0, 0.035),
        0 4.5px 17.9px rgba(0, 0, 0, 0.042),
        0 8.4px 33.4px rgba(0, 0, 0, 0.05),
        0 20px 80px rgba(0, 0, 0, 0.07)
    `};

  img {
    width: 100%;
    height: 100%;
  }
`;

const Lines = styled.div`
  position: absolute;
  overflow: hidden;
  left: -15px;
  width: 240px;
  height: 240px;
  top: -15px;
`;

const Line = styled.div`
  border-radius: 1rem;
  position: absolute;
  background: rgba(255, 68, 0, 0.8);
  opacity: 0;
  visibility: ${(props) => (props.isActive ? 'visible' : 'hidden')};
  will-change: transform, opacity;
`;

const lineSize = 3;
const lineAnimationOffset = workflowWidth + lineSize;
const lineBoxShadow = `0 1px 7px 0 #fc521f`;

function generateLineAnimation({ primaryAxis, secondaryAxis }) {
  return keyframes`
    0% { opacity: 1; transform: translate${primaryAxis}(-100%); }
    25%, 40% { transform: translate${primaryAxis}(0); box-shadow: ${lineBoxShadow}; }
    75% { transform: translate${primaryAxis}(0) translate${secondaryAxis}(${lineAnimationOffset}px); }
    85% { opacity: 1; transform: translate${primaryAxis}(0) translate${secondaryAxis}(${lineAnimationOffset}px); box-shadow: ${lineBoxShadow}; }
    100% { opacity: 0; transform: translate${primaryAxis}(30%) translate${secondaryAxis}(${lineAnimationOffset}px); }
  `;
}

const horizontalLineAnimation = generateLineAnimation({
  primaryAxis: 'X',
  secondaryAxis: 'Y',
});

const lineAnimationLength = 1550;
const lineAnimationDelay = 500;

const HorizontalLine = styled(Line)`
  width: ${workflowWidth + 30}px;
  height: ${lineSize}px;
  top: 12px;
  left: 0;
  will-change: transform, opacity;
  ${(props) =>
    props.isActive &&
    props.isAnimatingLoop &&
    css`
      animation: ${horizontalLineAnimation} ${lineAnimationLength}ms ${easing}
        ${lineAnimationDelay}ms;
    `}
`;

const verticalLineAnimation = generateLineAnimation({
  primaryAxis: 'Y',
  secondaryAxis: 'X',
});

const VerticalLine = styled(Line)`
  width: ${lineSize}px;
  height: 240px;
  left: 12px;
  top: 0;
  will-change: transform, opacity;
  ${(props) =>
    props.isActive &&
    props.isAnimatingLoop &&
    css`
      animation: ${verticalLineAnimation} ${lineAnimationLength}ms ${easing} ${lineAnimationDelay}ms;
    `}
`;

function PureUITests({ forwardRef, activeIndex, isAnimatingLoop, isPaused, workflows }) {
  return (
    <Figure ref={forwardRef}>
      <Wrapper isPaused={isPaused}>
        <WorkflowComponents activeIndex={activeIndex}>
          {workflows.map((workflow, index) => {
            const isActive = index - activeIndex === 0;
            const done = index <= activeIndex;

            return (
              <WorkflowWrapper
                currentIndexOffset={index - activeIndex}
                isActive={isActive}
                key={workflow}
              >
                <Workflow isActive={isActive} done={done}>
                  <img loading="lazy" src={workflow} alt="" />
                </Workflow>
                <Lines>
                  <HorizontalLine isActive={isActive} isAnimatingLoop={isAnimatingLoop} />
                  <VerticalLine isActive={isActive} isAnimatingLoop={isAnimatingLoop} />
                </Lines>
              </WorkflowWrapper>
            );
          })}
        </WorkflowComponents>
      </Wrapper>
    </Figure>
  );
}

PureUITests.propTypes = {
  activeIndex: PropTypes.number.isRequired,
  isAnimatingLoop: PropTypes.bool.isRequired,
  isPaused: PropTypes.bool.isRequired,
  workflows: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export const baseWorkflows = [
  Boolean,
  Cascade,
  DatePicker,
  Headings,
  Histogram,
  Icons,
  LineGraphCoral,
  LineGraphTeal,
  MarketingButtons,
  PieChart,
  Slider,
];

/* eslint-disable consistent-return */
export function UITests({ isPaused: isPausedExternally }) {
  const ref = useRef(null);
  // Pause animation if not in viewport
  const isInView = useInView(ref, { once: true, amount: 'all' });
  const shouldReduceMotion = useReducedMotion();

  const isPaused = UITests.paused || isPausedExternally || shouldReduceMotion;
  const activeIndex = Math.floor(baseWorkflows.length / 2 - 1);
  const [animationState, setAnimationState] = useState({
    didQueueTimer: false,
    workflows: baseWorkflows,
    isAnimatingLoop: false,
  });

  const { workflows, isAnimatingLoop } = animationState;

  useEffect(() => {
    if (isPaused || !isInView) return;

    setAnimationState({
      // The entire purpose of didQueueTimer is to sync up the initial
      // fade out animation with the timer that is set below. Without
      // this logic, the `useEffect` and `setTimeout` calls _could_ cause
      // the CSS animation timing defined in the initial state  of components
      // above to fall out of sync with the timer below because the CSS
      // animations start immediately, whereas the timer has to wait for the
      // event loop.
      didQueueTimer: true,
      workflows,
      isAnimatingLoop,
    });

    const timer = setTimeout(
      () => {
        setAnimationState({
          didQueueTimer: true,
          isAnimatingLoop: true,
          // Move the first workflow to the end of the list
          workflows: [...workflows.slice(1), ...workflows.slice(0, 1)],
        });
      },
      isAnimatingLoop ? eachWorkflowAnimationLength : initialAnimationLength
    );

    return () => clearTimeout(timer);
  }, [isAnimatingLoop, workflows, isPaused, isInView]);

  return (
    <PureUITests
      forwardRef={ref}
      activeIndex={activeIndex}
      didQueueTimer={animationState.didQueueTimer}
      isAnimatingLoop={animationState.isAnimatingLoop}
      isPaused={isPaused}
      workflows={animationState.workflows}
    />
  );
}
/* eslint-enable consistent-return */

UITests.propTypes = {
  isPaused: PropTypes.bool,
};
UITests.defaultProps = {
  isPaused: false,
};

UITests.paused = false;
