import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@storybook/theming';
import pluralize from 'pluralize';
import { styles, TagList, TagLink } from '@storybook/design-system';
import { AddonsList } from './AddonsList';
import { AddonsAside, AddonsAsideContainer } from './AddonsAsideLayout';
import { AddonsSubheading } from './AddonsSubheading';

const { breakpoint, spacing, color, typography } = styles;

const SearchResultsContainer = styled(AddonsAsideContainer)`
  align-items: flex-start;
`;

const SearchSummaryCopy = styled.div`
  font-size: ${typography.weight.black};
  line-height: 28px;
  color: ${color.darkest};
  margin-left: ${spacing.padding.medium}px;

  @media (min-width: ${breakpoint * 1.333}px) {
    margin-left: 0;
  }
`;

const StyledAddonsList = styled(AddonsList)`
  flex: 1 1 auto;
  width: 100%;
`;

const RelatedTagsList = styled(TagList)`
  margin-bottom: 48px;
`;

export const AddonsSearchSummary = ({ isLoading, count }) => {
  return isLoading ? null : (
    <SearchSummaryCopy>
      {count === 0 ? 'No addons' : pluralize('addons', count, true)}
    </SearchSummaryCopy>
  );
};

const NoAddonsFoundInner = styled.div`
  flex: 1 1 auto;
  border: 1px dashed ${color.border};
  border-radius: 5px;
  padding: 32px;
  text-align: center;
  width: 100%;

  font-size: ${typography.size.s2}px;
  line-height: ${typography.size.m1}px;
  color: ${color.dark};
  text-align: center;

  h3 {
    font-size: ${typography.size.s2}px;
    line-height: ${typography.size.m1}px;
    font-weight: ${typography.weight.black};
  }
`;

const NoAddonsFound = () => (
  <NoAddonsFoundInner>
    <h3>No addons found</h3>
    <div>Perhaps it was a typo?</div>
  </NoAddonsFoundInner>
);

AddonsSearchSummary.propTypes = {
  count: PropTypes.number.isRequired,
  isLoading: PropTypes.bool,
};

AddonsSearchSummary.defaultProps = {
  isLoading: false,
};

export const AddonsSearchResults = ({ isLoading, results, relatedTags, ...props }) => (
  <SearchResultsContainer {...props}>
    {!isLoading && results.length === 0 ? (
      <NoAddonsFound />
    ) : (
      <StyledAddonsList isLoading={isLoading} addonItems={results} />
    )}
    <AddonsAside>
      {!isLoading && results.length > 0 && (
        <>
          <AddonsSubheading>Related tags</AddonsSubheading>
          <RelatedTagsList
            limit={6}
            tags={relatedTags.map((tag) => (
              <TagLink key={tag.link} href={tag.link}>
                {tag.name}
              </TagLink>
            ))}
            isLoading={relatedTags?.length === 0}
          />
        </>
      )}
    </AddonsAside>
  </SearchResultsContainer>
);

AddonsSearchResults.propTypes = {
  isLoading: PropTypes.bool,
  results: AddonsList.propTypes.addonItems,
  relatedTags: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
};

AddonsSearchResults.defaultProps = {
  isLoading: false,
  results: [],
  relatedTags: [],
};
