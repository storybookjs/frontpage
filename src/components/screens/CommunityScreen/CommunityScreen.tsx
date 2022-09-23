import React from 'react';
import { styled } from '@storybook/theming';
import {
  SubNav,
  SubNavTabs,
  SubNavRight,
  SubNavLinkList,
  styles,
  SearchBlock,
} from '@storybook/components-marketing';
import useSiteMetadata from '../../lib/useSiteMetadata';
import { SocialGraph } from '../../basics';
import { CommunityHero } from './CommunityHero';
import { CommunitySidebar } from './CommunitySidebar';

import BlogSVG from '../../../images/community/blog.svg';
import PresentationSVG from '../../../images/community/presentation.svg';
import BrandSVG from '../../../images/community/brand.svg';
import PullRequestSVG from '../../../images/community/pullrequest.svg';
import DocsSVG from '../../../images/community/docs.svg';
import BugSVG from '../../../images/community/bug.svg';

const { background, color, pageMargins, breakpoints } = styles;

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

export default function PureCommunityScreen({
  npmDownloads,
  twitterFollowerCount,
  discordMemberCount,
  githubContributorCount,
  youTubeSubscriberCount,
  githubStars,
  apiKey,
}) {
  const { title, ogImage, urls = {}, latestVersionString } = useSiteMetadata();
  const {
    home,
    badge,
    brand,
    chat,
    blog,
    presentation,
    designSystem,
    gitHub = {},
    docs = {},
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
          <SearchBlock version={latestVersionString} apiKey={apiKey} />
        </Content>
      </CommunityLayout>
    </>
  );
}

/* <CommunitySocial />

<CommunityLayout>
  <Sidebar
    title="Spread the word"
    desc="The easiest way to get involved is to share Storybook with fellow developers, colleagues, and friends."
  >
    <StorybookBadgeWrapper>
      <StorybookBadgeOuter href={badge}>
        <StorybookBadge src={StorybookBadgeSVG} alt="Storybook badge" />
      </StorybookBadgeOuter>
      <div>Get the Storybook badge for your project</div>
    </StorybookBadgeWrapper>
  </Sidebar>
  <List>
    <Item
      image={<img src={BlogSVG} alt="write" />}
      title="Write about Storybook"
      desc="Publish it to your blog or submit it to Storybook’s Medium publication. Mention @storybookjs on Twitter for a reshare."
      links={[{ title: 'Submit an article to the blog', href: blog }]}
    />
    <Item
      image={<img src={PresentationSVG} alt="present" />}
      title="Talk about Storybook"
      desc="Present at work, meetups, and conferences. Get your point across with ready-to-use slides (Keynote, PDF) and illustrations."
      links={[{ title: 'View presentation materials', href: presentation }]}
    />
    <Item
      image={<img src={BrandSVG} alt="brand kit" />}
      title="Use the brand"
      desc="Create your own visuals using Storybook logo, typography, colors, and images."
      links={[
        { title: 'View brand', href: brand },
        { title: 'View design system', href: designSystem },
      ]}
    />
  </List>
</CommunityLayout>

<Separator />
<Contrast>
  <CommunityLayout>
    <Sidebar
      title="Contribute code"
      desc="Storybook is maintained by contributors from around the globe. Join us in building the most popular component explorer."
    >
      <DiscordText>Have questions about contributing? Ask the community on chat.</DiscordText>
      <Button appearance="secondaryOutline" isLink href={chat}>
        <Icon icon="discord" aria-hidden /> Chat on Discord
      </Button>
    </Sidebar>
    <List>
      <Item
        image={<img src={BugSVG} alt="report bugs" />}
        title="Find and report issues"
        desc="Help find bugs and QA releases. Maintainers are human, we miss things sometimes. Issue reports are much appreciated."
        links={[{ title: 'Report an issue', href: gitHub.issues }]}
      />
      <Item
        image={<img src={DocsSVG} alt="docs" />}
        title="Write and update docs"
        desc="Teach fellow developers how to take advantage of Storybook. Help write, edit, and improve docs."
        links={[{ title: 'Get started with docs', href: docs }]}
      />
      <Item
        image={<img src={PullRequestSVG} alt="pull request" />}
        title="Send a pull request"
        desc="Want to create a new feature or improve existing functionality? PRs welcomed and encouraged."
        links={[{ title: 'Learn how to contribute', href: gitHub.repo }]}
      />
    </List>
  </CommunityLayout>
</Contrast>
<Separator />

<CommunityLayout>
  <Sidebar
    title="Donate to open source"
    desc="Donations go to hosting, swag for contributors, documentation and learning materials."
    loneChild
  >
    <Button appearance="secondary" isLink href={openCollective} target="_blank">
      Donate to Storybook
    </Button>
  </Sidebar>
  <OpenCollectiveLogos className="chromatic-ignore">
    <LogoLink
      href="https://opencollective.com/storybook/sponsor/0/website"
      target="_blank"
      rel="noopener nofollow noreferrer"
    >
      <LazyLoad once height="100%">
        <img src="https://opencollective.com/storybook/sponsor/0/avatar.svg" alt="donator" />
      </LazyLoad>
    </LogoLink>
    <LogoLink
      href="https://opencollective.com/storybook/sponsor/1/website"
      target="_blank"
      rel="noopener nofollow noreferrer"
    >
      <LazyLoad once height="100%">
        <img src="https://opencollective.com/storybook/sponsor/1/avatar.svg" alt="donator" />
      </LazyLoad>
    </LogoLink>
    <LogoLink
      href="https://opencollective.com/storybook/sponsor/2/website"
      target="_blank"
      rel="noopener nofollow noreferrer"
    >
      <LazyLoad once height="100%">
        <img src="https://opencollective.com/storybook/sponsor/2/avatar.svg" alt="donator" />
      </LazyLoad>
    </LogoLink>
    <LogoLink
      href="https://opencollective.com/storybook/sponsor/3/website"
      target="_blank"
      rel="noopener nofollow noreferrer"
    >
      <LazyLoad once height="100%">
        <img src="https://opencollective.com/storybook/sponsor/3/avatar.svg" alt="donator" />
      </LazyLoad>
    </LogoLink>
    <LogoLink
      href="https://opencollective.com/storybook/sponsor/4/website"
      target="_blank"
      rel="noopener nofollow noreferrer"
    >
      <LazyLoad once height="100%">
        <img src="https://opencollective.com/storybook/sponsor/4/avatar.svg" alt="donator" />
      </LazyLoad>
    </LogoLink>
    <LogoLink
      href="https://opencollective.com/storybook/sponsor/5/website"
      target="_blank"
      rel="noopener nofollow noreferrer"
    >
      <LazyLoad once height="100%">
        <img src="https://opencollective.com/storybook/sponsor/5/avatar.svg" alt="donator" />
      </LazyLoad>
    </LogoLink>
    <LogoLink
      href="https://opencollective.com/storybook/sponsor/6/website"
      target="_blank"
      rel="noopener nofollow noreferrer"
    >
      <LazyLoad once height="100%">
        <img src="https://opencollective.com/storybook/sponsor/6/avatar.svg" alt="donator" />
      </LazyLoad>
    </LogoLink>
    <LogoLink
      href="https://opencollective.com/storybook/sponsor/7/website"
      target="_blank"
      rel="noopener nofollow noreferrer"
    >
      <LazyLoad once height="100%">
        <img src="https://opencollective.com/storybook/sponsor/7/avatar.svg" alt="donator" />
      </LazyLoad>
    </LogoLink>
    <LogoLink
      href="https://opencollective.com/storybook/sponsor/8/website"
      target="_blank"
      rel="noopener nofollow noreferrer"
    >
      <LazyLoad once height="100%">
        <img src="https://opencollective.com/storybook/sponsor/8/avatar.svg" alt="donator" />
      </LazyLoad>
    </LogoLink>
    <LogoLink
      href="https://opencollective.com/storybook/sponsor/9/website"
      target="_blank"
      rel="noopener nofollow noreferrer"
    >
      <LazyLoad once height="100%">
        <img src="https://opencollective.com/storybook/sponsor/9/avatar.svg" alt="donator" />
      </LazyLoad>
    </LogoLink>
    <LogoLink
      href="https://opencollective.com/storybook/sponsor/10/website"
      target="_blank"
      rel="noopener nofollow noreferrer"
    >
      <LazyLoad once height="100%">
        <img src="https://opencollective.com/storybook/sponsor/10/avatar.svg" alt="donator" />
      </LazyLoad>
    </LogoLink>
    <LogoLink
      href="https://opencollective.com/storybook/sponsor/11/website"
      target="_blank"
      rel="noopener nofollow noreferrer"
    >
      <LazyLoad once height="100%">
        <img src="https://opencollective.com/storybook/sponsor/11/avatar.svg" alt="donator" />
      </LazyLoad>
    </LogoLink>
  </OpenCollectiveLogos>
</CommunityLayout> */
