var path = require('path');
var webpack = require('webpack');

const CLIENT_DIR = path.resolve(__dirname, 'client');
const DIST_DIR = path.resolve(__dirname, 'dist');

const aliases = {
  components: path.resolve(CLIENT_DIR, '../shared/components'),
  reducers: path.resolve(CLIENT_DIR, '../shared/reducers'),
  actions: path.resolve(CLIENT_DIR, '../shared/actions'),
};

module.exports = {
  entry: [
    './client/index'
  ],
  output: {
    path: DIST_DIR,
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    alias: aliases
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel']
    }]
  }
};
