import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import webpackConfig from './common';

const plugins = webpackConfig.plugins || [];

const config: webpack.Configuration = {
    ...webpackConfig,
    mode: 'development',
    output: {
        filename: '[name].js',
        publicPath: '/'
    },
    plugins: [
        ...plugins,
        new webpack.HotModuleReplacementPlugin(),
        new ReactRefreshWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ]
};

export default config;
