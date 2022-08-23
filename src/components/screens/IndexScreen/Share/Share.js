import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@storybook/theming';
import { Link } from '@storybook/design-system';
import { styles, SectionLede, ValuePropCopy, Testimonial } from '@storybook/components-marketing';
import CloudbeesLogoSVG from '../../../../images/logos/user/logo-cloudbees.svg';
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
  grid-column: 1 / 2;

  &:first-of-type {
    padding-top: 0;
  }
`;

const Content = styled.div`
  ${pageMargins};
  padding-top: 7rem;
  padding-bottom: 1rem;

  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  gap: 12rem 6rem;

  @media (min-width: ${breakpoints[2]}px) {
    justify-items: flex-start;
    grid-template-columns: minmax(max-content, 320px) 1fr;
  }
`;

const Code = styled.span`
  display: inline-block;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  font-family: ${typography.type.code};
  padding: 4px 7px;
  font-size: 22px;
  line-height: 22px;
`;

export function Share({ docs, ...props }) {
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
        <img
          src="images/home/storybook-mock-ui.svg"
          alt=""
          style={{ width: '100%', display: 'block' }}
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
        <EmbedIntegrations />
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
        <TestIntegrations />
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
