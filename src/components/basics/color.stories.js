/* eslint-disable import/no-extraneous-dependencies */
import React, { Fragment } from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { background, color, typography } from './shared/styles';

const Heading = styled.div`
  font-size: ${typography.size.m1}px;
  font-weight: ${typography.weight.black};
  margin-bottom: 1.5rem;
`;

const Swatch = styled.div`
  width: 100px;
  height: 50px;
`;

const SwatchHex = styled.div`
  margin-right: 30px;
  width: 80px;
`;

const SwatchGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1.25rem;
`;

const Swatches = styled.div``;

const ColorWrapper = styled.div`
  display: flex;
  flex-direction: row;
  > ${Swatches} {
    flex: 1;
    padding-right: 40px;
  }
`;

const Page = styled.div`
  padding: 3rem;
`;

const colorfulColors = [
  color.primary,
  color.secondary,
  color.orange,
  color.gold,
  color.green,
  color.seafoam,
  color.purple,
  color.ultraviolet,
];

const monochromeColors = [
  color.darkest,
  color.darker,
  color.dark,
  color.mediumdark,
  color.medium,
  color.mediumlight,
  color.light,
  color.lighter,
  color.lightest,
];

storiesOf('basics/color', module).add('all', () => (
  <Page>
    <ColorWrapper>
      <Swatches>
        <Heading>Color</Heading>
        {colorfulColors.map((color, index) => (
          <SwatchGroup key={index}>
            <SwatchHex>{`${color}`}</SwatchHex>
            <Swatch style={{ background: color }} />
            <Swatch style={{ background: color, opacity: 0.8 }} />
            <Swatch style={{ background: color, opacity: 0.6 }} />
            <Swatch style={{ background: color, opacity: 0.3 }} />
          </SwatchGroup>
        ))}
      </Swatches>
      <Swatches>
        <Heading>Monochrome</Heading>
        {monochromeColors.map((color, index) => (
          <SwatchGroup>
            <SwatchHex>{`${color}`}</SwatchHex>
            <Swatch style={{ background: color }} />
          </SwatchGroup>
        ))}
      </Swatches>
    </ColorWrapper>
  </Page>
));
