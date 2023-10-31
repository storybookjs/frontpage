import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { rgba } from 'polished';
import { styled } from '@storybook/theming';
import { Link as GatsbyLink } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import {
  styles,
  Link,
  TagList,
  TagLink,
  Highlight,
  Avatar,
  Icon,
  Button,
} from '@storybook/design-system';
import { SubNav, SubNavBreadcrumb, SubNavCTA, SubNavRight } from '@storybook/components-marketing';

import useSiteMetadata from '../../../lib/useSiteMetadata';
import { SocialGraph, Pre } from '../../../basics';
import {
  IntegrationsAside,
  IntegrationsAsideContainer,
  IntegrationsSubheading,
  IntegrationsLayout,
  IntegrationsList,
} from '../../../layout/integrations';
import { RecipeItemDetail } from '../../../layout/integrations/recipes/RecipeItemDetail';
import { mdFormatting } from '../../../../styles/formatting';
import { generateBreadcrumb } from '../../../../util/generate-breadcrumb';
import { generateRecipeGithubIssueLink } from './helpers';
import { CodeSnippets } from './CodeSnippets';

const { color, background, typography, spacing } = styles;

const SectionLinksContainer = styled.div`
  margin-bottom: 30px;
`;

const SectionLink = styled(Link)`
  font-size: ${typography.size.s2}px;
  line-height: ${typography.size.m1}px;
  display: block;

  &:not(:last-child) {
    margin-bottom: ${spacing.padding.small}px;
  }
`;

const StyledTagsList = styled(TagList)`
  && {
    margin-bottom: 30px;
  }
`;

const ReadMe = styled.section`
  flex: 1 1 820px;
  min-width: 0;
`;

// TODO: UPDATE THIS TO NEW COMPONENT
const AddonsCallout = styled.div`
  padding: ${spacing.padding.medium}px;
  border-radius: ${spacing.borderRadius.small}px;
  display: flex;
  flex-direction: row;

  background: ${background.positive};
  box-shadow: ${rgba(color.positive, 0.1)} 0 0 0 1px inset;

  && *:last-child {
    margin-bottom: 0px;
  }
  margin-bottom: 40px;
`;

const WellTitle = styled.h2`
  font-family: ${typography.type};
  font-weight: ${typography.weight.bold};
  font-size: ${typography.size.s3}px;
  line-height: ${typography.size.m3}px;
`;

const WellBody = styled.p`
  font-family: ${typography.type};
  font-size: ${typography.size.s3}px;
  line-height: ${typography.size.m3}px;
  margin-top: 4px;
`;

const SectionTitle = styled.h2`
  font-weight: ${typography.weight.bold};
  font-size: ${typography.size.m2}px;
  line-height: ${typography.size.m3}px;
  color: ${color.darkest};
  margin-bottom: ${spacing.padding.small}px;
`;

const RecipeHeader = (props) => <SectionTitle id="recipe-section" {...props} />;

const StyledHighlight = styled(Highlight)`
  -webkit-text-size-adjust: none;

  > * > *:last-child {
    margin-bottom: 0;
  }
`;

const ReadMeContent = styled.div`
  && {
    ${mdFormatting}

    table {
      display: block;
    }

    .aside.aside__no-top {
      margin-top: 0px;

      // Stops code snippet font being 87.5% of
      // .aside font which is 87.5% of parent
      code {
        font-size: inherit;
      }
    }
  }
`;

const AuthorName = styled.div`
  color: ${color.darkest};
  font-size: ${typography.size.s2}px;
  line-height: ${typography.size.m1}px;
  margin-left: ${spacing.padding.small}px;
`;

const Author = styled(Link)`
  && {
    display: block;
    margin-bottom: 16px;

    span {
      display: flex;
      align-items: center;
    }
  }
`;

const AuthorListInner = styled.div`
  margin-bottom: 40px;
`;

const MoreAuthors = styled.div`
  color: ${color.darkest};
  font-size: ${typography.size.s2}px;
  line-height: ${typography.size.m1}px;
  margin-left: ${spacing.padding.small}px;
`;

const AuthorList = ({ authors }) => {
  const authorsSubset = useMemo(() => authors.slice(0, 5), [authors]);
  const more = useMemo(() => authors.length - 5, [authors]);

  return (
    <AuthorListInner>
      {authorsSubset.map((author) => (
        <Author
          key={author.id}
          href={`https://www.npmjs.com/~${author.name}`}
          target="_blank"
          rel="noopener nofollow noreferrer"
        >
          <Avatar size="medium" username={author.name} src={author.avatarUrl} />
          <AuthorName>{author.name}</AuthorName>
        </Author>
      ))}
      {more > 0 && <MoreAuthors>{`+ ${more} more`}</MoreAuthors>}
    </AuthorListInner>
  );
};

const LastUpdated = styled.span`
  font-size: ${typography.size.s2}px;
  line-height: ${typography.size.m1}px;
  color: ${color.darker};
`;

const ReportIssueButton = styled(Button)`
  margin-top: 12px;
`;

const LastUpdatedAt = ({ recipeName, updatedAt }) => {
  const createIssueLink = useMemo(() => generateRecipeGithubIssueLink(recipeName), [recipeName]);

  return (
    <>
      <LastUpdated>Last updated {format(updatedAt, 'MMMM yyyy')}</LastUpdated>
      <ReportIssueButton isLink size="small" href={createIssueLink}>
        <Icon icon="github" /> Report an issue
      </ReportIssueButton>
    </>
  );
};

export const RecipesDetailScreen = ({ path, location, pageContext }) => {
  const { ogImageAddons, urls = {} } = useSiteMetadata();
  const { home } = urls;

  const {
    homepageUrl,
    repositoryUrl,
    readme,
    compatibility,
    tags,
    authors,
    addons,
    lastUpdatedAt,
    ...recipe
  } = pageContext;

  const hasAddons = addons?.length > 0;
  const hasTags = tags?.length > 0;
  const displayName = recipe.displayName || recipe.name;
  const lastUpdated = useMemo(() => new Date(lastUpdatedAt), [lastUpdatedAt]);

  const breadcrumb = generateBreadcrumb(location.state);

  return (
    <>
      <SocialGraph
        title={`Integrate ${displayName} with Storybook | Storybook`}
        desc={recipe.description || ''}
        url={`${home}${path}`}
        image={ogImageAddons}
      />

      <IntegrationsLayout
        hideSidebar
        RenderHeader={() => (
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
        )}
      >
        <RecipeItemDetail {...recipe} />
        <IntegrationsAsideContainer>
          <ReadMe>
            <span hidden id="recipe-index-title">
              {`Recipes » How to setup ${displayName}`}
            </span>
            {hasAddons && (
              <section>
                <AddonsCallout>
                  <WellTitle id="addon-section">Do it for me automatically</WellTitle>
                  <WellBody>
                    The quickest way to integrate Storybook and {displayName} is to use an addon.
                    Addons are reusable packages that automatically configure integrations. Check
                    out the {displayName} addons below. If you’re looking to integrate {displayName}{' '}
                    manually, jump to the recipe.
                  </WellBody>
                  <IntegrationsList integrationItems={addons} />
                </AddonsCallout>
              </section>
            )}
            <ReadMeContent id="recipe-content-body">
              <MDXProvider
                components={{
                  pre: Pre,
                  RecipeHeader,
                  CodeSnippets,
                }}
              >
                <StyledHighlight withHTMLChildren={false}>
                  <MDXRenderer>{readme}</MDXRenderer>
                </StyledHighlight>
              </MDXProvider>
            </ReadMeContent>
          </ReadMe>
          <IntegrationsAside id="recipe-sidebar" hideLearn>
            {hasAddons && (
              <>
                <IntegrationsSubheading>On this page</IntegrationsSubheading>
                <SectionLinksContainer>
                  <SectionLink tertiary LinkWrapper={GatsbyLink} to="#addon-section">
                    Addons
                  </SectionLink>
                  <SectionLink tertiary LinkWrapper={GatsbyLink} to="#recipe-section">
                    Recipe
                  </SectionLink>
                </SectionLinksContainer>
              </>
            )}

            {hasTags && (
              <>
                <IntegrationsSubheading>Tags</IntegrationsSubheading>
                <StyledTagsList
                  limit={6}
                  tags={tags.map((tag) => (
                    <TagLink LinkWrapper={GatsbyLink} key={tag.link} to={tag.link}>
                      {tag.name}
                    </TagLink>
                  ))}
                />
              </>
            )}

            <IntegrationsSubheading>Contributors</IntegrationsSubheading>
            <AuthorList authors={authors || []} />

            <LastUpdatedAt recipeName={recipe.name} updatedAt={lastUpdated} />
          </IntegrationsAside>
        </IntegrationsAsideContainer>
      </IntegrationsLayout>
    </>
  );
};

RecipesDetailScreen.propTypes = {
  pageContext: PropTypes.shape({
    repositoryUrl: PropTypes.string,
    homepageUrl: PropTypes.string,
    authors: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string,
        avatarUrl: PropTypes.string,
      })
    ).isRequired,
    compatibility: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        displayName: PropTypes.string.isRequired,
        icon: PropTypes.string,
      })
    ),
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        link: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    ),
    readme: PropTypes.string,
    ...RecipeItemDetail.propTypes,
  }).isRequired,
};

RecipesDetailScreen.defaultProps = {};

export default RecipesDetailScreen;
