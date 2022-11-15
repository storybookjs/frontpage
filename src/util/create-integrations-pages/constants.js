const ADDON_FRAGMENT = `
  type: __typename
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
  type: __typename
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
