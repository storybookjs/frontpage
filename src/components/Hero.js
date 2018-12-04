import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GitHubButton from 'react-github-button';

import 'react-github-button/assets/style.css';

import { color, typography, pageMargins } from './../shared/styles';
import { url } from './../shared/urls';
import Link from './Link';
import Button from './Button';
import Icon from './Icon';
import Subheading from './Subheading';
import Cardinal from './Cardinal';

const Title = styled.div``;

const Subtitle = styled.div``;

const PitchActions = styled.div``;

const Pitch = styled.div``;

const Video = styled.video`
  width: 100%;
  height: auto;
`;

const FrameworkLink = styled(Link)`
  text-transform: capitalize;
  display: flex;
  align-items: center;
  font-size: ${typography.size.s2}px;
  font-weight: ${typography.weight.bold};

  img {
    height: 1rem;
    width: 1rem;
    margin-right: 15px;
  }

  span {
    height: 1rem;
  }

  svg {
    margin-left: 5px;
    height: 0.7rem;
    width: 0.7rem;
  }
`;

const FrameworkItem = styled.div`
  margin-bottom: 0.75rem;
`;

const FrameworkList = styled.div`
  margin-bottom: 2.5rem;
`;

const Stat = styled(Cardinal)`
  padding-left: 0;
  display: block;
`;

const Stats = styled.div``;

const GitHubWrapper = styled.div`
  height: 24px;
  margin-bottom: 1rem;

  ${'' /* Overrides to make a medium sized button */};
  .github-btn {
    font: bold 14px/14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
    height: auto;
    .gh-btn,
    .gh-count {
      padding: 4px 8px;
    }
  }
`;

const SecondarySubheading = styled(Subheading)`
  font-size: 11px;
  display: block;
  color: ${color.mediumdark};
  margin-bottom: 1.25rem;
`;

const Primary = styled.div`
  background: green;
`;

const Secondary = styled.div`
  background: purple;
`;

const Content = styled.section`
  display: flex;

  ${Primary} {
    flex: 1;
    margin-right: 40px;
  }
  ${Secondary} {
    flex: 0 0 200px;
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
              ? `/logos/framework/icon-${logo}.svg`
              : `/logos/framework/icon-${framework.toLowerCase()}.svg`
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
        <Title>Build bulletproof UI components fast</Title>
        <Subtitle>
          Storybook is an open source tool for developing UI components in isolation for React, Vue,
          Angular, and more. It makes building stunning UIs organized, repeatable, and efficient.
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
          <Video autoPlay muted loop playsInline alt="Demo video">
            <source src="/videos/storybook-hero-video-optimized.mp4" type="video/mp4" />
          </Video>
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
          <GitHubWrapper>
            <GitHubButton type="stargazers" namespace={namespace} repo={repo} />
          </GitHubWrapper>
          <Stats>
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
