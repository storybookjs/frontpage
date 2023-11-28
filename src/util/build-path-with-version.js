const { isLatest, versionString } = require('./version-data');

module.exports = function buildPathWithVersion(slug, overrideVersion) {
  const version = overrideVersion || (isLatest ? null : versionString);
  const parts = slug.split('/');
  if (version) {
    parts.splice(2, 0, version);
  }
  return parts.join('/');
};
