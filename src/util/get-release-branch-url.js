module.exports = function getReleaseBranchUrl(version) {
  const branch = `release-${version.replace('.', '-')}`;
  return `https://${branch}--storybook-frontpage.netlify.app`;
};
