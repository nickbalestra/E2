const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require( 'copy-webpack-plugin' )
var merge = require('webpack-merge')
const TARGET = process.env.npm_lifecycle_event

const common = {
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
    }, {
      test: /\.css$/,
      loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]'
    }]
  }
}

if (TARGET === 'start') {
  module.exports = merge(common, {
    devtool: 'eval-source-map',

    entry: [
      'webpack-hot-middleware/client?reload=true',
      path.join(__dirname, 'src/static/index.js')
    ],

    output: {
      path: path.join(__dirname, '/dist/'),
      filename: '[name].js',
      publicPath: '/'
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': 'developement'
      })
    ],
  })
}

if (TARGET === 'build') {
  module.exports = merge(common, {
    entry: [
      path.join(__dirname, 'src/static/index.js')
    ],

    output: {
      path: path.join(__dirname, '/dist/'),
      filename: '[name]-[hash].min.js',
      publicPath: '/'
    },

    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false,
          screw_ie8: true
        }
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': 'production'
      })
    ],

    postcss: [
      require('autoprefixer')
    ]
  })
}
