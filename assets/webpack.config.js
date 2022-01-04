const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')

module.exports = {
    mode: 'development',
    experiments: {
        asyncWebAssembly: true,
    },
    entry: {
        script: './src/main.js',
        style: './src/main.css',
        notification: './src/notification.js',
        delegation: './src/delegation.js',
        payment: './src/payment.js',
        split: './src/split.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]-[fullhash].js',
    },
    module: {
        exprContextCritical: false,
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]-[fullhash].css',
        }),
        new CleanWebpackPlugin(),
        new WebpackManifestPlugin({
            publicPath: '',
        }),
    ],
    stats: {
        errorDetails: true,
    },
}
