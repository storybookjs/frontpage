import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import ValueProp from './ValueProp';
import PlaceholderAspectRatio from './PlaceholderAspectRatio';

import { Video } from '../basics';

const ImageWrapper = styled.div`
  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

storiesOf('Frontpage|screens/IndexScreen/ValueProp', module).add('default', () => (
  <div>
    <ValueProp
      orientation="left"
      media={
        <PlaceholderAspectRatio ratio={0.75}>
          <Video
            src="videos/storybook-workflow-build-optimized-lg.mp4"
            alt="Storybook build workflow video"
            shouldChangeSize
          />
        </PlaceholderAspectRatio>
      }
      title="Lorem ipsum dolor sit amet"
      desc="Consecatur vestibulum coret save Storybook makes it easy to keep track of edge cases and as a result you get tests for free"
    />
    <ValueProp
      orientation="right"
      media={
        <ImageWrapper>
          <img alt="media" src="http://via.placeholder.com/800x540" />
        </ImageWrapper>
      }
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
