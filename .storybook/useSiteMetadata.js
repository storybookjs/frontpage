const siteMetadata = require('../site-metadata');

const versionData = {
  version: 6.3,
  versionString: '6.3',
  latestVersion: 6.3,
  latestVersionString: '6.3',
  isLatest: true,
};

export default () => ({ ...siteMetadata, ...versionData });
