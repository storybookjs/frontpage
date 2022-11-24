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

const PageHeaderContainer = styled.header`
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

const PageHeader = () => (
  <PageHeaderContainer>
    <PageHeading>Integrations</PageHeading>
    <PageSubheading>
      Integrate your tools with Storybook to connect workflows and unlock advanced features.
    </PageSubheading>
  </PageHeaderContainer>
);

const PopularTagsList = styled(TagList)`
  margin-bottom: 28px;
`;

const PopularAddons = styled(AddonsGrid)`
  margin-bottom: 48px;
`;

const PopularRecipes = styled(RecipesList)`
  margin-bottom: 48px;
`;

export const AddonsHomeScreen = ({
  pageContext: { popularAddons = [], popularRecipes = [], trendingAddons = [], trendingTags = [] },
}) => {
  const { title, ogImageAddons, urls = {} } = useSiteMetadata();
  const { home } = urls;

  const tagLinks = useMemo(() => buildTagLinks(trendingTags), [trendingTags]);

  return (
    <>
      <SocialGraph
        title={`Integrations | ${title}`}
        desc="Integrations enable advanced functionality and unlock new workflows. Contributed by core maintainers and the amazing developer community."
        url={`${home}/integrations`}
        image={ogImageAddons}
      />
      <AddonsLayout currentPath="/integrations/" RenderHeader={PageHeader}>
        <PopularTagsList
          limit={6}
          tags={tagLinks.map(({ link, name }) => (
            <TagLink LinkWrapper={GatsbyLink} key={link} to={link}>
              {name}
            </TagLink>
          ))}
        />
        <PopularAddons title="Popular addons" addonItems={popularAddons} />

        <section>
          <ListHeadingContainer>
            <ListHeading>Popular recipes</ListHeading>
          </ListHeadingContainer>
          <PopularRecipes recipeItems={popularRecipes} />
        </section>

        <AddonsGrid title="Trending addons" addonItems={trendingAddons} />
      </AddonsLayout>
    </>
  );
};

AddonsHomeScreen.propTypes = {
  pageContext: PropTypes.shape({
    popularAddons: AddonsGrid.propTypes.addonItems.isRequired,
    popularRecipes: RecipesList.propTypes.recipeItems.isRequired,
    trendingAddons: AddonsGrid.propTypes.addonItems.isRequired,
  }).isRequired,
};

export default AddonsHomeScreen;
