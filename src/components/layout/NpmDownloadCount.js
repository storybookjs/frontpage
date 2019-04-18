import React from 'react';
import { PropTypes } from 'prop-types';
import { fetch, window } from 'global';
import { useOnMount, useSetState } from 'react-hanger';

import useSiteMetadata from '../lib/useSiteMetadata';
import { Cardinal } from '../basics';

const fetchNpmDownloads = async (npmApiUrls) => {
  const promises = Object.values(npmApiUrls).map(async uri => {
    const response = await fetch(uri);
    const json = await response.json();

    return json.downloads;
  });

  const results = await Promise.all(promises);

  return results.reduce((a, b) => a + b, 0);
};


const NpmDownloadCount = ({ loading, npmDownloads, ...props }) => {
  const { state, setState } = useSetState({ loading: true, npmDownloads: 0 });
  const { urls } = useSiteMetadata();

  let npmDownloadsFixed = parseInt((npmDownloads / 1000).toFixed(0), 10);
  let npmDownloadsDisplay = `${npmDownloadsFixed}k`;
  if (npmDownloadsFixed >= 1000) {
    npmDownloadsFixed = (npmDownloadsFixed / 1000).toFixed(2);
    npmDownloadsDisplay = `${npmDownloadsFixed}m`;
  }

  useOnMount(() => {
    if (!window.sessionStorage.getItem('monthlyNpmDownloads')) {
      fetchNpmDownloads(urls.npmApi).then(npmDownloads => {
        setState({ loading: false, npmDownloads });
        window.sessionStorage.setItem('monthlyNpmDownloads', parseInt(npmDownloads, 10));
      });
    } else {
      setState({
        loading: false,
        npmDownloads: window.sessionStorage.getItem('monthlyNpmDownloads'),
      });
    }
  })

  return (
    <Cardinal
      size="small"
      count={npmDownloadsDisplay}
      text="Installs per month"
      noPlural
      status="secondary"
      countLink={urls.npm}
      loading={loading}
      {...props}
    />
  );
};

NpmDownloadCount.propTypes = {
  loading: PropTypes.bool.isRequired,
  npmDownloads: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default NpmDownloadCount;
