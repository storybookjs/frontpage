import React, { Fragment, HTMLAttributes } from 'react';
import styled from '@emotion/styled';
import { Link as GatsbyLink } from 'gatsby';

const SideNavigationLink = styled(
  ({ children, to, ...props }: { to: string } & HTMLAttributes<HTMLAnchorElement>) => {
    return (
      <GatsbyLink to={to} {...props} activeStyle={{ textDecoration: 'underline' }}>
        {children}
      </GatsbyLink>
    );
  }
)(
  {
    color: '#666666',
    display: 'block',
    marginBottom: '0.75rem',
    fontSize: '14px',
    lineHeight: '20px',
    textDecoration: 'none',
  },
  {
    '&:hover': {
      cursor: 'pointer',
      transform: 'translateY(-1px)',
      color: '#333333',
    },
  }
);

interface SideNavigationItem {
  title: string;
  to: string;
}
export type SideNavigationGroup = Record<string, Record<string, SideNavigationItem>>;

const SideNavigationTitle = styled.header({
  display: 'block',
  fontSize: '12px',
  color: '#999999',
  letterSpacing: '0.35em',
  textTransform: 'uppercase',
  fontWeight: 900,
  lineHeight: '20px',
  marginBottom: '1rem',
});

export const SideNavigation = ({ groups }: { groups: SideNavigationGroup }) => {
  return (
    <Fragment>
      {Object.entries(groups).map(([groupTitle, groupChildren], index, l) => (
        <Fragment key={groupTitle}>
          <nav key={groupTitle}>
            <SideNavigationTitle>{groupTitle}</SideNavigationTitle>
            {Object.entries(groupChildren).map(([key, link]) => (
              <SideNavigationLink key={key} to={link.to}>
                {link.title}
              </SideNavigationLink>
            ))}
          </nav>
          {index !== l.length - 1 ? <hr /> : null}
        </Fragment>
      ))}
    </Fragment>
  );
};

SideNavigation.Title = SideNavigationTitle;
SideNavigation.Link = SideNavigationLink;
