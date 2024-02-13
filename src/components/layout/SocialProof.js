import React from 'react';
import { styled } from '@storybook/theming';
import { NormalizeArea, styles } from '@storybook/components-marketing';

const { breakpoints } = styles;

const Logos = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  --ideal-area: 1000;
  padding-top: 2rem;
  padding-bottom: 2rem;

  @media (min-width: ${breakpoints[1]}px) {
    gap: 20px;
    --ideal-area: 2500;
  }

  @media (min-width: ${breakpoints[2]}px) {
    justify-content: center;
    gap: 54px;
    --ideal-area: 5000;
    padding-top: 5rem;
    padding-bottom: 5rem;
  }

  @media (min-width: ${breakpoints[3]}px) {
    gap: 60px;
    --ideal-area: 7500;
  }

  @media (min-width: 1400px) {
    gap: 80px;
  }
`;

const Logo = styled.img`
  display: block;
  height: auto;
  opacity: 0.5;
`;

const brands = [
  {
    name: 'VScode',
    image: '/images/home/logos/logo-vscode.svg',
    width: 33,
    height: 34,
  },
  {
    name: 'EU',
    image: '/images/home/logos/logo-eu.svg',
    width: 48,
    height: 31,
  },
  {
    name: 'Github',
    image: '/images/home/logos/logo-github.svg',
    width: 92,
    height: 26,
  },
  {
    name: 'Airbnb',
    image: '/images/home/logos/logo-airbnb.svg',
    width: 300,
    height: 94,
  },
  {
    name: 'Mozilla',
    image: '/images/home/logos/logo-mozilla.svg',
    width: 360,
    height: 103,
  },
  {
    name: 'monday.com',
    image: '/images/home/logos/logo-monday.svg',
    width: 132,
    height: 24,
  },
  {
    name: 'BBC',
    image: '/images/home/logos/logo-bbc.svg',
    width: 120,
    height: 32,
  },
];

export default function SocialProof() {
  return (
    <Logos>
      {brands.map((brand) => (
        <NormalizeArea key={brand.name} width={brand.width} height={brand.height} idealArea={5000}>
          <Logo src={brand.image} alt={brand.name} />
        </NormalizeArea>
      ))}
    </Logos>
  );
}
