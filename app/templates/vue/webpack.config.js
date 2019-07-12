var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CompressionPlugin = require('compression-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
var BUILD_DIR = path.resolve(__dirname, 'public')
var APP_DIR = path.resolve(__dirname, 'client')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
  entry: {
    'polyfills': '@babel/polyfill',
    'main': './client/main.js'

  },

  resolve: {
    extensions: ['.vue', '.js', '.scss']
  },

  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
      include: [ APP_DIR ]

    },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [ APP_DIR ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: [/.css$|.scss$/],
        use: [
          'vue-style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'

        ]
      },
      { test: /\.jpg|png|gif|svg$/, loader: 'file-loader' },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|otf)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      }

    ]
  },

  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'stylesheet.css'

    }),
    new CopyWebpackPlugin([{ from: path.resolve(__dirname, 'client/assets') }]),

    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ],

  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  optimization: {}
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = false
  module.exports.optimization = {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          sourceMap: true,
          compress: {
            pure_funcs: ['console.log', 'window.console.log.apply']
          },
          warnings: false
        }

      })
    ]
  }
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.optimize.AggressiveMergingPlugin(),
    new CompressionPlugin()
  ])
}
