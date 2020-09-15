import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import webpackConfig, {projectDirectories} from './common';

const source = path.resolve(__dirname, '..', '..', 'src');
const entry = webpackConfig.entry as webpack.Entry;
const plugins: webpack.Plugin[] = webpackConfig.plugins || [];

const config: webpack.Configuration = {
    ...webpackConfig,
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        contentBase: [source],
        watchContentBase: true,
        open: true,
        port: 9020
    },
    entry: projectDirectories.reduce((entries, dir) => ({
        ...entries,
        [`${dir}/index`]: [
            'react-hot-loader/babel',
            entry[`${dir}/index`]
        ]
    }), {}),
    output: {
        filename: '[name].js',
        publicPath: '/'
    },
    plugins: [
        ...plugins,
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ]
};

export default config;
