import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { css, styled } from '@storybook/theming';
import pluralize from 'pluralize';
import { animation, styles, TagList, TagLink } from '@storybook/design-system';
import { AddonsList } from './addons/AddonsList';
import { IntegrationsAside, IntegrationsAsideContainer } from './IntegrationsAsideLayout';
import { IntegrationsSubheading } from './IntegrationsSubheading';
import { IntegrationsList } from './IntegrationsList';

const { color, typography, breakpoint } = styles;
const { inlineGlow } = animation;

const SearchResultsContainer = styled(IntegrationsAsideContainer)`
  align-items: flex-start;
`;

const SearchResultsHeader = styled.h1`
  font-size: ${typography.size.m2}px;
  line-height: ${typography.size.m3}px;
  font-weight: ${typography.weight.bold};
  margin-bottom: 30px;

  ${({ isLoading }) =>
    isLoading &&
    css`
      > span {
        ${inlineGlow}

        * {
          color: transparent !important;
        }
      }
    `}
`;

const StyledIntegrationsList = styled(IntegrationsList)`
  flex: 1 1 auto;
  width: 100%;
  margin-bottom: 48px;
`;

const RelatedTagsList = styled(TagList)`
  margin-bottom: 1.5rem;
  @media (min-width: ${breakpoint * 1.5}px) {
    margin-bottom: 3rem;
  }
`;

const NoAddonsFoundInner = styled.div`
  flex: 1 1 auto;
  border: 1px dashed ${color.border};
  border-radius: 5px;
  padding: 32px;
  text-align: center;
  width: 100%;
  margin-bottom: 3rem;

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

export const IntegrationsSearchResults = ({
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
    <>
      <SearchResultsHeader isLoading={isLoading}>
        <span>{`${pluralize(RESULT_LABEL[filterResults], integrationCount, true)}`}</span>{' '}
        <span>for</span> <span>“{searchString}”</span>
      </SearchResultsHeader>
      <SearchResultsContainer {...props}>
        {!isLoading && integrationCount === 0 ? (
          <NoAddonsFound />
        ) : (
          <StyledIntegrationsList isLoading={isLoading} integrationItems={integrationItems} />
        )}
        <IntegrationsAside hideLearn={isLoading || integrationCount === 0}>
          <IntegrationsSubheading>
            {!isLoading && integrationCount === 0 ? 'Popular' : 'Related'} tags
          </IntegrationsSubheading>
          <RelatedTagsList
            limit={6}
            tags={relatedTags.map((tag) => (
              <TagLink key={tag.link} href={tag.link}>
                {tag.name}
              </TagLink>
            ))}
            isLoading={isLoading}
          />
        </IntegrationsAside>
      </SearchResultsContainer>
    </>
  );
};

IntegrationsSearchResults.propTypes = {
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

IntegrationsSearchResults.defaultProps = {
  isLoading: false,
  results: [],
  relatedTags: [],
};
