import React from 'react';
import { styled } from '@storybook/theming';
import { styles, IntegrationsCarousel } from '@storybook/components-marketing';
import { CodeExample } from '../../../basics/CodeExample';
import * as snippets from './embed-snippets';

const { typography, breakpoints, pageMargins, spacing, breakpoint, pageMargin } = styles;

const StyledCodeExample = styled(CodeExample)`
  width: 100%;
  max-width: 800px;
  height: 550px;
  font-size: 10px;

  @media (min-width: ${breakpoints[1]}px) {
    height: 600px;
    font-size: ${typography.size.s1}px;
  }

  @media (min-width: ${breakpoints[3]}px) {
    font-size: ${typography.size.s3}px;
  }
`;

const testIntegrations = [
  {
    name: 'Jest',
    image: '/images/home/jest.svg',
    color: '#99424F',
    media: (
      <StyledCodeExample language="jsx" fileName="UserCard.test.js">
        {snippets.jest}
      </StyledCodeExample>
    ),
  },
  {
    name: 'Testing Library',
    image: '/images/home/testing-lib.png',
    color: '#E3F3FF',
    media: (
      <StyledCodeExample language="jsx" fileName="RangePicker.test.js">
        {snippets.testingLibrary}
      </StyledCodeExample>
    ),
  },
  {
    name: 'Cypress',
    image: '/images/home/cypress.svg',
    color: '#3C3C3C',
    media: (
      <StyledCodeExample language="jsx" fileName="SearchInput.spec.js">
        {snippets.cypress}
      </StyledCodeExample>
    ),
  },
  {
    name: 'Jasmine',
    image: '/images/home/jasmine.svg',
    color: '#8A4182',
    media: (
      <StyledCodeExample language="javascript" fileName="delete-customer.spec.js">
        {snippets.jasmine}
      </StyledCodeExample>
    ),
  },
];

const TestIntegrationsCarousel = styled(IntegrationsCarousel)`
  width: 100%;
  display: grid;

  @media (min-width: ${breakpoints[1]}px) {
    grid-template-columns: min-content;
  }

  figure {
    display: contents;
  }
`;

export const TestIntegrations = () => (
  <TestIntegrationsCarousel integrations={testIntegrations} overflowLabel="+ and more" />
);
