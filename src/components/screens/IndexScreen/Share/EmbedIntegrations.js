import React from 'react';
import { styled } from '@storybook/theming';
import { styles, IntegrationsCarousel, AspectRatio } from '@storybook/components-marketing';

const { breakpoints } = styles;

const EmbedPane = styled.img`
  display: block;
  width: 100%;
  height: auto;
`;

const EmbedIntegrationsWrapper = styled.div`
  width: 100%;
  position: relative;
  display: table;
  max-width: 800px;
  margin-left: 30px;

  @media (min-width: ${breakpoints[1]}px) {
    margin-left: 30px;
  }

  @media (min-width: ${breakpoints[2]}px) {
    width: 150%;
  }
  @media (min-width: ${breakpoints[3]}px) {
    margin-left: 120px;
  }
`;
const EmbedIntegrationsCarousel = styled(IntegrationsCarousel)`
  display: table-cell;
`;
const TimeFramePicker = styled.img`
  display: block;
  width: 56%;
  max-width: 440px;
  height: auto;
  position: absolute;
  top: 22%;
  left: -30px;

  @media (min-width: ${breakpoints[1]}px) {
    left: -60px;
  }

  @media (min-width: ${breakpoints[2]}px) {
    left: -60px;
  }

  @media (min-width: ${breakpoints[3]}px) {
    left: -120px;
  }
`;
TimeFramePicker.defaultProps = {
  src: 'images/embed/TimeFramePicker.svg',
  alt: '',
};

const embedIntegrations = [
  {
    name: 'NextJS',
    image: '/images/home/next-js.svg',
    color: '#000',
    media: (
      <AspectRatio ratio={`${1202} / ${910}`}>
        <EmbedPane
          src="/images/embed/next.svg"
          alt="Embed stories using iframes in your NextJS sites"
        />
      </AspectRatio>
    ),
  },
  {
    name: 'Figma',
    image: '/images/home/figma.svg',
    color: '#000',
    media: (
      <AspectRatio ratio={`${1202} / ${910}`}>
        <EmbedPane
          src="/images/embed/figma.svg"
          alt="Use the Storybook Connect plugin to embed stories in a Figma file"
        />
      </AspectRatio>
    ),
  },
  {
    name: 'Notion',
    image: '/images/home/notion.svg',
    color: '#fff',
    media: (
      <AspectRatio ratio={`${1202} / ${910}`}>
        <EmbedPane
          src="/images/embed/notion.svg"
          alt="Embed stories in Notion documents using the oEmbed support"
        />
      </AspectRatio>
    ),
  },
  {
    name: 'Medium',
    image: '/images/home/medium.svg',
    color: '#F5C347',
    media: (
      <AspectRatio ratio={`${1202} / ${910}`}>
        <EmbedPane
          src="/images/embed/medium.svg"
          alt="Embed stories in Medium articles using the oEmbed support"
        />
      </AspectRatio>
    ),
  },
];

export const EmbedIntegrations = () => (
  <EmbedIntegrationsWrapper>
    <EmbedIntegrationsCarousel integrations={embedIntegrations} overflowLabel="+ and more" />
    <TimeFramePicker />
  </EmbedIntegrationsWrapper>
);
