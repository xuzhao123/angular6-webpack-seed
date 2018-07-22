const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const common = require('./webpack.common');

const helpers = require('./helpers');

module.exports = function (options) {
    return webpackMerge(common(options), {
        mode: 'development',
        output: {
            path: helpers.root('dist'),
            filename: '[name].[hash].js',
            chunkFilename: '[id].[hash].js',
            sourceMapFilename: '[file].map',
        },
        devtool: 'cheap-module-eval-source-map',
        devServer: {
            contentBase: './dist',
            hot: true
        },
        module: {
            rules: [
                {
                    test: /\.(eot|svg|cur)$/,
                    loader: 'file-loader',
                    options: {
                        name: `[name].[chunkhash].[ext]`,
                        limit: 10000
                    }
                },
                {
                    test: /\.(jpg|png|webp|gif|otf|ttf|woff|woff2|ani)$/,
                    loader: 'url-loader',
                    options: {
                        name: `[name][chunkhash].[ext]`,
                        limit: 10000
                    }
                },
            ]
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
        ],
    });
};