import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@storybook/theming';
import { styles, Button } from '@storybook/design-system';
import { AddonItem } from './addons/AddonItem';
import { RecipeItem } from './recipes/RecipeItem';
import { IntegrationItem } from '../../util/integrations';

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

export const IntegrationsList = ({ integrationItems = [], isLoading, from, ...props }) => {
  const [visibleCount, setVisibleCount] = useState(6);
  const items = useMemo(
    () => integrationItems.slice(0, visibleCount),
    [visibleCount, integrationItems]
  );
  const integrationCount = useMemo(() => integrationItems.length, [integrationItems]);

  const loadMore = useCallback(() => {
    setVisibleCount(Math.min(visibleCount + 6, integrationCount));
  }, [visibleCount, setVisibleCount, integrationCount]);

  return (
    <ListWrapper
      role="feed"
      aria-live={isLoading ? 'polite' : 'off'}
      aria-busy={!!isLoading}
      {...props}
    >
      {(isLoading ? loadingItems : items).map((integration) =>
        IntegrationItem.isAddon(integration) ? (
          <AddonItem key={integration.id} from={from} orientation="horizontal" {...integration} />
        ) : (
          <RecipeItem key={integration.id} from={from} orientation="horizontal" {...integration} />
        )
      )}

      {integrationCount > 6 && visibleCount < integrationCount && (
        <Button tertiary onClick={loadMore}>
          Load more addons
        </Button>
      )}
    </ListWrapper>
  );
};

/* eslint-disable react/require-default-props */
IntegrationsList.propTypes = {
  integrationItems: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({ id: PropTypes.string.isRequired, ...AddonItem.propTypes }),
      PropTypes.shape({ id: PropTypes.string.isRequired, ...RecipeItem.propTypes }),
    ])
  ),
  isLoading: PropTypes.bool,
  from: PropTypes.shape({
    title: PropTypes.string,
    link: PropTypes.string,
  }),
};

IntegrationsList.defaultProps = {
  integrationItems: [...loadingItems],
  isLoading: false,
};
