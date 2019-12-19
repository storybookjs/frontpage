import React, { useEffect } from 'react';
import { fetch, window } from 'global';
import { useSetState } from 'react-hanger';

import useSiteMetadata from '../../lib/useSiteMetadata';
import { Cardinal } from '../basics';

const fetchNpmDownloads = async npmApiUrls => {
  const promises = Object.values(npmApiUrls).map(async uri => {
    const response = await fetch(uri);
    const json = await response.json();

    return json.downloads;
  });

  const results = await Promise.all(promises);

  return results.reduce((a, b) => a + b, 0);
};

const NpmDownloadCount = props => {
  const { state, setState } = useSetState({ loading: true, npmDownloads: 0 });
  const { urls = {} } = useSiteMetadata();
  const { npm, npmApi } = urls;

  let npmDownloadsFixed = parseInt((state.npmDownloads / 1000).toFixed(0), 10);
  let npmDownloadsDisplay = `${npmDownloadsFixed}k`;
  if (npmDownloadsFixed >= 1000) {
    npmDownloadsFixed = (npmDownloadsFixed / 1000).toFixed(2);
    npmDownloadsDisplay = `${npmDownloadsFixed}m`;
  }

  useEffect(() => {
    if (!window.sessionStorage.getItem('monthlyNpmDownloads')) {
      fetchNpmDownloads(npmApi).then(npmDownloadCount => {
        setState({ loading: false, npmDownloads: npmDownloadCount });
        window.sessionStorage.setItem('monthlyNpmDownloads', parseInt(npmDownloadCount, 10));
      });
    } else {
      setState({
        loading: false,
        npmDownloads: window.sessionStorage.getItem('monthlyNpmDownloads'),
      });
    }
  }, []);

  return (
    <Cardinal
      size="small"
      count={npmDownloadsDisplay}
      text="Installs per month"
      noPlural
      status="secondary"
      countLink={npm}
      loading={state.loading}
      {...props}
    />
  );
};

export default NpmDownloadCount;
