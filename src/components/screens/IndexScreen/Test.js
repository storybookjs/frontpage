import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@storybook/theming';
import { ColoredIcons } from '@storybook/design-system';
import {
  styles,
  SectionLede,
  IllustratedFeatureList,
  Testimonial,
} from '@storybook/components-marketing';
import GatsbyLinkWrapper from '../../basics/GatsbyLinkWrapper';
import AirBnBLogoSVG from '../../../images/logos/user/logo-airbnb.svg';

const { breakpoints } = styles;

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

const features = [
  {
    icon: <ColoredIcons.Eye />,
    title: 'Spot test',
    description: 'Stories are tests you can debug in dev and QA.',
    link: { label: 'Learn about UI Tests', href: '#' },
    media: 'videos/test/homepage-spot-testing-lg.mp4',
    poster: 'videos/test/homepage-spot-testing-lg-poster-lg.jpg',
  },
  {
    icon: <ColoredIcons.Pixel />,
    title: 'Visual test appearance',
    description: 'Pinpoint UI changes down to the pixel.',
    link: { label: 'Learn about UI Tests', href: '#' },
    media: 'videos/test/homepage-visual-testing-lg.mp4',
    poster: 'videos/test/homepage-visual-testing-lg-poster-lg.jpg',
  },
  {
    icon: <ColoredIcons.Interact />,
    title: 'Interaction test behavior',
    description: 'Simulate user behavior and assert in the browser.',
    link: { label: 'Learn about UI Tests', href: '#' },
    media: 'videos/test/homepage-interaction-testing-lg.mp4',
    poster: 'videos/test/homepage-interaction-testing-lg-poster-lg.jpg',
  },
  {
    icon: <ColoredIcons.Accessibility />,
    title: 'Accessibility test',
    description: 'Check stories for WCAG and ARIA issues.',
    link: { label: 'Learn about UI Tests', href: '#' },
    media: 'videos/test/homepage-accessibility-testing-lg.mp4',
    poster: 'videos/test/homepage-accessibility-testing-lg-poster-lg.jpg',
  },
  {
    icon: <ColoredIcons.Code />,
    title: 'Snapshot test markup',
    description: 'Detect regressions in DOM markup.',
    link: { label: 'Learn about UI Tests', href: '#' },
    media: 'videos/test/homepage-snapshot-testing-lg.mp4',
    poster: 'videos/test/homepage-snapshot-testing-lg-poster-lg.jpg',
  },
  {
    icon: <ColoredIcons.Projects />,
    title: 'Reuse tests in other test tools',
    description: 'Write stories once to reuse across your test suite.',
    link: { label: 'Learn about UI Tests', href: '#' },
    media: 'videos/test/homepage-reuse-testing-lg.mp4',
    poster: 'videos/test/homepage-reuse-testing-lg-poster-lg.jpg',
  },
];

export function Test({ docs, ...props }) {
  return (
    <Wrapper {...props}>
      <SectionLede
        inverse
        heading="Test UIs with less effort and no flake"
        copy="Stories capture the “known good” states of UI components. They’re a pragmatic, reproducible way to keep track of UI edge cases. Reuse stories to power automated tests."
      />
      <IllustratedFeatureList inverse features={features} bgColor="#FDDD9C" />
      <Testimonial
        inverse
        text={
          <span>
            “The tool we use for editing UI is Storybook. It is the perfect place to make sure your
            work aligns with designs to the pixel across breakpoints.”
          </span>
        }
        avatarUrl="https://avatars2.githubusercontent.com/u/1247751?s=100&v=4"
        name="Adam Neary"
        jobTitle="Tech lead"
        logo={AirBnBLogoSVG}
      />
    </Wrapper>
  );
}

Test.propTypes = {
  docs: PropTypes.string.isRequired,
};
