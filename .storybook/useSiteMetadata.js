const siteMetadata = require('../site-metadata.js');
const versionData = require('../src/util/version-data.js');

export default () => ({ ...siteMetadata, ...versionData });
