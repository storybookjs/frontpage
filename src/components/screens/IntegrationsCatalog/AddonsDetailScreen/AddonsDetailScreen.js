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
import { SubNav, SubNavBreadcrumb, SubNavCTA, SubNavRight } from '@storybook/components-marketing';
import useSiteMetadata from '../../../lib/useSiteMetadata';
import { SocialGraph } from '../../../basics';
import {
  IntegrationsAside,
  IntegrationsAsideContainer,
  IntegrationsSubheading,
  IntegrationsLayout,
} from '../../../layout/integrations';
import { AddonItemDetail } from '../../../layout/integrations/addons';
import { mdFormatting } from '../../../../styles/formatting';
import { generateBreadcrumb } from '../../../../util/generate-breadcrumb';
import { orderCompatibility } from '../../../../util/order-compatibility';

const { color, typography, spacing } = styles;

const AddonDetailsLayout = styled(IntegrationsLayout)`
  padding-top: 0px;
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

const ReadMeContent = styled.div`
  && {
    ${mdFormatting}

    table {
      display: block;
    }
  }
`;

const ReadMeTitle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  ${IntegrationsSubheading} {
    margin-bottom: 0;
  }
`;

const ViewOnGithubLink = styled(Link)`
  font-size: ${typography.size.s2}px;
  line-height: ${typography.size.m2}px;
  margin-left: ${spacing.padding.medium}px;
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
          key={`author_${author.id}`}
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

const Framework = styled(TagItem)`
  display: inline-flex;
  align-items: center;
`;

const FrameworkIcon = styled.img`
  margin-right: 8px;
  width: 1em;
  height: 1em;
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

export const AddonsDetailScreen = ({ path, location, pageContext }) => {
  const { homepageUrl, repositoryUrl, readme, compatibility, tags, authors, ...addon } =
    pageContext;
  const { title, ogImageAddons, urls = {} } = useSiteMetadata();
  const { home } = urls;

  const breadcrumb = generateBreadcrumb(location.state);

  const orderedCompatibility = useMemo(() => orderCompatibility(compatibility), [compatibility]);

  return (
    <>
      <SocialGraph
        title={`${addon.displayName || addon.name} Addon | ${title}`}
        desc={addon.description || ''}
        url={`${home}${path}`}
        image={ogImageAddons}
      />

      <AddonDetailsLayout
        hideSidebar
        RenderHeader={() => (
          <SubNav>
            <SubNavBreadcrumb tertiary to={breadcrumb.link} LinkWrapper={GatsbyLink}>
              <Icon icon="arrowleft" />
              {breadcrumb.title}
            </SubNavBreadcrumb>
            <SubNavRight>
              <SubNavCTA href="/docs/react/integrations/integration-catalog/">
                <Icon icon="add" />
                Add your integration
              </SubNavCTA>
            </SubNavRight>
          </SubNav>
        )}
      >
        <AddonItemDetail {...addon} />
        <IntegrationsAsideContainer>
          <ReadMe>
            <ReadMeTitle>
              <IntegrationsSubheading>Readme</IntegrationsSubheading>
              <ViewOnGithubLink
                href={repositoryUrl || homepageUrl || addon.npmUrl}
                target="_blank"
                rel="noopener nofollow noreferrer"
              >
                <Icon icon="github" /> View on GitHub
              </ViewOnGithubLink>
            </ReadMeTitle>
            <Highlight withHTMLChildren={false}>
              {readme ? (
                <ReadMeContent dangerouslySetInnerHTML={{ __html: readme }} />
              ) : (
                <NoReadmeFound repositoryUrl={repositoryUrl || homepageUrl || addon.npmUrl} />
              )}
            </Highlight>
          </ReadMe>
          <IntegrationsAside>
            <IntegrationsSubheading>Made by</IntegrationsSubheading>
            <AuthorList authors={authors || []} />
            {compatibility?.length > 0 && (
              <>
                <IntegrationsSubheading>Works with</IntegrationsSubheading>
                <StyledTagsList
                  limit={6}
                  tags={orderedCompatibility.map((framework) => (
                    <Framework key={framework.name}>
                      {framework.icon && <FrameworkIcon src={framework.icon} />}
                      {framework.displayName}
                    </Framework>
                  ))}
                />
              </>
            )}
            {tags?.length > 0 && (
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
          </IntegrationsAside>
        </IntegrationsAsideContainer>
      </AddonDetailsLayout>
    </>
  );
};

AddonsDetailScreen.propTypes = {
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
    ...AddonItemDetail.propTypes,
  }).isRequired,
};

AddonsDetailScreen.defaultProps = {};

export default AddonsDetailScreen;
