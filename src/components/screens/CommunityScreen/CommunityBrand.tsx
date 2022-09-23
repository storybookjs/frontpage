import React from 'react';
import { styled } from '@storybook/theming';
import { SupportFeature, SupportFeatureGrid, styles } from '@storybook/components-marketing';
import { Link, ColoredIcons } from '@storybook/design-system';
import { StorybookIcon } from './CommunityIcons';
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

interface CommunityBrandProps {
  brandUrl: string;
  designSystemUrl: string;
  presentationUrl: string;
}

export const CommunityBrand = ({
  brandUrl,
  designSystemUrl,
  presentationUrl,
}: CommunityBrandProps) => {
  return (
    <Wrapper>
      <CommunitySectionHeader
        title="Use brand & presentation resources"
        description="The easiest way to get involved is to share Storybook with fellow developers, colleagues, and friends."
      />
      <SupportFeatureGrid>
        <SupportFeature
          image={<StorybookIcon />}
          title="Logo and brand"
          desc="Use the Storybook logo, typography, colors, and images."
        >
          <Link withArrow href={brandUrl}>
            Get logo
          </Link>
          <Link withArrow href={designSystemUrl}>
            View design system
          </Link>
        </SupportFeature>
        <SupportFeature
          image={<ColoredIcons.Components />}
          title="Give a talk"
          desc="Download presentation slides (Keynote, PDF)."
        >
          <Link withArrow href={presentationUrl}>
            Follow now
          </Link>
        </SupportFeature>
      </SupportFeatureGrid>
    </Wrapper>
  );
};
