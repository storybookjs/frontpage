import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { css, styled } from '@storybook/theming';
import pluralize from 'pluralize';
import { animation, styles, TagList, TagLink } from '@storybook/design-system';
import { AddonsList } from './AddonsList';
import { AddonsAside, AddonsAsideContainer } from './AddonsAsideLayout';
import { AddonsSubheading } from './AddonsSubheading';
import { AddonsPageHeader } from './AddonsPageHeader';
import { IntegrationsList } from '../IntegrationsList';

const { color, typography } = styles;
const { inlineGlow } = animation;

const SearchResultsContainer = styled(AddonsAsideContainer)`
  align-items: flex-start;
`;

const SearchResultsHeader = styled(AddonsPageHeader)`
  ${({ isLoading }) =>
    isLoading &&
    css`
      ${inlineGlow}

      * {
        color: transparent !important;
      }
    `}
`;

const ResultsContainer = styled.div`
  flex: 1 1 auto;
  width: 100%;
`;

const StyledIntegrationsList = styled(IntegrationsList)`
  margin-bottom: 48px;
`;

const RelatedTagsList = styled(TagList)`
  margin-bottom: 48px;
`;

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
    font-weight: ${typography.weight.bold};
  }
`;

const NoAddonsFound = () => (
  <NoAddonsFoundInner>
    <h3>No integrations found</h3>
    <div>Perhaps it was a typo?</div>
  </NoAddonsFoundInner>
);

export const FILTER_OPTIONS = {
  ALL: 'all',
  ADDONS: 'addons',
  RECIPES: 'recipes',
};

const RESULT_LABEL = {
  all: 'integrations',
  addons: 'addons',
  recipes: 'recipes',
};

export const AddonsSearchResults = ({
  isLoading,
  searchString,
  integrations,
  relatedTags,
  filterResults,
  ...props
}) => {
  const { addons = [], recipes = [] } = integrations;

  const integrationItems = useMemo(() => {
    switch (filterResults) {
      case FILTER_OPTIONS.ADDONS: {
        return addons;
      }
      case FILTER_OPTIONS.RECIPES: {
        return recipes;
      }
      default: {
        return [...addons, ...recipes];
      }
    }
  }, [addons, recipes, filterResults]);

  const integrationCount = useMemo(() => integrationItems.length, [integrationItems]);

  return (
    <SearchResultsContainer {...props}>
      {!isLoading && integrationCount === 0 ? (
        <NoAddonsFound />
      ) : (
        <ResultsContainer>
          <SearchResultsHeader
            isLoading={isLoading}
            title={`${pluralize(
              RESULT_LABEL[filterResults],
              integrationCount,
              true
            )} for "${searchString}"`}
          />
          <section>
            <StyledIntegrationsList isLoading={isLoading} integrationItems={integrationItems} />
          </section>
        </ResultsContainer>
      )}
      <AddonsAside hideLearn={isLoading || integrationCount === 0}>
        <AddonsSubheading>Related tags</AddonsSubheading>
        <RelatedTagsList
          limit={6}
          tags={relatedTags.map((tag) => (
            <TagLink key={tag.link} href={tag.link}>
              {tag.name}
            </TagLink>
          ))}
          isLoading={isLoading}
        />
      </AddonsAside>
    </SearchResultsContainer>
  );
};

AddonsSearchResults.propTypes = {
  isLoading: PropTypes.bool,
  searchString: PropTypes.string.isRequired,
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
