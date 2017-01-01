const glob = require('glob');

module.exports = {
  entry: glob.sync('./test/**/*.ts'),
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs',
    path: './test/dist'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ]
  },
  resolve: {
    modules: [
      'node_modules',
      './src'
    ],
    extensions: ['.ts', '.js']
  },
  externals: ['ava']
};
