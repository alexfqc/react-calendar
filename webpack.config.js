const webpack = require('webpack');
const path = require('path');
const SassLintPlugin = require('sasslint-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
  disable: process.env.NODE_ENV === 'development',
});

module.exports = {
  context: path.resolve(__dirname),
  entry: {
    app: './assets/js/components/index',
    a: 'axios',
    d: 'react-dom',
    p: 'prop-types',
    r: 'react',
    re: 'redux',
    ro: 'react-router',
  },
  output: {
    publicPath: '/dist/',
    path: path.resolve('./dist/'),
    filename: '[name].[hash].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        include: path.resolve(__dirname, './assets/js/'),
        exclude: /node_modules/,
        enforce: 'pre',
      },
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, './assets/js/'),
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, './assets/scss/'),
        loader: extractSass.extract({
          use: [
            { loader: 'css-loader' },
            { loader: 'sass-loader' },
          ],
          // use style-loader in development
          fallback: 'style-loader',
        }),
        exclude: /node_modules/,
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file?name=public/fonts/[name].[ext]',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.resolve(__dirname, 'node_modules')],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['a', 'd', 'p', 'r', 're', 'ro', 'manifest'],
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new SassLintPlugin({
      configFile: '.sass-lint.yml',
      context: [path.resolve(__dirname, './assets/scss/')],
      ignoreFiles: [],
      ignorePlugins: [],
      glob: '**/*.s?(a|c)ss',
      quiet: false,
      failOnWarning: false,
      failOnError: true,
      testing: false,
    }),
    extractSass,
    new HtmlWebpackPlugin({
      title: 'Calendar Component',
      template: 'assets/index-template.html',
      minify: {
        collapseWhitespace: process.env.NODE_ENV === 'production',
      },
    }),
  ],
};
