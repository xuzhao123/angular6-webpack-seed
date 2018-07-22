const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ngToolsWebpack = require('@ngtools/webpack');

const helpers = require('./helpers');

module.exports = function (options) {
    const isProd = options.env === 'production';

    const angularCompilerPluginOptions = {
        tsConfigPath: helpers.root('src/tsconfig.app.json'),
        entryModule: helpers.root('src/app/app.module#AppModule'),
        skipCodeGeneration: false,
        sourceMap: true
    };

    if (isProd) {
        angularCompilerPluginOptions.hostReplacementPaths = {
            [helpers.root('src/environments/environment.ts')]: helpers.root('src/environments/environment.prod.ts')
        }
    }

    return {
        entry: {
            polyfills: './src/polyfills',
            main: './src/main'
        },
        resolve: {
            extensions: ['.ts', '.js'],
            modules: [helpers.root('src'), helpers.root('node_modules')],
        },
        devServer: {
            historyApiFallback: true
        },
        optimization: {
            runtimeChunk: {
                name: 'runtime'
            },
            splitChunks: {
                cacheGroups: {
                    module: {
                        test: /[\\/]node_modules[\\/]/,
                        test: (module, chunks) => {
                            const moduleName = module.nameForCondition ? module.nameForCondition() : '';
                            return /[\\/]node_modules[\\/]/.test(moduleName)
                                && !chunks.some(({ name }) => name === 'polyfills')
                        },
                        name: "vendors",
                        chunks: "all"
                    },
                    // commons: {
                    //     name: "commons",
                    //     chunks: "all",
                    //     minChunks: 2
                    // },
                    styles: {
                        name: 'styles',
                        test: /.(scss|css)$/,
                        chunks: 'all',
                        minChunks: 1,
                        reuseExistingChunk: true,
                        enforce: true
                    }
                }
            }
        },
        module: {
            rules: [
                {
                    test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
                    use: '@ngtools/webpack',
                    include: [helpers.root('src')]
                },
                {
                    // Mark files inside `@angular/core` as using SystemJS style dynamic imports.
                    // Removing this will cause deprecation warnings to appear.
                    test: /[\/\\]@angular[\/\\]core[\/\\].+\.js$/,
                    parser: { system: true },
                },
                {
                    test: /\.css$/,
                    use: ['to-string-loader', 'css-loader'],
                    include: [helpers.root('src', 'app')]
                },
                {
                    test: /\.scss$/,
                    use: ['to-string-loader', 'css-loader', 'sass-loader'],
                    include: [helpers.root('src', 'app')]
                },
                {
                    test: /\.(scss|sass)$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'sass-loader'
                    ],
                    include: [helpers.root('src', 'styles')]
                },
                {
                    test: /\.(css)$/,
                    use: [
                        'style-loader',
                        'css-loader'
                    ],
                    include: [helpers.root('src', 'styles')]
                },
                {
                    test: /\.html$/,
                    use: 'raw-loader'
                },
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: 'src/index.html'
            }),
            new ngToolsWebpack.AngularCompilerPlugin(angularCompilerPluginOptions)
        ],
    };
};



