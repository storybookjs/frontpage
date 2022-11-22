import * as React from 'react';
import {
  Button,
  Checkbox,
  Icon,
  Link,
  ListItem,
  styles,
  TooltipLinkList,
  WithTooltip,
} from '@storybook/design-system';
import { styled } from '@storybook/theming';

import { ToggleButton } from './ToggleButton';

export type Items = Array<Omit<React.ComponentProps<typeof ListItem>, 'LinkWrapper'>>;
export type Value = Array<string>;

export type FilterMenuProps = Omit<
  React.ComponentProps<typeof WithTooltip>,
  'children' | 'tooltip' | 'trigger'
> & {
  disabled?: boolean;
  includeClearButton?: boolean;
  items: Items;
  label: string;
  multiple?: boolean;
  onChange: (value: Value) => void;
  TriggerButton?: React.ComponentType<React.ComponentProps<typeof Button> & { active: boolean }>;
  value: Value;
};

const ClearButton = styled((props) => <Link isButton {...props} />)`
  border-top: 1px solid ${styles.color.border};
  display: block;
  font-weight: ${styles.typography.weight.bold};
  line-height: 18px;
  padding: 7px 15px;
  text-align: center;
  width: 100%;
  &:hover {
    transform: none;
  }
`;

const Trigger = styled(({ active, Component, children, ...props }) => (
  <Component active={active} ButtonWrapper="span" {...props}>
    {children}
    <Icon icon="arrowdown" />
  </Component>
))`
  & svg {
    margin-left: 6px;
    margin-right: 0;
  }
`;

export const FilterMenu: React.VFC<FilterMenuProps> = ({
  disabled,
  items: itemsProp,
  label,
  multiple = false,
  onChange,
  TriggerButton: TriggerButtonProp = ToggleButton,
  value: valueProp,
  includeClearButton = false,
  ...props
}) => {
  const hasValue = valueProp.length > 0;

  const getValue = (itemValue: string) => {
    if (multiple) {
      const index = valueProp.findIndex((value) => value === itemValue);

      if (index !== -1) {
        const newValueProp = valueProp.slice();
        newValueProp.splice(index, 1);
        return newValueProp;
      }

      return valueProp.concat([itemValue]);
    }

    return [itemValue];
  };

  const items: Items = itemsProp.map(({ value, ...item }) => ({
    appearance: 'secondary',
    left: multiple && (
      <Checkbox
        appearance="secondary"
        checked={valueProp.includes(value)}
        hideLabel
        id={value}
        label={value}
        onClick={(event) => {
          event?.stopPropagation();
        }}
        readOnly
      />
    ),
    onClick: () => {
      onChange(getValue(value));
    },
    value,
    ...item,
  }));

  return (
    // TODO: Remove arrow; requires updates to WithTooltip
    <WithTooltip
      closeOnClick={!multiple}
      placement="bottom-start"
      tooltip={({ onHide: closeTooltip }: { onHide: () => void }) => {
        return (
          <>
            <TooltipLinkList links={items} />
            {includeClearButton && (
              <ClearButton
                onClick={() => {
                  onChange([]);
                  closeTooltip();
                }}
              >
                Clear filter
              </ClearButton>
            )}
          </>
        );
      }}
      trigger="click"
      {...props}
    >
      <Trigger active={hasValue} disabled={disabled} Component={TriggerButtonProp}>
        {hasValue
          ? // TODO: Limit length?
            items
              .filter(({ value }) => valueProp.includes(value))
              .map(({ title }) => title)
              .join(', ')
          : label}
      </Trigger>
    </WithTooltip>
  );
};
