import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import useSiteMetadata from '../lib/useSiteMetadata';
import { Stat } from '../basics/Stat';

export const NpmDownloadCount = (props) => {
  const { urls = {} } = useSiteMetadata();
  const { npm } = urls;
  const {
    dxData: { npmDownloads },
  } = useStaticQuery(graphql`
    query {
      dxData {
        npmDownloads
      }
    }
  `);

  let npmDownloadsFixed = parseInt((npmDownloads / 1000).toFixed(0), 10);
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
