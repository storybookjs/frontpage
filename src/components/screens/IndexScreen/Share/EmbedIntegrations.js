import React from 'react';
import { styled } from '@storybook/theming';
import { styles, IntegrationsCarousel, AspectRatio } from '@storybook/components-marketing';
import { motion } from 'framer-motion';

const { breakpoints } = styles;

const EmbedPane = styled.img`
  display: block;
  width: 100%;
  height: auto;
`;

const EmbedIntegrationsCarousel = styled(IntegrationsCarousel)`
  display: table-cell;
`;
const TimeFramePicker = styled(motion.img)`
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
  src: 'images/embed/time-frame-picker.svg',
  alt: '',
};

const Connector = styled(motion.img)`
  display: block;
  width: 28%;
  max-width: 262px;
  height: auto;
  position: absolute;
  top: 45%;
  left: 5%;

  @media (min-width: ${breakpoints[3]}px) {
    left: 4%;
  }
`;
Connector.defaultProps = {
  src: 'images/embed/connector.svg',
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
    grid-column: 2 / 3;
  }
  @media (min-width: ${breakpoints[3]}px) {
    margin-left: 120px;
  }
`;

export const EmbedIntegrations = React.forwardRef(({ isInView, disableScrollAnimation }, ref) => {
  const layoutAnimProps = disableScrollAnimation
    ? {}
    : {
        layoutId: 'TimeFramePicker',
        transition: { duration: 0.8 },
      };
  return (
    <EmbedIntegrationsWrapper ref={ref}>
      <EmbedIntegrationsCarousel integrations={embedIntegrations} overflowLabel="+ and more" />
      <Connector
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: 1 }}
      />
      {(isInView || disableScrollAnimation) && (
        <TimeFramePicker {...layoutAnimProps} width="458" height="244" />
      )}
    </EmbedIntegrationsWrapper>
  );
});
