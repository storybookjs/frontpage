import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import pluralize from 'pluralize';
import { styled } from '@storybook/theming';
import { Icon } from '@storybook/design-system';
import { SubNav, SubNavBreadcrumb, SubNavCTA, SubNavRight } from '@storybook/components-marketing';

import useSiteMetadata from '../../lib/useSiteMetadata';
import { SocialGraph } from '../../basics';
import { AddonsPageHeader } from '../../layout/addons/AddonsPageHeader';
import { IntegrationsList } from '../../layout/IntegrationsList';
import { AddonsLayout } from '../../layout/addons/AddonsLayout';
import { sortAddons } from '../../../util/sort-addons';
import { sortRecipes } from '../../../util/sort-recipes';
import GatsbyLink from '../../basics/GatsbyLink';

const Spacer = styled.div`
  height: 3rem;
  width: 100%;
`;

const SortedIntegrationsList = styled(IntegrationsList)`
  margin-bottom: 48px;
`;

export const AddonsCategoryScreen = ({ path, pageContext }) => {
  const { title, ogImageAddons, urls = {} } = useSiteMetadata();
  const { home } = urls;

  const { category, description, integrations } = pageContext;
  const { addons = [], recipes = [] } = integrations;

  const sortedIntegrations = useMemo(
    () => [...sortAddons(addons), ...sortRecipes(recipes)],
    [addons, recipes]
  );

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
      <SubNav>
        <SubNavBreadcrumb tertiary to="/integrations/" LinkWrapper={GatsbyLink}>
          <Icon icon="arrowleft" />
          Back to integrations
        </SubNavBreadcrumb>
        <SubNavRight>
          <SubNavCTA href="/docs/react/addons/addon-catalog/">
            <Icon icon="add" />
            Add your integration
          </SubNavCTA>
        </SubNavRight>
      </SubNav>
      <Spacer />
      <AddonsLayout currentPath={`${path}/`}>
        <AddonsPageHeader title={`${category} integrations`} subtitle={description} />
        <section>
          <SortedIntegrationsList
            from={{ title: category, link: path }}
            integrationItems={sortedIntegrations}
          />
        </section>
      </AddonsLayout>
    </>
  );
};

/* eslint-disable react/require-default-props */
AddonsCategoryScreen.propTypes = {
  pageContext: PropTypes.shape({
    category: PropTypes.string.isRequired,
    description: PropTypes.string,
    Integrations: PropTypes.shape({
      addons: IntegrationsList.propTypes.integrationItems,
      recipes: IntegrationsList.propTypes.integrationItems,
    }),
  }),
};

export default AddonsCategoryScreen;
