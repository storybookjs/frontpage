import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import pluralize from 'pluralize';
import useSiteMetadata from '../../lib/useSiteMetadata';
import { SocialGraph } from '../../basics';
import { AddonsPageHeader } from '../../layout/addons/AddonsPageHeader';
import { AddonsList } from '../../layout/addons/AddonsList';
import { AddonsLayout } from '../../layout/addons/AddonsLayout';
import { sortAddons } from '../../../util/sort-addons';

export const AddonsCategoryScreen = ({ path, pageContext }) => {
  const { title, ogImageAddons, urls = {} } = useSiteMetadata();
  const { home } = urls;

  const { category, description, addons } = pageContext;

  const sortedAddons = useMemo(() => sortAddons(addons), [addons]);

  return (
    <>
      <SocialGraph
        title={`Addons | ${category} | ${title}`}
        desc={
          description ||
          'Addons enable advanced functionality and unlock new workflows. Contributed by core maintainers and the amazing developer community.'
        }
        url={`${home}${path}`}
        image={ogImageAddons}
      />
      <AddonsLayout currentPath={`${path}/`}>
        <AddonsPageHeader
          title={category}
          subtitle={description}
          kicker={pluralize('addon', addons.length, true)}
        />
        <AddonsList from={{ title: category, link: path }} addonItems={sortedAddons} />
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
