import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { styles, Link, TagList, TagLink, Highlight, Avatar } from '@storybook/design-system';
import useSiteMetadata from '../../lib/useSiteMetadata';
import { SocialGraph } from '../../basics';
import { AddonsAside, AddonsAsideContainer } from '../../layout/addons/AddonsAsideLayout';
import { AddonsSubheading } from '../../layout/addons/AddonsSubheading';
import { AddonItemDetail } from '../../layout/addons/AddonItemDetail';
import { AddonsLayout } from '../../layout/addons/AddonsLayout';
import Eyebrow from '../../layout/Eyebrow';
import { mdFormatting } from '../../../styles/formatting';

const { color, typography, spacing } = styles;

const StyledTagsList = styled(TagList)`
  margin-bottom: 30px;
`;

const ReadMe = styled.section`
  flex: 1 1 820px;
  ${mdFormatting}
`;

const ReadMeTitle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  ${AddonsSubheading} {
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

const Author = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const AuthorListInner = styled.div`
  margin-bottom: 40px;
`;

const AuthorList = ({ authors }) => (
  <AuthorListInner>
    {authors.map((author) => (
      <Author key={author.id}>
        <Avatar size="medium" username={author.name} src={author.avatarUrl} />
        <AuthorName>{author.name}</AuthorName>
      </Author>
    ))}
  </AuthorListInner>
);

const MissingInfo = styled(Eyebrow)`
  margin-bottom: 40px;
  padding: ${spacing.padding.medium}px;
`;

export const AddonsDetailScreen = ({ addon, readMe, supportedFrameworks, tags, authors }) => {
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
      <AddonsLayout hideSidebar>
        <AddonItemDetail {...addon} />
        <AddonsAsideContainer>
          <ReadMe>
            <ReadMeTitle>
              <AddonsSubheading>Readme</AddonsSubheading>
              <ViewOnGithubLink href={readMe.link}>View on GitHub</ViewOnGithubLink>
            </ReadMeTitle>
            <Highlight withHTMLChildren={false}>
              {/* eslint-disable react/no-danger */}
              <div dangerouslySetInnerHTML={{ __html: readMe.content }} />
            </Highlight>
          </ReadMe>
          <AddonsAside>
            <AddonsSubheading>Made by</AddonsSubheading>
            <AuthorList authors={authors} />
            <AddonsSubheading>Works with</AddonsSubheading>
            {supportedFrameworks.length > 0 ? (
              <StyledTagsList
                limit={6}
                tags={supportedFrameworks.map((tag) => (
                  <TagLink key={tag.link} href={tag.link}>
                    {tag.name}
                  </TagLink>
                ))}
              />
            ) : (
              <MissingInfo warning>Framework support not available</MissingInfo>
            )}
            <AddonsSubheading>Tags</AddonsSubheading>
            {tags.length > 0 ? (
              <StyledTagsList
                limit={6}
                tags={tags.map((tag) => (
                  <TagLink key={tag.link} href={tag.link}>
                    {tag.name}
                  </TagLink>
                ))}
              />
            ) : (
              <MissingInfo warning>Tags not available</MissingInfo>
            )}
          </AddonsAside>
        </AddonsAsideContainer>
      </AddonsLayout>
    </>
  );
};

AddonsDetailScreen.propTypes = {
  addon: PropTypes.shape(AddonItemDetail.propTypes).isRequired,
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      avatarUrl: PropTypes.string,
    })
  ).isRequired,
  supportedFrameworks: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  readMe: PropTypes.shape({
    link: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
};

AddonsDetailScreen.defaultProps = {
  supportedFrameworks: [],
  tags: [],
};
