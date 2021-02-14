module.exports = {
  presets: [
    [
      '@babel/env',
      {
        bugfixes: true,
        modules: false,
      },
    ],
    '@babel/react',
    '@babel/typescript',
  ],
  plugins: [
    'styled-jsx/babel',
    ['@babel/plugin-proposal-object-rest-spread', { loose: true }],
    ['@babel/plugin-transform-runtime', { useESModules: true }],
  ],
  ignore: [/@babel[\\|/]runtime/],
}
