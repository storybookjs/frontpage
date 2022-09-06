import React from 'react';
import useSiteMetadata from '../lib/useSiteMetadata';
import { Stat } from '../basics/Stat';

export const NpmDownloadCount = ({ downloads, ...props }) => {
  const { urls = {} } = useSiteMetadata();
  const { npm } = urls;

  let npmDownloadsFixed = parseInt((downloads / 1000).toFixed(0), 10);
  let npmDownloadsDisplay = `${npmDownloadsFixed}k`;
  if (npmDownloadsFixed >= 1000) {
    npmDownloadsFixed = (npmDownloadsFixed / 1000).toFixed(2);
    npmDownloadsDisplay = `${npmDownloadsFixed}m`;
  }

  return (
    <Stat
      count={npmDownloadsDisplay}
      text="Installs per month"
      noPlural
      countLink={npm}
      {...props}
    />
  );
};
