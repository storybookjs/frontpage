import React from 'react';
import { styled } from '@storybook/theming';
import {
  SearchBlock,
  SupportFeature,
  SupportFeatureGrid,
  styles,
} from '@storybook/components-marketing';
import { Link } from '@storybook/design-system';
import { DiscordIcon, YouTubeIcon, TwitterIcon } from './CommunityIcons';
import { CommunitySectionHeader } from './CommunitySectionHeader';

const { breakpoints } = styles;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 2rem;

  ${SupportFeatureGrid} {
    width: 100%;
  }

  @media (min-width: ${breakpoints[2]}px) {
    margin-bottom: 4rem;
  }
`;

interface CommunityHeroEventsProps {
  youTubeUrl: string;
  twitterUrl: string;
  chatUrl: string;
}

export const CommunityHeroEvents = ({
  youTubeUrl,
  twitterUrl,
  chatUrl,
}: CommunityHeroEventsProps) => {
  return (
    <Wrapper>
      <CommunitySectionHeader
        title="Join live events & streams"
        description="Storybook’s thriving community can help answer your questions. Developers of all skill levels welcome."
      />
      <SupportFeatureGrid>
        <SupportFeature
          image={<YouTubeIcon />}
          title="Subscribe to YouTube channel"
          desc="Watch insider previews, feature demos, and interviews."
        >
          <Link withArrow href={youTubeUrl}>
            Watch now
          </Link>
        </SupportFeature>
        <SupportFeature
          image={<TwitterIcon />}
          title="Twitter"
          desc="Get the latest event updates from Storybook maintainers."
        >
          <Link withArrow href={twitterUrl}>
            Follow now
          </Link>
        </SupportFeature>
        <SupportFeature
          image={<DiscordIcon />}
          title="Follow #announcements chat"
          desc="Join our community chat to learn about live events and streams."
        >
          <Link withArrow href={chatUrl}>
            Chat now
          </Link>
        </SupportFeature>
      </SupportFeatureGrid>
    </Wrapper>
  );
};
