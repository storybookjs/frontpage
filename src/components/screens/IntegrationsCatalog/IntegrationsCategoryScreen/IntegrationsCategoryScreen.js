import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@storybook/theming';
import { Icon } from '@storybook/design-system';
import { SubNav, SubNavBreadcrumb, SubNavCTA, SubNavRight } from '@storybook/components-marketing';

import useSiteMetadata from '../../../lib/useSiteMetadata';
import { SocialGraph } from '../../../basics';
import {
  IntegrationsPageHeader,
  IntegrationsList,
  IntegrationsLayout,
} from '../../../layout/integrations';
import { sortAddons } from '../../../../util/sort-addons';
import { sortRecipes } from '../../../../util/sort-recipes';
import GatsbyLink from '../../../basics/GatsbyLink';
import { generateBreadcrumb } from '../../../../util/generate-breadcrumb';

const SortedIntegrationsList = styled(IntegrationsList)`
  margin-bottom: 48px;
`;

export const IntegrationsCategoryScreen = ({ path, location, pageContext }) => {
  const { title, ogImageAddons, urls = {} } = useSiteMetadata();
  const { home } = urls;

  const { category, description, integrations } = pageContext;
  const { addons = [], recipes = [] } = integrations;

  const sortedIntegrations = useMemo(
    () => [...sortAddons(addons), ...sortRecipes(recipes)],
    [addons, recipes]
  );

  const breadcrumb = generateBreadcrumb(location.state);
  const pageFrom = { title: category, link: path };

  return (
    <>
      <SocialGraph
        title={`${category} integrations | ${title}`}
        desc={
          description ||
          'Integrations enable advanced functionality and unlock new workflows. Contributed by core maintainers and the amazing developer community.'
        }
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
      <IntegrationsLayout currentPath={`${path}/`}>
        <IntegrationsPageHeader title={`${category} integrations`} subtitle={description} />
        <section>
          <SortedIntegrationsList from={pageFrom} integrationItems={sortedIntegrations} />
        </section>
      </IntegrationsLayout>
    </>
  );
};

/* eslint-disable react/require-default-props */
IntegrationsCategoryScreen.propTypes = {
  pageContext: PropTypes.shape({
    category: PropTypes.string.isRequired,
    description: PropTypes.string,
    Integrations: PropTypes.shape({
      addons: IntegrationsList.propTypes.integrationItems,
      recipes: IntegrationsList.propTypes.integrationItems,
    }),
  }),
};

export default IntegrationsCategoryScreen;
