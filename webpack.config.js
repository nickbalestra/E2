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
  resolve: {
    extensions: ['.js', '.json', '.elm', '.ts', '*'],
  },

  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'src/static/img/',
        to:   'static/img/',
        ignore: '.gitkeep',
      },
    ]),
    new HtmlWebpackPlugin({
      template: 'src/static/index.html',
      inject: 'body',
      filename: 'index.html'
    }),
  ],

  module: {
    noParse: [/.elm$/],
  },
}

if (TARGET === 'start') {
  module.exports = merge(common, {
    devtool: 'eval-source-map',

    entry: [
      'webpack-hot-middleware/client?reload=true',
      entryPath,
    ],

    output: {
      path: outputPath,
      filename: 'static/js/[name].js',
      publicPath: '',
    },

    module: {
      rules: [
        {
          test:    /\.elm$/,
          exclude: [/elm-stuff/, /node_modules/],
          use: [
            {
              loader: 'elm-hot-loader',
            },
            {
              loader: 'elm-webpack-loader',
              options: {
                verbose: true,
                warn: true,
              },
            },
          ],
        },
        {
          test: /\.(css|scss)$/,
          use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
        },
      ],
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': 'development',
      }),
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
      publicPath: '',
    },

    module: {
      rules: [
        {
          test:    /\.elm$/,
          exclude: [/elm-stuff/, /node_modules/],
          loader:  'elm-webpack-loader'
        },
        {
          test: /\.(css|scss)$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  minimize: true,
                },
              },
              'sass-loader',
              'postcss-loader',
            ],
          }),
        },
      ],
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': 'production'
      }),
      new ExtractTextPlugin({
        filename: 'static/css/[contenthash].css',
        allChunks: true,
      }),
      new webpack.optimize.UglifyJsPlugin(),
    ],
  })
}
