const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  devtool: 'eval-source-map',
  entry: './src/index.jsx',
  output: {
    path: './dist/js/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /(node_modules|bower_components)/,
      query: {
        presets: ['es2015', 'react']
      }

    }, {
      test: /\.css$/, // Only .css files
      loader: 'style!css' // Run both loaders
    },
    // LESS
    {
      test: /\.less$/,
      loader: 'style!css!less'
    },

    // SASS
    {
      test: /\.scss$/,
      loader: 'style!css!sass'
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url?limit=25000'
    },

    // Needed for the css-loader if you're using bootstrap-webpack(https://github.com/bline/bootstrap-webpack)
    // loads bootstrap's css.
    {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff"},
    {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff"},
    {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"},
    {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
    {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"}
  ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My test App',
      filename: 'index.html',
      template: 'index.html'
    })
  ]
};