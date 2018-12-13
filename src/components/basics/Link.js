import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { darken } from 'polished';
import { Link as GatsbyLink } from 'gatsby';
import { color } from './shared/styles';

// prettier-ignore
const LinkWrapper = styled.a`
  display: inline-block;
  transition: all 150ms ease-out;
  text-decoration: none;

  color: ${color.primary};
  > svg path { fill: ${color.primary}; }

  &:hover, &:focus {
    cursor: pointer;
    transform: translate3d(0,-1px,0);
    color: ${darken(0.07, color.primary)};
    > svg path { fill: ${darken(0.07, color.primary)} }
  }
  &:active {
    transform: translate3d(0,0,0);
    color: ${darken(0.10, color.primary)};
    > svg path { fill: ${darken(0.10, color.primary)} }
  }

  > svg {
    display: inline-block;
    height: 1em;
    width: 1em;
    vertical-align: text-top;
    position: relative;
    bottom: -.125em;
    margin-right: .4em;
  }

  ${props => props.withArrow && css`
    > svg:last-of-type {
      height: .7em;
      width: .7em;
      margin-right: 0;
      margin-left: .25em;
      bottom: auto;
      vertical-align: inherit;
    }
  `}

  ${props =>
    props.containsIcon &&
    css`
      svg {
        height: 1em;
        width: 1em;
        vertical-align: middle;
        position: relative;
        bottom: 0;
        margin-right: 0;
      }
    `};



  &.secondary {
    color: ${color.mediumdark};
    > svg path { fill: ${color.mediumdark}; }

    &:hover {
      color: ${color.dark};
      > svg path { fill: ${color.dark}; }
    }

    &:active {
      color: ${color.darker};
      > svg path { fill: ${color.darker}; }
    }
	}

  &.tertiary {
    color: ${color.dark};
    > svg path { fill: ${color.dark}; }

    &:hover {
      color: ${color.darkest};
      > svg path { fill: ${color.darkest}; }
    }

    &:active {
      color: ${color.mediumdark};
      > svg path { fill: ${color.mediumdark}; }
    }
	}

  &.nochrome {
    color: inherit;

    &:hover, &:active {
      color: inherit;
      text-decoration: underline;
    }
	}

  &.inverse {
    color: ${color.lightest};
    > svg path { fill: ${color.lightest}; }

    &:hover {
      color: ${color.lighter};
      > svg path { fill: ${color.lighter}; }
    }

    &:active {
      color: ${color.light};
      > svg path { fill: ${color.light}; }
    }
	}
`;

const LinkGatsby = LinkWrapper.withComponent(GatsbyLink);

function Link({ isGatsby, withArrow, ...props }) {
  if (isGatsby) {
    return <LinkGatsby {...props} withArrow={withArrow} />;
  }
  return <LinkWrapper {...props} withArrow={withArrow} />;
}

Link.propTypes = {
  isGatsby: PropTypes.bool,
  children: PropTypes.node,
  withArrow: PropTypes.bool,
};

Link.defaultProps = {
  isGatsby: false,
  children: null,
  withArrow: false,
};

export default Link;
