import React from 'react';
import { styled } from '@storybook/theming';
import { styles, IntegrationsCarousel, AspectRatio } from '@storybook/components-marketing';

const { breakpoints } = styles;

const EmbedPane = styled.img`
  display: block;
  width: 100%;
  height: auto;
`;

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

const EmbedIntegrationsWrapper = styled.div`
  position: relative;
  width: 100%;

  @media (min-width: ${breakpoints[2]}px) {
    width: 150%;
  }
`;
const EmbedIntegrationsCarousel = styled(IntegrationsCarousel)`
  max-width: 800px;
  margin-left: 14%;
`;
const Connector = styled.img`
  display: block;
  width: 20%;
  height: auto;
  position: absolute;
  top: 50%;
  left: 20%;
`;
Connector.defaultProps = {
  src: 'images/home/connector.svg',
  alt: '',
};
const TimeFramePicker = styled.img`
  display: block;
  width: 40%;
  height: auto;
  position: absolute;
  top: 22%;
  left: 0;
`;
TimeFramePicker.defaultProps = {
  src: 'images/home/TimeFramePicker.svg',
  alt: '',
};

export const EmbedIntegrations = () => (
  <EmbedIntegrationsWrapper>
    <EmbedIntegrationsCarousel integrations={embedIntegrations} overflowLabel="+ and more" />
    <Connector />
    <TimeFramePicker />
  </EmbedIntegrationsWrapper>
);
