const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')

module.exports = {
    mode: 'production',
    experiments: {
        asyncWebAssembly: true,
    },
    externals: {
        alpinejs: 'Alpine',
    },
    entry: {
        script: './src/main.js',
        style: './src/main.css',
        notification: {
            import: './src/notification.js',
            dependOn: 'script',
        },
        delegation: {
            import: './src/delegation.js',
            dependOn: 'script',
        },
        payment: {
            import: './src/payment.js',
            dependOn: 'script',
        },
        split: {
            import: './src/split.js',
            dependOn: 'script',
        },
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
