import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@storybook/theming';
import { ButtonToggle, Icon, Link, styles, TagLink, TagList } from '@storybook/design-system';
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
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;

  @media (min-width: ${breakpoint * 1.333}px) {
    padding-bottom: 40px;
    padding-top: 4rem;
    padding-bottom: ${spacing.padding.medium}px;
  }

  @media (min-width: ${breakpoint * 1.5}px) {
    flex-direction: row;
    padding-bottom: ${spacing.padding.medium}px;
  }
`;

const PageHeadingLeft = styled.div`
  flex: 1 1 auto;
`;

const PageHeading = styled.h1`
  font-size: ${typography.size.l1}px;
  line-height: ${typography.size.l2}px;
  font-weight: ${typography.weight.bold};
  margin-bottom: 1.25rem;
  color: ${color.darkest};

  @media (min-width: ${breakpoint * 1}px) {
    font-size: ${typography.size.l2}px;
    line-height: ${typography.size.l3}px;
    margin-bottom: 0.75rem;
  }
`;

const PageSubheading = styled.p`
  margin: 0; //reset
  font-size: ${typography.size.s3}px;
  line-height: 28px;
  color: ${color.darker};
`;

const PageHeadingRight = styled.div`
  display: none;
  flex: 0 1 auto;
  font-size: ${typography.size.s2}px;
  line-height: ${typography.size.m1}px;
  font-weight: ${typography.weight.bold};

  @media (min-width: ${breakpoint * 1.5}px) {
    display: block;
    align-self: flex-start;
    justify-self: flex-end;
  }
`;

const PageHeader = () => (
  <PageHeaderContainer>
    <PageHeadingLeft>
      <PageHeading>Integrations</PageHeading>
      <PageSubheading>
        Integrate your tools with Storybook to connect workflows and unlock advanced features.
      </PageSubheading>
    </PageHeadingLeft>
    <PageHeadingRight>
      <GatsbyLink to="/docs/react/addons/addon-catalog/">
        <Icon icon="add" />
        Add your integration
      </GatsbyLink>
    </PageHeadingRight>
  </PageHeaderContainer>
);

const PopularTagsList = styled(TagList)`
  margin-bottom: calc(70px - 32px - 10px);
`;

const PopularAddons = styled(AddonsGrid)`
  margin-bottom: 3rem;
`;

const PopularRecipes = styled(RecipesList)`
  margin-bottom: 3rem;
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
