const frameworkStyleMap = {
  html: 'HTML',
  'react-native': 'React Native',
};

export default (framework) =>
  frameworkStyleMap[framework] || `${framework[0].toUpperCase()}${framework.slice(1)}`;
