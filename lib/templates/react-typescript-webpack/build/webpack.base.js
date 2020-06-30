const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = (mode) => {
  process.env.NODE_ENV = mode;
  return {
    mode,
    entry: './src/App.tsx',
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.css$/,
          loader: [
            'style-loader',
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader',
          ],
        },
        {
          test: /\.{jpeg,jpg,png,bmp,svg}/,
          loader: 'url-loader',
          options: {
            limit: 5000,
          },
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.PET_MOCK': JSON.stringify('nomock'),
      }),
      new HtmlWebpackPlugin({
        template: 'public/index.html',
        filename: 'index.html',
      }),
      new CleanWebpackPlugin(),
    ],
  };
};
