const ADDON_FRAGMENT = `
  id: name
  name
  displayName
  description
  icon
  authors {
    id: username
    avatarUrl: gravatarUrl
    name: username
  }
  weeklyDownloads
  appearance: verified
  verifiedCreator`;

const RECIPE_FRAGMENT = `
  id: name
  name
  displayName
  description
  icon
  authors {
    id: username
    avatarUrl: gravatarUrl
    name: username
  }
  weeklyViews
`;

module.exports = {
  ADDON_FRAGMENT,
  RECIPE_FRAGMENT,
};
