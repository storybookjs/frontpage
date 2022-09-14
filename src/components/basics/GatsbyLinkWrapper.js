import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Link as GatsbyLink } from 'gatsby';

const GatsbyLinkWrapper = forwardRef(
  ({ href, appearance, containsIcon, disabled, inverse, isLoading, ...props }, ref) => {
    return <GatsbyLink to={href} ref={ref} {...props} />;
  }
);

GatsbyLinkWrapper.propTypes = {
  href: PropTypes.string.isRequired,
};

export default GatsbyLinkWrapper;
