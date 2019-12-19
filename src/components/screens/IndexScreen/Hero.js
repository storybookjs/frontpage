import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import GitHubButton from 'react-github-button';

import 'react-github-button/assets/style.css';

import {
  Button,
  Icon,
  Link,
  Subheading,
  WithModal,
  TooltipMessage,
  WithTooltip,
  styles,
} from '@storybook/design-system';

import { Cardinal, Video } from '../../basics';

import useSiteMetadata from '../../../lib/useSiteMetadata';
import PlaceholderAspectRatio from '../../layout/PlaceholderAspectRatio';
import NpmDownloadCount from '../../layout/NpmDownloadCount';

import ReactSVG from '../../../images/logos/framework/icon-react.svg';
import VueSVG from '../../../images/logos/framework/icon-vue.svg';
import AngularSVG from '../../../images/logos/framework/icon-angular.svg';
import EmberSVG from '../../../images/logos/framework/icon-ember.svg';
import HtmlSVG from '../../../images/logos/framework/icon-html.svg';
import SvelteSVG from '../../../images/logos/framework/icon-svelte.svg';
import MithrilSVG from '../../../images/logos/framework/icon-mithril.svg';
import RiotSVG from '../../../images/logos/framework/icon-riot.svg';

const { color, typography, breakpoint, pageMargins } = styles;

const ModalVideo = styled.iframe`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const ModalVideoWrapper = styled.div`
  box-shadow: rgba(0, 0, 0, 0.05) 0 10px 35px;
  border-radius: 10px;
  overflow: hidden;
  background: ${color.lightest};
`;

const AspectRatio = styled(PlaceholderAspectRatio)`
  ${ModalVideoWrapper}, ${ModalVideo} {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
`;

const Title = styled.h1`
  font-weight: ${typography.weight.black};

  font-size: ${typography.size.m3}px;
  line-height: 32px;
  margin-bottom: 0.5rem;

  @media (min-width: ${breakpoint * 1}px) {
    font-size: ${typography.size.l3}px;
    line-height: 52px;
    margin-bottom: 0.5rem;
  }

  @media (min-width: ${breakpoint * 2}px) {
    font-size: 56px;
    line-height: 60px;
    margin-bottom: 0.75rem;
  }
`;

const Subtitle = styled.div`
  font-size: ${typography.size.s3}px;
  line-height: 24px;
  margin-bottom: 1rem;

  @media (min-width: ${breakpoint * 1}px) {
    font-size: ${typography.size.m1}px;
    line-height: 32px;
    margin-bottom: 1.5rem;
  }
`;

const PitchActions = styled.div`
  > * {
    margin: 0 10px;
    width: 140px;
    @media (min-width: ${breakpoint * 1}px) {
      width: 180px;
    }
  }
`;

const Pitch = styled.div`
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  margin-bottom: 4rem;
  @media (min-width: ${breakpoint * 2}px) {
    margin-bottom: 5rem;
  }
`;

const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 66.66%;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.05) 0 10px 35px;
`;

const TooltipTargetStyle = css`
  position: absolute;
  height: 32px;
  width: 32px;
  transform: translate3d(-50%, -50%, 0);

  &:hover {
    &:before {
      box-shadow: rgba(0, 0, 0, 0.1) 0 1px 3px 0;
    }
  }

  &:before,
  &:after {
    border-radius: 1rem;
    content: '';
    display: block;
    position: absolute;
  }

  &:before {
    height: 37.5%;
    width: 37.5%;
    background: ${color.primary};
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    transition: all 200ms ease-out;
    z-index: 1;
  }

  &:after {
    height: 100%;
    width: 100%;
    background: ${color.primary};
    opacity: 0.2;
    z-index: 0;
  }
`;

const TooltipCanvas = styled(WithTooltip)`
  ${TooltipTargetStyle};
  left: 26.5%;
  top: 23.5%;
`;

const TooltipSidebar = styled(WithTooltip)`
  ${TooltipTargetStyle};
  left: 0;
  top: 42%;
`;

const TooltipAddons = styled(WithTooltip)`
  ${TooltipTargetStyle};
  left: 20.75%;
  top: 71%;
`;

const FrameworkLink = styled(Link)`
  text-transform: capitalize;
  display: inline-flex;
  vertical-align: top;
  align-items: center;
  font-size: ${typography.size.s2}px;
  line-height: 1rem;
  font-weight: ${typography.weight.bold};

  img {
    display: inline-block;
    vertical-align: top;
    height: 1rem;
    width: 1rem;
    margin-right: 10px;

    @media (min-width: ${breakpoint * 2}px) {
      margin-right: 15px;
    }
  }

  svg {
    margin-left: 5px;
    height: 0.7rem;
    width: 0.7rem;
    bottom: inherit;
  }
`;

const FrameworkItem = styled.div`
  display: flex;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0.75rem;

  @media (min-width: ${breakpoint * 2}px) {
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const FrameworkList = styled.div`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  ${FrameworkItem} {
    padding-right: 10px;
    width: 20%;
    min-width: 130px;
  }

  @media (min-width: ${breakpoint * 2}px) {
    flex-direction: column;

    ${FrameworkItem} {
      width: auto;
    }
  }
`;

const Stat = styled(Cardinal)`
  padding: 0;
  display: block;
`;

const NpmDownloadStat = styled(NpmDownloadCount)`
  padding: 0;
  display: block;
`;

const Stats = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  > * {
    flex: 1;
    margin-bottom: 1.25rem;
  }

  @media (min-width: ${breakpoint * 2}px) {
    flex-direction: column;
    align-items: flex-start;

    > * {
      margin-bottom: 1.25rem;
    }
  }
`;

const GitHubWrapper = styled.div`
  margin-bottom: 0.75rem;

  @media (min-width: ${breakpoint * 2}px) {
    ${'' /* this has a bit different styling than stats children */};
    margin-bottom: 1.25rem;
  }

  ${'' /* Overrides to make a medium-sized button */};
  .github-btn {
    font: bold 12px/14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
    display: block;

    height: auto;
    .gh-btn,
    .gh-count {
      padding: 2px 6px;
    }

    .gh-ico {
      height: 12px;
      width: 12px;
      margin-top: 1px;
    }
  }
`;

const SecondarySubheading = styled(Subheading)`
  font-size: 11px;
  display: block;
  color: ${color.mediumdark};
  margin-bottom: 1rem;
`;

const Primary = styled.div``;

const Secondary = styled.div`
  @media (min-width: ${breakpoint * 2}px) {
    position: sticky;
    top: 1rem;
  }
`;

const Content = styled.section`
  display: flex;
  flex-direction: column;

  @media (min-width: ${breakpoint * 2}px) {
    flex-direction: row;
    align-items: flex-start;
  }

  ${Primary} {
    flex: 1;
    margin-bottom: 3rem;

    @media (min-width: ${breakpoint * 2}px) {
      margin-right: 30px;
      margin-bottom: 0;
    }
  }
  ${Secondary} {
    flex: initial;
  }
`;

const Wrapper = styled.div`
  ${pageMargins};
  position: relative;
  top: 5vh;
  padding-top: 3rem;
  padding-bottom: 3rem;
  @media (min-width: ${breakpoint * 2}px) {
    padding-top: 5rem;
    padding-bottom: 7rem;
  }
`;

function Framework({ framework, ...props }) {
  let logoSVG;

  if (framework === 'React' || framework === 'React Native') {
    logoSVG = ReactSVG;
  } else if (framework === 'Vue') {
    logoSVG = VueSVG;
  } else if (framework === 'Angular') {
    logoSVG = AngularSVG;
  } else if (framework === 'Ember') {
    logoSVG = EmberSVG;
  } else if (framework === 'HTML') {
    logoSVG = HtmlSVG;
  } else if (framework === 'Svelte') {
    logoSVG = SvelteSVG;
  } else if (framework === 'Mithril') {
    logoSVG = MithrilSVG;
  } else if (framework === 'Riot') {
    logoSVG = RiotSVG;
  }

  return (
    <FrameworkItem>
      <FrameworkLink className="primary" {...props} withArrow>
        <img src={logoSVG} alt={framework} />
        <span>{framework}</span>
      </FrameworkLink>
    </FrameworkItem>
  );
}

Framework.propTypes = {
  framework: PropTypes.string.isRequired,
  // escape hatch if two differently named items have the same logo
  logo: PropTypes.string,
};

Framework.defaultProps = {
  logo: undefined,
};

export default function Hero({
  gitHubRepoData: { contributorCount, url: githubUrl, author, name },
  startOpen,
  ...props
}) {
  const { latestVersion, urls = {} } = useSiteMetadata();
  const { docsIntro = '', framework = {} } = urls;

  const Modal = () => (
    <AspectRatio ratio={0.5625}>
      <ModalVideoWrapper>
        <ModalVideo
          title="Chromatic intro video"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/p-LFh5Y89eM?autoplay=1&rel=0&amp;showinfo=0"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="chromatic-ignore"
        />
      </ModalVideoWrapper>
    </AspectRatio>
  );

  return (
    <Wrapper {...props}>
      <Pitch>
        <Title>Build bulletproof UI components faster</Title>
        <Subtitle>
          Storybook is an open source tool for developing UI components in isolation for React, Vue,
          and Angular. It makes building stunning UIs organized and efficient.
        </Subtitle>
        <PitchActions>
          <Button appearance="primary" isLink href={docsIntro}>
            Get Started
          </Button>
          <WithModal startOpen={startOpen} modal={Modal}>
            {({ onOpen }) => (
              <Button appearance="primaryOutline" onClick={onOpen}>
                <Icon icon="play" aria-hidden />
                Watch video
              </Button>
            )}
          </WithModal>
        </PitchActions>
      </Pitch>
      <Content>
        <Primary>
          <VideoWrapper>
            <Video src="/videos/storybook-hero-video-optimized.mp4" alt="Demo video" />
            <TooltipCanvas
              tagName="span"
              placement="bottom"
              trigger="hover"
              tooltip={
                <TooltipMessage
                  desc={
                    <>
                      <b>Build components in isolation</b> so that you can fine tune inputs, states,
                      and APIs before adding to your app.
                    </>
                  }
                />
              }
            >
              <div />
            </TooltipCanvas>
            <TooltipSidebar
              tagName="span"
              placement="bottom"
              trigger="hover"
              tooltip={
                <TooltipMessage
                  desc={
                    <>
                      <b>Save use cases as &ldquo;stories&rdquo;</b> to simplify finding, browsing,
                      and testing UI components.
                    </>
                  }
                />
              }
            >
              <div />
            </TooltipSidebar>
            <TooltipAddons
              tagName="span"
              placement="bottom"
              trigger="hover"
              tooltip={
                <TooltipMessage
                  desc={
                    <>
                      <b>Supercharge your workflow with addons</b> to help you find edge cases,
                      verify functionality, and much much more!
                    </>
                  }
                />
              }
            >
              <div />
            </TooltipAddons>
          </VideoWrapper>
        </Primary>
        <Secondary>
          <SecondarySubheading>Made for</SecondarySubheading>
          <FrameworkList>
            <Framework framework="React" href={framework.react} />
            <Framework framework="React Native" href={framework.reactNative} />
            <Framework framework="Vue" href={framework.vue} />
            <Framework framework="Angular" href={framework.angular} />
            <Framework framework="Ember" href={framework.ember} />
            <Framework framework="HTML" href={framework.html} />
            <Framework framework="Svelte" href={framework.svelte} />
            <Framework framework="Mithril" href={framework.mithril} />
            <Framework framework="Riot" href={framework.riot} />
          </FrameworkList>
          <SecondarySubheading>GitHub</SecondarySubheading>

          <Stats>
            <GitHubWrapper className="chromatic-ignore">
              <GitHubButton type="stargazers" namespace={author} repo={name} />
            </GitHubWrapper>
            <Stat
              size="small"
              count={latestVersion}
              text="Latest version"
              noPlural
              status="primary"
              countLink={`${githubUrl}/releases`}
            />
            <NpmDownloadStat className="chromatic-ignore" />
            <Stat
              size="small"
              count={`+${contributorCount}`}
              text="Contributors"
              noPlural
              status="tertiary"
              countLink={`${githubUrl}/graphs/contributors`}
            />
          </Stats>
        </Secondary>
      </Content>
    </Wrapper>
  );
}

Hero.propTypes = {
  gitHubRepoData: PropTypes.shape({
    contributorCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    url: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  startOpen: PropTypes.bool,
};

Hero.defaultProps = {
  startOpen: false,
};
