import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { styles, Button } from '@storybook/design-system';
import { AddonItem } from './AddonItem';

const { spacing } = styles;

const ListWrapper = styled.div`
  > *:not(:last-child) {
    margin-bottom: ${spacing.padding.medium}px;
  }
`;

export const AddonsList = ({ addonItems, isLoading, ...props }) => {
  const [visibleCount, setVisibleCount] = useState(6);
  const items = addonItems.slice(0, visibleCount);

  const loadMore = () => {
    setVisibleCount(Math.min(visibleCount + 6, addonItems.length - 1));
  };

  return (
    <ListWrapper
      role="feed"
      aria-live={isLoading ? 'polite' : 'off'}
      aria-busy={isLoading ? true : false}
      {...props}
    >
      {items.map((addon) => (
        <AddonItem key={addon.id} orientation="horizontal" {...addon} />
      ))}
      {addonItems.length > 6 && (
        <Button tertiary onClick={loadMore}>
          Load more addons
        </Button>
      )}
    </ListWrapper>
  );
};

AddonsList.propTypes = {
  addonItems: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string.isRequired, ...AddonItem.propTypes })
  ),
  isLoading: PropTypes.bool,
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
