import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import Link from './Link';
import Button from './Button';
import Icon from './Icon';
import TooltipLinkList from './tooltip/TooltipLinkList';
import WithTooltip from './tooltip/WithTooltip';

import { color, typography, spacing, pageMargins, breakpoint } from './../shared/styles';

const LogotypeWrapper = styled.a`
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
  font-weight: ${typography.weight.extrabold};
`;

const Menu = styled(Link)`
  width: 3rem;
  border: none !important;
  text-decoration: none !important;
  text-align: right;
  svg {
    vertical-align: top;
    height: 1rem;
    width: 1rem;
    margin: 0;
  }
`;

const MobileMenuLink = styled(Link)`
  font-weight: ${typography.weight.extrabold};
`;

const MenuAuth = styled.div`
  border-top: 1px solid #eeeeee;
  padding: 20px 15px;
  text-align: center;

  > * {
    width: 100%;
  }
`;

const MobileMenuColumn = styled.div`
  &:first-child {
    background: ${color.lightest};
  }
  &:last-child {
    background: #f8f8fa;
  }
`;
const MobileMenu = styled.div`
  font-size: ${typography.size.s1}px;

  display: flex;
  flex-direction: row;
  width: 360px;

  ${MobileMenuColumn} {
    flex: 1;
  }

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
  const docsUrl = 'https://storybook.js.org/basics/introduction/';
  const addonsUrl = '/addons';
  const communityUrl = '/community';
  const useCasesUrl = '/use-cases';
  const supportUrl = '/support';

  const mobileMenu = (
    <MobileMenu>
      <TooltipLinkList
        links={[
          { title: 'Docs', href: docsUrl },
          { title: 'Addons', href: addonsUrl },
          { title: 'Community', href: communityUrl },
          { title: 'Use cases', href: useCasesUrl },
          { title: 'Support', href: supportUrl },
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
              <img src="logos/logo-storybook.svg" alt="Storybook" />
            </LogotypeWrapper>
          </NavItem>
        </NavGroup>

        <NavGroup right>
          <NavItem showDesktop>
            <NavLink tertiary href={docsUrl}>
              Docs
            </NavLink>
          </NavItem>
          <NavItem showDesktop>
            <NavLink tertiary href={addonsUrl}>
              Addons
            </NavLink>
          </NavItem>
          <NavItem showDesktop>
            <NavLink tertiary href={communityUrl}>
              Community
            </NavLink>
          </NavItem>
          <NavItem showDesktop>
            <NavLink tertiary href={useCasesUrl}>
              Use cases
            </NavLink>
          </NavItem>
          <NavItem showDesktop>
            <NavLink tertiary href={supportUrl}>
              Support
            </NavLink>
          </NavItem>

          <NavItem showMobile>
            {/*
              // TODO Fixme, start with Popper.js
              <WithTooltip placement="top" mode="click" tooltip={mobileMenu}>
              <Menu secondary icon={1} isButton>
                <Icon icon="menu" />
              </Menu>
            </WithTooltip>
            */}
          </NavItem>
        </NavGroup>
      </Nav>
    </NavWrapper>
  );
}
