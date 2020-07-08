import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { global } from '@storybook/design-system';

import ReleaseNotFound from '../../../components/screens/ReleasesScreen/ReleaseNotFound';

const { GlobalStyle } = global;

function Releases404({ location }) {
  const parts = location.pathname.split('/');
  const version = parts[3];

  return (
    <Fragment>
      <GlobalStyle />
      <ReleaseNotFound version={version} />
    </Fragment>
  );
}

Releases404.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default Releases404;
