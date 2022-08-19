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
      <Document docs={docs} />
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

export const storybooks = [
  {
    name: 'D2IQ',
    logo: 'https://avatars.githubusercontent.com/u/19392808?v=4',
    image: { src: 'images/home/storybooks/d2iq.png', width: 957, height: 681 },
  },
  {
    name: 'Drei',
    logo: 'https://avatars.githubusercontent.com/u/45790596?v=4',
    image: { src: 'images/home/storybooks/drei.png', width: 957, height: 681 },
  },
  {
    name: 'Grommet',
    logo: 'https://avatars.githubusercontent.com/u/14203820?v=4',
    image: { src: 'images/home/storybooks/grommet.png', width: 957, height: 681 },
  },
  {
    name: 'JSTOR',
    logo: 'https://avatars.githubusercontent.com/u/74469?v=4',
    image: { src: 'images/home/storybooks/jstor.png', width: 957, height: 681 },
  },
  {
    name: 'kickstartDS',
    logo: 'https://avatars.githubusercontent.com/u/79609753?v=4',
    image: { src: 'images/home/storybooks/kickstart-ds.png', width: 957, height: 681 },
  },
  {
    name: 'Microsoft',
    logo: 'https://avatars.githubusercontent.com/u/6154722?v=4',
    image: { src: 'images/home/storybooks/microsoft.png', width: 957, height: 681 },
  },
  {
    name: 'Monday.com',
    logo: 'https://avatars.githubusercontent.com/u/61420283?v=4',
    image: { src: 'images/home/storybooks/monday-com.png', width: 957, height: 681 },
  },
  {
    name: 'Shopify',
    logo: 'https://avatars.githubusercontent.com/u/8085?v=4',
    image: { src: 'images/home/storybooks/shopify.png', width: 957, height: 681 },
  },
];

export default function IndexScreen({ projects, ...props }) {
  return <PureIndexScreen {...props} projects={projects} storybooks={storybooks} />;
}
