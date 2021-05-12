import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

const source = path.resolve(__dirname, '..', 'src');
const isProduction = process.env.NODE_ENV === 'production';
const scssCommonLoaders = [
    {
        loader: MiniCssExtractPlugin.loader
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
    entry: [
        './src/index.tsx'
    ],
    module: {
        rules: [
            {
                test: /\.(jpg|jp2|webp|pdf|png|svg|mp3)$/,
                type: 'asset/resource',
                generator: {
                    filename: '[name].[contenthash][ext]'
                }
            },
            {
                test: /\.(ts|js)x?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: isProduction ? [] : ['react-refresh/babel']
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
            favicon: path.resolve(source, 'favicon.ico'),
            chunks: ['main'],
            template: path.resolve(source, 'index.ejs')
        })
    ]
};

export default webpackConfig;
