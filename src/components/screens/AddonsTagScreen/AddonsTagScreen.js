import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import pluralize from 'pluralize';
import { TagList, TagLink } from '@storybook/design-system';
import useSiteMetadata from '../../lib/useSiteMetadata';
import { SocialGraph, Breadcrumb } from '../../basics';
import { AddonsPageHeader } from '../../layout/addons/AddonsPageHeader';
import { AddonsList } from '../../layout/addons/AddonsList';
import { AddonsAside, AddonsAsideTitle } from '../../layout/addons/AddonsAside';

const Container = styled.div`
  display: flex;
`;

const StyledAddonsList = styled(AddonsList)`
  flex: 1 1 auto;
`;

const RelatedTagsList = styled(TagList)`
  margin-bottom: 48px;
`;

export const AddonsTagScreen = ({ tag, addons, relatedTags }) => {
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
      <Breadcrumb to={`${home}/addons`}>View full catalog</Breadcrumb>
      <AddonsPageHeader
        title={`${tag} tag`}
        kicker={`${addons.length} tagged ${pluralize('addons', addons.length)}`}
      />
      <Container>
        <StyledAddonsList addonItems={addons} />
        <AddonsAside>
          <AddonsAsideTitle>Related tags</AddonsAsideTitle>
          <RelatedTagsList
            limit={6}
            tags={relatedTags.map((relatedTag) => (
              <TagLink key={relatedTag.link} href={relatedTag.link}>
                {relatedTag.name}
              </TagLink>
            ))}
          />
        </AddonsAside>
      </Container>
    </>
  );
};

AddonsTagScreen.propTypes = {
  tag: PropTypes.string.isRequired,
  addons: AddonsList.propTypes.addonItems,
};

AddonsTagScreen.defaultProps = {
  addons: [],
};
