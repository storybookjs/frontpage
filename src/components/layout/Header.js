import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Link as GatsbyLink } from 'gatsby';

import { Icon, Link, TooltipLinkList, WithTooltip, styles } from '@storybook/design-system';
import useSiteMetadata from '../../lib/useSiteMetadata';

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

const LinkWrapper = ({ href, to = href, isGatsby, ...props }) => {
  if (isGatsby) {
    return <GatsbyLink to={to} {...props} />;
  }

  // eslint-disable-next-line jsx-a11y/anchor-has-content
  return <a href={to} {...props} />;
};

LinkWrapper.propTypes = {
  to: PropTypes.string.isRequired,
  href: PropTypes.string,
  isGatsby: PropTypes.bool.isRequired,
};
LinkWrapper.defaultProps = {
  href: undefined,
};

export default function Header({ ...props }) {
  const { latestVersion, urls = {}, nav } = useSiteMetadata();
  const { navCommunityLinks = {}, navLinks = {}, tutorials, addons, gitHub = {} } = urls;

  const navLinksWithGithub = [...navLinks, { title: 'GitHub', href: gitHub.repo, isGatsby: false }];

  const docsLinks = Object.values(nav['docs-master']);

  const mobileMenu = (
    <MobileMenu>
      <TooltipLinkList links={navLinksWithGithub} LinkWrapper={LinkWrapper} />
    </MobileMenu>
  );

  const communityMenu = (
    <MobileMenu>
      <TooltipLinkList links={navCommunityLinks} LinkWrapper={LinkWrapper} />
    </MobileMenu>
  );

  const docsMenu = (
    <MobileMenu>
      <TooltipLinkList links={docsLinks} LinkWrapper={LinkWrapper} />
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
            <Version href="/changelog">{latestVersion}</Version>
          </NavItem>
        </NavGroup>

        <NavGroup right>
          <NavItem showDesktop>
            <WithTooltip tagName="span" placement="top" trigger="hover" tooltip={docsMenu}>
              <NavLink tertiary href="/docs/basics/introduction">
                Docs <Icon icon="arrowdown" />
              </NavLink>
            </WithTooltip>
          </NavItem>
          <NavItem showDesktop>
            <NavLink tertiary href={tutorials}>
              Tutorials
            </NavLink>
          </NavItem>
          <NavItem showDesktop>
            <NavLink tertiary href={addons} isGatsby LinkWrapper={LinkWrapper}>
              Addons
            </NavLink>
          </NavItem>
          <NavItem showDesktop>
            <WithTooltip tagName="span" placement="top" trigger="hover" tooltip={communityMenu}>
              <NavLink tertiary>
                Community <Icon icon="arrowdown" />
              </NavLink>
            </WithTooltip>
          </NavItem>
          <NavItem showDesktop>
            <NavLink tertiary href={gitHub.repo}>
              GitHub
            </NavLink>
          </NavItem>

          <NavItem showMobile>
            <WithTooltip tagName="span" placement="top" trigger="click" tooltip={mobileMenu}>
              <Menu secondary icon={1} isButton>
                <Icon icon="menu" />
              </Menu>
            </WithTooltip>
          </NavItem>
        </NavGroup>
      </Nav>
    </NavWrapper>
  );
}
