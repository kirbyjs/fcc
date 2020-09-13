import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import path from 'path';

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
            postcssOptions: {
                plugins: [autoprefixer()]
            }
        }
    }
];

const webpackConfig: webpack.Configuration = {
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    entry: {
        main: './src/index.js',
        'tribute/index': './src/tribute/index.js',
        'survey-form/index': './src/survey-form/index.js',
        'product-landing/index': './src/product-landing/index.js',
        'tech-docs/index': './src/tech-docs/index.js',
        'random-quote/index': './src/random-quote/index.tsx',
        'markdown-previewer/index': './src/markdown-previewer/index.tsx'
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
                test: /\.(ts|js)x?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: isProduction ? [] : ['react-hot-loader/babel']
                    }
                }
            },
            {
                test: /\.s?css/,
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
        new HtmlWebpackPlugin({
            chunks: ['random-quote/index'],
            filename: 'random-quote/index.html',
            template: path.resolve(source, 'random-quote', 'index.html')
        }),
        new HtmlWebpackPlugin({
            chunks: ['markdown-previewer/index'],
            filename: 'markdown-previewer/index.html',
            template: path.resolve(source, 'markdown-previewer', 'index.html')
        }),
        new CopyPlugin({
            patterns: [{
                from: publicAssetsDirectory
            }]
        })
    ]
};

export default webpackConfig;
