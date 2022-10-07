import React, { forwardRef } from 'react';
import { styled } from '@storybook/theming';
import { SupportFeature, SupportFeatureGrid, styles } from '@storybook/components-marketing';
import { Link, ColoredIcons } from '@storybook/design-system';
import { DiscordIcon } from './CommunityIcons';
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

interface CommunityContributeProps {
  contributorCount: number;
  docsUrl: string;
  issuesUrl: string;
  contributeUrl: string;
  chatUrl: string;
}

export const CommunityContribute = forwardRef<HTMLDivElement, CommunityContributeProps>(
  ({ contributorCount, docsUrl, issuesUrl, contributeUrl, chatUrl }, ref) => {
    return (
      <Wrapper ref={ref}>
        <CommunitySectionHeader
          id="contribute"
          title="Contribute to Storybook"
          description={`Join ${contributorCount.toLocaleString()}+ open source contributors building Storybook, the industry-standard frontend workshop.`}
        />
        <SupportFeatureGrid>
          <SupportFeature
            image={<ColoredIcons.Document />}
            title="Write or update docs"
            desc="Teach fellow developers how to take advantage of Storybook. Help write, edit, and improve docs."
          >
            <Link withArrow href={docsUrl}>
              Get started with docs
            </Link>
          </SupportFeature>
          <SupportFeature
            image={<ColoredIcons.Bug />}
            title="Find and report issues"
            desc="Please report issues, someone else may have the same issue."
          >
            <Link withArrow href={issuesUrl}>
              View GitHub issues
            </Link>
          </SupportFeature>
          <SupportFeature
            image={<ColoredIcons.Branch />}
            title="Send a pull request"
            desc="Want to create a new feature or improve existing functionality? PRs welcomed and encouraged."
          >
            <Link withArrow href={contributeUrl}>
              Learn how to contribute
            </Link>
          </SupportFeature>
          <SupportFeature
            image={<DiscordIcon />}
            title="Join #contributing chat"
            desc="Coordinate with other contributors by joining our chat"
          >
            <Link withArrow href={chatUrl}>
              Chat now
            </Link>
          </SupportFeature>
        </SupportFeatureGrid>
      </Wrapper>
    );
  }
);
