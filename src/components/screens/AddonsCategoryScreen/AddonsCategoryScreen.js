import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import pluralize from 'pluralize';
import { styled } from '@storybook/theming';

import useSiteMetadata from '../../lib/useSiteMetadata';
import { SocialGraph } from '../../basics';
import { AddonsPageHeader } from '../../layout/addons/AddonsPageHeader';
import { AddonsList } from '../../layout/addons/AddonsList';
import { AddonsLayout } from '../../layout/addons/AddonsLayout';
import { RecipesList } from '../../layout/recipes/RecipesList';
import { sortAddons } from '../../../util/sort-addons';

import { recipeItemsData } from '../../layout/recipes/RecipesList.stories';

// TODO: Remove mock recipe items
const MOCK_RECIPES = recipeItemsData.slice(0, 9);

const SortedAddonsList = styled(AddonsList)`
  margin-bottom: 48px;
`;

export const AddonsCategoryScreen = ({ path, pageContext }) => {
  const { title, ogImageAddons, urls = {} } = useSiteMetadata();
  const { home } = urls;

  const { category, description, addons, recipes } = pageContext;

  const sortedAddons = useMemo(() => sortAddons(addons), [addons]);

  // TODO: Replace with real recipes
  const sortedRecipes = useMemo(() => recipes || MOCK_RECIPES, [recipes]);

  const integrationCount = sortedAddons.length + sortedRecipes.length;

  return (
    <>
      <SocialGraph
        title={`Integrations | ${category} | ${title}`}
        desc={
          description ||
          'Integrations enable advanced functionality and unlock new workflows. Contributed by core maintainers and the amazing developer community.'
        }
        url={`${home}${path}`}
        image={ogImageAddons}
      />
      <AddonsLayout currentPath={`${path}/`}>
        <AddonsPageHeader
          title={category}
          subtitle={description}
          kicker={pluralize('Integrations', integrationCount, true)}
        />
        <SortedAddonsList
          title="Addons"
          from={{ title: category, link: path }}
          addonItems={sortedAddons}
        />
        {sortedRecipes.length > 0 ? (
          <RecipesList
            title="Recipes"
            from={{ title: category, link: path }}
            recipeItems={sortedRecipes}
          />
        ) : null}
      </AddonsLayout>
    </>
  );
};

/* eslint-disable react/require-default-props */
AddonsCategoryScreen.propTypes = {
  pageContext: PropTypes.shape({
    category: PropTypes.string.isRequired,
    description: PropTypes.string,
    addons: AddonsList.propTypes.addonItems,
  }),
};

export default AddonsCategoryScreen;
