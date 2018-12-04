import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { color } from './../shared/styles';
import Link from './Link';
import Button from './Button';
import Icon from './Icon';
import Subheading from './Subheading';

const Title = styled.div``;

const Subtitle = styled.div``;

const PitchActions = styled.div``;

const Pitch = styled.div``;

const Video = styled.video`
  width: 100%;
  height: auto;
`;

const Primary = styled.div`
  background: green;
`;

const FrameworkLink = styled(Link)`
  text-transform: capitalize;
`;

const FrameworkItem = styled.div``;

const FrameworkList = styled.div``;

const Stat = styled.div``;

const Stats = styled.div``;

const SecondarySubheading = styled(Subheading)`
  color: ${color.mediumdark};
`;

const Secondary = styled.div`
  background: purple;
`;

const Content = styled.section`
  display: flex;

  ${Primary} {
    flex: 1;
  }
  ${Secondary} {
    flex: 0 0 200px;
  }
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
        {framework}
      </FrameworkLink>
    </FrameworkItem>
  );
}

Framework.propTypes = {
  framework: PropTypes.string.isRequired,
};

const Hero = ({ siteTitle }) => (
  <div>
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
          <Framework framework="React" href="https://google.com" />
          <Framework framework="React Native" logo="react" href="https://google.com" />
          <Framework framework="Vue" href="https://google.com" />
          <Framework framework="Angular" href="https://google.com" />
          <Framework framework="Ember" href="https://google.com" />
          <Framework framework="HTML" href="https://google.com" />
          <Framework framework="Svelte" href="https://google.com" />
          <Framework framework="Mithril" href="https://google.com" />
          <Framework framework="Riot" href="https://google.com" />
        </FrameworkList>
        <SecondarySubheading>GitHub</SecondarySubheading>
        <Stats>
          <Stat>Stat here</Stat>
          <Stat>Stat here</Stat>
          <Stat>Stat here</Stat>
        </Stats>
      </Secondary>
    </Content>
  </div>
);

export default Hero;
