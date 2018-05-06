"use strict"

const path = require('path');
module.exports = {
  entry: './main',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist'
  },
  module: {
    rules: [{
      test: /\.(ts|js)?$/,
      exclude: /node_modules/,
      loader: 'ts-loader'
    }]
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  devtool: 'inline-source-map',
  devServer: {
    publicPath: '/dist',
  },
  mode: "development"
};