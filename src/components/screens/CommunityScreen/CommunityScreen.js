import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { rgba } from 'polished';

import { Button, Icon, Link, styles } from './../../basics';
import PageLayout from './../../layout/PageLayout';
import CommunityHero from './CommunityHero';
import CommunitySocial from './CommunitySocial';
import CommunitySidebar from './CommunitySidebar';
import CommunityItem from './CommunityItem';
import CommunityList from './CommunityList';

const { background, color, spacing, typography, pageMargin, pageMargins, breakpoint } = styles;

const Contrast = styled.div`
  background-color: ${background.app};
`;

const Separator = styled.hr`
  margin: 0;
`;

const StorybookBadge = styled.img`
  display: block;
`;
const StorybookBadgeOuter = styled.div`
  background: ${rgba(color.purple, 0.1)};
  border: 1px dashed ${rgba(color.purple, 0.3)};
  padding: 15px;
  border-radius: 4px;
  margin-right: 15px;
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

const OpenCollectiveLogos = styled.div`
  height: 240px;
  width: 400px;
  background: purple;
`;

const CommunityLayout = styled.div`
  ${pageMargins};
  padding-top: 3rem;
  padding-bottom: 3rem;
  @media (min-width: ${breakpoint * 1}px) {
    padding-top: 7rem;
    padding-bottom: 7rem;
  }
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  ${Sidebar}, ${List} {
    flex: 1;
  }

  ${Sidebar} > * {
    max-width: 360px;
  }
`;

export default function CommunityScreen({ hasSubscribed, onSubscribe, ...props }) {
  return (
    <PageLayout {...props} hasSubscribed={hasSubscribed} onSubscribe={onSubscribe}>
      <CommunityHero hasSubscribed={hasSubscribed} onSubscribe={onSubscribe} />

      <CommunitySocial />

      <CommunityLayout>
        <Sidebar
          title="Spread the word"
          desc="The easiest way to get involved is to share Storybook with fellow developers, colleages, and friends."
        >
          <StorybookBadgeWrapper>
            <StorybookBadgeOuter>
              <StorybookBadge src="images/community/storybook-badge.svg" alt="Storybook badge" />
            </StorybookBadgeOuter>
            <div>Get the Storybook badge for your project</div>
          </StorybookBadgeWrapper>
        </Sidebar>
        <List>
          <Item
            image={<img src="images/community/blog.svg" />}
            title="Write about Storybook"
            desc="Publish it to your blog or submit it to Storybook’s Medium publication. Mention @storybookjs on Twitter for a reshare."
            links={[{ title: 'Submit an article to the blog', href: 'https://google.com' }]}
          />
          <Item
            image={<img src="images/community/presentation.svg" />}
            title="Talk about Storybook"
            desc="Present at work, meetups, and conferences. Get your point across with ready-to-use slides (Keynote, PDF) and illustrations."
            links={[{ title: 'Check out the presentation materials', href: 'https://google.com' }]}
          />
          <Item
            image={<img src="images/community/brand.svg" />}
            title="Use the brand"
            desc="Create your own visuals using Storybook logo, typography, colors, and images."
            links={[
              { title: 'View brand', href: 'https://google.com' },
              { title: 'View design system', href: 'https://google.com' },
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
            <Button outline primary>
              <Icon icon="discord" /> Chat on Discord
            </Button>
          </Sidebar>
          <List>
            <Item
              image={<img src="images/community/bug.svg" />}
              title="Find and report issues"
              desc="Help find bugs and QA releases. Maintainers are human, we miss things sometimes. Issue reports are much appreciated."
              links={[{ title: 'Report an issue', href: 'https://google.com' }]}
            />
            <Item
              image={<img src="images/community/docs.svg" />}
              title="Write and update docs"
              desc="Teach fellow developers how to take advantage of Storybook. Help write, edit, and improve docs."
              links={[{ title: 'Get started with docs', href: 'https://google.com' }]}
            />
            <Item
              image={<img src="images/community/pullrequest.svg" />}
              title="Send a pull request"
              desc="Want to create a new feature or improve existing functionality? PRs welcomed and encouraged."
              links={[{ title: 'Learn how to contribute', href: 'https://google.com' }]}
            />
          </List>
        </CommunityLayout>
      </Contrast>
      <Separator />

      <CommunityLayout>
        <Sidebar
          title="Sponsor open source"
          desc="Donations go to hosting, swag for contributors, documentation and learning materials."
          loneChild
        >
          <Button primary>Donate to Storybook Open Collective</Button>
        </Sidebar>
        <OpenCollectiveLogos />
      </CommunityLayout>
    </PageLayout>
  );
}

CommunityScreen.propTypes = {
  hasSubscribed: PropTypes.bool.isRequired,
  onSubscribe: PropTypes.func.isRequired,
};
