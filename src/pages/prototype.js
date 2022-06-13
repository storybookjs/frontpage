import React, { Fragment, useState, useLayoutEffect, useRef, useEffect } from 'react';
import { motion, useViewportScroll, useTransform, useSpring } from 'framer-motion';
import { global } from '@storybook/design-system';
import { styled } from '@storybook/theming';
import { rgba } from 'polished';

import { Button, Icon, styles } from '@storybook/design-system';

import CommunityHero from '../components/screens/CommunityScreen/CommunityHero';
import CommunitySocial from '../components/screens/CommunityScreen/CommunitySocial';
import { StorybookUI } from '../components/StorybookUI';

import FakeAppSVG from '../images/home/fake-app.svg';
import ComponentSVG from '../images/home/component.svg';
import StorybookSVG from '../images/home/storybook-ui.svg';
import StorybookAddonsSVG from '../images/home/storybook-addons.svg';

const { typography, spacing, color, pageMargins, breakpoint } = styles;

const Title = styled.h2`
  font-weight: ${typography.weight.extrabold};
  font-size: ${typography.size.m2}px;
  line-height: ${typography.size.l1}px;
  margin-bottom: ${spacing.padding.medium}px;
  color: ${color.lightest};

  @media (min-width: ${breakpoint * 1.333}px) {
    font-size: ${typography.size.m2}px;
    line-height: ${typography.size.l1}px;
    margin-bottom: 0.75rem;
  }
`;

const Desc = styled.div`
  color: ${color.lightest};
  font-size: ${typography.size.s3}px;
  line-height: ${typography.size.m3}px;
`;
const Illustration = styled.figure`
  align-self: flex-start;
  position: sticky;
  top: 180px;
  margin: 0;
  width: 600px;
  height: 400px;
`;
const Copy = styled.div`
  width: 25%;
  min-width: 270px;
  max-width: 270px;
  margin-right: 160px;
  margin-bottom: 492px;

  &:first-of-type {
    margin-top: 130px;
  }
`;

const Backdrop = styled.section`
  background: #171c23;
  padding-top: 170px;
  padding-bottom: 170px;
  position: relative;
`;
const Section = styled.div`
  ${pageMargins};
  display: flex;
  align-items: center;
  padding-top: 3rem;
  padding-bottom: 3rem;

  ${Illustration} {
    flex: 1;
  }
`;

const FakeApp = styled(motion.img)`
  height: 467px;
  position: absolute;
  top: 50%;
  transform: translate(60%, -50%);
`;
const Storybook = styled(motion.img)`
  height: 405px;
  position: absolute;
`;
const RangeSliderComponent = styled(motion.img)`
  width: 160px;
  position: absolute;
  top: 50%;
  transform: translate(110%, -50%);
`;

function usePosition() {
  const ref = useRef();

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useLayoutEffect(() => {
    function setValues() {
      const position = ref.current.getBoundingClientRect();
      setX(window.scrollX + position.left);
      setY(window.scrollY + position.top);
    }

    if (ref.current) {
      setValues();
      document.addEventListener('load', setValues);
      window.addEventListener('resize', setValues);
    }
  }, [ref, setX, setY]);

  return [ref, { x, y }];
}

const { GlobalStyle } = global;

const PrototypePage = () => {
  const { scrollY } = useViewportScroll();
  const [scrollPosY, setScrollPosY] = useState(0);

  // App animations
  const appXTransform = useTransform(scrollY, [scrollPosY, scrollPosY + 246], ['60%', '120%']);
  const appX = useSpring(appXTransform, { stiffness: 400, damping: 90 });
  const appOpacityTransform = useTransform(scrollY, [scrollPosY, scrollPosY + 246], [1, 0]);
  const appOpacity = useSpring(appOpacityTransform, { stiffness: 400, damping: 90 });

  // Storybook animations
  const storybookScaleTransform = useTransform(
    scrollY,
    [scrollPosY, scrollPosY + 246, scrollPosY + 492],
    [1, 1, 1.57]
  );
  const storybookScale = useSpring(storybookScaleTransform, { stiffness: 400, damping: 90 });
  const storybookXTransform = useTransform(
    scrollY,
    [scrollPosY, scrollPosY + 246, scrollPosY + 492],
    ['0%', '0%', '28.5%']
  );
  const storybookX = useSpring(storybookXTransform, { stiffness: 400, damping: 90 });
  // addons panel
  const addonsYTransform = useTransform(
    scrollY,
    [scrollPosY, scrollPosY + 492 * 1.25, scrollPosY + 492 * 2],
    [230, 230, 0]
  );
  const addonsY = useSpring(addonsYTransform, { stiffness: 400, damping: 90 });

  // Component animations
  const componentScaleTransform = useTransform(
    scrollY,
    [scrollPosY, scrollPosY + 246, scrollPosY + 492],
    [1, 1, 1.875]
  );
  const componentScale = useSpring(componentScaleTransform, { stiffness: 400, damping: 90 });
  const componentXTransform = useTransform(
    scrollY,
    [scrollPosY, scrollPosY + 246, scrollPosY + 492],
    ['110%', '110%', '200%']
  );
  const componentX = useSpring(componentXTransform, { stiffness: 400, damping: 90 });
  const componentYTransform = useTransform(
    scrollY,
    [scrollPosY, scrollPosY + 246, scrollPosY + 492],
    ['-50%', '-60%', '-120%']
  );
  const componentY = useSpring(componentYTransform, { stiffness: 400, damping: 90 });

  const [ref, { y }] = usePosition();

  useEffect(() => {
    setScrollPosY(y + 180);
  }, [y]);

  return (
    <Fragment>
      <GlobalStyle />
      <CommunityHero />
      <CommunitySocial />
      <Backdrop ref={ref}>
        <Section>
          <div>
            <Copy>
              <Title>Build UI components and pages in isolation</Title>
              <Desc>
                Create components without needing to stand up screens, fuss with data, or build
                business logic.
              </Desc>
            </Copy>
            <Copy>
              <Title>Mock hard-to-reach edge cases as stories</Title>
              <Desc>
                Render components in key states that are tricky to reproduce in an app. Then save
                those states as stories to revisit during development, testing, and QA.
              </Desc>
            </Copy>
            <Copy>
              <Title>Supercharge your workflow with addons</Title>
              <Desc>
                Addons extend and customize your UI development workflow. There are hundreds of
                addons that help you build UI faster, document component libraries, and integrate
                with other tools.
              </Desc>
            </Copy>
          </div>
          <Illustration>
            <StorybookUI
              style={{
                scale: storybookScale,
                translateX: storybookX,
                originX: '50%',
                originY: '50%',
              }}
              transformTemplate={({ scale, translateX }) =>
                `translate3d(${translateX}%, 0, 0) scale(${scale})`
              }
              addonsY={addonsY}
            />
            {/* <Storybook
              src={StorybookSVG}
              style={{ scale: storybookScale, x: storybookX }}
              transformTemplate={({ scale, x }) => `translate3d(${x}%, 0, 0) scale(${scale})`}
            /> */}
            <FakeApp
              src={FakeAppSVG}
              style={{ x: appX, y: '-50%', opacity: appOpacity }}
              transformTemplate={({ x, y }) => `translate3d(${x}%, ${y}, 0)`}
            />
            <RangeSliderComponent
              src={ComponentSVG}
              style={{ scale: componentScale, x: componentX, y: componentY }}
              transformTemplate={({ scale, x, y }) =>
                `translate3d(${x}%, ${y}%, 0) scale(${scale})`
              }
            />
            {/* <Storybook
              src={StorybookAddonsSVG}
              style={{ scale: storybookScale, x: storybookX }}
              transformTemplate={({ scale, x }) => `translate3d(${x}%, 0, 0) scale(${scale})`}
            /> */}
          </Illustration>
        </Section>
      </Backdrop>
    </Fragment>
  );
};

export default PrototypePage;
