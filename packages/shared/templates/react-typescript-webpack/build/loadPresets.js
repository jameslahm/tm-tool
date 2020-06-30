/**
 *
 * @param {string[]} presets
 */
module.exports = (presets) => {
  const presetsConfig = presets.map((preset) =>
    require(`./presets/webpack.${preset}`)
  );
  return presetsConfig;
};
