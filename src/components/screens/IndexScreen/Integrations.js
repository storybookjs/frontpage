import PropTypes from 'prop-types';
import React from 'react';
import { styles, Subheading } from '@storybook/design-system';
import { css, styled } from '@storybook/theming';
import { Link as GatsbyLinkWrapper } from 'gatsby';
import AdobeXD from '../../../images/integrations/adobexd.svg';
import Apollo from '../../../images/integrations/apollo.svg';
import Axe from '../../../images/integrations/axe.svg';
import Chromatic from '../../../images/integrations/chromatic.svg';
import Cypress from '../../../images/integrations/cypress.svg';
import Emotion from '../../../images/integrations/emotion.svg';
import Figma from '../../../images/integrations/figma.svg';
import Invision from '../../../images/integrations/invision.svg';
import Jasmine from '../../../images/integrations/jasmine.svg';
import Jest from '../../../images/integrations/jest.svg';
import Nextjs from '../../../images/integrations/nextjs.svg';
import Notion from '../../../images/integrations/notion.svg';
import Playwright from '../../../images/integrations/playwright.svg';
import Puppeteer from '../../../images/integrations/puppeteer.svg';
import Sass from '../../../images/integrations/sass.svg';
import Sketch from '../../../images/integrations/sketch.svg';
import Tailwind from '../../../images/integrations/tailwind.svg';
import TestingLib from '../../../images/integrations/testing-lib.svg';
import Vite from '../../../images/integrations/vite.svg';
import Zeplin from '../../../images/integrations/zeplin.svg';
import Zeroheight from '../../../images/integrations/zeroheight.svg';

const { color, spacing, pageMargin, breakpoint } = styles;

const Title = styled(Subheading)`
  display: block;
  margin-bottom: 1.5rem;
  color: ${color.dark};
  @media (min-width: ${breakpoint * 1}px) {
    margin-bottom: 2rem;
  }
`;

const IntegrationItem = styled.a`
  width: 48px;
  height: 48px;

  @media (min-width: ${breakpoint * 1.333}px) {
    width: 60px;
    height: 60px;
  }

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.05), 0 5px 15px 0 rgba(0, 0, 0, 0.1);

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

const IntegrationList = styled.div`
  margin: 0 auto 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px 30px;
  justify-content: center;
  max-width: 516px;
  align-items: start;
  @media (min-width: ${breakpoint * 1.333}px) {
    margin: 0 auto 30px;
    gap: 30px 40px;
    max-width: 660px;
  }

  &:last-child {
    margin-bottom: 0 !important;
  }
`;

const IntegrationsWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex: 1;
`;

const Inner = styled.div`
  align-items: center;
  text-align: center;

  padding: 3rem ${spacing.padding.medium}px;
  @media (min-width: ${breakpoint * 1}px) {
    /* margin: 0 ${pageMargin * 3}%; */
    padding-bottom: 5rem;
  }
  @media (min-width: ${breakpoint * 2}px) {
    /* margin: 0 ${pageMargin * 4}%; */
  }
`;

const Wrapper = styled.div``;

export default function Integrations({ docs, ...props }) {
  return (
    <Wrapper {...props}>
      <Inner>
        <Title>Integrations</Title>
        <IntegrationsWrapper>
          <IntegrationList>
            <IntegrationItem as={GatsbyLinkWrapper} to="/addons/@storybook/addon-jest">
              <img src={Jest} title="Jest" alt="Jest" />
            </IntegrationItem>
            <IntegrationItem href="https://storybook.js.org/basics/blog/figma-plugin-sneak-peek">
              <img src={Figma} title="Figma" alt="Figma" />
            </IntegrationItem>
            <IntegrationItem target="_blank" href="https://www.chromatic.com/">
              <img src={Chromatic} title="Chromatic" alt="Chromatic" />
            </IntegrationItem>
            <IntegrationItem as={GatsbyLinkWrapper} to="/addons/storybook-zeplin">
              <img src={Zeplin} title="Zeplin" alt="Zeplin" />
            </IntegrationItem>
            <IntegrationItem as={GatsbyLinkWrapper} to="/addons/@storybook/addon-a11y">
              <img src={Axe} title="Axe" alt="Axe" />
            </IntegrationItem>
            <IntegrationItem href="https://github.com/storybookjs/presets/tree/master/packages/preset-scss">
              <img src={Sass} title="Sass" alt="Sass" />
            </IntegrationItem>
            <IntegrationItem as={GatsbyLinkWrapper} to="/addons/storybook-addon-next">
              <img src={Nextjs} title="Nextjs" alt="Nextjs" />
            </IntegrationItem>
            <IntegrationItem
              as={GatsbyLinkWrapper}
              to={`${docs}docs/react/writing-tests/importing-stories-in-tests`}
            >
              <img src={TestingLib} title="TestingLib" alt="TestingLib" />
            </IntegrationItem>
            <IntegrationItem as={GatsbyLinkWrapper} to="/addons/storybook-addon-sketch">
              <img src={Sketch} title="Sketch" alt="Sketch" />
            </IntegrationItem>
            <IntegrationItem
              as={GatsbyLinkWrapper}
              to={`${docs}docs/react/writing-tests/importing-stories-in-tests`}
            >
              <img src={Puppeteer} title="Puppeteer" alt="Puppeteer" />
            </IntegrationItem>
            <IntegrationItem
              href="https://zeroheight.com/3xlwst8/p/507ba7-storybook"
              target="_blank"
              rel="noopener nofollow noreferrer"
            >
              <img src={Zeroheight} title="Zeroheight" alt="Zeroheight" />
            </IntegrationItem>
            <IntegrationItem as={GatsbyLinkWrapper} to="/addons/storybook-addon-apollo-client">
              <img src={Apollo} title="Apollo" alt="Apollo" />
            </IntegrationItem>
            <IntegrationItem
              target="_blank"
              rel="noopener nofollow noreferrer"
              href="https://medium.com/storybookjs/building-a-front-end-project-with-react-tailwindcss-and-storybook-742bdb1417da"
            >
              <img src={Tailwind} title="Tailwind" alt="Tailwind" />
            </IntegrationItem>
            <IntegrationItem href="https://storybook.js.org/blog/storybook-for-vite/">
              <img src={Vite} title="Vite" alt="Vite" />
            </IntegrationItem>
            <IntegrationItem
              as={GatsbyLinkWrapper}
              to={`${docs}docs/react/writing-tests/importing-stories-in-tests`}
            >
              <img src={Playwright} title="Playwright" alt="Playwright" />
            </IntegrationItem>
            <IntegrationItem as={GatsbyLinkWrapper} to="/addons/storybook-addon-xd-designs">
              <img src={AdobeXD} title="AdobeXD" alt="AdobeXD" />
            </IntegrationItem>
            <IntegrationItem
              as={GatsbyLinkWrapper}
              to={`${docs}docs/react/writing-tests/importing-stories-in-tests`}
            >
              <img src={Cypress} title="Cypress" alt="Cypress" />
            </IntegrationItem>
            <IntegrationItem
              target="_blank"
              rel="noopener nofollow noreferrer"
              href="https://support.invisionapp.com/hc/en-us/articles/360051565792"
            >
              <img src={Invision} title="Invision" alt="Invision" />
            </IntegrationItem>
            <IntegrationItem as={GatsbyLinkWrapper} to="/addons/@storybook/testing-angular">
              <img src={Jasmine} title="Jasmine" alt="Jasmine" />
            </IntegrationItem>
            <IntegrationItem as={GatsbyLinkWrapper} to="/addons/@react-theming/storybook-addon">
              <img src={Emotion} title="Emotion" alt="Emotion" />
            </IntegrationItem>
            <IntegrationItem
              as={GatsbyLinkWrapper}
              to={`${docs}react/sharing/embed#embed-stories-on-other-platforms`}
            >
              <img src={Notion} title="Notion" alt="Notion" />
            </IntegrationItem>
          </IntegrationList>
        </IntegrationsWrapper>
      </Inner>
    </Wrapper>
  );
}

Integrations.propTypes = {
  docs: PropTypes.string.isRequired,
};
