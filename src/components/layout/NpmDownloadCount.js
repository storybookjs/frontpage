import React from 'react';
import { PropTypes } from 'prop-types';
import { compose, lifecycle, withHandlers, withState } from 'recompose';

import { Cardinal, site } from '../basics';
const { url } = site;

const fetchNpmDownloads = async () => {
  const promises = Object.values(url.npmApi).map(async (uri) => {
    const response = await fetch(uri);
    const json = await response.json();

    return json.downloads;
  });

  const results = await Promise.all(promises);

  return results.reduce((a, b) => a + b, 0);
};

const withNpmDownloads = lifecycle({
  state: { loading: true, npmDownloads: 0 },
  componentDidMount() {
    if (!window.sessionStorage.getItem('monthlyNpmDownloads')) {
      fetchNpmDownloads().then((npmDownloads) => {
        this.setState({ loading: false, npmDownloads });
        window.sessionStorage.setItem('monthlyNpmDownloads', parseInt(npmDownloads));
      });
    } else {
      setTimeout(() => {
        this.setState({ loading: false, npmDownloads: window.sessionStorage.getItem('monthlyNpmDownloads') });
      }, 0);
    }
  }
});

export const NpmDownloadCount = ({ loading, npmDownloads, ...props }) => {
  const [namespace, repo] = url.gitHub.repo.match(/github.com\/(.*)\/(.*)$/).slice(1);

  let npmDownloadsFixed = parseInt((npmDownloads / 1000).toFixed(0));
  let npmDownloadsDisplay = `${npmDownloadsFixed}k`;
  if (npmDownloadsFixed >= 1000) {
    npmDownloadsFixed = (npmDownloadsFixed / 1000).toFixed(2);
    npmDownloadsDisplay = `${npmDownloadsFixed}m`;
  }

  return (
    <Cardinal
      size="small"
      count={npmDownloadsDisplay}
      text="Installs per month"
      noPlural
      status="secondary"
      countLink={url.npm}
      loading={loading}
    />
  );
};

NpmDownloadCount.propTypes = {
  loading: PropTypes.bool.isRequired,
  npmDownloads: PropTypes.number.isRequired
};

export default compose(withNpmDownloads)(NpmDownloadCount);
