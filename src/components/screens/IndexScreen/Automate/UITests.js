import React, { useEffect, useState, useRef } from 'react';
import { Icon } from '@storybook/design-system';
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
const initialAnimationLength = 0; // 3000
const eachWorkflowAnimationLength = 4000; // 9000
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
    margin-top: 5rem;
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
  border-radius: 4px;
  transition: transform 350ms ${easing}, box-shadow 350ms ${easing};
  transform: ${(props) =>
    props.isActive ? 'scale(1) translateY(0)' : 'scale(0.76) translateY(33px)'};
  background-color: ${color.lightest};
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

const checklistInitialAnimation = keyframes`
  0% { opacity: 1; }
  70% { opacity: 1; }
  100% { opacity: 0; }
`;

const checklistAnimation = keyframes`
  0% { opacity: 1; }
  90% { opacity: 1; }
  100% { opacity: 0; }
`;

const Checklist = styled.ul`
  width: 160px;
  margin: 0 auto;
  padding: 0;
  list-style: none;
  text-align: left;
  color: ${color.lightest};
  margin-top: 24px;
  will-change: opacity;
  ${(props) =>
    props.didQueueTimer &&
    css`
      animation: ${props.isAnimatingLoop ? checklistAnimation : checklistInitialAnimation}
        ${props.isAnimatingLoop ? eachWorkflowAnimationLength : initialAnimationLength}ms ${easing}
        forwards;
    `}
`;

function getChecklistAnimationDelay({ index }) {
  const animationDelayStep = 375;
  // Start the checklist animation early so it has started when the line
  // animation is currently ending.
  const visualLineAnimationOffset = 150;

  return (
    lineAnimationLength +
    lineAnimationDelay -
    visualLineAnimationOffset +
    index * animationDelayStep
  );
}

const checklistAnimationLength = 450;
const checklistIconAnimation = keyframes`
  0% { opacity: 0; transform: scale(0.5); }
  100% { opacity: 1; transform: scale(1); }
`;

const ChecklistListItem = styled.li`
  line-height: 21px;
  white-space: nowrap;
  margin-top: 16px;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    width: 1px;
    height: 6px;
    background-color: rgba(255, 255, 255, 0.1);
    left: 10px;
    top: 26px;
    /**
      Delay this animation slightly more than the others since it appears
      after the icon & test visually. It should look like it comes in just
      a bit later.
    */
    will-change: transform, opacity;
    ${(props) =>
      props.isAnimatingLoop &&
      css`
        opacity: 0;
        animation: ${checklistIconAnimation} ${checklistAnimationLength}ms ${easing}
          ${getChecklistAnimationDelay(props) + 100}ms forwards;
      `}
  }

  &:first-child {
    margin-top: 0;
  }

  &:last-child:after {
    display: none;
  }
`;

const ChecklistIcon = styled(Icon)`
  vertical-align: top;
  margin-right: 10px;
  color: ${color.lightest};
  border-radius: 100%;
  position: relative;
  will-change: transform, opacity;
  width: 20px;
  height: 20px;
  ${(props) =>
    props.isAnimatingLoop &&
    css`
      opacity: 0;
      animation: ${checklistIconAnimation} ${checklistAnimationLength}ms ${easing}
        ${getChecklistAnimationDelay(props)}ms forwards;
    `}
`;

const CheckIcon = styled((props) => <ChecklistIcon {...props} icon="check" />)`
  padding: 4px;
  background: linear-gradient(#23c991, #61d135);
`;

const MergeIcon = styled((props) => <ChecklistIcon {...props} icon="merge" />)`
  padding: 4px 3px 4px 5px;
  background: linear-gradient(#cf60ff, #af44ff);
`;

const checklistItemTextAnimation = keyframes`
  0% { opacity: 0; transform: translateX(-10px); }
  40% { opacity: 0; transform: translateX(-10px); }
  100% { opacity: 1; transform: translateX(0); }
`;

const ChecklistItemText = styled.span`
  display: inline-block;
  will-change: transform, opacity;
  ${(props) =>
    props.isAnimatingLoop &&
    css`
      opacity: 0;
      animation: ${checklistItemTextAnimation} ${checklistAnimationLength}ms ${easing}
        ${getChecklistAnimationDelay(props)}ms forwards;
    `}
`;

const checklistItems = [
  { Icon: CheckIcon, message: 'Publish Storybook' },
  { Icon: CheckIcon, message: 'Visual test' },
  { Icon: CheckIcon, message: 'Review with team' },
  { Icon: MergeIcon, message: 'Ready to merge!' },
];

function PureUITests({
  forwardRef,
  activeIndex,
  didQueueTimer,
  isAnimatingLoop,
  isPaused,
  workflows,
}) {
  return (
    <Figure ref={forwardRef}>
      <Wrapper isPaused={isPaused}>
        <WorkflowComponents activeIndex={activeIndex}>
          {workflows.map((workflow, index) => {
            const isActive = index - activeIndex === 0;

            return (
              <WorkflowWrapper
                currentIndexOffset={index - activeIndex}
                isActive={isActive}
                key={workflow}
              >
                <Workflow isActive={isActive}>
                  <img src={workflow} alt="" />
                </Workflow>
                <Lines>
                  <HorizontalLine isActive={isActive} isAnimatingLoop={isAnimatingLoop} />
                  <VerticalLine isActive={isActive} isAnimatingLoop={isAnimatingLoop} />
                </Lines>
              </WorkflowWrapper>
            );
          })}
        </WorkflowComponents>

        {/* <Checklist key={workflows[0]} isAnimatingLoop={isAnimatingLoop} didQueueTimer={didQueueTimer}>
        {checklistItems.map((item, index) => (
          <ChecklistListItem key={item.message} index={index} isAnimatingLoop={isAnimatingLoop}>
            <item.Icon index={index} isAnimatingLoop={isAnimatingLoop} />
            <ChecklistItemText index={index} isAnimatingLoop={isAnimatingLoop}>
              {item.message}
            </ChecklistItemText>
          </ChecklistListItem>
        ))}
      </Checklist> */}
      </Wrapper>
    </Figure>
  );
}

PureUITests.propTypes = {
  activeIndex: PropTypes.number.isRequired,
  didQueueTimer: PropTypes.bool.isRequired,
  isAnimatingLoop: PropTypes.bool.isRequired,
  isPaused: PropTypes.bool.isRequired,
  workflows: PropTypes.arrayOf(PropTypes.func.isRequired).isRequired,
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
