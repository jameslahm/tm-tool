module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV);
  const isTest = api.env('test');
  return {
    presets: [
      [
        '@babel/preset-env',
        Object.assign(
          {
            modules: false,
          },
          isTest ? { modules: 'commonjs', targets: { node: 'current' } } : {}
        ),
      ],
      '@babel/preset-react',
      '@emotion/babel-preset-css-prop',
      '@babel/preset-typescript',
    ],
    plugins: ['@babel/plugin-transform-runtime'].concat(
      process.env.NODE_ENV === 'development' ? ['react-refresh/babel'] : []
    ),
  };
};
