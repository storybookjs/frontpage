import React from 'react';
import { styled } from '@storybook/theming';
import {
  SearchBlock,
  SupportFeature,
  SupportFeatureGrid,
  styles,
} from '@storybook/components-marketing';
import { Link } from '@storybook/design-system';
import { DiscordIcon, GithubIcon } from './CommunityIcons';
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

interface CommunitySupportProps {
  repoUrl: string;
  chatUrl: string;
  version: string;
  apiKey: string;
}

export const CommunitySupport = ({ repoUrl, chatUrl, version, apiKey }: CommunitySupportProps) => {
  return (
    <Wrapper>
      <CommunitySectionHeader
        id="support"
        title="Sponsor the community"
        description="Donations help the community keep going. They are used for web hosting, continuous integration, contributor swag, learning materials, and event production."
      />
      <SearchBlock version={version} apiKey={apiKey} />
      <SupportFeatureGrid>
        <SupportFeature
          image={<DiscordIcon />}
          title="Ask a question in #support chat"
          desc="Resolve issues with community help. A maintainer is usually online."
        >
          <Link withArrow href={chatUrl}>
            Chat now
          </Link>
        </SupportFeature>
        <SupportFeature
          image={<GithubIcon />}
          title="File an issue on GitHub"
          desc="Please report issues, someone else may have the same issue."
        >
          <Link withArrow href={repoUrl}>
            View GitHub issues
          </Link>
        </SupportFeature>
      </SupportFeatureGrid>
    </Wrapper>
  );
};
