import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@storybook/theming';
import { Link } from '@storybook/design-system';
import {
  styles,
  SectionLede,
  IntegrationsList,
  ValuePropCopy,
  Testimonial,
} from '@storybook/components-marketing';
import { useScroll, useTransform, useSpring } from 'framer-motion';
import GatsbyLinkWrapper from '../../basics/GatsbyLinkWrapper';
import { Stat } from '../../basics/Stat';
import AtomicDesignLogoSVG from '../../../images/logos/user/logo-atomicdesign.svg';
import { Integrations } from './Integrations';
import { ScrollDemo } from './StorybookDemo/ScrollDemo';

const { subheading, breakpoints, pageMargins } = styles;

const Wrapper = styled.section`
  padding-top: 3rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  @media (min-width: ${breakpoints[1]}px) {
    padding-top: 5rem;
  }

  @media (min-width: ${breakpoints[2]}px) {
    padding-top: 7rem;
  }
`;

const featuredFrameworks = ['react', 'vue', 'angular', 'web-components', 'html'];
const frameworkIntegrations = featuredFrameworks.map((framework) => ({
  name: framework,
  image: `/frameworks/logo-${
    framework === 'web-components' ? 'web-components-alt' : framework
  }.svg`,
  href: `/docs/${framework}/get-started/introduction`,
  ButtonWrapper: GatsbyLinkWrapper,
}));

const MadeFor = styled.section`
  ${subheading.small};
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 12px;
`;

const StickTextWrapper = styled.div`
  grid-column: 1 / 2;
`;

const TopSpacer = styled.div`
  height: 64rem;

  @media (min-width: ${breakpoints[2]}px) {
    display: none;
  }
`;
const BottomSpacer = styled.div`
  height: ${(props) => (props.small ? 64 : 56)}rem;
  display: none;

  @media (min-width: ${breakpoints[2]}px) {
    display: block;
  }
`;

const ValueProp = styled(ValuePropCopy)`
  position: sticky;
  bottom: 2rem;

  @media (min-width: ${breakpoints[2]}px) {
    bottom: unset;

    top: 50vh;
    transform: translateY(-50%);
  }
`;

const ValuePropIntegrations = styled(ValuePropCopy)`
  align-self: center;
`;

const Content = styled.div`
  ${pageMargins};
  padding-top: 12rem;

  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  gap: 6rem;
  grid-auto-flow: dense;

  @media (min-width: ${breakpoints[2]}px) {
    padding-top: 27rem;
    justify-items: flex-start;
    grid-template-columns: minmax(max-content, 320px) 1fr;
  }
`;

const IntegrationsContent = styled.div`
  ${pageMargins};
  padding-top: 12rem;

  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  align-items: center;
  gap: 6rem;
  grid-auto-flow: dense;

  @media (min-width: ${breakpoints[2]}px) {
    justify-items: flex-start;
    grid-template-columns: minmax(max-content, 320px) 1fr;
  }
`;

const StorybookDemoWrapper = styled.figure`
  position: sticky;
  top: 4rem;
  width: 100%;
  order: -1;
  z-index: 999;
  margin: 0;
  align-self: flex-start;

  @media (min-width: ${breakpoints[1]}px) {
    top: 5rem;
  }

  @media (min-width: ${breakpoints[2]}px) {
    width: 150%;
    max-width: 800px;
    grid-column: 2 / 3;
    top: 50vh;
    transform: translateY(calc(-50% + 36px));
  }
`;

const IntegrationsGrid = styled(Integrations)`
  position: sticky;
  top: 4rem;

  @media (min-width: ${breakpoints[2]}px) {
    grid-column: 2 / 3;
  }
`;

const Stats = styled.div`
  display: flex;
  gap: 30px;
`;

export function Develop({ docs, startOpen, ...props }) {
  // Step 1
  const isolationRef = useRef(null);
  const { scrollYProgress: isolationProgress } = useScroll({
    target: isolationRef,
    offset: ['0 0.5', '1 0.5'],
  });
  const smoothIsolationProgress = useSpring(isolationProgress, {
    stiffness: 1000,
    damping: 100,
  });

  // Step 2
  const storiesRef = useRef(null);
  const { scrollYProgress: storiesProgress } = useScroll({
    target: storiesRef,
    offset: ['0 0.5', '.75 1'],
  });
  const activeStory = useTransform(storiesProgress, (value) => Math.floor(value * 3));

  // Step 3
  const addonsRef = useRef(null);
  const { scrollYProgress: addonsProgress } = useScroll({
    target: addonsRef,
    offset: ['0 0.5', '.75 1'],
  });
  const activePanel = useTransform(addonsProgress, (value) => Math.floor(value * 4));
  const smoothAddonsProgress = useSpring(addonsProgress, {
    stiffness: 1000,
    damping: 100,
  });

  // Step 4
  const dropInRef = useRef(null);
  const { scrollYProgress: dropInProgress } = useScroll({
    target: dropInRef,
    offset: ['0 1', '0 0.5'],
  });
  const smoothDropInProgress = useSpring(dropInProgress, {
    stiffness: 1000,
    damping: 100,
  });

  return (
    <Wrapper {...props}>
      <SectionLede
        inverse
        heading="Develop durable user interfaces"
        copy="Storybook provides a workshop to build UIs in isolation. It helps you develop hard-to-reach states and edge cases without needing to run the whole app."
        actions={
          <div>
            <MadeFor>Made for</MadeFor>
            <IntegrationsList integrations={frameworkIntegrations} overflowLabel="+ 7" inverse />
          </div>
        }
      />
      <Content>
        <StorybookDemoWrapper>
          <ScrollDemo
            storyIndex={activeStory}
            panelIndex={activePanel}
            isolationProgress={smoothIsolationProgress}
            addonsProgress={smoothAddonsProgress}
            dropInProgress={smoothDropInProgress}
          />
        </StorybookDemoWrapper>
        <StickTextWrapper ref={isolationRef}>
          <TopSpacer />
          <ValueProp
            inverse
            heading="Build UI components and pages in isolation"
            description="Implement components and pages without needing to fuss with data, APIs, or business logic."
            links={
              <Link
                containsIcon
                withArrow
                href="/docs/react/why-storybook#the-solution"
                LinkWrapper={GatsbyLinkWrapper}
              >
                Why build UIs in isolation?
              </Link>
            }
          />
          <BottomSpacer small />
        </StickTextWrapper>
        <StickTextWrapper ref={storiesRef}>
          <TopSpacer />
          <ValueProp
            inverse
            heading="Mock hard-to-reach edge cases as stories"
            description="Render components in key states that are tricky to reproduce in an app. Then save those states as stories to revisit during development, testing, and QA."
            links={
              <Link
                containsIcon
                withArrow
                href={`${docs}react/get-started/whats-a-story`}
                LinkWrapper={GatsbyLinkWrapper}
              >
                How to write a story
              </Link>
            }
          />
          <BottomSpacer />
        </StickTextWrapper>
        <StickTextWrapper ref={addonsRef}>
          <TopSpacer />
          <ValueProp
            inverse
            heading="Supercharge your workflow with addons"
            description="Addons extend and customize your UI development workflow. There are hundreds of addons that help you build UI faster, document component libraries, and integrate with other tools."
            links={
              <Link
                containsIcon
                withArrow
                href={`${docs}react/addons/introduction`}
                LinkWrapper={GatsbyLinkWrapper}
              >
                Learn about addons
              </Link>
            }
          />
          <BottomSpacer />
        </StickTextWrapper>
        <StickTextWrapper ref={dropInRef}>
          <TopSpacer />
          <ValueProp
            inverse
            heading="Drop the finished UI components into your app"
            description="Once you finish developing UI components in isolation, drop them into your app. You’ll have confidence that the components are hardened to support every possible edge case."
            links={
              <Link
                containsIcon
                withArrow
                href="/docs/react/why-storybook#the-solution"
                LinkWrapper={GatsbyLinkWrapper}
              >
                Why build UIs in isolation?
              </Link>
            }
          />
          <BottomSpacer />
        </StickTextWrapper>
      </Content>
      <IntegrationsContent>
        <ValuePropIntegrations
          inverse
          heading="Integrate with the tools you already use"
          description="Storybook is incrementally adoptable and integrates with industry-standard tools. That means your team doesn’t have to change their workflow."
          links={
            <Link containsIcon withArrow href="/addons" LinkWrapper={GatsbyLinkWrapper}>
              Browse integrations
            </Link>
          }
          meta={
            <Stats>
              <Stat count="400+" text="Integrations" noPlural />
              <Stat count="35M" text="Downloads per week" noPlural />
            </Stats>
          }
        />
        <IntegrationsGrid docs={docs} />
      </IntegrationsContent>
      <Testimonial
        inverse
        text={
          <span>
            “Storybook is a powerful frontend workshop environment tool that allows teams to design,
            build, and organize UI components (and even full screens!) without getting tripped up
            over business logic and plumbing.”
          </span>
        }
        avatarUrl="https://avatars3.githubusercontent.com/u/383701?s=460&v=4"
        name="Brad Frost"
        jobTitle="Author of Atomic Design"
        logo={AtomicDesignLogoSVG}
      />
    </Wrapper>
  );
}

Develop.propTypes = {
  startOpen: PropTypes.bool,
  docs: PropTypes.string.isRequired,
};

Develop.defaultProps = {
  startOpen: false,
};
