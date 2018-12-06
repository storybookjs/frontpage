import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import ValueProp from './ValueProp';

const PlaceholderAspectRatio = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 75%;
`;

storiesOf('Screens/IndexScreen/ValueProp', module).add('default', () => (
  <div>
    <ValueProp
      orientation="left"
      media={
        /* eslint-disable jsx-a11y/media-has-caption */
        <PlaceholderAspectRatio>
          <video autoPlay muted loop playsInline>
            <source src="videos/storybook-workflow-build-optimized-sm.mp4" type="video/mp4" />
          </video>
        </PlaceholderAspectRatio>
      }
      title="Lorem ipsum dolor sit amet"
      desc="Consecatur vestibulum coret save Storybook makes it easy to keep track of edge cases and as a result you get tests for free"
    />
    <ValueProp
      orientation="right"
      media={<img alt="media" src="http://via.placeholder.com/800x540" />}
      title="Lorem ipsum dolor sit amet"
      desc="Consecatur vestibulum coret save Storybook makes it easy to keep track of edge cases and as a result you get tests for free"
    />
    <ValueProp
      orientation="center"
      media={<div>Insert any DOM element here</div>}
      title="Lorem ipsum dolor sit amet"
      desc="Consecatur vestibulum coret save Storybook makes it easy to keep track of edge cases and as a result you get tests for free"
    />
  </div>
));
