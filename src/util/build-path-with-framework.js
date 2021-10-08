function buildPathWithFramework(slug, framework) {
  const parts = slug.split('/');
  parts.splice(2, 0, framework);
  return parts.join('/');
}

function buildPathWithVersionAndFramework(slug, version, framework) {
  const parts = slug.split('/');
  parts.splice(2, 0, `${version}/${framework}`);
  return parts.join('/');
}

module.exports = {
  buildPathWithFramework,
  buildPathWithVersionAndFramework,
};
