import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { styles } from '@storybook/design-system';

const { breakpoint } = styles;

const Logo = styled.img`
  display: block;
  width: 100%;
  height: auto;

  max-width: 92px;
  max-height: 22px;
  object-fit: contain;
`;

const LogoWrapper = styled.button`
  border: none;
  background: none;
  padding: 0;

  height: 22px;

  display: inline-block;
  opacity: 0.4;
  filter: grayscale(100%);

  ${props =>
    !props.readOnly &&
    css`
      cursor: pointer;
      transition: all 200ms ease-out;
      transform: translate3d(0, 0, 0);

      &:hover {
        transform: translate3d(0, -2px, 0);
        opacity: 1;
        filter: grayscale(0%);
      }

      &:active {
        transform: translate3d(0, 0, 0);
      }
    `};

  ${props =>
    props.active &&
    !props.readOnly &&
    css`
      opacity: 1;
      filter: grayscale(0%);
    `};
`;

const Logos = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  ${LogoWrapper} {
    margin: 0 15px;
  }

  @media (min-width: ${breakpoint * 1}px) {
    justify-content: flex-start;
    display: flex;

    ${LogoWrapper} {
      margin: 0 20px;
    }
  }
`;

export default function LogoToggle({
  path,
  brands,
  selectedIndex,
  onSelectIndex,
  readOnly,
  ...props
}) {
  return (
    <Logos {...props}>
      {brands.map((brand, index) => (
        <LogoWrapper
          key={brand}
          active={index === selectedIndex}
          onClick={() => onSelectIndex(index)}
          readOnly={readOnly}
        >
          <Logo src={`${path}/logo-${brand}.svg`} alt={brand} />
        </LogoWrapper>
      ))}
    </Logos>
  );
}

LogoToggle.propTypes = {
  path: PropTypes.string.isRequired,
  brands: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onSelectIndex: PropTypes.func,
  selectedIndex: PropTypes.number,
  readOnly: PropTypes.bool,
};

LogoToggle.defaultProps = {
  readOnly: false,
  onSelectIndex: () => 0,
  selectedIndex: null,
};
