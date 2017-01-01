module.exports = {
  entry: './src/monapt.ts',
  output: {
    filename: 'monapt.js',
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
