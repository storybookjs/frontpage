import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@storybook/theming';
import { NormalizeArea, styles } from '@storybook/components-marketing';
import { useMediaQuery } from '../lib/useMediaQuery';

const { color, spacing, typography, pageMargins, breakpoints } = styles;

const Logo = styled.img`
  display: block;
  height: auto;
  opacity: 0.4;
  filter: grayscale(100%);
`;

const Logos = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;

  @media (min-width: ${breakpoints[2]}px) {
    gap: 2.75rem;
  }
`;

const Wrapper = styled.div`
  ${pageMargins};
  padding-top: 2rem;
  padding-bottom: 2rem;

  @media (min-width: ${breakpoints[2]}px) {
    padding-top: 3rem;
    padding-bottom: 4rem;
  }
`;

const brands = [
  {
    name: 'VScode',
    image: 'images/logos/user/logo-vscode.svg',
    width: 33,
    height: 34,
  },
  {
    name: 'GovUK',
    image: 'images/logos/user/logo-govuk.svg',
    width: 134,
    height: 22,
  },
  {
    name: 'EU',
    image: 'images/logos/user/logo-eu.svg',
    width: 48,
    height: 31,
  },
  {
    name: 'Github',
    image: 'images/logos/user/logo-github.svg',
    width: 92,
    height: 26,
  },
  {
    name: 'Airbnb',
    image: 'images/logos/user/logo-airbnb.svg',
    width: 300,
    height: 94,
  },
  {
    name: 'Mozilla',
    image: 'images/logos/user/logo-mozilla.svg',
    width: 360,
    height: 103,
  },
  {
    name: 'BBC',
    image: 'images/logos/user/logo-bbc.svg',
    width: 120,
    height: 32,
  },
];

export default function SocialProof(props) {
  const [greaterThanBreakpoint2] = useMediaQuery(`(min-width: ${breakpoints[2]}px)`);

  return (
    <Wrapper {...props}>
      <Logos>
        {brands.map((brand) => (
          <NormalizeArea
            key={brand.name}
            width={brand.width}
            height={brand.height}
            idealArea={greaterThanBreakpoint2 ? 5000 : 1500}
          >
            <Logo src={brand.image} alt={brand.name} />
          </NormalizeArea>
        ))}
      </Logos>
    </Wrapper>
  );
}
