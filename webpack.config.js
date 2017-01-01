module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: './dist'
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
};
