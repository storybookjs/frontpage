import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@storybook/theming';
import { styles, Button } from '@storybook/design-system';
import { RecipeItem } from './RecipeItem';

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

export const RecipesList = ({ title, recipeItems, isLoading, from, ...props }) => {
  const [visibleCount, setVisibleCount] = useState(6);
  const items = useMemo(() => recipeItems.slice(0, visibleCount), [visibleCount, recipeItems]);

  const loadMore = () => {
    setVisibleCount(Math.min(visibleCount + 6, recipeItems.length));
  };

  return (
    <ListWrapper
      role="feed"
      aria-live={isLoading ? 'polite' : 'off'}
      aria-busy={!!isLoading}
      {...props}
    >
      {(isLoading ? loadingItems : items).map((recipe) => (
        <RecipeItem key={recipe.id} from={from} orientation="horizontal" {...recipe} />
      ))}
      {recipeItems.length > 6 && visibleCount < recipeItems.length && (
        <Button tertiary onClick={loadMore}>
          Load more recipes
        </Button>
      )}
    </ListWrapper>
  );
};

/* eslint-disable react/require-default-props */
RecipesList.propTypes = {
  recipeItems: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string.isRequired, ...RecipeItem.propTypes })
  ),
  isLoading: PropTypes.bool,
  from: PropTypes.shape({
    title: PropTypes.string,
    link: PropTypes.string,
  }),
};

RecipesList.defaultProps = {
  recipeItems: [
    { id: '1', isLoading: true },
    { id: '2', isLoading: true },
    { id: '3', isLoading: true },
    { id: '4', isLoading: true },
  ],
  isLoading: false,
};
