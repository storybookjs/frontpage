import React from 'react';
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

const Video = styled.video``;

const Primary = styled.div`
  background: green;
`;

const FrameworkLink = styled(Link)``;

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
          <FrameworkItem>
            <FrameworkLink className="primary">
              <img src="/logos/framework/icon-react.svg" alt="React" />
              React
            </FrameworkLink>
          </FrameworkItem>
          <FrameworkItem>
            <FrameworkLink className="primary">
              <img src="/logos/framework/icon-react.svg" alt="React" />
              React Native
            </FrameworkLink>
          </FrameworkItem>
          <FrameworkItem>
            <FrameworkLink className="primary">
              <img src="/logos/framework/icon-vue.svg" alt="Vue" />
              Vue
            </FrameworkLink>
          </FrameworkItem>
          <FrameworkItem>
            <FrameworkLink className="primary">
              <img src="/logos/framework/icon-angular.svg" alt="Angular" />
              Angular
            </FrameworkLink>
          </FrameworkItem>
          <FrameworkItem>
            <FrameworkLink className="primary">
              <img src="/logos/framework/icon-ember.svg" alt="Ember" />
              Ember
            </FrameworkLink>
          </FrameworkItem>
          <FrameworkItem>
            <FrameworkLink className="primary">
              <img src="/logos/framework/icon-html5.svg" alt="HTML" />
              HTML
            </FrameworkLink>
          </FrameworkItem>
          <FrameworkItem>
            <FrameworkLink className="primary">
              <img src="/logos/framework/icon-react.svg" alt="Marko" />
              Marko
            </FrameworkLink>
          </FrameworkItem>
          <FrameworkItem>
            <FrameworkLink className="primary">
              <img src="/logos/framework/icon-react.svg" alt="Svelte" />
              Svelte
            </FrameworkLink>
          </FrameworkItem>
          <FrameworkItem>
            <FrameworkLink className="primary">
              <img src="/logos/framework/icon-react.svg" alt="Mithril" />
              Mithril
            </FrameworkLink>
          </FrameworkItem>
          <FrameworkItem>
            <FrameworkLink className="primary">
              <img src="/logos/framework/icon-react.svg" alt="Riot" />
              Riot
            </FrameworkLink>
          </FrameworkItem>
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
