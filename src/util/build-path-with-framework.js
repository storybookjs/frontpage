const injectPathSegment = require('./inject-path-segment');

module.exports = function buildPathWithFramework(slug, framework) {
  const containsVersion = slug.match(/^\/docs\/\d+\.\d+/);
  return injectPathSegment(slug, framework, containsVersion ? 3 : 2);
};
