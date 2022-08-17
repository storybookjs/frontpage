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
    icon: <ColoredIcons.Search />,
    title: 'Find any component or page in your app',
    description: 'Storybook is a single source of truth for UI.',
    link: { label: 'Learn about search', href: '#' },
    media: 'videos/document/homepage-search-stories-lg.mp4',
    poster: 'videos/document/homepage-search-stories-poster-lg.jpg',
  },
  {
    icon: <ColoredIcons.Document />,
    title: 'Generate UI docs automatically',
    description: 'Write Markdown and build custom docs.',
    link: { label: 'Learn about docs addon', href: '#' },
    media: 'videos/document/homepage-component-document-lg.mp4',
    poster: 'videos/document/homepage-component-document-poster-lg.jpg',
  },
  {
    icon: <ColoredIcons.Overlap />,
    title: 'Reuse components across pages and apps',
    description: 'Every story is a use case that you can reuse.',
    link: { label: 'Learn about reuse', href: '#' },
    media: 'videos/document/homepage-reuse-components-across-apps-lg.mp4',
    poster: 'videos/document/homepage-reuse-components-across-apps-poster-lg.jpg',
  },
  {
    icon: <ColoredIcons.Branch />,
    title: 'Track component history and versions',
    description: 'QA unexpected bugs by going back in time.',
    link: { label: 'Learn about versioning', href: '#' },
    media: 'videos/document/homepage-component-history-lg.mp4',
    poster: 'videos/document/homepage-component-history-poster-lg.jpg',
  },
];

export function Document({ docs, ...props }) {
  return (
    <Wrapper {...props}>
      <SectionLede
        inverse
        heading="Document UI for your team to reuse"
        copy="Storybook brings together UI, examples, and documentation in one place. That helps your team adopt existing UI patterns."
      />
      <IllustratedFeatureList inverse alignment="right" features={features} bgColor="#B8EFA7" />
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

Document.propTypes = {
  docs: PropTypes.string.isRequired,
};
