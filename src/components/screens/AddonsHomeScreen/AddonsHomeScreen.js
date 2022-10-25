import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@storybook/theming';
import { ButtonToggle, styles } from '@storybook/design-system';
import useSiteMetadata from '../../lib/useSiteMetadata';
import { SocialGraph } from '../../basics';
import { AddonsGrid } from '../../layout/addons/AddonsGrid';
import { RecipesList } from '../../layout/recipes/RecipesList';
import { AddonsLayout } from '../../layout/addons/AddonsLayout';

const PopularAddons = styled(AddonsGrid)`
  margin-bottom: 48px;
`;

const PopularRecipes = styled(RecipesList)`
  margin-bottom: 48px;
`;

export const AddonsHomeScreen = ({
  pageContext: { popularAddons, popularRecipes, trendingAddons },
}) => {
  const { title, ogImageAddons, urls = {} } = useSiteMetadata();
  const { home } = urls;
  const [timePeriod, setTimePeriod] = useState('MONTH');
  const popularAddonsForTimePeriod = useMemo(
    () => popularAddons[timePeriod],
    [popularAddons, timePeriod]
  );

  return (
    <>
      <SocialGraph
        title={`Integrations | ${title}`}
        desc="Integrations enable advanced functionality and unlock new workflows. Contributed by core maintainers and the amazing developer community."
        url={`${home}/integrations`}
        image={ogImageAddons}
      />
      <AddonsLayout currentPath="/integrations/">
        <PopularAddons
          title="Popular addons"
          addonItems={popularAddonsForTimePeriod}
          actions={
            <ButtonToggle
              selectedIndex={timePeriod === 'MONTH' ? 0 : 1}
              onSelectIndex={() => {
                setTimePeriod(timePeriod === 'MONTH' ? 'YEAR' : 'MONTH');
              }}
              titles={[
                { title: 'Month', tooltip: 'Month' },
                { title: 'Year', tooltip: 'Year' },
              ]}
            />
          }
        />
        {popularRecipes.length > 0 ? (
          <PopularRecipes title="Popular recipes" recipeItems={popularRecipes} />
        ) : null}
        <AddonsGrid title="Trending addons" addonItems={trendingAddons} />
      </AddonsLayout>
    </>
  );
};

AddonsHomeScreen.propTypes = {
  pageContext: PropTypes.shape({
    popularAddons: PropTypes.shape({
      MONTH: AddonsGrid.propTypes.addonItems,
      YEAR: AddonsGrid.propTypes.addonItems,
    }).isRequired,
    trendingAddons: AddonsGrid.propTypes.addonItems.isRequired,
  }).isRequired,
};

export default AddonsHomeScreen;
