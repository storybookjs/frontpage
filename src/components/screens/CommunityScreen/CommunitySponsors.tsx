import React from 'react';
import { styled } from '@storybook/theming';
import { SupportFeatureGrid, NormalizeArea, styles } from '@storybook/components-marketing';
import { Avatar, Button } from '@storybook/design-system';
import { CommunitySectionHeader } from './CommunitySectionHeader';

const { breakpoints } = styles;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;

  ${SupportFeatureGrid} {
    width: 100%;
  }

  @media (min-width: ${breakpoints[2]}px) {
    margin-bottom: 4rem;
  }
`;

const Donate = styled.div`
  margin-top: 1.25rem;
  margin-bottom: 2rem;
`;

const Sponsors = styled.ul`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.25rem;
  padding: 0;
  margin-top: 0;
  margin-bottom: 2rem;
`;
const Sponsor = styled.a`
  display: inline-block;
  padding: 5px;

  img {
    display: block;
    border-radius: 4px;
  }
`;

interface CommunitySponsorsProps {
  openCollectiveUrl: string;
  sponsors: {
    name: string;
    image: string;
    url: string;
  }[];
}

export const CommunitySponsors = ({ openCollectiveUrl, sponsors }: CommunitySponsorsProps) => {
  return (
    <Wrapper>
      <CommunitySectionHeader
        title="Sponsor the community"
        description="Donations help the community keep going. They are used for web hosting, continuous integration, contributor swag, learning materials, and event production."
      />
      <Donate>
        <Button size="medium" appearance="secondaryOutline" isLink href={openCollectiveUrl}>
          Donate on Open Collective
        </Button>
      </Donate>
      <Sponsors>
        {sponsors.map(({ name, url, image }) => (
          <Sponsor key={name} href={url} target="_blank" rel="noopener nofollow noreferrer">
            <NormalizeArea width={400} height={400} idealArea={10000}>
              <img src={image} alt={name} />
            </NormalizeArea>
          </Sponsor>
        ))}
      </Sponsors>
    </Wrapper>
  );
};
