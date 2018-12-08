import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import GitHubButton from 'react-github-button';

import 'react-github-button/assets/style.css';

import { color, typography, breakpoint, pageMargins } from './../shared/styles';
import { glow } from './../shared/animation';
import { url } from './../shared/urls';
import Link from './Link';
import Button from './Button';
import Icon from './Icon';
import Subheading from './Subheading';
import Cardinal from './Cardinal';
import WithTooltip from './tooltip/WithTooltip';
import TooltipMessage from './tooltip/TooltipMessage';

const Title = styled.div`
  font-weight: ${typography.weight.black};

  font-size: ${typography.size.m2}px;
  line-height: 28px;
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
  margin-bottom: 3rem;
  @media (min-width: ${breakpoint * 2}px) {
    margin-bottom: 4rem;
  }
`;

const Video = styled.video`
  width: 100%;
  height: auto;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.05) 0 10px 35px;
  overflow: hidden;
`;

const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 66.66%;
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
    height: 1rem;
    width: 1rem;
    margin-right: 10px;
    @media (min-width: ${breakpoint * 2}px) {
      margin-right: 15px;
    }
  }

  span {
    height: 1rem;
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
  }

  @media (min-width: ${breakpoint * 2}px) {
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
`;

function Framework({ framework, logo, ...props }) {
  return (
    <FrameworkItem>
      <FrameworkLink className="primary" {...props}>
        <img
          src={
            logo
              ? `images/logos/framework/icon-${logo}.svg`
              : `images/logos/framework/icon-${framework.toLowerCase()}.svg`
          }
          alt={framework}
        />
        <span>{framework}</span>
        <Icon icon="arrowright" />
      </FrameworkLink>
    </FrameworkItem>
  );
}

Framework.propTypes = {
  framework: PropTypes.string.isRequired,
};

export default function Hero({ ...props }) {
  const [namespace, repo] = url.gitHub.repo.match(/github.com\/(.*)\/(.*)$/).slice(1);
  return (
    <Wrapper {...props}>
      <Pitch>
        <Title>Build bulletproof UI components faster</Title>
        <Subtitle>
          Storybook is an open source tool for developing UI components in isolation for React, Vue,
          and Angular. It makes building stunning UIs organized and efficient.
        </Subtitle>
        <PitchActions>
          <Button primary isLink href="www.google.com">
            Get Started
          </Button>
          <Button outline primary>
            <Icon icon="play" />
            Watch video
          </Button>
        </PitchActions>
      </Pitch>
      <Content>
        <Primary>
          <VideoWrapper>
            <Video autoPlay muted loop playsInline alt="Demo video">
              <source src="/videos/storybook-hero-video-optimized.mp4" type="video/mp4" />
            </Video>
            <TooltipCanvas
              placement="bottom"
              trigger="click"
              tooltip={
                <TooltipMessage
                  desc=<Fragment>
                    <b>Build components in isolation</b> so that you can fine tune inputs, states,
                    and APIs before adding to your app.
                  </Fragment>
                />
              }
            >
              <div />
            </TooltipCanvas>
            <TooltipSidebar
              placement="bottom"
              trigger="click"
              tooltip={
                <TooltipMessage
                  desc={
                    <Fragment>
                      <b>Save use cases as "stories"</b> to simplify finding, browsing, and testing
                      UI components.
                    </Fragment>
                  }
                />
              }
            >
              <div />
            </TooltipSidebar>
            <TooltipAddons
              placement="bottom"
              trigger="click"
              tooltip={
                <TooltipMessage
                  desc=<Fragment>
                    <b>Supercharge your workflow with addons</b> to help you find edge cases, verify
                    functionality, and much much more!
                  </Fragment>
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
            <Framework framework="React" href={url.framework.react} />
            <Framework framework="React Native" logo="react" href={url.framework.reactNative} />
            <Framework framework="Vue" href={url.framework.vue} />
            <Framework framework="Angular" href={url.framework.angular} />
            <Framework framework="Ember" href={url.framework.ember} />
            <Framework framework="HTML" href={url.framework.html} />
            <Framework framework="Svelte" href={url.framework.svelte} />
            <Framework framework="Mithril" href={url.framework.mithril} />
            <Framework framework="Riot" href={url.framework.riot} />
          </FrameworkList>
          <SecondarySubheading>GitHub</SecondarySubheading>

          <Stats>
            <GitHubWrapper>
              <GitHubButton type="stargazers" namespace={namespace} repo={repo} />
            </GitHubWrapper>
            <Stat
              size="small"
              count={`v5.0`}
              text="Latest version"
              noPlural
              status="primary"
              countLink={url.gitHub.releases}
            />
            <Stat
              size="small"
              count={`800k`}
              text="Installs per month"
              noPlural
              status="secondary"
              countLink={url.npm}
            />
            <Stat
              size="small"
              count={`+550`}
              text="Contributors"
              noPlural
              status="tertiary"
              countLink={url.gitHub.contributors}
            />
          </Stats>
        </Secondary>
      </Content>
    </Wrapper>
  );
}
