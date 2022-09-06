import React from 'react';
import { styled } from '@storybook/theming';
import {
  Icon,
  Button,
  TableOfContents,
  TooltipNote,
  WithTooltip,
  global,
} from '@storybook/design-system';
import Helmet from 'react-helmet';
import {
  SubNav,
  SubNavTabs,
  SubNavDivider,
  SubNavMenus,
  SubNavRight,
  SubNavLinkList,
  Menu,
  styles,
} from '@storybook/components-marketing';
import GatsbyLinkWrapper from '../basics/GatsbyLinkWrapper';
import useSiteMetadata from '../lib/useSiteMetadata';
import buildPathWithFramework from '../../util/build-path-with-framework';
import { DocsSearch, classNames as docsSearchClassNames } from '../screens/DocsScreen/DocsSearch';
import { FrameworkSelector } from '../screens/DocsScreen/FrameworkSelector';
import { VersionSelector } from '../screens/DocsScreen/VersionSelector';
import { VersionCTA } from '../screens/DocsScreen/VersionCTA';

const { breakpoints, breakpoint, color, pageMargins } = styles;
const { GlobalStyle } = global;

const Sidebar = styled.div`
  display: none;
  position: relative;

  @media (min-width: ${breakpoint * 1.333}px) {
    display: block;
    flex: 0 0 240px;
    margin: 0;
    padding-bottom: 0;
    padding-right: 20px;
    margin-right: 20px;
  }
`;

const ExpandButton = styled(Button)`
  height: 28px;
  width: 28px;
`;

const SidebarControls = styled.div`
  position: absolute;
  left: -62px;
`;

const Content = styled.div`
  flex: 1;
  min-width: 0; /* do not remove  https://weblog.west-wind.com/posts/2016/feb/15/flexbox-containers-pre-tags-and-managing-overflow */
  max-width: 800px;
  margin: 1rem auto 0 auto;

  @media (min-width: ${breakpoint * 1.333}px) {
    margin-top: 0;
  }
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
    /* So that the expandable arrows are rendered outside of the sidebar dimensions */
    margin-left: -20px;
  }
`;

const getTocSectionTitles = (toc, path) => {
  const pathParts = path.split('/');
  const title = [];

  const buildTitle = (items, pathPartIndex) => {
    let item = items.find(({ pathSegment }) => pathSegment === pathParts[pathPartIndex]);

    if (!item) {
      /**
       * Some toc items use an empty `pathSegment` to create a menu that isn't reflected in the URL
       * e.g. Configure > Integration > Webpack -> configure/webpack
       * If we can't find a direct match for the current slug segment, we look in these "empty" items
       * (note that there can be more than one!) and try to find a match in their `children`
       */
      items
        .filter(({ pathSegment }) => pathSegment === '')
        .forEach(({ children }) => {
          item =
            children?.find(({ pathSegment }) => pathSegment === pathParts[pathPartIndex]) || item;
        });
    }

    if (item) {
      const { children, title: titlePart } = item;
      if (titlePart) {
        title.push(titlePart);
      }
      if (children) {
        buildTitle(children, pathPartIndex + 1);
      }
    }
  };

  buildTitle(toc, 0);

  return title.join(' » ');
};

const docsItems = [
  { key: '0', label: 'Guides', href: '/docs', isActive: true },
  { key: '1', label: 'Tutorials', href: 'https://storybook.js.org/tutorials/' },
];
const ImgIcon = ({ src }) => <img src={src} alt="" style={{ width: 12, height: 12 }} />;
const frameworkOptions = [
  {
    label: 'Core',
    items: [
      {
        label: 'React',
        icon: <ImgIcon src="/frameworks/logo-react.svg" />,
        link: { url: '/react' },
      },
      {
        label: 'Vue',
        icon: <ImgIcon src="/frameworks/logo-vue.svg" />,
        link: { url: '/vue' },
      },
      {
        label: 'Angular',
        icon: <ImgIcon src="/frameworks/logo-angular.svg" />,
        link: { url: '/angular' },
      },
      {
        label: 'Web Components',
        icon: <ImgIcon src="/frameworks/logo-web-components.svg" />,
        link: { url: '/web-components' },
      },
    ],
  },
  {
    label: 'Community',
    items: [
      {
        label: 'Ember',
        icon: <ImgIcon src="/frameworks/logo-ember.svg" />,
        link: { url: '/ember' },
      },
      {
        label: 'HTML',
        icon: <ImgIcon src="/frameworks/logo-html.svg" />,
        link: { url: '/html' },
      },
      {
        label: 'Svelte',
        icon: <ImgIcon src="/frameworks/logo-svelte.svg" />,
        link: { url: '/svelte' },
      },
      {
        label: 'Preact',
        icon: <ImgIcon src="/frameworks/logo-preact.svg" />,
        link: { url: '/preact' },
      },
    ],
  },
];
const versionOptions = [
  {
    label: 'stable',
    items: [
      { label: '6.5', link: { url: '/6-5' } },
      { label: '6.4', link: { url: '/6-4' } },
      { label: '6.3', link: { url: '/6-3' } },
      { label: '6.2', link: { url: '/6-2' } },
      { label: '6.1', link: { url: '/6-1' } },
      { label: '6.0', link: { url: '/6-0' } },
    ],
  },
  {
    label: 'pre-release',
    items: [{ label: '7.0 (future)', link: { url: '/7-0' } }],
  },
];
const FrameworkSelect = () => (
  <Menu label={frameworkOptions[0].items[0].label} items={frameworkOptions} primary />
);
const VersionSelect = () => (
  <Menu label={versionOptions[0].items[0].label} items={versionOptions} primary />
);
const supportItems = [
  {
    icon: 'github',
    href: 'https://github.com/storybookjs/storybook/issues',
    label: 'Github',
  },
  {
    icon: 'discord',
    href: 'https://discord.gg/storybook',
    label: 'Discord',
  },
  {
    icon: 'youtube',
    href: 'https://www.youtube.com/channel/UCr7Quur3eIyA_oe8FNYexfg',
    label: 'Youtube',
  },
];

function DocsLayout({ children, isLatest: isLatestProp, pageContext, ...props }) {
  const {
    algoliaDocSearchConfig,
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

  const tocSectionTitles = getTocSectionTitles(docsToc, slug.split('/docs/')[1]);

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
        {version === latestVersion && (
          <link
            rel="canonical"
            href={`${homepageUrl}${buildPathWithFramework(
              slug,
              canonicalFramework,
              latestVersionString
            )}/`}
          />
        )}
        <meta name="docsearch:framework" content={framework} />
        <meta name="docsearch:version" content={versionString} />
        <link
          rel="preconnect"
          href={`https://${algoliaDocSearchConfig.appId}-dsn.algolia.net`}
          crossOrigin
        />
      </Helmet>
      <SubNav>
        <SubNavTabs label="Docs nav" items={docsItems} />
        <SubNavDivider />
        <SubNavMenus>
          <FrameworkSelect />
          <VersionSelect />
        </SubNavMenus>
        <SubNavRight>
          <SubNavLinkList label="Get support:" items={supportItems} />
        </SubNavRight>
      </SubNav>
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
                </SidebarControls>

                {menu}
              </>
            )}
          </StyledTableOfContents>
        </Sidebar>

        <Content>
          {tocSectionTitles && (
            <span hidden id="toc-section-titles">
              {tocSectionTitles}
            </span>
          )}
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
