const debug = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'public');
const CLIENT_DIR = path.resolve(__dirname, 'client');

module.exports = {
    entry: `${CLIENT_DIR}/Index.jsx`,
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    watch: true,
    module: {
        rules: [{
            test: /\.jsx?/,
            include: CLIENT_DIR,
            exclude: [/node_modules/],
            use: {
                loader: 'babel-loader'

            }
        },
        {
            test: /\.scss?/,
            include: CLIENT_DIR,
            exclude: [/node_modules/],
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader']
            })

        },
        { test: /\.jpg|png|gif|svg$/, loader: 'file' },
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
        new ExtractTextPlugin('style.css'),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new CopyWebpackPlugin([{ from: `${CLIENT_DIR}/static` }]),
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new CopyWebpackPlugin([
            { from: CLIENT_DIR + '/assets', to: 'assets' },
        ]),
    ]
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = false
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                pure_funcs: ['console.log', 'window.console.log.apply']
            },
            mangle: false
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new CompressionPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.js$|\.html$/,
            threshold: 10240,
            minRatio: 0
        })
    ]);
}
