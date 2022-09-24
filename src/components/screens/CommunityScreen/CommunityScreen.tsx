import React, { useRef, useMemo } from 'react';
import { styled } from '@storybook/theming';
import {
  SubNav,
  SubNavTabs,
  SubNavRight,
  SubNavLinkList,
  styles,
} from '@storybook/components-marketing';
import { useInView } from 'framer-motion';
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

const { pageMargins, breakpoints } = styles;

const Content = styled.main`
  flex: 1 1 auto;
  min-width: 0;
`;

const CommunityLayout = styled.div`
  ${pageMargins};
  display: flex;
  flex-direction: column;

  @media (min-width: ${breakpoints[3]}px) {
    flex-direction: row;
    gap: 3rem;
  }
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

function useActiveSection(): [string, { [key: string]: React.MutableRefObject<HTMLDivElement> }] {
  const supportRef = useRef<HTMLDivElement>(null);
  const supportInView = useInView(supportRef, { margin: '0px 0px -90% 0px' });

  const eventsRef = useRef<HTMLDivElement>(null);
  const eventsInView = useInView(eventsRef, { margin: '0px 0px -25% 0px' });

  const brandRef = useRef<HTMLDivElement>(null);
  const brandInView = useInView(brandRef);

  const maintainersRef = useRef<HTMLDivElement>(null);
  const maintainersView = useInView(maintainersRef);

  const contributeRef = useRef<HTMLDivElement>(null);
  const contributeInView = useInView(contributeRef);

  const sponsorsRef = useRef<HTMLDivElement>(null);
  const sponsorsInView = useInView(sponsorsRef);

  const activeSection = useMemo(() => {
    if (supportInView) return 'support';
    if (eventsInView) return 'events';
    if (brandInView) return 'brand';
    if (maintainersView) return 'maintainers';
    if (contributeInView) return 'contribute';
    if (sponsorsInView) return 'sponsors';
    return null;
  }, [supportInView, eventsInView, brandInView, maintainersView, contributeInView, sponsorsInView]);

  return [
    activeSection,
    { supportRef, eventsRef, brandRef, maintainersRef, contributeRef, sponsorsRef },
  ];
}

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
  const [
    activeSection,
    { supportRef, eventsRef, brandRef, maintainersRef, contributeRef, sponsorsRef },
  ] = useActiveSection();

  return (
    <>
      <SocialGraph
        title={`Community | ${title}`}
        desc="Join thousands of frontend developers to learn new Storybook techniques, get help, and develop UIs faster."
        url={`${home}/community`}
        image={ogImage}
      />

      <SubNav>
        <SubNavTabs label="Community nav" items={communityItems} />
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
        <CommunitySidebar badgeUrl={badge} activeSectionId={activeSection} />
        <Content>
          <CommunitySupport
            ref={supportRef}
            repoUrl={gitHub.repo}
            chatUrl={chat}
            version={latestVersionString}
            apiKey={apiKey}
          />
          <CommunityEvents
            ref={eventsRef}
            youTubeUrl={youtube}
            twitterUrl={twitter}
            chatUrl={chat}
          />
          <CommunityBrand
            ref={brandRef}
            brandUrl={brand}
            presentationUrl={presentation}
            designSystemUrl={designSystem}
          />
          <CommunityMaintainers
            ref={maintainersRef}
            contributors={contributors}
            contributorsUrl={gitHub.contributors}
          />
          <CommunityContribute
            ref={contributeRef}
            contributorCount={githubContributorCount}
            docsUrl={docsUrl}
            issuesUrl={gitHub.issues}
            contributeUrl={contributeUrl}
            chatUrl={chat}
          />
          <CommunitySponsors
            ref={sponsorsRef}
            openCollectiveUrl={openCollective}
            sponsors={sponsors}
          />
        </Content>
      </CommunityLayout>
    </>
  );
}
