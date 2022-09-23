import React from 'react';
import { styled } from '@storybook/theming';
import {
  SubNav,
  SubNavTabs,
  SubNavRight,
  SubNavLinkList,
  styles,
} from '@storybook/components-marketing';
import useSiteMetadata from '../../lib/useSiteMetadata';
import { SocialGraph } from '../../basics';
import { CommunityHero } from './CommunityHero';
import { CommunitySidebar } from './CommunitySidebar';
import { CommunitySupport } from './CommunitySupport';
import { CommunityEvents } from './CommunityEvents';
import { CommunityBrand } from './CommunityBrand';
import { CommunityContribute } from './CommunityContribute';
import { CommunityMaintainers } from './CommunityMaintainers';
import { CommunitySponsors } from './CommunitySponsors';

const { pageMargins } = styles;

const Content = styled.main`
  flex: 1 1 auto;
  min-width: 0;
`;

const CommunityLayout = styled.div`
  ${pageMargins};
  display: flex;
  gap: 50px;
`;

const communityItems = [
  { key: '0', label: 'Get Involved', href: '/community', isActive: true },
  { key: '1', label: 'Blog', href: 'https://storybook.js.org/blog' },
];

const joinCommunityItems = [
  {
    icon: 'github' as any,
    href: 'https://github.com/storybookjs',
    label: 'Github',
  },
  {
    icon: 'discord' as any,
    href: 'https://discord.gg/storybook',
    label: 'Discord',
  },
  {
    icon: 'twitter' as any,
    href: 'https://twitter.com/storybookjs',
    label: 'Twitter',
  },
  {
    icon: 'youtube' as any,
    href: 'https://www.youtube.com/channel/UCr7Quur3eIyA_oe8FNYexfg',
    label: 'Youtube',
  },
];

export default function CommunityScreen({
  npmDownloads,
  twitterFollowerCount,
  discordMemberCount,
  githubContributorCount,
  youTubeSubscriberCount,
  githubStars,
  apiKey,
  contributors,
  sponsors,
}) {
  const { title, ogImage, urls = {}, latestVersionString } = useSiteMetadata();
  const {
    home,
    badge,
    brand,
    twitter,
    chat,
    youtube,
    presentation,
    designSystem,
    gitHub = {},
    docsUrl,
    contributeUrl,
    openCollective,
  } = urls;
  return (
    <>
      <SocialGraph
        title={`Community | ${title}`}
        desc="Join thousands of frontend developers to learn new Storybook techniques, get help, and develop UIs faster."
        url={`${home}/community`}
        image={ogImage}
      />

      <SubNav>
        <SubNavTabs label="Docs nav" items={communityItems} />
        <SubNavRight>
          <SubNavLinkList label="Join the community:" items={joinCommunityItems} />
        </SubNavRight>
      </SubNav>

      <CommunityHero
        npmDownloads={npmDownloads}
        twitterFollowerCount={twitterFollowerCount}
        discordMemberCount={discordMemberCount}
        githubContributorCount={githubContributorCount}
        youTubeSubscriberCount={youTubeSubscriberCount}
        githubStars={githubStars}
      />

      <CommunityLayout>
        <CommunitySidebar badgeUrl={badge} activeSection="#support" />
        <Content>
          <CommunitySupport
            repoUrl={gitHub.repo}
            chatUrl={chat}
            version={latestVersionString}
            apiKey={apiKey}
          />
          <CommunityEvents youTubeUrl={youtube} twitterUrl={twitter} chatUrl={chat} />
          <CommunityBrand
            brandUrl={brand}
            presentationUrl={presentation}
            designSystemUrl={designSystem}
          />
          <CommunityMaintainers contributors={contributors} contributorsUrl={gitHub.contributors} />
          <CommunityContribute
            contributorCount={githubContributorCount}
            docsUrl={docsUrl}
            issuesUrl={gitHub.issues}
            contributeUrl={contributeUrl}
            chatUrl={chat}
          />
          <CommunitySponsors openCollectiveUrl={openCollective} sponsors={sponsors} />
        </Content>
      </CommunityLayout>
    </>
  );
}
