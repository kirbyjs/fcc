import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import path from 'path';

export const projectDirectories = [
    'tribute',
    'survey-form',
    'product-landing',
    'tech-docs',
    'random-quote',
    'markdown-previewer',
    'drum-machine',
    'calculator',
    'pomodoro'
];

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
        ...projectDirectories.reduce((entries, dir) => ({
            ...entries,
            [`${dir}/index`]: `./src/${dir}/index`
        }), {})
    },
    module: {
        rules: [
            {
                test: /\.(jpg|jp2|webp|pdf|png|svg|mp3)$/,
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
            chunks: ['main'],
            template: path.resolve(source, 'index.html')
        }),
        ...projectDirectories.map((dir) =>
            new HtmlWebpackPlugin({
                chunks: [`${dir}/index`],
                filename: `${dir}/index.html`,
                template: path.resolve(source, dir, 'index.html')
            })
        ),
        new CopyPlugin({
            patterns: [{
                from: publicAssetsDirectory
            }]
        })
    ]
};

export default webpackConfig;
