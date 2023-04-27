const frameworkStyleMap = {
  html: 'HTML',
  'react-native': 'React Native',
  'web-components': 'Web Components',
};

export default (framework) =>
  frameworkStyleMap[framework] || `${framework[0].toUpperCase()}${framework.slice(1)}`;
