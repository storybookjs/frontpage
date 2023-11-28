const rendererStyleMap = {
  html: 'HTML',
  'react-native': 'React Native',
  'web-components': 'Web Components',
};

export default (renderer) =>
  rendererStyleMap[renderer] || `${renderer[0].toUpperCase()}${renderer.slice(1)}`;
