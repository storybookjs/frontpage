import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@storybook/theming';
import { Link as GatsbyLink } from 'gatsby';
import {
  styles,
  Link,
  TagList,
  TagLink,
  TagItem,
  Highlight,
  Avatar,
  Icon,
} from '@storybook/design-system';
import { SubNav, SubNavBreadcrumb } from '@storybook/components-marketing';
import useSiteMetadata from '../../lib/useSiteMetadata';
import { SocialGraph } from '../../basics';
import { AddonsAside, AddonsAsideContainer } from '../../layout/addons/AddonsAsideLayout';
import { AddonsSubheading } from '../../layout/addons/AddonsSubheading';
import { RecipeItemDetail } from '../../layout/recipes/RecipeItemDetail';
import { AddonsLayout } from '../../layout/addons/AddonsLayout';
import { mdFormatting } from '../../../styles/formatting';
import { generateBreadcrumb } from '../../../util/generate-breadcrumb';
import { AddonsList } from '../../layout/addons/AddonsList';

const { color, typography, spacing, breakpoint } = styles;

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

const SectionTitle = styled.h2`
  font-weight: ${typography.weight.bold};
  font-size: ${typography.size.m2}px;
  line-height: ${typography.size.m3}px;
  color: ${color.darkest};
`;

const RelatedAddonsList = styled(AddonsList)`
  padding-bottom: 48px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
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

const Spacer = styled.div`
  padding-top: 0;

  @media (min-width: ${1.5 * breakpoint}px) {
    padding-top: ${spacing.padding.large}px;
    flex: 1 1 auto;
    min-width: 0;
  }
`;

const MissingInfo = styled.div`
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

const NoReadmeFound = ({ repositoryUrl }) => (
  <MissingInfo>
    <h3>Readme not available</h3>
    <div>
      Check back later or{' '}
      <Link href={repositoryUrl} target="_blank" rel="noopener nofollow noreferrer">
        view the readme on GitHub
      </Link>
    </div>
  </MissingInfo>
);

export const RecipesDetailScreen = ({ path, location, pageContext }) => {
  const { homepageUrl, repositoryUrl, readme, compatibility, tags, authors, addons, ...recipe } =
    pageContext;
  const { title, ogImageAddons, urls = {} } = useSiteMetadata();
  const { home } = urls;

  const breadcrumb = generateBreadcrumb(location.state);

  return (
    <>
      <SocialGraph
        title={`${recipe.displayName || recipe.name} Recipe | ${title}`}
        desc={recipe.description || ''}
        url={`${home}${path}`}
        image={ogImageAddons}
      />
      <SubNav>
        <SubNavBreadcrumb tertiary to={breadcrumb.link} LinkWrapper={GatsbyLink}>
          <Icon icon="arrowleft" />
          {breadcrumb.title}
        </SubNavBreadcrumb>
      </SubNav>
      <AddonsLayout hideSidebar>
        <RecipeItemDetail {...recipe} />
        <AddonsAsideContainer>
          <ReadMe>
            <SectionTitle id="addon-section">
              {recipe.displayName} addons for Storybook
            </SectionTitle>
            <p>
              The quickest way to integrate Storybook and {recipe.displayName} is to use an addon.
              Addons are reusable packages that automatically configure integrations. Check out the{' '}
              {recipe.displayName} addons below. If you’re looking to integrate {recipe.displayName}{' '}
              manually, jump to the recipe.
            </p>
            <RelatedAddonsList addonItems={addons} />
            <Spacer />
            <Highlight withHTMLChildren={false}>
              {readme ? (
                <ReadMeContent dangerouslySetInnerHTML={{ __html: readme }} />
              ) : (
                <NoReadmeFound repositoryUrl={repositoryUrl || homepageUrl || recipe.npmUrl} />
              )}
            </Highlight>
          </ReadMe>
          <AddonsAside hideLearn>
            <AddonsSubheading>On this page</AddonsSubheading>
            <SectionLinksContainer>
              <SectionLink tertiary LinkWrapper={GatsbyLink} to="#addon-section">
                Addons
              </SectionLink>
              <SectionLink tertiary LinkWrapper={GatsbyLink} to="#recipe-section">
                Recipe
              </SectionLink>
            </SectionLinksContainer>
            {tags?.length > 0 && (
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
