'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require( 'copy-webpack-plugin' )

module.exports = {
  entry: [
    path.join(__dirname, 'src/static/index.js')
  ],

  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name]-[hash].min.js',
    publicPath: '/'
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new CopyWebpackPlugin([
      {
        from: 'src/static/img/',
        to:   'static/img/'
      }
    ]),
    new HtmlWebpackPlugin({
      template: 'src/static/index.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],

  module: {
    loaders: [
      {
        test:    /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/],
        loader:  'elm-hot!elm-webpack?verbose=true&warn=true'
      },
      {
        test: /\.json?$/,
        loader: 'json'
      }
    ]
  },

  postcss: [
    require('autoprefixer')
  ]
};
