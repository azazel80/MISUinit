const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const glob = require('glob');

module.exports = {
    entry: {
        app: './www/assets/app.js'
    },
    output: {
        path: path.join(__dirname, 'www/dist'),
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true,
                    "presets": [
                        ["env", {
                            "targets": {
                                "browsers": ["last 2 versions", "safari >= 7"]
                            }
                        }]
                    ]
                },
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ]
            },
            {
                test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'url-loader?limit=10000',
            },
            {
                test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
                use: 'file-loader',
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    'file-loader?name=images/[name].[ext]',
                ]
            }
        ]
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: 'www/assets/imgs/',
                to: 'images/',
                test: /\.(jpe?g|png|gif|svg)$/i,
            },
            // {
            //     from: 'www/assets/js/netteForms.js',
            //     to: '../../node_modules/nette-forms/src/assets/netteForms.js',
            //     toType: 'file',
            //     force: true
            // }
        ]),
        new ImageminPlugin({
            disable: process.env.NODE_ENV !== 'production', // Disable during development
            externalImages: {
                context: 'www', // Important! This tells the plugin where to "base" the paths at
                sources: glob.sync('dist/images/**/*'),
                destination: 'dist/images'
            },
            gifsicle: { interlaced: true },
            jpegtran: { progressive: true },
            optipng: { optimizationLevel: 9 },
            svgo: {
                plugins: [
                    {
                        removeDoctype: true
                    },
                    {
                        removeComments: true
                    },
                    {
                        removeXMLProcInst: false
                    },
                    {
                        cleanupNumericValues: {
                            floatPrecision: 2,
                            defaultPx: false
                        }
                    },
                    {
                        convertColors: {
                            names2hex: false,
                            rgb2hex: false
                        }
                    }
                ]
            }
        }),
        new webpack.ProvidePlugin({
            'window.Nette': 'nette-forms',
        }),
        new MiniCssExtractPlugin({
            filename: "[name].bundle.css",
        })
    ]
};