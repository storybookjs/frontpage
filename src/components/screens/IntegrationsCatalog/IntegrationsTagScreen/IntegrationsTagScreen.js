import React, { useMemo } from 'react';
import { styled } from '@storybook/theming';
import { SubNav, SubNavBreadcrumb, SubNavCTA, SubNavRight } from '@storybook/components-marketing';
import { TagList, TagLink, Icon } from '@storybook/design-system';
import PropTypes from 'prop-types';
import pluralize from 'pluralize';

import useSiteMetadata from '../../../lib/useSiteMetadata';
import { generateBreadcrumb } from '../../../../util/generate-breadcrumb';
import buildTagLinks from '../../../../util/build-tag-links';

import { SocialGraph } from '../../../basics';
import GatsbyLink from '../../../basics/GatsbyLink';
import {
  IntegrationsPageHeader,
  IntegrationsLayout,
  IntegrationsAside,
  IntegrationsAsideContainer,
  IntegrationsSubheading,
  IntegrationsList,
} from '../../../layout/integrations';
import { AddonsList } from '../../../layout/integrations/addons/AddonsList';

const IntegrationsContainer = styled.div`
  flex: 1 1 auto;
`;

const StyledIntegrationsList = styled(IntegrationsList)`
  margin-bottom: 48px;
`;

const RelatedTagsList = styled(TagList)`
  margin-bottom: 48px;
`;

export const IntegrationsTagScreen = ({ path, location, pageContext, ...props }) => {
  const { title, ogImageAddons, urls = {} } = useSiteMetadata();
  const { home } = urls;
  const { tag } = pageContext;
  const relatedTags = buildTagLinks(tag.relatedTags || []);
  const breadcrumb = generateBreadcrumb(location.state);

  const { addons = [], recipes = [] } = tag.integrations;

  const integrationItems = useMemo(() => [...addons, ...recipes], [addons, recipes]);
  const integrationCount = useMemo(() => addons.length + recipes.length, [addons, recipes]);

  const pageFrom = {
    title: tag.displayName || tag.name,
    link: path,
  };

  return (
    <>
      <SocialGraph
        title={`${tag.displayName || tag.name} integrations | ${title}`}
        desc="Integrations enable advanced functionality and unlock new workflows. Contributed by core maintainers and the amazing developer community."
        url={`${home}${path}`}
        image={ogImageAddons}
      />
      <SubNav>
        <SubNavBreadcrumb tertiary to={breadcrumb.link} LinkWrapper={GatsbyLink}>
          <Icon icon="arrowleft" />
          {breadcrumb.title}
        </SubNavBreadcrumb>
        <SubNavRight>
          <SubNavCTA href="/docs/react/addons/integration-catalog/">
            <Icon icon="add" />
            Add your integration
          </SubNavCTA>
        </SubNavRight>
      </SubNav>
      <IntegrationsLayout hideSidebar currentPath={`${path}/`}>
        <IntegrationsPageHeader
          title={`${tag.displayName || tag.name} integrations`}
          subtitle={`${integrationCount} ${pluralize('integrations', integrationCount)}`}
        />
        <IntegrationsAsideContainer>
          <IntegrationsContainer>
            <section>
              <StyledIntegrationsList integrationItems={integrationItems} from={pageFrom} />
            </section>
          </IntegrationsContainer>
          <IntegrationsAside>
            <IntegrationsSubheading>Related tags</IntegrationsSubheading>
            <RelatedTagsList
              isLoading={relatedTags?.length === 0}
              limit={6}
              tags={relatedTags.map((relatedTag) => (
                <TagLink
                  LinkWrapper={GatsbyLink}
                  key={relatedTag.link}
                  to={relatedTag.link}
                  state={{ from: pageFrom }}
                >
                  {relatedTag.name}
                </TagLink>
              ))}
            />
          </IntegrationsAside>
        </IntegrationsAsideContainer>
      </IntegrationsLayout>
    </>
  );
};

IntegrationsTagScreen.propTypes = {
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

IntegrationsTagScreen.defaultProps = {};

export default IntegrationsTagScreen;
