/* eslint-env browser */
exports.onRouteUpdate = ({ location }) => {
  if (location.pathname.match(/iframe/) || !window.analytics || !process.env.SEGMENT_WRITE_KEY)
    return;

  // Segment removes the load function when it has been called already
  if (window.analytics.load) {
    window.analytics.load(process.env.SEGMENT_WRITE_KEY);
  }

  window.analytics.page();
};
