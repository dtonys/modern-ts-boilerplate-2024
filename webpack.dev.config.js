const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ReactRefreshBabelPlugin = require('react-refresh/babel');

module.exports = {
  mode: 'development',
  entry: {
    bundle: path.resolve(__dirname, 'src/client/entry.ts'),
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js',
    clean: true,
    assetModuleFilename: '[name][ext]',
  },
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'public'),
    },
    port: 8080,
    open: false,
    hot: true,
    compress: true,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:3000',
    },
    client: {
      overlay: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|jsx|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [ReactRefreshBabelPlugin],
          },
        },
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
      {
        test: /\.scss$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'fast-sass-loader' }],
      },
      // Images: Copy image files to build folder
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      // Fonts and SVGs: Inline files
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      templateParameters: {
        title: 'Web Boilerplate 2024',
        foo: 'bar',
      },
      filename: 'index.html',
      template: 'src/client/index.ejs',
    }),
    new ReactRefreshWebpackPlugin(),
  ],
  resolve: {
    alias: {
      client: path.resolve(__dirname, 'src/client'),
    },
  },
};
