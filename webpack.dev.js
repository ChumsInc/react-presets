const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

const localProxy = {
    target: {
        host: 'localhost',
        protocol: 'http:',
        port: 8081
    },
    ignorePath: false,
    changeOrigin: true,
    secure: false,
};

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        allowedHosts: 'auto',
        static: {
            directory: path.join(__dirname, 'public'),
            serveIndex: true,
            watch: false,
        },
        hot: true,
        proxy: {
            '/api': {...localProxy},
        },
        watchFiles: path.join(__dirname, 'src/**/*')
    },
    devtool: 'inline-source-map',
    plugins: []
});
