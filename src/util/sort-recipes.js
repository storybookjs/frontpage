/**
 *
 * @param {*} recipes List of recipes
 * @returns A list of recipes sorted by weeklyViews descending
 */
export function sortRecipes(recipes) {
  return recipes.sort((a, b) => {
    const aValue = a.weeklyViews;
    const bValue = b.weeklyViews;
    return bValue - aValue;
  });
}
