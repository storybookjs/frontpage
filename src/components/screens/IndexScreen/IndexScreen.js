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
import { Share } from './Share';
import { Automate } from './Automate/Automate';
import { SocialValidation } from './SocialValidation';

const globalStyles = css`
  body {
    background-color: ${styles.color.midnight};
  }
`;

export function PureIndexScreen({ projects, storybooks }) {
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

      <Hero />
      <Develop docs={docs} />
      <Test docs={docs} />
      <Document docs={docs} />
      <Share docs={docs} />
      <Automate docs={docs} />
      <SocialValidation docs={docs} projects={projects} storybooks={storybooks} />
    </>
  );
}

PureIndexScreen.propTypes = {};

export const projects = [
  {
    name: 'Design System',
    accentColor: {
      hex: '#4c35f5',
    },
    height: 288,
    width: 746,
    logoAlt: 'Monday.com',
    logoUrl: 'https://media.graphassets.com/BBM6cBTiTuLlPvAGtXab',
    projectUrl: 'https://storybook.js.org/showcase/mondaycom-vibe-design-system',
  },
  {
    name: 'Polaris',
    accentColor: {
      hex: '#377e62',
    },
    height: 33,
    width: 118,
    logoAlt: 'Shopify',
    logoUrl: 'https://media.graphassets.com/GNpyBL6rTJyyruBSsG4v',
    projectUrl: 'https://storybook.js.org/showcase/shopify-polaris-react',
  },
  {
    name: 'React Spectrum',
    accentColor: {
      hex: '#e03422',
    },
    height: 32,
    width: 130,
    logoAlt: 'Adobe',
    logoUrl: 'https://media.graphassets.com/voJpj5ySbjALyJ7RUlfw',
    projectUrl: 'https://storybook.js.org/showcase/adobe-spectrum-web-components',
  },
  {
    name: 'Psammead',
    accentColor: {
      hex: '#8F1F19',
    },
    height: 32,
    width: 120,
    logoAlt: 'BBC',
    logoUrl: 'https://media.graphassets.com/To5iQm5VRRGdr5upBBml',
    projectUrl: 'https://storybook.js.org/showcase/bbc-psammead',
  },
  {
    name: 'UI React',
    accentColor: {
      hex: '#000000',
    },
    height: 99,
    width: 284,
    logoAlt: 'Audi',
    logoUrl: 'https://media.graphassets.com/rdYLCbE5Qgm5xGeUfxxJ',
    projectUrl: 'https://storybook.js.org/showcase/audi-ui-react',
  },
  {
    name: 'Gutenberg',
    accentColor: {
      hex: '#3171A6',
    },
    height: 80,
    width: 80,
    logoAlt: 'WordPress',
    logoUrl: 'https://media.graphassets.com/b6N8K1VSuym28UndT2wW',
    projectUrl: 'https://storybook.js.org/showcase/wordpress-gutenberg',
  },
];

export const storybooks = [
  {
    name: 'D2IQ',
    logo: 'https://via.placeholder.com/280',
    image: { src: 'images/home/storybooks/d2iq.png', width: 957, height: 681 },
  },
  {
    name: 'Drei',
    logo: 'https://via.placeholder.com/280',
    image: { src: 'images/home/storybooks/drei.png', width: 957, height: 681 },
  },
  {
    name: 'Grommet',
    logo: 'https://via.placeholder.com/280',
    image: { src: 'images/home/storybooks/grommet.png', width: 957, height: 681 },
  },
  {
    name: 'JSTOR',
    logo: 'https://via.placeholder.com/280',
    image: { src: 'images/home/storybooks/jstor.png', width: 957, height: 681 },
  },
  {
    name: 'kickstartDS',
    logo: 'https://via.placeholder.com/280',
    image: { src: 'images/home/storybooks/kickstart-ds.png', width: 957, height: 681 },
  },
  {
    name: 'Microsoft',
    logo: 'https://via.placeholder.com/280',
    image: { src: 'images/home/storybooks/microsoft.png', width: 957, height: 681 },
  },
  {
    name: 'Monday.com',
    logo: 'https://via.placeholder.com/280',
    image: { src: 'images/home/storybooks/monday-com.png', width: 957, height: 681 },
  },
  {
    name: 'Shopify',
    logo: 'https://via.placeholder.com/280',
    image: { src: 'images/home/storybooks/shopify.png', width: 957, height: 681 },
  },
];

export default function IndexScreen(props) {
  return <PureIndexScreen {...props} projects={projects} storybooks={storybooks} />;
}
