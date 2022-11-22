import * as React from 'react';
import { Button, styles } from '@storybook/design-system';
import { css, styled } from '@storybook/theming';

export const ToggleButton = styled(({ active, disabled, ...props }) => (
  <Button appearance={active ? 'inverseSecondary' : 'outline'} isDisabled={disabled} {...props} />
))`
  ${(props) =>
    props.active &&
    css`
      &,
      &:hover {
        background-color: ${styles.background.calmBlue};
      }
    `}
  ${(props) =>
    props.disabled &&
    css`
      &,
      &:hover {
        box-shadow: rgb(0 0 0 / 15%) 0 0 0 1px inset;
      }
    `}
`;
