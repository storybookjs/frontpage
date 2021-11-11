const { versionString, latestVersionString } = require('../../site-metadata');

module.exports = function buildPathWithFramework(slug, framework, overrideVersion) {
  const version = overrideVersion || versionString;
  const parts = slug.split('/');
  parts.splice(2, 0, version === latestVersionString ? framework : `${version}/${framework}`);
  return parts.join('/');
};
