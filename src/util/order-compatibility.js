const coreFrameworks = {
  react: 1,
  vue: 2,
  angular: 3,
};

const getOrder = (name) => coreFrameworks[name] || 4;

export function orderCompatibility(compatibility) {
  if (!compatibility) {
    return [];
  }

  return compatibility.sort((a, b) => getOrder(a.name) - getOrder(b.name));
}
