const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const source = path.resolve(__dirname, '..', 'src');
const publicAssetsDirectory = path.resolve(__dirname, '..', 'assets', 'public');
const isProduction = process.env.NODE_ENV === 'production';
const scssCommonLoaders = [
    {
        loader: MiniCssExtractPlugin.loader,
        options: {
            hmr: !isProduction,
            reloadAll: !isProduction
        }
    },
    {
        loader: 'css-loader',
        options: {
            sourceMap: !isProduction
        }
    },
    {
        loader: 'sass-loader',
        options: { sourceMap: !isProduction }
    },
    {
        loader: 'postcss-loader',
        options: {
            plugins: [autoprefixer()]
        }
    }
];

module.exports = {
    entry: {
        main: './src/index.js',
        'tribute/index': './src/tribute/index.js',
        'survey-form/index': './src/survey-form/index.js',
        'product-landing/index': './src/product-landing/index.js',
        'tech-docs/index': './src/tech-docs/index.js'
    },
    module: {
        rules: [
            {
                test: /\.(jpg|jp2|webp|pdf|png|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[contenthash].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.scss/,
                use: scssCommonLoaders
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            chunks: ['main'],
            template: path.resolve(source, 'index.html')
        }),
        new HtmlWebpackPlugin({
            chunks: ['tribute/index'],
            filename: 'tribute/index.html',
            template: path.resolve(source, 'tribute', 'index.html')
        }),
        new HtmlWebpackPlugin({
            chunks: ['survey-form/index'],
            filename: 'survey-form/index.html',
            template: path.resolve(source, 'survey-form', 'index.html')
        }),
        new HtmlWebpackPlugin({
            chunks: ['product-landing/index'],
            filename: 'product-landing/index.html',
            template: path.resolve(source, 'product-landing', 'index.html')
        }),
        new HtmlWebpackPlugin({
            chunks: ['tech-docs/index'],
            filename: 'tech-docs/index.html',
            template: path.resolve(source, 'tech-docs', 'index.html')
        }),
        new CopyPlugin({
            patterns: [{
                from: publicAssetsDirectory
            }]
        })
    ]
};
