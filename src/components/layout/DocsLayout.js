import React from 'react';
import { styled } from '@storybook/theming';
import {
  Icon,
  Button,
  TableOfContents,
  TooltipNote,
  WithTooltip,
  global,
  styles,
} from '@storybook/design-system';
import Helmet from 'react-helmet';
import GatsbyLinkWrapper from '../basics/GatsbyLinkWrapper';
import useSiteMetadata from '../lib/useSiteMetadata';
import buildPathWithFramework from '../../util/build-path-with-framework';
import { DocsSearch, classNames as docsSearchClassNames } from '../screens/DocsScreen/DocsSearch';
import { FrameworkSelector } from '../screens/DocsScreen/FrameworkSelector';
import { VersionSelector } from '../screens/DocsScreen/VersionSelector';
import { VersionCTA } from '../screens/DocsScreen/VersionCTA';

const { breakpoint, color, pageMargins } = styles;
const { GlobalStyle } = global;

const Sidebar = styled.div`
  flex: 1;
  margin: 1rem 0 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${color.border};
  @media (min-width: ${breakpoint * 1.333}px) {
    flex: 0 0 240px;
    margin: 0;
    padding-bottom: 0;
    padding-right: 20px;
    margin-right: 20px;
    border-bottom: none;
  }
`;

const ExpandButton = styled(Button)`
  height: 36px;
  width: 36px;
`;

const SidebarControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row-reverse;
  flex-wrap: wrap-reverse;
  @media (min-width: ${breakpoint * 1.333}px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
  ${docsSearchClassNames.BUTTON} {
    flex: 1;
    @media (min-width: ${breakpoint * 1.333}px) {
      margin-right: 10px;
    }
  }
  /* button */
  > *:nth-child(2) {
    display: none;
    @media (min-width: ${breakpoint * 1.333}px) {
      display: inline-block;
      flex: none;
    }
  }
  /* version picker */
  > *:nth-child(3) {
    order: 3;
    @media (min-width: ${breakpoint * 1.333}px) {
      flex: 0 0 100%;
      order: initial;
      margin-bottom: 0.5rem;
      margin-top: 1.5rem;
    }
  }
  /* framework picker */
  > *:nth-child(4) {
    margin-left: 10px;
    margin-right: 10px;
    order: 2;
    @media (min-width: ${breakpoint * 1.333}px) {
      flex: 0 0 100%;
      order: initial;
      margin-left: 0;
      margin-right: 0;
    }
  }
`;

const Content = styled.div`
  flex: 1;
  min-width: 0; /* do not remove  https://weblog.west-wind.com/posts/2016/feb/15/flexbox-containers-pre-tags-and-managing-overflow */
  max-width: 800px;
  margin: 0px auto;
`;

const StyledVersionCTA = styled(VersionCTA)`
  margin-bottom: 24px;
`;

const Wrapper = styled.div`
  ${pageMargins}
  padding-bottom: 3rem;

  @media (min-width: ${breakpoint * 1.333}px) {
    padding-top: 4rem;
    padding-bottom: 4rem;
    display: flex;
  }
`;

const StyledTableOfContents = styled(TableOfContents)`
  /* Hide ToC on mobile, the primary navigation is search */
  display: none;

  @media (min-width: ${breakpoint * 1.333}px) {
    display: block;
    margin-top: 1.5rem;
    /* So that the expandable arrows are rendered outside of the sidebar dimensions */
    margin-left: -20px;
  }
`;

function DocsLayout({ children, isLatest: isLatestProp, pageContext, ...props }) {
  const {
    coreFrameworks,
    communityFrameworks,
    urls: { homepageUrl },
    version,
    versionString,
    latestVersion,
    latestVersionString,
    isLatest,
  } = useSiteMetadata();
  const { docsToc, framework, fullPath, slug, versions } = pageContext;

  const addLinkWrappers = (items) =>
    items.map((item) => ({
      ...item,
      ...(item.type.match(/link/) && { LinkWrapper: GatsbyLinkWrapper }),
      ...(item.children && { children: addLinkWrappers(item.children) }),
    }));
  const docsTocWithLinkWrappers = addLinkWrappers(docsToc);

  const withTooltipProps = {
    placement: 'top',
    trigger: 'hover',
    hasChrome: false,
    as: 'span',
  };

  // The React specific docs are treated as canonical except for the
  // docs home page for all other frameworks.
  const canonicalFramework = slug === '/docs/get-started/introduction' ? framework : 'react';

  return (
    <>
      <GlobalStyle />
      <Helmet>
        <link
          rel="canonical"
          href={`${homepageUrl}${buildPathWithFramework(
            slug,
            canonicalFramework,
            latestVersionString
          )}/`}
        />
        {version !== latestVersion ? <meta name="robots" content="noindex" /> : null}
        <meta name="docsearch:framework" content={framework} />
        <meta name="docsearch:version" content={versionString} />
      </Helmet>
      <Wrapper>
        <Sidebar className="sidebar">
          <StyledTableOfContents
            key={framework}
            currentPath={fullPath}
            items={docsTocWithLinkWrappers}
          >
            {({ menu, allTopLevelMenusAreOpen, toggleAllOpen, toggleAllClosed }) => (
              <>
                <SidebarControls>
                  <DocsSearch framework={framework} version={version} />

                  {allTopLevelMenusAreOpen ? (
                    <WithTooltip
                      {...withTooltipProps}
                      tooltip={<TooltipNote note="Collapse all" />}
                      onClick={toggleAllClosed}
                      tabIndex="-1"
                    >
                      <ExpandButton containsIcon appearance="outline" size="small">
                        <Icon icon="collapse" aria-label="Collapse sidebar" />
                      </ExpandButton>
                    </WithTooltip>
                  ) : (
                    <WithTooltip
                      {...withTooltipProps}
                      tooltip={<TooltipNote note="Expand all" />}
                      onClick={toggleAllOpen}
                      tabIndex="-1"
                    >
                      <ExpandButton containsIcon appearance="outline" size="small">
                        <Icon icon="expandalt" aria-label="Expand sidebar" />
                      </ExpandButton>
                    </WithTooltip>
                  )}

                  <VersionSelector
                    version={version}
                    versions={versions}
                    framework={framework}
                    slug={slug}
                  />

                  <FrameworkSelector
                    framework={framework}
                    coreFrameworks={coreFrameworks}
                    communityFrameworks={communityFrameworks}
                    slug={slug}
                  />
                </SidebarControls>

                {menu}
              </>
            )}
          </StyledTableOfContents>
        </Sidebar>

        <Content>
          {(isLatestProp === false || !isLatest) && (
            <StyledVersionCTA
              framework={framework}
              version={version}
              latestVersion={latestVersion}
              latestVersionString={latestVersionString}
              versions={versions}
              slug={slug}
            />
          )}
          {children}
        </Content>
      </Wrapper>
    </>
  );
}

export default DocsLayout;
