import React from 'react';
import styled from 'styled-components';
import { styles, Subheading } from '@storybook/design-system';
import { AddonsLearn } from './AddonsLearn';

const { breakpoint, typography, color } = styles;

const Aside = styled.aside`
  display: none;
  width: 210px;
  margin-left: 40px;
  flex: none;

  @media (min-width: ${breakpoint * 1.333}px) {
    display: block;
  }
`;

export const AddonsAside = ({ children, ...props }) => (
  <Aside {...props}>
    {children}
    <AddonsLearn />
  </Aside>
);

export const AddonsAsideTitle = styled(Subheading)`
  font-weight: ${typography.weight.extrabold};
  line-height: ${typography.size.m1}px;
  letter-spacing: 5.57px;
  color: ${color.dark};
  margin-bottom: 12px;
  display: block;
`;
