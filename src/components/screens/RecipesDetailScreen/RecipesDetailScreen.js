import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { styled } from '@storybook/theming';
import { Link as GatsbyLink } from 'gatsby';
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

import useSiteMetadata from '../../lib/useSiteMetadata';
import { SocialGraph, Callout } from '../../basics';
import { AddonsAside, AddonsAsideContainer } from '../../layout/addons/AddonsAsideLayout';
import { AddonsSubheading } from '../../layout/addons/AddonsSubheading';
import { RecipeItemDetail } from '../../layout/recipes/RecipeItemDetail';
import { AddonsLayout } from '../../layout/addons/AddonsLayout';
import { mdFormatting } from '../../../styles/formatting';
import { generateBreadcrumb } from '../../../util/generate-breadcrumb';
import { AddonsList } from '../../layout/addons/AddonsList';
import { generateRecipeGithubIssueLink } from './helpers';

const { color, typography, spacing } = styles;

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

const AddonsCallout = styled(Callout)`
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

const ReadMeContent = styled.div`
  && {
    ${mdFormatting}

    table {
      display: block;
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
      <LastUpdated>{format(updatedAt, 'MMMM yyyy')}</LastUpdated>
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
      <SubNav>
        <SubNavBreadcrumb tertiary to={breadcrumb.link} LinkWrapper={GatsbyLink}>
          <Icon icon="arrowleft" />
          {breadcrumb.title}
        </SubNavBreadcrumb>
        <SubNavRight>
          <SubNavCTA href="/docs/react/addons/addon-catalog/">
            <Icon icon="add" />
            Add your integration
          </SubNavCTA>
        </SubNavRight>
      </SubNav>
      <AddonsLayout hideSidebar>
        <RecipeItemDetail {...recipe} />
        <AddonsAsideContainer>
          <ReadMe>
            {hasAddons && (
              <section>
                <AddonsCallout variant="positive">
                  <WellTitle id="addon-section">Do it for me automatically</WellTitle>
                  <WellBody>
                    The quickest way to integrate Storybook and {displayName} is to use an addon.
                    Addons are reusable packages that automatically configure integrations. Check
                    out the {displayName} addons below. If you’re looking to integrate {displayName}{' '}
                    manually, jump to the recipe.
                  </WellBody>
                  <AddonsList addonItems={addons} />
                </AddonsCallout>
              </section>
            )}

            <Highlight withHTMLChildren={false}>
              <SectionTitle id="recipe-section">
                How to setup {displayName} and Storybook
              </SectionTitle>
              <ReadMeContent dangerouslySetInnerHTML={{ __html: readme }} />
            </Highlight>
          </ReadMe>
          <AddonsAside hideLearn>
            {hasAddons && (
              <>
                <AddonsSubheading>On this page</AddonsSubheading>
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
                <AddonsSubheading>Tags</AddonsSubheading>
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

            <AddonsSubheading>Contributors</AddonsSubheading>
            <AuthorList authors={authors || []} />

            <LastUpdatedAt recipeName={recipe.name} updatedAt={lastUpdated} />
          </AddonsAside>
        </AddonsAsideContainer>
      </AddonsLayout>
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
