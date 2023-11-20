/* eslint-disable prefer-destructuring */
import * as React from 'react';
import * as RadixTabs from '@radix-ui/react-tabs';
import { styled } from '@storybook/theming';
import { color, minSm, spacing, typography } from '@chromaui/tetra';

/**
 * Note: The styles here are directly copied from RendererSelector
 * The only difference is using &[data-state='active'] instead of an `isActive` prop
 */

const Root = RadixTabs.Root;

const List = styled(RadixTabs.List)`
  display: flex;
  gap: ${spacing[2]};

  border: 1px solid ${color.slate300};
  border-bottom: 0;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background: ${color.slate50};
  padding: ${spacing[2]} ${spacing['2']};

  ${minSm} {
    padding-left: ${spacing['3']};
    padding-right: ${spacing['3']};
  }
`;

const Trigger = styled(RadixTabs.Trigger)`
  all: unset;
  ${typography.body14}
  border-radius: 4px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  border: 1px solid ${color.slate400};
  padding: 0 ${spacing[2]};
  gap: 4px;
  color: ${color.slate800};
  transition: all 0.14s ease;

  &:hover {
    border: 1px solid ${color.blue500};
    color: ${color.blue500};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${color.blue500};
  }

  &[data-state='active'] {
    &,
    &:hover {
      background: ${color.slate600};
      border: 1px solid ${color.slate600};
      color: ${color.white};
    }
  }
`;

const Content = RadixTabs.Content;

export const Tabs = {
  Root,
  List,
  Trigger,
  Content,
};
