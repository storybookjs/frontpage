const siteMetadata = require('../site-metadata');

const versionData = {
  version: 8.0,
  versionString: '8.0',
  latestVersion: 8.0,
  latestVersionString: '8.0',
  isLatest: true,
};

export default () => ({ ...siteMetadata, ...versionData });
