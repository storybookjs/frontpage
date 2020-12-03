import React from 'react';
import styled from 'styled-components';
import { styles } from '@storybook/design-system';
import { AddonsLearn } from './AddonsLearn';

const { breakpoint } = styles;

const Aside = styled.aside`
  display: none;
  width: 210px;
  margin-left: 40px;
  flex: none;

  @media (min-width: ${breakpoint * 1.5}px) {
    display: block;
  }
`;

export const AddonsAside = ({ children, ...props }) => (
  <Aside {...props}>
    {children}
    <AddonsLearn />
  </Aside>
);
