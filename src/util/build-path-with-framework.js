const { isLatest, versionString } = require('../../site-metadata');

module.exports = function buildPathWithFramework(slug, framework) {
  const parts = slug.split('/');
  parts.splice(2, 0, isLatest ? framework : `${versionString}/${framework}`);
  return parts.join('/');
};
