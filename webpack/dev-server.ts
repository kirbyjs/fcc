import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import webpackConfig, {projectDirectories} from './common';

const entry = webpackConfig.entry as { [key: string]: string };
const plugins = webpackConfig.plugins || [];

const config: webpack.Configuration = {
    ...webpackConfig,
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        host: 'localhost',
        open: true,
        port: 9020
    },
    entry: projectDirectories.reduce((entries, dir) => ({
        ...entries,
        [`${dir}/index`]: entry[`${dir}/index`]
    }), {}),
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
