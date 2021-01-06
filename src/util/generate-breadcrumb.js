export function generateBreadcrumb(locationState) {
  return locationState?.from?.link
    ? {
        link: locationState.from.link,
        title: `Back to ${locationState.from.title}`,
      }
    : {
        link: '/addons/',
        title: 'View full catalog',
      };
}
