import PropTypes from 'prop-types';
import React, { useMemo, useRef } from 'react';
import { Global, css, styled } from '@storybook/theming';
import { global } from '@storybook/design-system';
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
  body {
    background-color: #0e0c2c;
  }
`;

export const storybooks = [
  {
    name: 'Monday.com',
    logo: 'https://avatars.githubusercontent.com/u/61420283?v=4',
    url: 'https://style.monday.com/',
    image: { src: '/images/home/storybooks/monday-com.webp', width: 1440, height: 1050 },
  },
  {
    name: 'Microsoft',
    logo: 'https://avatars.githubusercontent.com/u/6154722?v=4',
    url: 'https://master--628d031b55e942004ac95df1.chromatic.com/',
    image: { src: '/images/home/storybooks/microsoft.webp', width: 1440, height: 1050 },
  },
  {
    name: 'D2IQ',
    logo: 'https://avatars.githubusercontent.com/u/19392808?v=4',
    url: 'http://design-system.d2iq.com/',
    image: { src: '/images/home/storybooks/d2iq.webp', width: 1440, height: 1050 },
  },
  {
    name: 'Drei',
    logo: 'https://avatars.githubusercontent.com/u/45790596?v=4',
    url: 'https://drei.pmnd.rs/',
    image: { src: '/images/home/storybooks/drei.webp', width: 1440, height: 1050 },
  },
  {
    name: 'Shopify',
    logo: 'https://avatars.githubusercontent.com/u/8085?v=4',
    url: 'https://main--5d559397bae39100201eedc1.chromatic.com/',
    image: { src: '/images/home/storybooks/shopify.webp', width: 1440, height: 1050 },
  },
  {
    name: 'kickstartDS',
    logo: 'https://avatars.githubusercontent.com/u/79609753?v=4',
    url: 'https://www.kickstartds.com/storybook/',
    image: { src: '/images/home/storybooks/kickstart-ds.webp', width: 1440, height: 1050 },
  },
  {
    name: 'Grommet',
    logo: 'https://avatars.githubusercontent.com/u/14203820?v=4',
    url: 'https://master--5d9774839a6eff00203f5cbf.chromatic.com/',
    image: { src: '/images/home/storybooks/grommet.webp', width: 1440, height: 1050 },
  },
  {
    name: 'JSTOR',
    logo: 'https://avatars.githubusercontent.com/u/74469?v=4',
    url: 'https://develop--60919c26122bd50039b34644.chromatic.com/',
    image: { src: '/images/home/storybooks/jstor.webp', width: 1440, height: 1050 },
  },
];

const Clip = styled.div`
  contain: paint;
`;

const Content = styled.div`
  position: relative;
  z-index: 4;
`;

const Texture = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  z-index: 3;
  background: url('/images/home/texture.png'), 180px 100px repeat;
  background-size: 180px 100px;
  opacity: 0.6;
  mix-blend-mode: color-dodge;
`;

const Circles = styled.div`
  position: absolute;
  width: 100%;
  min-height: 1600px;
  overflow-x: hidden;
  overflow-y: visible;
  top: 0;
  left: 0;
`;

const CirclePink = styled.div`
  position: absolute;
  flex-shrink: 0;
  border-radius: 928px;
  opacity: 0.6;
  background: #ff4785;
  filter: blur(72px);
  z-index: 2;

  width: 500px;
  height: 500px;
  top: -300px;
  left: -160px;

  @media (min-width: 600px) {
    width: 700px;
    height: 700px;
    top: -300px;
    left: -160px;
  }

  @media (min-width: 960px) {
    width: 928px;
    height: 928px;
    top: -500px;
    left: -100px;
  }

  @media (min-width: 1440px) {
    width: 1100px;
    height: 1100px;
    top: -720px;
    left: 4%;
  }

  @media (min-width: 2200px) {
    left: 14%;
  }
`;

const CircleOrange = styled.div`
  position: absolute;
  flex-shrink: 0;
  border-radius: 740px;
  opacity: 0.6;
  background: #fc521f;
  filter: blur(72px);
  z-index: 1;

  width: 400px;
  height: 400px;
  top: -220px;
  left: 200px;

  @media (min-width: 600px) {
    width: 600px;
    height: 600px;
    top: -260px;
    left: 360px;
  }

  @media (min-width: 960px) {
    width: 740px;
    height: 740px;
    top: -420px;
    left: 480px;
  }

  @media (min-width: 1440px) {
    left: 40%;
  }

  @media (min-width: 2200px) {
    left: 44%;
  }
`;

const CircleBlue = styled.div`
  position: absolute;
  flex-shrink: 0;
  border-radius: 1192px;
  opacity: 0.4;
  background: #4791ff;
  filter: blur(72px);
  z-index: 1;

  width: 600px;
  height: 600px;
  top: 160px;
  left: 200px;

  @media (min-width: 600px) {
    top: 220px;
    left: 400px;
  }

  @media (min-width: 960px) {
    width: 1192px;
    height: 1192px;
    top: 210px;
    left: 560px;
  }

  @media (min-width: 1440px) {
    left: 40%;
  }
`;

const { GlobalStyle } = global;

export function IndexScreen({ pageContext }) {
  const {
    projects,
    npmDownloads,
    twitterFollowerCount,
    discordMemberCount,
    githubContributorCount,
    youTubeSubscriberCount,
  } = pageContext;

  const { ogImageHome, urls = {} } = useSiteMetadata();
  const { home, docs = {} } = urls;

  const developRef = useRef(null);
  const developInView = useInView(developRef, { margin: '0px 0px -100% 0px' });

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
    if (developInView) return 'develop';
    return null;
  }, [developInView, testInView, documentInView, shareInView, automateInView, whoInView]);

  return (
    <>
      <GlobalStyle />
      <Global styles={globalStyles} />
      <SocialGraph
        title="Storybook: Frontend workshop for UI development"
        desc="Storybook is a frontend workshop for building UI components and pages in isolation. Thousands of teams use it for UI development, testing, and documentation. It’s open source and free."
        url={home}
        image={ogImageHome}
      />
      <Content>
        <Hero npmDownloads={npmDownloads} contributorCount={githubContributorCount} />
        <StickyNav isVisible={!!activeSection} docs={docs} activeSection={activeSection} />
        <Clip ref={developRef}>
          <Develop docs={docs} id="develop" />
        </Clip>
        <div ref={testRef}>
          <Test docs={docs} id="test" />
        </div>
        <div ref={documentRef}>
          <Document docs={docs} id="document" />
        </div>
        <div ref={shareRef}>
          <Share docs={docs} id="share" />
        </div>
        <Clip ref={automateRef}>
          <Automate docs={docs} id="automate" />
        </Clip>
        <div ref={whoRef}>
          <SocialValidation
            docs={docs}
            projects={projects}
            storybooks={storybooks}
            id="who"
            twitterFollowerCount={twitterFollowerCount}
            discordMemberCount={discordMemberCount}
            githubContributorCount={githubContributorCount}
            youTubeSubscriberCount={youTubeSubscriberCount}
          />
        </div>
      </Content>
      <Texture />
      Fart
      <Circles>
        <CirclePink />
        <CircleOrange />
        <CircleBlue />
      </Circles>
    </>
  );
}

IndexScreen.propTypes = {
  pageContext: PropTypes.shape({
    npmDownloads: PropTypes.number.isRequired,
    twitterFollowerCount: PropTypes.number.isRequired,
    discordMemberCount: PropTypes.number.isRequired,
    githubContributorCount: PropTypes.number.isRequired,
    youTubeSubscriberCount: PropTypes.number.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    projects: PropTypes.array.isRequired,
  }).isRequired,
};

export default IndexScreen;
