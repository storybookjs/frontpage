import React from 'react';
import PropTypes from 'prop-types';
import { Badge, OutlineCTA } from '@storybook/design-system';
import GatsbyLink from '../../basics/GatsbyLink';
import useSiteMetadata from '../../lib/useSiteMetadata';

export function BlogCTA({ slug, title, ...rest }) {
  const { urls = {} } = useSiteMetadata();
  const { blog } = urls;
  return (
    <OutlineCTA
      action={
        <GatsbyLink to={`${blog}/${slug}`} withArrow>
          Read more
        </GatsbyLink>
      }
      badge={<Badge status="positive">New</Badge>}
      {...rest}
    >
      {title}
    </OutlineCTA>
  );
}

BlogCTA.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
