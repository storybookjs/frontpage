import React from 'react';
import { styled } from '@storybook/theming';
import { Icon, Link, styles } from '@storybook/design-system';
import { Link as GatsbyLink } from 'gatsby';
import useSiteMetadata from '../../lib/useSiteMetadata';

const { spacing, typography } = styles;

const LearnLink = styled(Link)`
  font-size: ${typography.size.s2}px;
  line-height: ${typography.size.m1}px;
  display: block;

  &:not(:last-child) {
    margin-bottom: ${spacing.padding.small}px;
  }
`;

export const IntegrationsLearnLinks = () => {
  const { urls = {} } = useSiteMetadata();

  return (
    <div>
      {urls.addonsLearnLinks.map(({ icon, title, to }) => (
        <LearnLink key={title} tertiary to={to} LinkWrapper={GatsbyLink}>
          <Icon icon={icon} /> {title}
        </LearnLink>
      ))}
    </div>
  );
};
