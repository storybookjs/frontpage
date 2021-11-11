import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link as GatsbyLink } from 'gatsby';
import GitHubButton from 'react-github-button';
import 'react-github-button/assets/style.css';

import {
  Header as DSHeader,
  NavLink,
  NavItem,
  Icon,
  Link,
  TooltipLinkList,
  WithTooltip,
  styles,
} from '@storybook/design-system';
import useSiteMetadata from '../lib/useSiteMetadata';

import StorybookLogoSVG from '../../images/logo-storybook.svg';

const { color, typography, pageMargins, breakpoint } = styles;

const StyledGitHubButton = styled(GitHubButton)`
  display: block;
  min-width: 124px;
`;

const LogotypeWrapper = styled(Link)`
  display: inline-block;
  align-self: stretch;

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
  const { urls = {} } = useSiteMetadata();
  const {
    navCommunityLinks = {},
    navLinks = {},
    docs,
    tutorials,
    blog,
    addons,
    releases,
    gitHub = {},
  } = urls;

  const navLinksWithGithub = [...navLinks, { title: 'GitHub', href: gitHub.repo, isGatsby: false }];

  const mobileMenu = <TooltipLinkList links={navLinksWithGithub} LinkWrapper={LinkWrapper} />;

  const communityMenu = <TooltipLinkList links={navCommunityLinks} LinkWrapper={LinkWrapper} />;

  return (
    <DSHeader
      navBreakpoint={1.5 * breakpoint}
      logo={
        <LogotypeWrapper LinkWrapper={GatsbyLink} to="/">
          <img src={StorybookLogoSVG} alt="Storybook" />
        </LogotypeWrapper>
      }
      links={
        <>
          <NavItem showDesktop>
            <NavLink tertiary href={docs} isGatsby LinkWrapper={LinkWrapper}>
              Docs
            </NavLink>
          </NavItem>
          <NavItem showDesktop>
            <NavLink tertiary href={tutorials}>
              Tutorials
            </NavLink>
          </NavItem>
          <NavItem showDesktop>
            <NavLink tertiary href={releases} isGatsby LinkWrapper={LinkWrapper}>
              Releases
            </NavLink>
          </NavItem>
          <NavItem showDesktop>
            <NavLink tertiary href={addons} isGatsby LinkWrapper={LinkWrapper}>
              Addons
            </NavLink>
          </NavItem>
          <NavItem showDesktop>
            <NavLink tertiary href={blog}>
              Blog
            </NavLink>
          </NavItem>
          <NavItem showDesktop>
            <WithTooltip
              tagName="span"
              placement="top"
              trigger="click"
              tooltip={communityMenu}
              closeOnClick
            >
              <NavLink tertiary>
                Community <Icon icon="arrowdown" />
              </NavLink>
            </WithTooltip>
          </NavItem>
        </>
      }
      github={<StyledGitHubButton type="stargazers" namespace="storybookjs" repo="storybook" />}
      mobileMenu={mobileMenu}
    />
  );
}
