module.exports = {
  root: true,
  extends: ['@storybook/eslint-config-storybook'],
  rules: {
    'import/extensions': [
      'error',
      'never',
      { ignorePackages: true, md: 'always', svg: 'always', json: 'always', tag: 'always' },
    ],
    'import/no-unresolved': ['error', { ignore: ['@storybook'] }],
    'react/state-in-constructor': 'off',
    'react/static-property-placement': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-fragments': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/no-object-literal-type-assertion': 'off',
    'react/sort-comp': [
      'error',
      {
        order: [
          'staticLifecycle',
          'static-methods',
          'instance-variables',
          'lifecycle',
          '/^on.+$/',
          '/^(get|set)(?!(DerivedStateFromProps|SnapshotBeforeUpdate$)).+$/',
          'instance-methods',
          'instance-variables',
          'everything-else',
          'render',
        ],
        groups: {
          staticLifecycle: ['displayName', 'propTypes', 'defaultProps', 'getDerivedStateFromProps'],
        },
      },
    ],
    'max-classes-per-file': 'off',
  },
};
