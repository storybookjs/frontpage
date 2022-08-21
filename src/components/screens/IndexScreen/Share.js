import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@storybook/theming';
import { Link } from '@storybook/design-system';
import {
  styles,
  SectionLede,
  ValuePropCopy,
  Testimonial,
  IntegrationsCarousel,
} from '@storybook/components-marketing';
import GatsbyLinkWrapper from '../../basics/GatsbyLinkWrapper';
import CloudbeesLogoSVG from '../../../images/logos/user/logo-cloudbees.svg';
import storybookMockUI from './storybook-mock-ui.svg';

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

const Illustration = styled.div`
  width: 100%;

  @media (min-width: ${breakpoints[2]}px) {
    grid-column: 2 / 3;
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

const IntegrationDemo = styled.div`
  width: 400px;
  height: 300px;
  border: 1px dashed #999;
  color: #999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EmbedPane = styled.img`
  display: block;
  width: 100%;
  height: auto;
`;

const EmbedIntegrationsCarousel = styled(IntegrationsCarousel)`
  @media (min-width: ${breakpoint * 1}px) {
    margin-right: -${pageMargin * 1}vw;
  }
  @media (min-width: ${breakpoint * 2}px) {
    margin-right: -${pageMargin * 2}vw;
  }
  @media (min-width: ${breakpoint * 3}px) {
    margin-right: -${pageMargin * 3}vw;
  }
  @media (min-width: ${breakpoint * 4}px) {
    margin-right: -${pageMargin * 4}vw;
  }
`;

const embedIntegrations = [
  {
    name: 'NextJS',
    image: '/images/home/next-js.svg',
    color: '#000',
    media: (
      <EmbedPane
        src="/images/embed/next.svg"
        alt="Embed stories using iframes in your NextJS sites"
        width="1202"
        height="910"
        loading="lazy"
      />
    ),
  },
  {
    name: 'Figma',
    image: '/images/home/figma.svg',
    color: '#000',
    media: (
      <EmbedPane
        src="/images/embed/figma.svg"
        alt="Use the Storybook Connect plugin to embed stories in a Figma file"
        width="1202"
        height="910"
        loading="lazy"
      />
    ),
  },
  {
    name: 'Notion',
    image: '/images/home/notion.svg',
    color: '#fff',
    media: (
      <EmbedPane
        src="/images/embed/notion.svg"
        alt="Embed stories in Notion documents using the oEmbed support"
        width="1202"
        height="910"
        loading="lazy"
      />
    ),
  },
  {
    name: 'Medium',
    image: '/images/home/medium.svg',
    color: '#F5C347',
    media: (
      <EmbedPane
        src="/images/embed/medium.svg"
        alt="Embed stories in Medium articles using the oEmbed support"
        width="1202"
        height="910"
        loading="lazy"
      />
    ),
  },
];

const testIntegrations = [
  {
    name: 'Jest',
    image: '/images/home/jest.svg',
    color: '#99424F',
    media: <IntegrationDemo>Jest</IntegrationDemo>,
  },
  {
    name: 'Testing Library',
    image: '/images/home/testing-lib.png',
    color: '#E3F3FF',
    media: <IntegrationDemo>Testing Library</IntegrationDemo>,
  },
  {
    name: 'Playwright',
    image: '/images/home/playwright.svg',
    color: '#2D3751',
    media: <IntegrationDemo>Playwright</IntegrationDemo>,
  },
  {
    name: 'Cypress',
    image: '/images/home/cypress.svg',
    color: '#3C3C3C',
    media: <IntegrationDemo>Cypress</IntegrationDemo>,
  },
  {
    name: 'Jasmine',
    image: '/images/home/jasmine.svg',
    color: '#8A4182',
    media: <IntegrationDemo>Jasmine</IntegrationDemo>,
  },
];

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
        {/* <IntegrationsCarousel integrations={embedIntegrations} overflowLabel="+ and more" /> */}
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
        <EmbedIntegrationsCarousel integrations={embedIntegrations} overflowLabel="+ and more" />
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
        <IntegrationsCarousel integrations={testIntegrations} overflowLabel="+ and more" />
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
