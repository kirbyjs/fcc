const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpackConfig = require('./common');

const source = path.resolve(__dirname, '..', '..', 'src');

module.exports = {
    ...webpackConfig,
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        contentBase: [source],
        watchContentBase: true,
        open: true,
        port: 9020
    },
    output: {
        filename: '[name].js',
        publicPath: '/'
    },
    plugins: [
        ...webpackConfig.plugins,
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ]
};
