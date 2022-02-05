import { styles, Subheading } from '@storybook/design-system';
import { css, styled } from '@storybook/theming';
import React from 'react';

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

const { color, spacing, pageMargin, pageMargins, breakpoint } = styles;

const Title = styled(Subheading)`
  display: block;
  margin-bottom: 1.5rem;
  color: ${color.dark};
  @media (min-width: ${breakpoint * 1}px) {
    margin-bottom: 2rem;
  }
`;

const IntegrationItem = styled.div`
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

export default function CTA({ ...props }) {
  return (
    <Wrapper {...props}>
      <Inner>
        <Title>Integrations</Title>
        <IntegrationsWrapper>
          <IntegrationList>
            <IntegrationItem>
              <img src={Jest} title="Jest" alt="Jest" />
            </IntegrationItem>
            <IntegrationItem>
              <img src={Figma} title="Figma" alt="Figma" />
            </IntegrationItem>
            <IntegrationItem>
              <img src={Chromatic} title="Chromatic" alt="Chromatic" />
            </IntegrationItem>
            <IntegrationItem>
              <img src={Zeplin} title="Zeplin" alt="Zeplin" />
            </IntegrationItem>
            <IntegrationItem>
              <img src={Axe} title="Axe" alt="Axe" />
            </IntegrationItem>
            <IntegrationItem>
              <img src={Sass} title="Sass" alt="Sass" />
            </IntegrationItem>
            <IntegrationItem>
              <img src={Nextjs} title="Nextjs" alt="Nextjs" />
            </IntegrationItem>
            <IntegrationItem>
              <img src={TestingLib} title="TestingLib" alt="TestingLib" />
            </IntegrationItem>
            <IntegrationItem>
              <img src={Sketch} title="Sketch" alt="Sketch" />
            </IntegrationItem>
            <IntegrationItem>
              <img src={Puppeteer} title="Puppeteer" alt="Puppeteer" />
            </IntegrationItem>
            <IntegrationItem>
              <img src={Zeroheight} title="Zeroheight" alt="Zeroheight" />
            </IntegrationItem>
            <IntegrationItem>
              <img src={Apollo} title="Apollo" alt="Apollo" />
            </IntegrationItem>
            <IntegrationItem>
              <img src={Tailwind} title="Tailwind" alt="Tailwind" />
            </IntegrationItem>
            <IntegrationItem>
              <img src={Vite} title="Vite" alt="Vite" />
            </IntegrationItem>
            <IntegrationItem>
              <img src={Playwright} title="Playwright" alt="Playwright" />
            </IntegrationItem>
            <IntegrationItem>
              <img src={AdobeXD} title="AdobeXD" alt="AdobeXD" />
            </IntegrationItem>
            <IntegrationItem>
              <img src={Cypress} title="Cypress" alt="Cypress" />
            </IntegrationItem>
            <IntegrationItem>
              <img src={Invision} title="Invision" alt="Invision" />
            </IntegrationItem>
            <IntegrationItem>
              <img src={Jasmine} title="Jasmine" alt="Jasmine" />
            </IntegrationItem>
            <IntegrationItem>
              <img src={Emotion} title="Emotion" alt="Emotion" />
            </IntegrationItem>
            <IntegrationItem>
              <img src={Notion} title="Notion" alt="Notion" />
            </IntegrationItem>
          </IntegrationList>
        </IntegrationsWrapper>
      </Inner>
    </Wrapper>
  );
}
