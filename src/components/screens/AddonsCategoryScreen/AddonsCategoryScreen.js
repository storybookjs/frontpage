import React from 'react';
import PropTypes from 'prop-types';
import pluralize from 'pluralize';
import useSiteMetadata from '../../lib/useSiteMetadata';
import { SocialGraph } from '../../basics';
import { AddonsPageHeader } from '../../layout/addons/AddonsPageHeader';
import { AddonsList } from '../../layout/addons/AddonsList';

export const AddonsCategoryScreen = ({ category, description, addons }) => {
  const { title, ogImage, urls = {} } = useSiteMetadata();
  const { home } = urls;

  return (
    <>
      <SocialGraph
        title={`Addons | ${title}`}
        desc="Addons enable advanced functionality and unlock new workflows. Contributed by core maintainers and the amazing developer community."
        url={`${home}/addons`}
        image={ogImage}
      />
      <AddonsPageHeader
        title={category}
        subtitle={description}
        kicker={pluralize('addon', addons.length, true)}
      />
      <AddonsList addonItems={addons} />
    </>
  );
};

/* eslint-disable react/require-default-props */
AddonsCategoryScreen.propTypes = {
  category: PropTypes.string.isRequired,
  description: PropTypes.string,
  addons: AddonsList.propTypes.addonItems,
};
