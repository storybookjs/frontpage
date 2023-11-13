import React from 'react';
import { styled } from '@storybook/theming';
import { Badge, Icon, Link } from '@storybook/design-system';
import { minLg, minMd, typography, color, minSm } from '@chromaui/tetra';
import { GithubButton } from './GithubButton';

const GithubButtonWrapper = styled.div`
  margin-left: 20px;
  flex: none;
`;

const EyebrowLink = styled(Link)<{ inverse?: boolean }>`
  ${typography.body14}
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  && {
    ${(props) => ({
      color: props.inverse ? color.white : color.slate800,
    })}
  }
`;

const EyebrowCallout = styled(Link)<{ inverse?: boolean }>`
  ${typography.body14}

  && {
    ${(props) => ({ color: props.inverse ? color.white : color.slate800 })}
  }
`;

const EyebrowContainer = styled.div<{
  inverse?: boolean;
}>`
  display: none;
  align-items: center;
  padding: 10px 20px;
  background-color: ${(props) => (props.inverse ? 'rgba(0, 0, 0, 0.3)' : color.blue100)};
  box-shadow: ${(props) => (props.inverse ? 'rgba(255, 255, 255, 0.1)' : color.blackTr10)} 0 -1px 0px
    0px inset;

  ${EyebrowLink} {
    margin-left: 10px;
    margin-right: auto;
  }

  ${EyebrowCallout} {
    display: none;
    text-align: right;
  }

  ${minSm} {
    display: flex;
  }

  ${minLg} {
    ${EyebrowCallout} {
      display: inline-flex;
    }
  }
`;

interface EyebrowProps {
  label: string;
  link: string;
  githubStarCount: number;
  inverse?: boolean;
}

export const Eyebrow = ({ label, link, inverse, githubStarCount }: EyebrowProps) => (
  <EyebrowContainer inverse={inverse}>
    <Badge status="positive">New</Badge>
    <EyebrowLink inverse={inverse} secondary={!inverse} href={link} withArrow>
      {label}
    </EyebrowLink>
    <EyebrowCallout
      inverse={inverse}
      secondary={!inverse}
      href="https://www.chromatic.com?utm_source=storybook_website&utm_medium=link&utm_campaign=storybook"
    >
      <Icon icon="chromatic" aria-hidden />
      Visual test with Chromatic
    </EyebrowCallout>
    <GithubButtonWrapper>
      <GithubButton starCount={githubStarCount} />
    </GithubButtonWrapper>
  </EyebrowContainer>
);
