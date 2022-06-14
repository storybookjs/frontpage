// Wrapper around react-lazyload that can be short-circuited for testing

import React, { FunctionComponent } from 'react';
import ReactLazyLoad from 'react-lazyload';

const LazyLoad: any = ({ children, ...props }) => {
  if (LazyLoad.disabled) {
    return children;
  }

  return <ReactLazyLoad {...props}>{children}</ReactLazyLoad>;
};

LazyLoad.disabled = false;

export default LazyLoad;
