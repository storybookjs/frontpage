import React from 'react';
import PropTypes from 'prop-types';
import styled, { css, keyframes } from 'styled-components';
import { Link as GatsbyLink } from 'gatsby';

import { Icon, Link, TooltipLinkList, WithTooltip, styles } from '@storybook/design-system';
import useSiteMetadata from '../lib/useSiteMetadata';

import StorybookLogoSVG from '../../images/logo-storybook.svg';

const { color, typography, pageMargins, breakpoint } = styles;

const LogotypeWrapper = styled(Link)`
  display: inline-block;
  img {
    height: 22px;
    width: auto;
    margin-top: 14px;
    @media (min-width: ${breakpoint}px) {
      height: 26px;
      margin-top: 10px;
    }

    display: block;

    transition: all 150ms ease-out;
    transform: translate3d(0, 0, 0);
    &:hover {
      transform: translate3d(0, -1px, 0);
    }
    &:active {
      transform: translate3d(0, 0, 0);
    }
  }
`;

const Version = styled(Link)`
  display: inline-block;
  vertical-align: top;
  margin-left: 10px;
  position: relative;
  top: 2px;
  font-size: ${typography.size.s1}px;
  color: ${color.mediumdark};
`;

const TooltipLinkListWrapper = styled.div`
  padding: 8px 5px;
  color: ${color.darkest};
`;

const NavLink = styled(Link)`
  font-size: ${typography.size.s2}px;
  font-weight: ${typography.weight.bold};
`;

const Menu = styled(Link)`
  width: 3rem;
  height: 3rem;
  border: none !important;
  text-decoration: none !important;
  background: none !important;
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  svg {
    height: 1rem;
    width: 1rem;
    margin: 0;
  }
`;

const MobileMenu = styled.div`
  font-size: ${typography.size.s1}px;

  ${TooltipLinkListWrapper} {
    padding: 5px 0;
  }
`;

const NavItem = styled.div`
  display: inline-block;
  line-height: 3rem;
  height: 3rem;
  vertical-align: top;

  ${props =>
    props.showDesktop &&
    css`
      display: none;
      @media (min-width: ${breakpoint * 1.333}px) {
        display: inline-block;
      }
    `};

  ${props =>
    props.showMobile &&
    css`
      @media (min-width: ${breakpoint * 1.333}px) {
        display: none;
      }
    `};
`;

const NavGroup = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;

  ${props =>
    props.right &&
    css`
      left: auto;
      right: 0;
    `}

  ${NavItem} + ${NavItem} {
    margin-left: 25px;
  }
`;

const Nav = styled.div`
  height: 3rem;
  position: relative;
  text-align: center;
  z-index: 3;
`;

const NavWrapper = styled.nav`
  ${pageMargins};
  padding-top: 12px;
  @media (min-width: ${breakpoint}px) {
    padding-top: 36px;
  }
`;

const octocatWave = keyframes`
  0%,
  100% {
    transform: rotate(0);
  }
  20%,
  60% {
    transform: rotate(-25deg);
  }
  40%,
  80% {
    transform: rotate(10deg);
  }
`;

const GitHubLink = styled.a`
  display: none;
  position: absolute;
  top: 0;
  right: 0;

  @media (min-width: 600px) {
    display: block;
  }

  svg {
    fill: #e91e63;
    color: #fff;
    border: 0;
  }

  &:hover .octo-arm {
    animation: ${octocatWave} 560ms ease-in-out;
  }
`;

const LinkWrapper = ({ href, isGatsby, ...props }) => {
  if (isGatsby) {
    return <GatsbyLink to={href} {...props} />;
  }

  // eslint-disable-next-line jsx-a11y/anchor-has-content
  return <a href={href} {...props} />;
};

LinkWrapper.propTypes = {
  href: PropTypes.string.isRequired,
  isGatsby: PropTypes.bool.isRequired,
};

export default function Header({ ...props }) {
  const { latestVersion, urls = {} } = useSiteMetadata();
  const { navLinks = {}, gitHub = {} } = urls;

  const mobileMenu = (
    <MobileMenu>
      <TooltipLinkList links={navLinks} LinkWrapper={LinkWrapper} />
    </MobileMenu>
  );

  return (
    <NavWrapper {...props}>
      <Nav>
        <NavGroup>
          <NavItem>
            <LogotypeWrapper LinkWrapper={GatsbyLink} to="/">
              <img src={StorybookLogoSVG} alt="Storybook" />
            </LogotypeWrapper>
            <Version href={gitHub.releases}>{latestVersion}</Version>
          </NavItem>
        </NavGroup>

        <NavGroup right>
          {navLinks.map(({ title, href, isGatsby }) => (
            <NavItem showDesktop key={title}>
              <NavLink tertiary href={href} isGatsby={isGatsby} LinkWrapper={LinkWrapper}>
                {title}
              </NavLink>
            </NavItem>
          ))}

          <NavItem showMobile>
            <WithTooltip tagName="span" placement="top" trigger="click" tooltip={mobileMenu}>
              <Menu secondary icon={1} isButton>
                <Icon icon="menu" />
              </Menu>
            </WithTooltip>
          </NavItem>
        </NavGroup>
      </Nav>
      <GitHubLink
        href="https://github.com/storybookjs/storybook"
        aria-label="View source on Github"
      >
        <svg width="80" height="80" viewBox="0 0 250 250" aria-hidden="true">
          <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" />
          <path
            d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
            fill="currentColor"
            style={{ transformOrigin: '130px 106px' }}
            className="octo-arm"
          />
          <path
            d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
            fill="currentColor"
            className="octo-body"
          />
        </svg>
      </GitHubLink>
    </NavWrapper>
  );
}
