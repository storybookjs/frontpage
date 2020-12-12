import React from 'react';
import styled from 'styled-components';
import { Icon, Link, styles } from '@storybook/design-system';
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

export const AddonsLearn = () => {
  const { urls } = useSiteMetadata();

  return (
    <div>
      {urls.addonsLearnLinks.map(({ icon, title, href }) => (
        <LearnLink key={title} tertiary href={href}>
          <Icon icon={icon} /> {title}
        </LearnLink>
      ))}
    </div>
  );
};
