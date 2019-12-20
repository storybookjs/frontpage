import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';

interface PillProps {
  bordered: boolean;
  padded: boolean;
  fullWidth: boolean;
}

const PillWrapper = styled.div<PillProps>(
  ({ fullWidth }) => ({
    display: fullWidth ? 'flex' : 'inline-flex',
    overflow: 'hidden',
    height: 28,
    borderRadius: 28,
    boxSizing: 'border-box',
    background: 'white',
  }),
  {
    fontSize: '12px',
    fontWeight: 800,
    lineHeight: '1',
    color: 'rgb(102, 102, 102)',
  },
  {
    '> *': {
      margin: 0,
      padding: 0,
      borderTop: '0 none',
      borderBottom: '0 none',
      background: 'transparent',
      flex: '1',
    },
    '> *[data-active="true"]': {
      borderLeft: '1px solid transparent',
      borderRight: '1px solid transparent',
      color: 'rgb(51, 51, 51)',
      background: 'rgb(221, 221, 221)',
    },
  },
  ({ bordered }) =>
    bordered
      ? {
          border: '1px solid rgb(221, 221, 221)',
          '> *': {
            borderLeft: '1px solid transparent',
            borderRight: '1px solid transparent',
          },
          '> * + *': {
            borderLeft: '1px solid rgb(221, 221, 221)',
            borderRight: '1px solid transparent',
          },
          '> *[data-active="true"] + *': {
            borderLeft: '1px solid transparent',
            borderRight: '1px solid transparent',
          },
        }
      : {},
  ({ padded }) =>
    padded
      ? {
          '> *': { paddingLeft: '10px', paddingRight: '10px' },
          '> *:first-child': { paddingLeft: '13px', paddingRight: '10px' },
          '> *:last-child': { paddingLeft: '10px', paddingRight: '13px' },
        }
      : {}
);

interface PillProps {
  bordered: boolean;
  padded: boolean;
  fullWidth: boolean;
}

export const Pill: FunctionComponent<Partial<PillProps>> = ({
  children,
  bordered = true,
  padded = true,
  fullWidth = false,
}) => {
  return (
    <PillWrapper bordered={bordered} padded={padded} fullWidth={fullWidth}>
      {children}
    </PillWrapper>
  );
};
export const PillSection = styled.div({
  height: '100%',
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
