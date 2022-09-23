import React from 'react';
import { styled } from '@storybook/theming';
import { SupportFeatureGrid, styles } from '@storybook/components-marketing';
import { Avatar, Link, Icon, Button } from '@storybook/design-system';
import { CommunitySectionHeader } from './CommunitySectionHeader';

const { breakpoints, subheading, color, typography } = styles;

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
    max-width: 100px;
    max-height: 45px;
    object-fit: contain;
    margin-left: auto;
    margin-right: auto;
  }
`;

interface CommunitySponsorsProps {
  openCollectiveUrl: string;
}

export const CommunitySponsors = ({ openCollectiveUrl }: CommunitySponsorsProps) => {
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
          <Sponsor key={name} href={url}>
            <img src={image} alt={name} />
          </Sponsor>
        ))}
      </Sponsors>
    </Wrapper>
  );
};

const sponsors = [
  {
    name: 'Appli Tools',
    url: 'https://opencollective.com/storybook/sponsor/0/website',
    image: 'https://opencollective.com/storybook/sponsor/0/avatar.svg',
  },
  {
    name: 'Frontend Masters',
    url: 'https://opencollective.com/storybook/sponsor/1/website',
    image: 'https://opencollective.com/storybook/sponsor/1/avatar.svg',
  },
  {
    name: 'Chromatic',
    url: 'https://opencollective.com/storybook/sponsor/2/website',
    image: 'https://opencollective.com/storybook/sponsor/2/avatar.svg',
  },
  {
    name: 'Nx',
    url: 'https://opencollective.com/storybook/sponsor/3/website',
    image: 'https://opencollective.com/storybook/sponsor/3/avatar.svg',
  },
  {
    name: 'Retool',
    url: 'https://opencollective.com/storybook/sponsor/4/website',
    image: 'https://opencollective.com/storybook/sponsor/4/avatar.svg',
  },
  {
    name: 'Git Guardian',
    url: 'https://opencollective.com/storybook/sponsor/5/website',
    image: 'https://opencollective.com/storybook/sponsor/5/avatar.svg',
  },
  {
    name: 'Viswiz',
    url: 'https://opencollective.com/storybook/sponsor/6/website',
    image: 'https://opencollective.com/storybook/sponsor/6/avatar.svg',
  },
  {
    name: 'Algolia',
    url: 'https://opencollective.com/storybook/sponsor/7/website',
    image: 'https://opencollective.com/storybook/sponsor/7/avatar.svg',
  },
  {
    name: 'Principal',
    url: 'https://opencollective.com/storybook/sponsor/8/website',
    image: 'https://opencollective.com/storybook/sponsor/8/avatar.svg',
  },
  {
    name: 'Gitbook',
    url: 'https://opencollective.com/storybook/sponsor/9/website',
    image: 'https://opencollective.com/storybook/sponsor/9/avatar.svg',
  },
  {
    name: 'Intuit',
    url: 'https://opencollective.com/storybook/sponsor/10/website',
    image: 'https://opencollective.com/storybook/sponsor/10/avatar.svg',
  },
  {
    name: 'Skyscanner',
    url: 'https://opencollective.com/storybook/sponsor/11/website',
    image: 'https://opencollective.com/storybook/sponsor/11/avatar.svg',
  },
];
