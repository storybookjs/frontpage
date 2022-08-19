import PropTypes from 'prop-types';
import React from 'react';
import { Nav, LinksContextProvider, Eyebrow } from '@storybook/components-marketing';
import { Link as GatsbyLinkWrapper } from 'gatsby';

const navLinks = {
  home: { url: '/', linkWrapper: GatsbyLinkWrapper },
  whyStorybook: { url: '/why', linkWrapper: GatsbyLinkWrapper },
  useCases: { url: '/use-cases', linkWrapper: GatsbyLinkWrapper },
  caseStudies: { url: '/case-studies', linkWrapper: GatsbyLinkWrapper },
  componentDriven: { url: 'https://componentdriven.org' },
  getStarted: { url: '/docs', linkWrapper: GatsbyLinkWrapper },
  guides: { url: '/docs/guides', linkWrapper: GatsbyLinkWrapper },
  tutorials: { url: 'https://storybook.js.org/tutorials' },
  api: { url: '/docs/api', linkWrapper: GatsbyLinkWrapper },
  changelog: { url: '/changelog', linkWrapper: GatsbyLinkWrapper },
  telemetry: { url: '/telemetry', linkWrapper: GatsbyLinkWrapper },
  showcase: { url: 'https://storybook.js.org/showcase' },
  projects: { url: 'https://storybook.js.org/showcase/projects' },
  componentGlossary: { url: 'https://storybook.js.org/showcase/glossary' },
  integrations: { url: '/integrations', linkWrapper: GatsbyLinkWrapper },
  getInvolved: { url: '/get-involved', linkWrapper: GatsbyLinkWrapper },
  blog: { url: 'https://storybook.js.org/blog' },
  hiring: { url: 'https://www.chromatic.com/company/jobs' },
};

export const Header = ({ inverse, label, link }) => {
  return (
    <LinksContextProvider value={navLinks}>
      <Eyebrow label={label} link={link} inverse={inverse} />
      <Nav inverse={inverse} />
    </LinksContextProvider>
  );
};

Header.propTypes = {
  inverse: PropTypes.bool,
  label: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

Header.defaultProps = {
  inverse: false,
};
