/* eslint-disable @typescript-eslint/no-unused-vars */
const path = require('path');
const WorkboxPlugin = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = (mode) => {
  return {
    output: {
      chunkFilename: '[name].[contenthash].js',
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, '../dist'),
      publicPath: '/',
    },
    plugins: [
      new WebpackPwaManifest({
        name: 'Pet Adopt!',
        short_name: 'Pet Adopt',
        description: 'Adopt Pet to save them',
        background_color: '#ffffff',
        icons: [
          {
            src: path.resolve(__dirname, '../src/assets/icon.png'),
            sizes: [96, 128, 192, 256, 384, 512],
          },
        ],
      }),
      new WorkboxPlugin.GenerateSW({
        swDest: 'service-worker.js',
        clientsClaim: true,
        skipWaiting: true,
      }),
    ],
  };
};
