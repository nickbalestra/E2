const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const autoprefixer = require( 'autoprefixer' )
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const merge = require('webpack-merge')
const TARGET = process.env.npm_lifecycle_event
const entryPath = path.join(__dirname, 'src/static/main.js')
const outputPath = path.join(__dirname, '/dist/')

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
        test: /\.json?$/,
        loader: 'json'
      }
    ]
  },

  postcss: [
    autoprefixer({ browsers: ['last 2 versions']})
  ]
}

if (TARGET === 'start') {
  module.exports = merge(common, {
    devtool: 'eval-source-map',

    entry: [
      'webpack-hot-middleware/client?reload=true',
      entryPath
    ],

    output: {
      path: outputPath,
      filename: 'static/js/[name].js',
      publicPath: ''
    },

    module: {
      loaders: [
        {
          test:    /\.elm$/,
          exclude: [/elm-stuff/, /node_modules/],
          loader:  'elm-hot!elm-webpack?verbose=true&warn=true'
        },
        {
          test: /\.(css|scss)$/,
          loaders: ['style', 'css', 'sass', 'postcss']
        }
      ]
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
      entryPath
    ],

    output: {
      path: outputPath,
      filename: 'static/js/[name]-[hash].min.js',
      publicPath: ''
    },

     module: {
      loaders: [
        {
          test:    /\.elm$/,
          exclude: [/elm-stuff/, /node_modules/],
          loader:  'elm-webpack'
        },
        {
          test: /\.(css|scss)$/,
          loader: ExtractTextPlugin.extract(
            'style',
            'css?modules&localIdentName=[name]---[local]---[hash:base64:5]!sass!postcss'
          )
        }
      ]
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
      }),
      new ExtractTextPlugin('static/css/[hash].css', {allChunks: true}),
      new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        compressor: { warnings: false }
        // mangle:  true
      })
    ]
  })
}
