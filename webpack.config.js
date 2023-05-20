/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'eval-cheap-module-source-map',
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    devServer: {
        static: {
            directory: path.join(__dirname, './dist')
        },
        client: {
            overlay: {
                errors: true,
                warnings: false
            }
        },
        historyApiFallback: true,
        allowedHosts: 'all',
        compress: true,
        port: 3012
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                { from: './index.html', to: './index.html' },
                { from: './assets', to: './assets' }
            ]
        })
    ]
};
