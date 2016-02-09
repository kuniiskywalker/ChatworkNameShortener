var webpack = require("webpack");
var path = require("path");

var nodeModulesPath = path.join(__dirname, 'node_modules');
var bowerComponentsPath = path.join(__dirname, 'bower_components');

module.exports = {
    resolve: {
        output: {
            filename: "[name].js",
            sourceMapFilename: 'map/[file].map'
        },
        extensions: ['.js', ''],
        root: [
            '/',
            nodeModulesPath,
            bowerComponentsPath
        ],
        modulesDirectories: [
            'bower_components',
            'node_modules'
        ]
    },
    entry: './src/App.js',
    output: {
        filename: './lib/bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js/,
                exclude: /node_modules|bower_components|test/,
                loader: "babel", // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};
