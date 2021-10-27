import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@storybook/theming';

import { Subheading, styles } from '@storybook/design-system';

const { color, spacing, typography, pageMargins, breakpoint } = styles;

const Heading = styled(Subheading)`
  color: ${color.medium};
`;

const Logo = styled.img`
  display: inline-block;
  width: 100%;
  height: auto;

  max-width: 80px;
  max-height: 24px;
  object-fit: contain;

  @media (min-width: ${breakpoint * 1.333}px) {
    max-width: 92px;
    max-height: 32px;
  }

  ${(props) =>
    props.monochrome &&
    `
      opacity: 0.4;
      filter: grayscale(100%);
    `};
`;

const LogoWrapper = styled.div`
  padding: 0 ${spacing.padding.medium}px;
  display: inline-block;
  text-align: center;
`;

const Logos = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  &:not(:only-child) {
    padding-bottom: 0.75rem;
  }

  @media (min-width: ${breakpoint * 1.333}px) {
    flex-wrap: wrap;
    justify-content: space-between;
    &:not(:only-child) {
      padding-bottom: 1.5rem;
    }
  }

  ${LogoWrapper} {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  ${(props) =>
    props.grid &&
    `
      @media (min-width: ${breakpoint * 1.333}px) {
        justify-content: space-evenly;

        ${LogoWrapper} {
          flex: 0 1 16.666%;
          margin-top: 1.5rem;
          margin-bottom: 1.5rem;
        }

        ${Logo} {
          opacity: 1;
        }
      }
    `};
`;

const Subtext = styled.div`
  font-size: ${typography.size.s1}px;
  color: ${color.mediumdark};
  text-align: center;
`;

const Wrapper = styled.div`
  ${pageMargins};
  padding-top: 3rem;
  padding-bottom: 3rem;
`;

export default function SocialProof({ path, brands, heading, grid, monochrome, ...props }) {
  return (
    <Wrapper {...props}>
      <Logos grid={grid}>
        {!grid && heading && <Heading>{heading}</Heading>}
        {brands.map((brand) => (
          <LogoWrapper key={brand} title={brand}>
            <Logo src={`${path}/logo-${brand}.svg`} alt={brand} monochrome={monochrome} />
          </LogoWrapper>
        ))}
      </Logos>
      {grid && <Subtext>Trusted by these teams and thousands more</Subtext>}
    </Wrapper>
  );
}

SocialProof.propTypes = {
  path: PropTypes.string.isRequired,
  brands: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  heading: PropTypes.string,
  grid: PropTypes.bool,
  monochrome: PropTypes.bool,
};

SocialProof.defaultProps = {
  heading: null,
  grid: false,
  monochrome: false,
};
