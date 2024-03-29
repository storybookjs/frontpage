import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@storybook/theming';
import { styles, Button } from '@storybook/design-system';
import { AddonItem } from './AddonItem';

const { spacing } = styles;

const ListWrapper = styled.div`
  > *:not(:last-child) {
    margin-bottom: ${spacing.padding.medium}px;
  }
`;

const loadingItems = [
  { id: '1', isLoading: true },
  { id: '2', isLoading: true },
  { id: '3', isLoading: true },
  { id: '4', isLoading: true },
  { id: '5', isLoading: true },
  { id: '6', isLoading: true },
];

export const AddonsList = ({ addonItems, isLoading, from, ...props }) => {
  const [visibleCount, setVisibleCount] = useState(6);
  const items = useMemo(() => addonItems.slice(0, visibleCount), [visibleCount, addonItems]);

  const loadMore = useCallback(() => {
    setVisibleCount(Math.min(visibleCount + 6, addonItems.length));
  }, [visibleCount, setVisibleCount, addonItems]);

  return (
    <ListWrapper
      role="feed"
      aria-live={isLoading ? 'polite' : 'off'}
      aria-busy={!!isLoading}
      {...props}
    >
      {(isLoading ? loadingItems : items).map((addon) => (
        <AddonItem key={addon.id} from={from} orientation="horizontal" {...addon} />
      ))}

      {addonItems.length > 6 && visibleCount < addonItems.length && (
        <Button tertiary onClick={loadMore}>
          Load more integrations
        </Button>
      )}
    </ListWrapper>
  );
};

/* eslint-disable react/require-default-props */
AddonsList.propTypes = {
  addonItems: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string.isRequired, ...AddonItem.propTypes })
  ),
  isLoading: PropTypes.bool,
  from: PropTypes.shape({
    title: PropTypes.string,
    link: PropTypes.string,
  }),
};

AddonsList.defaultProps = {
  addonItems: [
    { id: '1', isLoading: true },
    { id: '2', isLoading: true },
    { id: '3', isLoading: true },
    { id: '4', isLoading: true },
  ],
  isLoading: false,
};
