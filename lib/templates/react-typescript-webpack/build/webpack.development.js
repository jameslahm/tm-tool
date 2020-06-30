const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
module.exports = (mode) => {
  return {
    devtool: 'cheap-source-map',
    output: {
      chunkFilename: '[name].chunk.js',
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, '../dist'),
      publicPath: '/',
    },
    devServer: {
      hot: true,
      contentBase: 'dist',
      historyApiFallback: true,
    },
    plugins: [new ReactRefreshWebpackPlugin()],
  };
};
