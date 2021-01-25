module.exports = function buildTagLinks(tags) {
  return tags.map((tag) => ({
    name: tag.icon ? `${tag.icon} ${tag.displayName}` : tag.displayName,
    link: `/addons/tag/${tag.name}`,
  }));
};
