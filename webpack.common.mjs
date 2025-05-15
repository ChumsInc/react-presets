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
        alias: {
            "@/api": path.resolve(process.cwd(), 'src/api'),
            "@/app": path.resolve(process.cwd(), 'src/app'),
            "@/components": path.resolve(process.cwd(), 'src/components'),
            "@/ducks": path.resolve(process.cwd(), 'src/ducks'),
            "@/hooks": path.resolve(process.cwd(), 'src/hooks'),
            "@/slices": path.resolve(process.cwd(), 'src/slices'),
            "@/src": path.resolve(process.cwd(), 'src'),
            "@/types": path.resolve(process.cwd(), 'src/types'),
            "@/utils": path.resolve(process.cwd(), 'src/utils'),
        },
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
                react: {
                    test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                    name: 'vendors-react',
                    chunks: 'all',
                    priority: 10,
                },
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                    priority: 0,
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
