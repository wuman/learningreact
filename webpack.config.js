module.exports = {
  entry: ['./app.js'],
  output: {
    filename: 'bundle.js',
  },
  module: {
    preLoaders: [{
      test: [/\.js$/, /\.jsx$/],
      exclude: /node_modules/,
      loader: 'eslint-loader',
    }],
    loaders: [{
      test: [/\.js$/, /\.jsx$/],
      exclude: /node_modules/,
      loader: 'babel',
    }],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};
