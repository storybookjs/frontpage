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
import { motion, useScroll, useTransform } from 'framer-motion';
import GatsbyLinkWrapper from '../../basics/GatsbyLinkWrapper';
import { Stat } from '../../basics/Stat';
import storybookMockUI from './storybook-mock-ui.svg';
import AtomicDesignLogoSVG from '../../../images/logos/user/logo-atomicdesign.svg';
import { Integrations } from './Integrations';
import { Storybook } from './Storybook';

const { color, subheading, breakpoints, pageMargins } = styles;

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
  image: `/frameworks/logo-${framework}.svg`,
  href: `/docs/${framework}`,
  ButtonWrapper: GatsbyLinkWrapper,
}));

const MadeFor = styled.section`
  ${subheading.small};
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 12px;
`;

const StickText = styled.div`
  grid-column: 1 / 2;
`;

const Spacer = styled.div`
  height: 64rem;
`;

const ValueProp = styled(ValuePropCopy)`
  position: sticky;
  top: 4rem;
  z-index: 999;
`;

const ValuePropIntegrations = styled(ValuePropCopy)`
  align-self: center;
`;

const Content = styled.div`
  ${pageMargins};
  padding-top: 16rem;

  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  gap: 6rem;
  grid-auto-flow: dense;

  @media (min-width: ${breakpoints[2]}px) {
    justify-items: flex-start;
    grid-template-columns: minmax(max-content, 320px) 1fr;
  }
`;

const StorybookDemo = styled(Storybook)`
  position: sticky;
  top: 4rem;
  width: 100%;
  order: -1;
  z-index: 999;

  @media (min-width: ${breakpoints[2]}px) {
    grid-column: 2 / 3;
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
  const ref = useRef(null);
  const { scrollYProgress: storiesScrollProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start start'],
  });

  const activeStory = useTransform(storiesScrollProgress, (value) => Math.floor(value * 3));

  return (
    <Wrapper {...props}>
      <svg
        style={{ position: 'fixed', top: 20, left: 20 }}
        width="75"
        height="75"
        viewBox="0 0 100 100"
        strokeWidth="4"
      >
        <circle cx="50" cy="50" r="30" pathLength="1" stroke="#fe0222" opacity="0.2" />
        <motion.circle
          cx="50"
          cy="50"
          r="30"
          pathLength="1"
          stroke="#fe0222"
          style={{ pathLength: storiesScrollProgress }}
        />
      </svg>
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
        <StorybookDemo activeStory={activeStory} />
        <StickText>
          <ValueProp
            inverse
            heading="Build UI components and pages in isolation"
            description="Implement components and pages without needing to fuss with data, APIs, or business logic."
            links={
              <>
                <Link containsIcon withArrow href="/why-storybook">
                  Why build UIs in isolation?
                </Link>
                <Link containsIcon withArrow href="/integrations">
                  How does this fit in my tech stack?
                </Link>
              </>
            }
          />
          <Spacer />
        </StickText>
        <StickText ref={ref}>
          <ValueProp
            inverse
            heading="Mock hard-to-reach edge cases as stories"
            description="Render components in key states that are tricky to reproduce in an app. Then save those states as stories to revisit during development, testing, and QA."
            links={
              <Link containsIcon withArrow href="/why-storybook">
                How to write a story
              </Link>
            }
          />
          <Spacer />
        </StickText>
        <StickText>
          <ValueProp
            inverse
            heading="Supercharge your workflow with addons"
            description="Addons extend and customize your UI development workflow. There are hundreds of addons that help you build UI faster, document component libraries, and integrate with other tools."
            links={
              <Link containsIcon withArrow href="/why-storybook">
                Learn about addons
              </Link>
            }
          />
          <Spacer />
        </StickText>
        <StickText>
          <ValueProp
            inverse
            heading="Drop the finished UI components into your app"
            description="Once you finish developing UI components in isolation, drop them into your app. You’ll have confidence that the components are hardened to support every possible edge case."
            links={
              <Link containsIcon withArrow href="/why-storybook">
                Why build UIs in isolation?
              </Link>
            }
          />
          <Spacer />
        </StickText>
      </Content>
      <Content>
        <ValuePropIntegrations
          inverse
          heading="Integrate with the tools you already use"
          description="Storybook is incrementally adoptable and integrates with industry-standard tools. That means your team doesn’t have to change their workflow."
          links={
            <Link containsIcon withArrow href="/why-storybook">
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
      </Content>
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
