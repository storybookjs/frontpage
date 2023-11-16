import * as React from 'react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import { styles, Icon } from '@storybook/design-system';
import { styled } from '@storybook/theming';

interface YouTubeCalloutProps {
  id: string;
  open?: boolean;
  summary?: string;
  title: string;
  params?: string;
}

const { color, typography, spacing } = styles;

// `.yt-lite` styles from: https://github.com/ibrahimcesar/react-lite-youtube-embed#option-1
// `.lty-playbtn` styles emulate YouTube's thumbnail play button
const Details = styled.details`
  border-radius: ${spacing.borderRadius.small}px;
  border: 1px solid ${color.border};
  overflow: hidden;
  cursor: pointer;

  && {
    margin-top: 0;
  }

  // hover states
  transition: all 150ms ease-out;
  transform: translate3d(0, 0, 0);

  &:hover&:not([open]) {
    transform: translate3d(0, -1px, 0);
  }

  &[open] {
    &::before {
      display: none;
    }

    && > summary {
      margin-bottom: 0;
    }

    && > summary ~ * {
      margin-left: 0;
    }
  }

  .yt-lite {
    background-color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    contain: content;
    background-position: center center;
    background-size: cover;
    cursor: pointer;

    &::after {
      content: '';
      display: block;
      padding-bottom: calc(100% / (16 / 9));
    }

    & > iframe {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }

    & > .lty-playbtn {
      border: 0;
      width: 60px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      background-color: #f00;
      padding: 0 15px;
      border-radius: 50% / 11%;
    }

    & > .lty-playbtn::before {
      content: '';
      position: absolute;
      background: inherit;
      top: 10%;
      bottom: 10%;
      right: -5%;
      left: -4.5%;
      border-radius: 5% / 50%;
    }

    & > .lty-playbtn::after {
      content: '';
      position: relative;
      left: 1px;
      border-style: solid;
      border-width: 10px 0 10px 18px;
      border-color: transparent transparent transparent #fff;
    }

    &.lyt-activated {
      cursor: unset;
    }

    &.lyt-activated > .lty-playbtn {
      opacity: 0;
      pointer-events: none;
    }
  }
`;

const Summary = styled.summary`
  align-items: center;
  color: ${color.secondary} !important;
  display: flex !important;
  font-size: ${typography.size.s2}px;
  font-weight: ${typography.weight.bold};
  line-height: 20px;
  list-style: none;
  padding: 10px 20px 10px 15px;

  &::-webkit-details-marker {
    display: none;
  }

  & > svg:first-of-type {
    color: #f00;
    flex: none;
    margin-right: 10px;
  }
`;

const Arrow = styled((props) => <Icon icon="arrowdown" {...props} />)`
  position: relative;
  height: 0.85em;
  width: 0.85em;
  margin-right: 0px;
  margin-left: 0.25em;

  details[open] & {
    transform: rotate(180deg);
  }
`;

export const YouTubeCallout = ({
  id,
  open,
  summary = 'Watch a video tutorial on the Storybook channel',
  title,
  params,
}: YouTubeCalloutProps) => (
  <Details open={open}>
    <Summary>
      <Icon icon="youtube" />
      {summary}
      <Arrow />
    </Summary>
    <LiteYouTubeEmbed id={id} title={title} params={params} />
  </Details>
);
