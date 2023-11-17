module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  snapshotFormat: {
    printBasicPrototype: false,
  },
  moduleNameMapper: {
    '^gatsby-core-utils/(.*)$': `gatsby-core-utils/dist/$1`, // Workaround for https://github.com/facebook/jest/issues/9771
    '^gatsby-plugin-utils/(.*)$': [`gatsby-plugin-utils/dist/$1`, `gatsby-plugin-utils/$1`],
    '^gatsby-page-utils/(.*)$': `gatsby-page-utils/dist/$1`,
  },
  testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`],
  transformIgnorePatterns: [`node_modules/(?!(gatsby|gatsby-script|gatsby-link)/)`],
  globals: {
    __PATH_PREFIX__: ``,
  },
};
