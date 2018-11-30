import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { color, spacing, typography, pageMargins, breakpoint } from './../shared/styles';

import Subheading from './Subheading';

const Heading = styled(Subheading)`
  color: ${color.mediumdark};
`;

const Logo = styled.img`
  opacity: 0.7;
  display: block;
  width: auto;
  max-height: 40px;

  ${props =>
    props.monochrome &&
    css`
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

  ${LogoWrapper} {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  @media (min-width: ${breakpoint * 1.333}px) {
    justify-content: space-between;
    padding-bottom: 1.5rem;
  }

  ${props =>
    props.grid &&
    css`
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

export default function SocialProof({ path, brands, grid, monochrome, ...props }) {
  return (
    <Wrapper {...props}>
      <Logos grid={grid}>
        {!grid && <Heading>Trusted by</Heading>}
        {brands.map((brand, index) => (
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
  grid: PropTypes.bool,
  monochrome: PropTypes.bool,
};

SocialProof.defaultProps = {
  grid: false,
  monochrome: false,
};
