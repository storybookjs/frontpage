const { isLatest, versionString } = require('./version-data');

module.exports = function buildPathWithFramework(slug, framework, overrideVersion) {
  const version = overrideVersion || (isLatest ? null : versionString);
  const parts = slug.split('/');
  parts.splice(2, 0, version ? `${version}/${framework}` : framework);
  return parts.join('/');
};
