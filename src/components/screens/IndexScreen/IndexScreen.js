import PropTypes from 'prop-types';
import React from 'react';
import { Global, css } from '@storybook/theming';
import { styles } from '@storybook/components-marketing';
import useSiteMetadata from '../../lib/useSiteMetadata';
import { SocialGraph } from '../../basics';
import { Hero } from './Hero';
import { Develop } from './Develop';
import { Test } from './Test';
import { Document } from './Document';
import { Share } from './Share/Share';
import { Automate } from './Automate/Automate';
import { SocialValidation } from './SocialValidation';
import { StickyNav } from './StickyNav';

const globalStyles = css`
  body {
    background-color: ${styles.color.midnight};
  }
`;

export function PureIndexScreen({ projects, storybooks, npmDownloads }) {
  const { ogImage, urls = {} } = useSiteMetadata();
  const { home, docs = {} } = urls;
  return (
    <>
      <Global styles={globalStyles} />
      <SocialGraph
        title="Storybook: UI component explorer for frontend developers"
        desc="Storybook is an open source tool for building UI components and pages in isolation. It
          streamlines UI development, testing, and documentation."
        url={home}
        image={ogImage}
      />
      <Hero npmDownloads={npmDownloads} />
      <StickyNav />
      <Develop docs={docs} />
      <Test docs={docs} />
      <Document docs={docs} />
      <Share docs={docs} />
      <Automate docs={docs} />
      <SocialValidation docs={docs} projects={projects} storybooks={storybooks} />
    </>
  );
}

PureIndexScreen.propTypes = {
  npmDownloads: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  projects: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  storybooks: PropTypes.array.isRequired,
};

export const storybooks = [
  {
    name: 'Monday.com',
    logo: 'https://avatars.githubusercontent.com/u/61420283?v=4',
    image: { src: 'images/home/storybooks/monday-com.webp', width: 1440, height: 1050 },
  },
  {
    name: 'Microsoft',
    logo: 'https://avatars.githubusercontent.com/u/6154722?v=4',
    image: { src: 'images/home/storybooks/microsoft.webp', width: 1440, height: 1050 },
  },
  {
    name: 'D2IQ',
    logo: 'https://avatars.githubusercontent.com/u/19392808?v=4',
    image: { src: 'images/home/storybooks/d2iq.webp', width: 1440, height: 1050 },
  },
  {
    name: 'Drei',
    logo: 'https://avatars.githubusercontent.com/u/45790596?v=4',
    image: { src: 'images/home/storybooks/drei.webp', width: 1440, height: 1050 },
  },
  {
    name: 'Shopify',
    logo: 'https://avatars.githubusercontent.com/u/8085?v=4',
    image: { src: 'images/home/storybooks/shopify.webp', width: 1440, height: 1050 },
  },
  {
    name: 'kickstartDS',
    logo: 'https://avatars.githubusercontent.com/u/79609753?v=4',
    image: { src: 'images/home/storybooks/kickstart-ds.webp', width: 1440, height: 1050 },
  },
  {
    name: 'Grommet',
    logo: 'https://avatars.githubusercontent.com/u/14203820?v=4',
    image: { src: 'images/home/storybooks/grommet.webp', width: 1440, height: 1050 },
  },
  {
    name: 'JSTOR',
    logo: 'https://avatars.githubusercontent.com/u/74469?v=4',
    image: { src: 'images/home/storybooks/jstor.webp', width: 1440, height: 1050 },
  },
];

export default function IndexScreen({ projects, npmDownloads, ...props }) {
  return (
    <PureIndexScreen
      {...props}
      projects={projects}
      storybooks={storybooks}
      npmDownloads={npmDownloads}
    />
  );
}
