const weights = {
  official: 1.2,
  integrators: 1.1,
  community: 1,
};

export function sortAddons(addons) {
  return addons.sort((a, b) => {
    const aValue = a.weeklyDownloads * weights[a.verified || 'community'];
    const bValue = b.weeklyDownloads * weights[b.verified || 'community'];
    return bValue - aValue;
  });
}
