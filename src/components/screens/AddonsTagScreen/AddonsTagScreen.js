import React from 'react';
import { styled } from '@storybook/theming';
import PropTypes from 'prop-types';
import pluralize from 'pluralize';
import { TagList, TagLink, Icon } from '@storybook/design-system';
import useSiteMetadata from '../../lib/useSiteMetadata';
import { SocialGraph, Breadcrumb, ListHeadingContainer, ListSubheading } from '../../basics';
import { AddonsPageHeader } from '../../layout/addons/AddonsPageHeader';
import { AddonsList } from '../../layout/addons/AddonsList';
import { RecipesList } from '../../layout/recipes/RecipesList';
import { AddonsLayout } from '../../layout/addons/AddonsLayout';
import { AddonsAside, AddonsAsideContainer } from '../../layout/addons/AddonsAsideLayout';
import { AddonsSubheading } from '../../layout/addons/AddonsSubheading';
import { generateBreadcrumb } from '../../../util/generate-breadcrumb';
import buildTagLinks from '../../../util/build-tag-links';

import { recipeItemsData } from '../../layout/recipes/RecipesList.stories';
import { SubNav, SubNavBreadcrumb } from '@storybook/components-marketing';
import GatsbyLink from '../../basics/GatsbyLink';

const IntegrationsContainer = styled.div`
  flex: 1 1 auto;
`;

const StyledAddonsList = styled(AddonsList)`
  margin-bottom: 48px;
`;

const RelatedTagsList = styled(TagList)`
  margin-bottom: 48px;
`;

export const AddonsTagScreen = ({ path, pageContext, ...props }) => {
  const { title, ogImageAddons, urls = {} } = useSiteMetadata();
  const { home } = urls;
  const { tag } = pageContext;
  const relatedTags = buildTagLinks(tag.relatedTags || []);
  const breadcrumb = generateBreadcrumb();

  const { addons = [], recipes = [] } = tag.integrations;

  const integrationCount = addons.length + recipes.length;

  return (
    <>
      <SocialGraph
        title={`${tag.displayName || tag.name} Integrations | ${title}`}
        desc="Integrations enable advanced functionality and unlock new workflows. Contributed by core maintainers and the amazing developer community."
        url={`${home}${path}`}
        image={ogImageAddons}
      />
      <SubNav>
        <SubNavBreadcrumb tertiary to="/integrations/" LinkWrapper={GatsbyLink}>
          <Icon icon="arrowleft" />
          Back to integrations
        </SubNavBreadcrumb>
      </SubNav>
      <AddonsLayout hideSidebar currentPath={`${path}/`}>
        <AddonsPageHeader
          title={`${tag.displayName || tag.name} tag`}
          kicker={`${integrationCount} tagged ${pluralize('Integrations', integrationCount)}`}
        />
        <AddonsAsideContainer>
          <IntegrationsContainer>
            <section>
              <ListHeadingContainer>
                <ListSubheading>Addons</ListSubheading>
              </ListHeadingContainer>
              <StyledAddonsList
                addonItems={addons}
                from={{ title: tag.displayName || tag.name, link: path }}
              />
            </section>

            <section>
              <ListHeadingContainer>
                <ListSubheading>Recipes</ListSubheading>
              </ListHeadingContainer>
              <RecipesList
                recipeItems={recipes}
                from={{ title: tag.displayName || tag.name, link: path }}
              />
            </section>
          </IntegrationsContainer>
          <AddonsAside>
            <AddonsSubheading>Related tags</AddonsSubheading>
            <RelatedTagsList
              isLoading={relatedTags?.length === 0}
              limit={6}
              tags={relatedTags.map((relatedTag) => (
                <TagLink key={relatedTag.link} href={relatedTag.link}>
                  {relatedTag.name}
                </TagLink>
              ))}
            />
          </AddonsAside>
        </AddonsAsideContainer>
      </AddonsLayout>
    </>
  );
};

AddonsTagScreen.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.shape({
      name: PropTypes.string.isRequired,
      displayName: PropTypes.string,
      icon: PropTypes.string,
      addons: AddonsList.propTypes.addonItems,
      relatedTags: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          displayName: PropTypes.string,
          icon: PropTypes.string,
        })
      ).isRequired,
    }).isRequired,
  }).isRequired,
};

AddonsTagScreen.defaultProps = {};

export default AddonsTagScreen;
