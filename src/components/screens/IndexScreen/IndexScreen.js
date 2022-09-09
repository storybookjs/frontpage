import PropTypes from 'prop-types';
import React, { useMemo, useRef } from 'react';
import { Global, css } from '@storybook/theming';
import { styles } from '@storybook/components-marketing';
import { useInView } from 'framer-motion';
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
  html {
    scroll-behavior: smooth;
  }
  body {
    background-color: ${styles.color.midnight};
  }
`;

export function PureIndexScreen({ projects, storybooks, npmDownloads }) {
  const { ogImage, urls = {} } = useSiteMetadata();
  const { home, docs = {} } = urls;

  const developRef = useRef(null);
  const developInView = useInView(developRef);

  const testRef = useRef(null);
  const testInView = useInView(testRef);

  const documentRef = useRef(null);
  const documentInView = useInView(documentRef);

  const shareRef = useRef(null);
  const shareInView = useInView(shareRef);

  const automateRef = useRef(null);
  const automateInView = useInView(automateRef);

  const whoRef = useRef(null);
  const whoInView = useInView(whoRef);

  const activeSection = useMemo(() => {
    if (whoInView) return 'who';
    if (automateInView) return 'automate';
    if (shareInView) return 'share';
    if (documentInView) return 'document';
    if (testInView) return 'test';
    return 'develop';
  }, [testInView, documentInView, shareInView, automateInView, whoInView]);

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
      <Hero npmDownloads={npmDownloads} id="page-hero" />
      <StickyNav docs={docs} activeSection={activeSection} />
      <div ref={developRef}>
        <Develop docs={docs} id="develop" />
      </div>
      <div ref={testRef}>
        <Test docs={docs} id="test" />
      </div>
      <div ref={documentRef}>
        <Document docs={docs} id="document" />
      </div>
      <div ref={shareRef}>
        <Share docs={docs} id="share" />
      </div>
      <div ref={automateRef}>
        <Automate docs={docs} id="automate" />
      </div>
      <div ref={whoRef}>
        <SocialValidation docs={docs} projects={projects} storybooks={storybooks} id="who" />
      </div>
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
    url: 'https://style.monday.com/',
    image: { src: 'images/home/storybooks/monday-com.webp', width: 1440, height: 1050 },
  },
  {
    name: 'Microsoft',
    logo: 'https://avatars.githubusercontent.com/u/6154722?v=4',
    url: 'https://master--628d031b55e942004ac95df1.chromatic.com/',
    image: { src: 'images/home/storybooks/microsoft.webp', width: 1440, height: 1050 },
  },
  {
    name: 'D2IQ',
    logo: 'https://avatars.githubusercontent.com/u/19392808?v=4',
    url: 'https://dcos-labs.github.io/ui-kit/',
    image: { src: 'images/home/storybooks/d2iq.webp', width: 1440, height: 1050 },
  },
  {
    name: 'Drei',
    logo: 'https://avatars.githubusercontent.com/u/45790596?v=4',
    url: 'https://drei.pmnd.rs/',
    image: { src: 'images/home/storybooks/drei.webp', width: 1440, height: 1050 },
  },
  {
    name: 'Shopify',
    logo: 'https://avatars.githubusercontent.com/u/8085?v=4',
    url: 'https://main--5d559397bae39100201eedc1.chromatic.com/',
    image: { src: 'images/home/storybooks/shopify.webp', width: 1440, height: 1050 },
  },
  {
    name: 'kickstartDS',
    logo: 'https://avatars.githubusercontent.com/u/79609753?v=4',
    url: 'https://www.kickstartds.com/storybook/',
    image: { src: 'images/home/storybooks/kickstart-ds.webp', width: 1440, height: 1050 },
  },
  {
    name: 'Grommet',
    logo: 'https://avatars.githubusercontent.com/u/14203820?v=4',
    url: 'https://master--5d9774839a6eff00203f5cbf.chromatic.com/',
    image: { src: 'images/home/storybooks/grommet.webp', width: 1440, height: 1050 },
  },
  {
    name: 'JSTOR',
    logo: 'https://avatars.githubusercontent.com/u/74469?v=4',
    url: 'https://develop--60919c26122bd50039b34644.chromatic.com/',
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
