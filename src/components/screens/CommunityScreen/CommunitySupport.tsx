import React, { forwardRef } from 'react';
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
  gap: 30px;
  margin-bottom: 3rem;

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

export const CommunitySupport = forwardRef<HTMLDivElement, CommunitySupportProps>(
  ({ repoUrl, chatUrl, version, apiKey }, ref) => {
    return (
      <Wrapper ref={ref}>
        <CommunitySectionHeader
          id="support"
          title="Get support"
          description="Storybook’s thriving community can help answer your questions. Developers of all skill levels welcome."
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
  }
);
CommunitySupport.displayName = 'CommunitySupport';
