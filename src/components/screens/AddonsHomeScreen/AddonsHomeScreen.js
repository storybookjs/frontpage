import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@storybook/theming';
import { ButtonToggle, styles, TagLink, TagList } from '@storybook/design-system';
import useSiteMetadata from '../../lib/useSiteMetadata';
import { SocialGraph, ListHeadingContainer, ListHeading } from '../../basics';
import { AddonsGrid } from '../../layout/addons/AddonsGrid';
import { RecipesList } from '../../layout/recipes/RecipesList';
import { AddonsLayout } from '../../layout/addons/AddonsLayout';
import buildTagLinks from '../../../util/build-tag-links';
import GatsbyLink from '../../basics/GatsbyLink';

const { breakpoint, spacing, color, pageMargins, typography } = styles;

const PageHeader = styled.header`
  ${pageMargins}
  padding-top: 3rem;
  padding-bottom: ${spacing.padding.medium}px;

  @media (min-width: ${breakpoint * 1.333}px) {
    padding-top: 4rem;
  }
`;

const PageHeading = styled.h1`
  font-size: ${typography.size.l2}px;
  line-height: ${typography.size.l2}px;
  font-weight: ${typography.weight.bold};
  letter-spacing: -0.29px;
  margin-bottom: 4px;
  color: ${color.darkest};

  @media (min-width: ${breakpoint * 1}px) {
    font-size: ${typography.size.l2}px;
    margin-bottom: 8px;
    letter-spacing: -0.37px;
  }
`;

const PageSubheading = styled.p`
  font-size: ${typography.size.s3}px;
  line-height: ${typography.size.m2}px;
  letter-spacing: -0.33px;
  margin-bottom: ${spacing.padding.medium}px;
  color: ${color.darker};

  @media (min-width: ${breakpoint * 1}px) {
    font-size: ${typography.size.s3}px;
    line-height: ${typography.size.l1}px;
    letter-spacing: -0.42px;
  }
`;

const PopularTagsList = styled(TagList)`
  margin-bottom: ${spacing.padding.medium}px;
`;

const PopularAddons = styled(AddonsGrid)`
  margin-bottom: 48px;
`;

const PopularRecipes = styled(RecipesList)`
  margin-bottom: 48px;
`;

export const AddonsHomeScreen = ({
  pageContext: { popularAddons, popularRecipes, trendingAddons, trendingTags = [] },
}) => {
  const { title, ogImageAddons, urls = {} } = useSiteMetadata();
  const { home } = urls;
  const [timePeriod, setTimePeriod] = useState('MONTH');
  const popularAddonsForTimePeriod = useMemo(
    () => popularAddons[timePeriod],
    [popularAddons, timePeriod]
  );
  const popularRecipesForTimePeriod = useMemo(
    () => popularRecipes[timePeriod],
    [popularRecipes, timePeriod]
  );
  const tagLinks = useMemo(() => buildTagLinks(trendingTags), [trendingTags]);

  return (
    <>
      <SocialGraph
        title={`Integrations | ${title}`}
        desc="Integrations enable advanced functionality and unlock new workflows. Contributed by core maintainers and the amazing developer community."
        url={`${home}/integrations`}
        image={ogImageAddons}
      />
      <PageHeader>
        <PageHeading>Integrations</PageHeading>
        <PageSubheading>
          Integrate your tools with Storybook to connect workflows and unlock advanced features.
        </PageSubheading>
      </PageHeader>
      <AddonsLayout currentPath="/integrations/">
        <PopularTagsList
          limit={6}
          tags={tagLinks.map(({ link, name }) => (
            <TagLink LinkWrapper={GatsbyLink} key={link} to={link}>
              {name}
            </TagLink>
          ))}
        />
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

        <section>
          <ListHeadingContainer>
            <ListHeading>Popular recipes</ListHeading>
          </ListHeadingContainer>
          <PopularRecipes recipeItems={popularRecipesForTimePeriod} />
        </section>

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
