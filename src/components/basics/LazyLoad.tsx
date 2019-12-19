// Wrapper around react-lazyload that can be short-circuited for testing

import React from 'react';
import ReactLazyLoad from 'react-lazyload';

const LazyLoad = ({ children, ...props }) => {
  if (LazyLoad.disabled) {
    return children;
  }

  return <ReactLazyLoad {...props}>{children}</ReactLazyLoad>;
};

LazyLoad.disabled = false;

export default LazyLoad;
