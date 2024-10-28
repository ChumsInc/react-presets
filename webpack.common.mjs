import path from 'node:path';
import process from "node:process";

export default {
    entry: './src/index.tsx',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'},
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
    ],
    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 20000,
            minRemainingSize: 0,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            enforceSizeThreshold: 50000,
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/](?!chums.*[\\/])(.*)[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                    priority: -10,
                    reuseExistingChunk: true,
                },
                chums: {
                    test: /[\\/]node_modules[\\/]chums.*[\\/]/,
                    name: 'chums',
                    chunks: 'all',
                    priority: -0,
                    reuseExistingChunk: true,
                },
                default: {
                    minChunks: 2,
                    priority: -10,
                    reuseExistingChunk: true,
                }
            }
        }
    },
    output: {
        path: path.join(process.cwd(), 'public/js'),
        filename: "[name].js",
        sourceMapFilename: '[file].map',
        publicPath: '/',
    },
    target: 'web',
}
