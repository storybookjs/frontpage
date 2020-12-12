import React from 'react';
import styled from 'styled-components';
import { styles } from '@storybook/design-system';
import { AddonsLearn } from './AddonsLearn';

const { breakpoint } = styles;

const Aside = styled.aside`
  margin-top: 80px;

  @media (min-width: ${breakpoint * 1.5}px) {
    flex: none;
    width: 210px;
    margin-left: 40px;
    margin-top: 0;
  }
`;

export const AddonsAsideContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: ${breakpoint * 1.5}px) {
    flex-direction: row;
  }
`;

export const AddonsAside = ({ children, ...props }) => (
  <Aside {...props}>
    {children}
    <AddonsLearn />
  </Aside>
);
