import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { rgba } from 'polished';
import { StaticQuery, graphql } from 'gatsby';

import { Button, Icon, styles } from '@storybook/design-system';
import useSiteMetadata from '../../../lib/useSiteMetadata';

import { LazyLoad, SocialGraph } from '../../basics';
import PageLayout from '../../layout/PageLayout';
import CommunityHero from './CommunityHero';
import CommunitySocial from './CommunitySocial';
import CommunitySidebar from './CommunitySidebar';
import CommunityItem from './CommunityItem';
import CommunityList from './CommunityList';

import StorybookBadgeSVG from '../../../images/community/storybook-badge.svg';
import BlogSVG from '../../../images/community/blog.svg';
import PresentationSVG from '../../../images/community/presentation.svg';
import BrandSVG from '../../../images/community/brand.svg';
import PullRequestSVG from '../../../images/community/pullrequest.svg';
import DocsSVG from '../../../images/community/docs.svg';
import BugSVG from '../../../images/community/bug.svg';

const { background, color, pageMargins, breakpoint } = styles;

const Contrast = styled.div`
  background-color: ${background.app};
`;

const Separator = styled.hr`
  margin: 0;
`;

const StorybookBadge = styled.img`
  display: block;
`;
const StorybookBadgeOuter = styled.a`
  background: ${rgba(color.purple, 0.1)};
  border: 1px dashed ${rgba(color.purple, 0.3)};
  padding: 15px;
  border-radius: 4px;
  margin-right: 15px;

  display: inline-block;

  transition: all 150ms ease-out;

  ${StorybookBadge} {
    transition: all 150ms ease-out 75ms;
    transform: translate3d(0, 0, 0);
  }

  &:hover {
    background: ${rgba(color.purple, 0.2)};

    ${StorybookBadge} {
      transform: translate3d(0, -2px, 0);
      box-shadow: rgba(0, 0, 0, 0.2) 0 2px 6px 0;
    }
  }

  &:active {
    background: ${rgba(color.purple, 0.25)};
    box-shadow: ${rgba(color.purple, 0.3)} 0 0 3px 0 inset;

    ${StorybookBadge} {
      transform: translate3d(0, 0, 0);
    }
  }
`;
const StorybookBadgeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  ${StorybookBadgeOuter} {
    flex: 0;
  }
`;

const DiscordText = styled.div`
  margin-bottom: 1rem;
`;

const Sidebar = styled(CommunitySidebar)``;
const Item = styled(CommunityItem)``;
const List = styled(CommunityList)``;

const LogoLink = styled.a`
  display: inline-block;
  padding: 5px;

  img {
    display: block;
    max-width: 100px;
    max-height: 45px;
    object-fit: contain;
    margin-left: auto;
    margin-right: auto;
  }
`;

const OpenCollectiveLogos = styled.div`
  flex: 1;
  height: 240px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;

  ${LogoLink} {
    flex: 0;
  }

  @media (min-width: ${breakpoint * 1}px) {
    ${LogoLink} {
      flex: 1;
    }
  }

  @media (min-width: ${breakpoint * 1.5}px) {
    ${LogoLink} {
      flex: 0 1 33.33%;
    }
  }
`;

const CommunityLayout = styled.div`
  ${pageMargins};
  display: flex;
  flex-direction: column;
  padding-top: 3rem;
  padding-bottom: 3rem;

  @media (min-width: ${breakpoint * 1.333}px) {
    flex-direction: row;
    padding-top: 7rem;
    padding-bottom: 7rem;
  }

  ${Sidebar}, ${List} {
    flex: 1;
  }

  ${Sidebar} {
    margin-bottom: 3rem;
    & > * {
      @media (min-width: ${breakpoint * 1.333}px) {
        max-width: 360px;
      }
    }
  }
`;

export function PureCommunityScreen({ data: { gitHubRepoData }, ...props }) {
  const { title, ogImage, urls = {} } = useSiteMetadata();
  const {
    home,
    badge,
    brand,
    chat,
    blog,
    presentation,
    designSystem,
    gitHub = {},
    docsIntro,
    openCollective,
  } = urls;
  return (
    <PageLayout {...props}>
      <SocialGraph
        title={`Community | ${title}`}
        desc="Join thousands of frontend developers to learn new Storybook techniques, get help, and develop UIs faster."
        url={`${home}/community`}
        image={ogImage}
      />
      <CommunityHero gitHubRepoData={gitHubRepoData} />

      <CommunitySocial />

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
              links={[{ title: 'Get started with docs', href: docsIntro }]}
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
      </CommunityLayout>
    </PageLayout>
  );
}

PureCommunityScreen.propTypes = {
  data: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default function CommunityScreen(props) {
  return (
    <StaticQuery
      query={graphql`
        query CommunityScreenQuery {
          gitHubRepoData {
            contributorCount
            author
            name
            url
          }
        }
      `}
      render={data => <PureCommunityScreen data={data} {...props} />}
    />
  );
}
