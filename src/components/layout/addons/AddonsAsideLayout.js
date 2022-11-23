import React from 'react';
import { styled } from '@storybook/theming';
import { styles } from '@storybook/design-system';
import { AddonsLearn } from './AddonsLearn';

const { color, breakpoint } = styles;

const Aside = styled.aside`
  padding-top: 3rem;
  border-top: 1px solid ${color.border};
  width: 100%;

  @media (min-width: ${breakpoint * 1.5}px) {
    //reset
    padding-top: 0;
    border-top: none;

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

export const AddonsAside = ({ children, hideLearn, ...props }) => (
  <Aside {...props}>
    {children}
    {!hideLearn ? <AddonsLearn /> : null}
  </Aside>
);
