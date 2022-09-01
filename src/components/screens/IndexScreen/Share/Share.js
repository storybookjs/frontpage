import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@storybook/theming';
import { Link } from '@storybook/design-system';
import { styles, SectionLede, ValuePropCopy, Testimonial } from '@storybook/components-marketing';
import { useInView } from 'framer-motion';
import CloudbeesLogoSVG from '../../../../images/logos/user/logo-cloudbees.svg';
import { useMediaQuery } from '../../../lib/useMediaQuery';
import { PublishIntegrations } from './PublishIntegrations';
import { TestIntegrations } from './TestIntegrations';
import { EmbedIntegrations } from './EmbedIntegrations';

const { typography, breakpoints, pageMargins, spacing, breakpoint, pageMargin } = styles;

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

const ValueProp = styled(ValuePropCopy)`
  grid-column: 1 / -1;

  &:first-of-type {
    padding-top: 0;
  }

  @media (max-width: ${breakpoints[1]}px) {
    max-width: 100%;
    padding-top: 4rem;
  }

  @media (min-width: ${breakpoints[2]}px) {
    grid-column: 1 / 2;
  }
`;

const Content = styled.div`
  ${pageMargins};
  padding-top: 3rem;
  padding-bottom: 1rem;

  display: grid;
  grid-template-columns: 1fr;
  grid-auto-flow: dense;
  justify-items: center;
  align-items: center;
  gap: 3rem;

  @media (min-width: ${breakpoints[2]}px) {
    padding-top: 7rem;
    justify-items: flex-start;
    grid-template-columns: minmax(max-content, 320px) 1fr;
    gap: 12rem 6rem;
  }
`;

const Code = styled.span`
  display: inline-block;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  font-family: ${typography.type.code};
  padding: 4px 7px;
  font-size: 80%;
  line-height: 1;
`;

export function Share({ docs, ...props }) {
  const publishRef = useRef(null);
  const embedRef = useRef(null);
  const testRef = useRef(null);
  const [step, setStep] = React.useState(0);
  const [greaterThanBreakpoint2] = useMediaQuery(`(min-width: ${breakpoints[2]}px)`);

  const publishInView = useInView(publishRef, { amount: 'full' });
  const embedInView = useInView(embedRef, { amount: 0.5 });
  const testInView = useInView(testRef, { amount: 0.5 });

  React.useEffect(() => {
    if (testInView) {
      setStep(2);
    } else if (embedInView) {
      setStep(1);
    } else if (publishInView) {
      setStep(0);
    }
  }, [publishInView, embedInView, testInView]);

  return (
    <Wrapper {...props}>
      <SectionLede
        inverse
        heading="Share how the UI actually works"
        copy="Stories show how UIs actually work not just a static design of how they're supposed to work. That keeps everyone aligned on what’s currently in production."
      />
      <Content>
        <ValueProp
          inverse
          heading="Publish Storybook to get sign off from teammates"
          description="Publish Storybook as a website for stakeholders to reference. Your team can check that the UI looks right without touching code."
          links={
            <Link containsIcon withArrow href="/why-storybook">
              Publish Storybook
            </Link>
          }
        />
        <PublishIntegrations
          ref={publishRef}
          isInView={step === 0}
          disableScrollAnimation={!greaterThanBreakpoint2}
        />

        <ValueProp
          inverse
          heading="Embed stories in wikis, Markdown, and Figma"
          description="Embed stories to showcase your work to teammates and the developer community. Works with the oEmbed standard."
          links={
            <Link containsIcon withArrow href="/why-storybook">
              Embed stories
            </Link>
          }
        />
        <EmbedIntegrations
          ref={embedRef}
          isInView={step === 1}
          disableScrollAnimation={!greaterThanBreakpoint2}
        />

        <ValueProp
          inverse
          heading={
            <>
              <Code>import</Code> stories into other JavaScript tooling
            </>
          }
          description="Stories are a portable standard based on ES6 modules. Write stories once and import them into any JavaScript library."
          links={
            <Link containsIcon withArrow href="/why-storybook">
              Reuse stories in tests and libraries
            </Link>
          }
        />
        <TestIntegrations
          ref={testRef}
          isInView={step === 2}
          disableScrollAnimation={!greaterThanBreakpoint2}
        />
      </Content>
      <Testimonial
        inverse
        text={
          <span>
            “Storybook is my go-to when starting a new design system. It makes getting something in
            place quick and easy for both design and engineering.”
          </span>
        }
        avatarUrl="https://avatars2.githubusercontent.com/u/8724083?s=460&v=4"
        name="Sarrah Vesselov"
        jobTitle="Author of Building Design Systems"
        logo={CloudbeesLogoSVG}
      />
    </Wrapper>
  );
}

Share.propTypes = {
  docs: PropTypes.string.isRequired,
};
