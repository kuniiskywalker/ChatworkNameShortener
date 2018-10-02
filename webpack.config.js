var webpack = require("webpack");
var path = require("path");

var nodeModulesPath = path.join(__dirname, 'node_modules');

module.exports = {
    resolve: {
        extensions: ['.js'],
        modules: [
            '/',
            nodeModulesPath
        ]
    },
    entry: './src/App.js',
    output: {
        filename: './lib/bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js/,
                exclude: /node_modules|test/,
                loader: "babel-loader", // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};
