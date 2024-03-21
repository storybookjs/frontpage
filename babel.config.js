module.exports = {
  presets: [
    '@babel/preset-react',
    [
      'babel-preset-gatsby',
      {
        targets: {
          browsers: ['>0.25%', 'not dead'],
        },
      },
    ],
    [
      '@babel/preset-env',
      {
        shippedProposals: true,
        loose: false,
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    '@babel/plugin-proposal-private-property-in-object',
    '@babel/plugin-proposal-private-methods',
    '@babel/plugin-proposal-class-properties',
    [
      '@emotion',
      {
        importMap: {
          '@storybook/theming': {
            styled: { canonicalImport: ['@emotion/styled', 'default'] },
            css: { canonicalImport: ['@emotion/react', 'css'] },
            Global: { canonicalImport: ['@emotion/react', 'Global'] },
          },
        },
      },
    ],
  ],
};
