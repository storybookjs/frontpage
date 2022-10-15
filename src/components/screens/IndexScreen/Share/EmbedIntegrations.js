import React from 'react';
import { styled } from '@storybook/theming';
import { styles, IntegrationsCarousel, AspectRatio } from '@storybook/components-marketing';
import { motion, AnimatePresence } from 'framer-motion';

const { breakpoints } = styles;

const EmbedPane = styled.img`
  display: block;
  width: 100%;
  height: auto;
`;

const TimeFramePicker = styled.img`
  display: block;
  width: 56%;
  max-width: 440px;
  height: auto;
  position: absolute;
  top: 22%;
  left: -30px;
  opacity: 0;
  user-select: none;
  pointer-events: none;

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

const SVG = styled(motion.svg)`
  display: block;
  width: 24%;
  height: auto;
  position: absolute;
`;

const Connector = ({ name, ...props }) => {
  return (
    <AnimatePresence>
      <SVG
        data-chromatic="ignore"
        width="263"
        height="145"
        viewBox="0 0 263 145"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial="initial"
        whileInView="animate"
        variants={{
          initial: { opacity: 0 },
          animate: { opacity: 1 },
        }}
        viewport={{
          margin: '-25% 0px -25% 0px',
        }}
        transition={{ duration: 0.4, when: 'beforeChildren' }}
        {...props}
      >
        <motion.circle
          cx="256"
          cy="140"
          r="5"
          fill="#1EA7FD"
          variants={{
            initial: { scale: 0 },
            animate: { scale: 1 },
          }}
          transition={{ duration: 0.2, delay: 0.6 }}
        />
        <path
          mask={`url(#${name}-connector-mask)`}
          d="M252.5 134.5C195.5 53.001 98.4998 0.999337 10.0003 0.999647"
          stroke="#1EA7FD"
          strokeWidth="2"
          strokeDasharray="6 4"
        />
        <defs>
          <mask id={`${name}-connector-mask`} maskUnits="userSpaceOnUse">
            <motion.path
              d="M10.0003,0.999647C98.4998,0.999337 195.5,53.001 252.5,134.5"
              stroke="#fff"
              strokeWidth="4"
              strokeDasharray="0 1"
              variants={{
                initial: { pathLength: 0 },
                animate: { pathLength: 1 },
              }}
              transition={{ duration: 0.8 }}
            />
          </mask>
        </defs>
      </SVG>
    </AnimatePresence>
  );
};

const embedIntegrations = [
  {
    name: 'NextJS',
    image: '/images/home/next-js.svg',
    color: '#000',
    media: (
      // transform is to prevent the slight jump before the animation starts
      <AspectRatio ratio={`${1202} / ${910}`} style={{ transform: 'translate(0, 0)' }}>
        <EmbedPane
          src="/images/embed/next.png"
          alt="Embed stories using iframes in your NextJS sites"
        />
        <Connector key="nextjs" name="NextJS" style={{ top: '51%', left: '37%' }} />
      </AspectRatio>
    ),
  },
  {
    name: 'Figma',
    image: '/images/home/figma.svg',
    color: '#000',
    media: (
      <AspectRatio ratio={`${1202} / ${910}`} style={{ transform: 'translate(0, 0)' }}>
        <EmbedPane
          src="/images/embed/figma.png"
          alt="Use the Storybook Connect plugin to embed stories in a Figma file"
        />
        <Connector
          key="figma"
          name="Figma"
          style={{ top: '52%', left: '1%' }}
          transition={{ duration: 0.4 }}
        />
      </AspectRatio>
    ),
  },
  {
    name: 'Notion',
    image: '/images/home/notion.svg',
    color: '#fff',
    media: (
      <AspectRatio ratio={`${1202} / ${910}`} style={{ transform: 'translate(0, 0)' }}>
        <EmbedPane
          src="/images/embed/notion.png"
          alt="Embed stories in Notion documents using the oEmbed support"
        />
        <Connector
          key="notion"
          name="Notion"
          style={{ top: '55%', left: '7%' }}
          transition={{ duration: 0.4 }}
        />
      </AspectRatio>
    ),
  },
  {
    name: 'Medium',
    image: '/images/home/medium.svg',
    color: '#F5C347',
    media: (
      <AspectRatio ratio={`${1202} / ${910}`} style={{ transform: 'translate(0, 0)' }}>
        <EmbedPane
          src="/images/embed/medium.png"
          alt="Embed stories in Medium articles using the oEmbed support"
        />
        <Connector
          name="Medium"
          style={{ top: '53%', left: '28%' }}
          transition={{ duration: 0.4 }}
        />
      </AspectRatio>
    ),
  },
];

const EmbedIntegrationsWrapper = styled.div`
  width: 100%;
  position: relative;
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

export const EmbedIntegrations = React.forwardRef((props, ref) => {
  return (
    <EmbedIntegrationsWrapper>
      <IntegrationsCarousel integrations={embedIntegrations} overflowLabel="+ and more" />
      <TimeFramePicker ref={ref} width="458" height="244" style={{ opacity: 0 }} />
    </EmbedIntegrationsWrapper>
  );
});
