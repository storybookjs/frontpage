export const INTEGRATION_TYPES = {
  RECIPE: 'recipe',
  ADDON: 'addon',
};

const cleanIntegrationType = (type) => type.replace('INTEGRATION_', '').toLowerCase();

const isAddon = ({ type }) => cleanIntegrationType(type) === INTEGRATION_TYPES.ADDON;
const isRecipe = ({ type }) => cleanIntegrationType(type) === INTEGRATION_TYPES.RECIPE;

export const IntegrationItem = {
  isAddon,
  isRecipe,
};
