import React from 'react';
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
import GatsbyLinkWrapper from '../../basics/GatsbyLinkWrapper';
import { Stat } from '../../basics/Stat';
import storybookMockUI from './storybook-mock-ui.svg';
import AtomicDesignLogoSVG from '../../../images/logos/user/logo-atomicdesign.svg';
import { Integrations } from './Integrations';

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

const ValueProp = styled(ValuePropCopy)`
  padding-top: 32rem;
  padding-bottom: 32rem;
  grid-column: 1 / 2;

  &:first-child {
    padding-top: 0;
  }
`;

const Content = styled.div`
  ${pageMargins};
  padding-top: 16rem;

  display: grid;
  grid-template-columns: minmax(320px, 1fr) 1fr;
  gap: 6rem;
`;

const StorybookDemo = styled.img`
  grid-column: 2 / 3;
  position: sticky;
  top: 4rem;
`;

const IntegrationsGrid = styled(Integrations)`
  grid-column: 2 / 3;
  position: sticky;
  top: 4rem;
`;

export function Develop({ startOpen, ...props }) {
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
        <StorybookDemo src={storybookMockUI} alt="" />
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
      </Content>
      <Content>
        <ValueProp
          inverse
          heading="Integrate with the tools you already use"
          description="Storybook is incrementally adoptable and integrates with industry-standard tools. That means your team doesn’t have to change their workflow."
          links={
            <Link containsIcon withArrow href="/why-storybook">
              Browse integrations
            </Link>
          }
          meta={
            <>
              <Stat count="400+" text="Integrations" noPlural />
              <Stat count="35M" text="Downloads per week" noPlural />
            </>
          }
        />
        <IntegrationsGrid />
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
};

Develop.defaultProps = {
  startOpen: false,
};
