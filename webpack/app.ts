import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import webpack from 'webpack';
import webpackConfig from './common';

const plugins = webpackConfig.plugins || [];
const config: webpack.Configuration = {
    ...webpackConfig,
    mode: 'production',
    optimization: {
        splitChunks: {
            chunks: 'initial'
        },
        minimizer: [new TerserPlugin(), new CssMinimizerPlugin()]
    },
    output: {
        filename: '[name].[chunkhash].js',
        publicPath: '/'
    },
    plugins: [
        ...plugins,
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        })
    ]
};

export default config;
