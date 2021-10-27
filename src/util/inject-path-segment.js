module.exports = function injectPathSegment(slug, segment, atIndex) {
  const parts = slug.split('/');
  parts.splice(atIndex, 0, segment);
  return parts.join('/');
};
