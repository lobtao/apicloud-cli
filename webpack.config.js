'use strict';
var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var nodeModules = {};

fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

const debug = process.argv.indexOf('-d') !== -1
let plugins = [
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
        },
        output: {
            comments: false,
        },
    }),
    new webpack.BannerPlugin('#!/usr/bin/env node',
                           { raw: true, entryOnly: false })
  ]

if(debug){
  plugins = [
      new webpack.optimize.UglifyJsPlugin({
          compress: {
              warnings: false,
          },
          output: {
              comments: false,
          },
      }),
      new webpack.BannerPlugin('require("source-map-support").install();',
                           { raw: true, entryOnly: false }),
      new webpack.BannerPlugin('#!/usr/bin/env node',
                             { raw: true, entryOnly: false })
    ]
}


module.exports = {
    entry:{
      cli: "./src/cli.js",
    },
    target: 'node',
    node: {
      __dirname: false,
      __filename: false,
    },
    externals: nodeModules,
    output: {
        path: `./lib`,
        filename: "[name].js",
        libraryTarget: "umd",
    },
    module: {
      loaders: [
        { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
        { test: /\.json$/, exclude: /node_modules/, loader: "json-loader" },
      ]
    },
    plugins: plugins
};
