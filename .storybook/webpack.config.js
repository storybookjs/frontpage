module.exports = {
  module: {
    rules: [
      {
        test: /gatsby\/cache-dir.*\.js$/,
        loader: require.resolve('babel-loader'),
      },
    ],
  },
}
