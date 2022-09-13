import PropTypes from 'prop-types';
import React from 'react';
import { styles } from '@storybook/components-marketing';
import { css, styled } from '@storybook/theming';
import { Link as GatsbyLinkWrapper } from 'gatsby';
import AdobeXD from '../../../images/integrations/adobexd.svg';
import Apollo from '../../../images/integrations/apollo.svg';
import Axe from '../../../images/integrations/axe.svg';
import Chromatic from '../../../images/integrations/chromatic.svg';
import Cypress from '../../../images/integrations/cypress.svg';
import Emotion from '../../../images/integrations/emotion.svg';
import Figma from '../../../images/integrations/figma.svg';
import Gatsby from '../../../images/integrations/gatsby.svg';
import GraphQL from '../../../images/integrations/graphql.svg';
import Invision from '../../../images/integrations/invision.svg';
import Jest from '../../../images/integrations/jest.svg';
import MSW from '../../../images/integrations/msw.svg';
import Nextjs from '../../../images/integrations/nextjs.svg';
import Notion from '../../../images/integrations/notion.svg';
import Nuxt from '../../../images/integrations/nuxt.svg';
import Nx from '../../../images/integrations/nx.svg';
import Playwright from '../../../images/integrations/playwright.svg';
import RedwoodJS from '../../../images/integrations/redwoodjs.svg';
import Sass from '../../../images/integrations/sass.svg';
import SWC from '../../../images/integrations/swc.svg';
import Tailwind from '../../../images/integrations/tailwind.svg';
import TestingLib from '../../../images/integrations/testing-lib.svg';
import UXpin from '../../../images/integrations/uxpin.svg';
import Vite from '../../../images/integrations/vite.svg';
import Webpack from '../../../images/integrations/webpack.svg';
import Zeplin from '../../../images/integrations/zeplin.svg';
import Zeroheight from '../../../images/integrations/zeroheight.svg';
import Ionic from '../../../images/integrations/ionic.svg';
import Launchdarkly from '../../../images/integrations/launchdarkly.svg';
import Supernova from '../../../images/integrations/supernova.svg';

const { color, breakpoints } = styles;

const IntegrationItem = styled.a`
  width: 100%;
  height: auto;

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.05), 0 5px 15px 0 rgba(0, 0, 0, 0.1);
  pointer-events: none;
  user-select: none;

  @media (min-width: ${breakpoints[2]}px) {
    pointer-events: initial;
  }

  img {
    width: 100%;
    height: 100%;
    display: block;
  }

  ${(props) =>
    props.inverse &&
    css`
      svg path,
      svg circle {
        fill: ${color.lightest};
      }
    `}
`;

const Wrapper = styled.div`
  position: relative;
  align-items: center;
  text-align: center;
  width: 100%;
`;

const IntegrationGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-auto-rows: max-content;
  grid-auto-flow: row dense;
  gap: 10px;
  justify-content: center;

  @media (min-width: ${breakpoints[1]}px) {
    gap: 20px;
  }

  @media (min-width: ${breakpoints[2]}px) {
    grid-template-columns: repeat(6, minmax(auto, 80px));
  }

  @media (min-width: ${breakpoints[3]}px) {
    gap: 30px;
  }

  @media (min-width: ${1600}px) {
    grid-template-columns: repeat(10, minmax(auto, 80px));
    gap: 20px;
  }
`;

const Scrim = styled.div`
  position: absolute;
  height: 75%;
  bottom: -2.5rem;
  left: 0;
  right: 0;
  pointer-events: none;

  background: linear-gradient(180deg, rgba(23, 28, 35, 0) 0%, #171c23 86.87%);

  @media (min-width: ${breakpoints[2]}px) {
    height: 50%;
  }
`;

export function Integrations({ docs, ...props }) {
  const integrations = [
    { href: 'https://storybook.js.org/blog/storybook-for-vite/', image: Vite, name: 'Vite' },
    {
      target: '_blank',
      href: 'https://www.chromatic.com/',
      image: Chromatic,
      name: 'Chromatic',
    },
    {
      as: GatsbyLinkWrapper,
      to: `${docs}react/sharing/embed#embed-stories-on-other-platforms`,
      image: Notion,
      name: 'Notion',
    },
    {
      as: GatsbyLinkWrapper,
      to: `${docs}react/writing-tests/importing-stories-in-tests`,
      image: TestingLib,
      name: 'TestingLib',
    },
    {
      as: GatsbyLinkWrapper,
      to: '/addons/@react-theming/storybook-addon',
      image: Emotion,
      name: 'Emotion',
    },
    {
      target: '_blank',
      rel: 'noopener nofollow noreferrer',
      href: 'https://medium.com/storybookjs/building-a-front-end-project-with-react-tailwindcss-and-storybook-742bdb1417da',
      image: Tailwind,
      name: 'Tailwind',
    },
    {
      image: Jest,
      name: 'Jest',
      as: GatsbyLinkWrapper,
      to: '/addons/@storybook/addon-jest',
    },
    { as: GatsbyLinkWrapper, to: '/addons/storybook-addon-next', image: Nextjs, name: 'Nextjs' },
    {
      as: GatsbyLinkWrapper,
      to: `${docs}/react/builders/webpack#gatsby-focus-wrapper`,
      image: Webpack,
      name: 'Webpack',
    },
    {
      as: GatsbyLinkWrapper,
      to: `${docs}/react/sharing/design-integrations#figma`,
      image: Figma,
      name: 'Figma',
    },
    {
      href: 'https://zeroheight.com/3xlwst8/p/507ba7-storybook',
      target: '_blank',
      rel: 'noopener nofollow noreferrer',
      image: Zeroheight,
      name: 'Zeroheight',
    },
    {
      href: 'https://nx.dev/storybook/overview-react',
      target: '_blank',
      rel: 'noopener nofollow noreferrer',
      image: Nx,
      name: 'Nx',
    },
    {
      as: GatsbyLinkWrapper,
      to: '/addons/storybook-addon-apollo-client',
      image: Apollo,
      name: 'Apollo',
    },
    {
      as: GatsbyLinkWrapper,
      to: `${docs}react/writing-tests/importing-stories-in-tests`,
      image: Playwright,
      name: 'Playwright',
    },
    { as: GatsbyLinkWrapper, to: '/addons/@storybook/addon-a11y', image: Axe, name: 'Axe' },
    {
      href: 'https://redwoodjs.com/docs/storybook',
      target: '_blank',
      rel: 'noopener nofollow noreferrer',
      image: RedwoodJS,
      name: 'RedwoodJS',
    },
    {
      as: GatsbyLinkWrapper,
      to: '/addons/mswjs/msw-storybook-addon',
      image: MSW,
      name: 'MSW',
    },
    { as: GatsbyLinkWrapper, to: '/addons/storybook-zeplin', image: Zeplin, name: 'Zeplin' },
    {
      as: GatsbyLinkWrapper,
      to: '/addons/tag/graphql',
      image: GraphQL,
      name: 'GraphQL',
    },
    {
      as: GatsbyLinkWrapper,
      to: '/addons/storybook-addon-gatsby/',
      image: Gatsby,
      name: 'Gatsby',
    },
    {
      as: GatsbyLinkWrapper,
      to: '/addons/storybook-addon-launchdarkly/',
      image: Launchdarkly,
      name: 'Launchdarkly',
    },
    {
      href: 'https://github.com/storybookjs/presets/tree/master/packages/preset-scss',
      image: Sass,
      name: 'Sass',
    },
    {
      as: GatsbyLinkWrapper,
      to: '/addons/storybook-addon-swc/',
      image: SWC,
      name: 'SWC',
    },
    {
      href: 'https://www.uxpin.com/merge/storybook-integration',
      target: '_blank',
      rel: 'noopener nofollow noreferrer',
      image: UXpin,
      name: 'UXpin',
    },
    {
      href: 'https://ionicframework.com/blog/how-to-use-storybook-with-stencil/',
      target: '_blank',
      rel: 'noopener nofollow noreferrer',
      image: Ionic,
      name: 'Ionic',
    },
    {
      as: GatsbyLinkWrapper,
      to: '/addons/storybook-addon-xd-designs',
      image: AdobeXD,
      name: 'AdobeXD',
    },
    {
      target: '_blank',
      rel: 'noopener nofollow noreferrer',
      href: 'https://support.invisionapp.com/hc/en-us/articles/360051565792',
      image: Invision,
      name: 'Invision',
    },
    {
      as: GatsbyLinkWrapper,
      to: '/addons/@storybook/testing-angular',
      image: Supernova,
      name: 'Supernova',
    },
    {
      as: GatsbyLinkWrapper,
      to: `${docs}react/writing-tests/importing-stories-in-tests`,
      image: Cypress,
      name: 'Cypress',
    },
    {
      target: '_blank',
      rel: 'noopener nofollow noreferrer',
      href: 'https://storybook.nuxtjs.org/',
      image: Nuxt,
      name: 'Nuxt',
    },
  ];

  return (
    <Wrapper {...props}>
      <IntegrationGrid>
        {integrations.map(({ image, name, ...integration }) => (
          <IntegrationItem key={name} {...integration}>
            <img loading="lazy" src={image} alt={name} width="80" height="80" />
          </IntegrationItem>
        ))}
      </IntegrationGrid>
      <Scrim />
    </Wrapper>
  );
}

Integrations.propTypes = {
  docs: PropTypes.string.isRequired,
};
