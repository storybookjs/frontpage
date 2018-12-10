import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import Link from './basics/Link';
import Button from './basics/Button';
import Icon from './basics/Icon';
import TooltipLinkList from './basics/tooltip/TooltipLinkList';
import WithTooltip from './basics/tooltip/WithTooltip';

import { color, typography, spacing, pageMargins, breakpoint } from './../shared/styles';
import { url } from './../shared/urls';

const LogotypeWrapper = styled.a`
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

const TooltipLinkListSubtitle = styled.span`
  font-weight: ${typography.weight.regular};
  line-height: 1rem;
  color: ${color.dark};
  display: block;
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
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    vertical-align: top;
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
      @media (min-width: ${breakpoint}px) {
        display: inline-block;
      }
    `} ${props =>
    props.showMobile &&
    css`
      @media (min-width: ${breakpoint}px) {
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
    margin-left: ${spacing.padding.large}px;
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

export default function MarketingHeader({ ...props }) {
  const mobileMenu = (
    <MobileMenu>
      <TooltipLinkList
        links={[
          { title: 'Docs', href: url.docs },
          { title: 'Addons', href: url.addons },
          { title: 'Community', href: url.community },
          { title: 'Use cases', href: url.useCases },
          { title: 'Support', href: url.support },
          { title: 'Team', href: url.team },
        ]}
        // TODO: Pass GatsbyLink here
        LinkWrapper={null}
      />
    </MobileMenu>
  );

  return (
    <NavWrapper {...props}>
      <Nav>
        <NavGroup>
          <NavItem>
            <LogotypeWrapper href="/">
              <img src="images/logos/logo-storybook.svg" alt="Storybook" />
            </LogotypeWrapper>
            <Version href={url.gitHub.releases}>v5.0</Version>
          </NavItem>
        </NavGroup>

        <NavGroup right>
          <NavItem showDesktop>
            <NavLink tertiary href={url.docs}>
              Docs
            </NavLink>
          </NavItem>
          <NavItem showDesktop>
            <NavLink tertiary href={url.addons}>
              Addons
            </NavLink>
          </NavItem>
          <NavItem showDesktop>
            <NavLink tertiary href={url.community}>
              Community
            </NavLink>
          </NavItem>
          <NavItem showDesktop>
            <NavLink tertiary href={url.useCases}>
              Use cases
            </NavLink>
          </NavItem>
          <NavItem showDesktop>
            <NavLink tertiary href={url.support}>
              Support
            </NavLink>
          </NavItem>
          <NavItem showDesktop>
            <NavLink tertiary href="/team">
              Team
            </NavLink>
          </NavItem>

          <NavItem showMobile>
            <WithTooltip placement="top" trigger="click" tooltip={mobileMenu}>
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
