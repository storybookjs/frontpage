import React from 'react';
import PropTypes from 'prop-types';
import { Link as GatsbyLink } from 'gatsby';

const GatsbyLinkWrapper = ({
  href,
  appearance,
  containsIcon,
  disabled,
  inverse,
  isLoading,
  ...props
}) => {
  return <GatsbyLink to={href} {...props} />;
};

GatsbyLinkWrapper.propTypes = {
  href: PropTypes.string.isRequired,
};

export default GatsbyLinkWrapper;
