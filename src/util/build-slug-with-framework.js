module.exports = function docSlugWithFramework(slug, framework) {
  const parts = slug.split('/');
  parts.splice(2, 0, framework);
  return parts.join('/');
};
