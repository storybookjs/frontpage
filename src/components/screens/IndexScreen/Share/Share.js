import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@storybook/theming';
import { Link } from '@storybook/design-system';
import { styles, SectionLede, ValuePropCopy, Testimonial } from '@storybook/components-marketing';
import { useScroll, useSpring, useTransform } from 'framer-motion';
import { useDebouncedCallback } from 'use-debounce';
import CloudbeesLogoSVG from '../../../../images/logos/user/logo-cloudbees.svg';
import { PublishIntegrations } from './PublishIntegrations';
import { TestIntegrations } from './TestIntegrations';
import { EmbedIntegrations } from './EmbedIntegrations';
import GatsbyLinkWrapper from '../../../basics/GatsbyLinkWrapper';

const { typography, breakpoints, pageMargins } = styles;

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

const isBrowser = typeof window !== 'undefined';

export function Share({ docs, ...props }) {
  const publishRef = useRef(null);
  const embedRef = useRef(null);
  const testRef = useRef(null);

  const { scrollYProgress: publishYProgress } = useScroll({
    target: embedRef,
    offset: ['0.25 1', '0 0.5'],
  });
  const smoothPublishProgress = useSpring(publishYProgress, {
    stiffness: 1000,
    damping: 100,
  });

  const { scrollYProgress: testYProgress } = useScroll({
    target: testRef,
    offset: ['1 1', '0 0.5'],
  });
  const smoothTestProgress = useSpring(testYProgress, {
    stiffness: 1000,
    damping: 100,
  });

  const [delta, setDelta] = useState({
    x: '0px',
    y: '0px',
    scale: 1,
  });

  const handleResize = useDebouncedCallback(function handleResize() {
    const embed = embedRef.current.getBoundingClientRect();
    const publish = publishRef.current.getBoundingClientRect();
    const test = testRef.current.getBoundingClientRect();

    const deltaX1 = embed.left - publish.left;
    const deltaX2 = test.left - publish.left;
    const deltaY1 = embed.top - publish.top;
    const deltaY2 = test.top - publish.top;
    const scale1 = embed.width / publish.width;
    const scale2 = test.width / publish.width;

    setDelta({ x: [deltaX1, deltaX2], y: [deltaY1, deltaY2], scale: [scale1, scale2] });
  }, 200);

  useEffect(() => {
    if (!isBrowser || !publishRef.current || !embedRef.current) {
      return () => {};
    }

    global.window.addEventListener('resize', handleResize);

    global.window.setTimeout(handleResize, 1000);
    return () => global.window.removeEventListener('resize', handleResize);
  }, [publishRef, embedRef]);

  const scrollProgress = useTransform(
    [smoothPublishProgress, smoothTestProgress],
    ([latestPublishProgress, latestTestProgress]) => latestPublishProgress + latestTestProgress
  );

  const x = useTransform(scrollProgress, [0, 1, 2], ['0%', `${delta.x[0]}px`, `${delta.x[1]}px`]);
  const y = useTransform(scrollProgress, [0, 1, 2], ['0%', `${delta.y[0]}px`, `${delta.y[1]}px`]);
  const scale = useTransform(scrollProgress, [0, 1, 2], [1, delta.scale[0], delta.scale[1]]);
  const opacity = useTransform(scrollProgress, [0, 1, 2], [1, 1, 0]);

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
            <Link
              containsIcon
              withArrow
              href="/docs/react/sharing/publish-storybook"
              LinkWrapper={GatsbyLinkWrapper}
            >
              Publish Storybook
            </Link>
          }
        />
        <PublishIntegrations
          ref={publishRef}
          timeFrameStyles={{ x, y, scale, opacity, transformOrigin: 'top left' }}
        />

        <ValueProp
          inverse
          heading="Embed stories in wikis, Markdown, and Figma"
          description="Embed stories to showcase your work to teammates and the developer community. Works with the oEmbed standard."
          links={
            <Link
              containsIcon
              withArrow
              href="/docs/react/sharing/embed"
              LinkWrapper={GatsbyLinkWrapper}
            >
              Embed stories
            </Link>
          }
        />
        <EmbedIntegrations ref={embedRef} />

        <ValueProp
          inverse
          heading={
            <>
              <Code>import</Code> stories into other JavaScript tooling
            </>
          }
          description="Stories are a portable standard based on ES6 modules. Write stories once and import them into any JavaScript library."
          links={
            <Link
              containsIcon
              withArrow
              href="/docs/react/writing-tests/importing-stories-in-tests"
              LinkWrapper={GatsbyLinkWrapper}
            >
              Reuse stories in tests and libraries
            </Link>
          }
        />
        <TestIntegrations ref={testRef} />
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
