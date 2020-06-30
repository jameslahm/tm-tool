const webpackMerge = require('webpack-merge');

module.exports = ({ mode, presets = [] }) => {
  process.env.NODE_ENV = mode;
  if (!Array.isArray(presets)) {
    presets = [presets];
  }
  const base = require('./build/webpack.base.js');
  const modeConfig = require(`./build/webpack.${mode}.js`);
  const presetsConfig = require(`./build/loadPresets`);

  return webpackMerge(base(mode), modeConfig(mode), ...presetsConfig(presets));
};
