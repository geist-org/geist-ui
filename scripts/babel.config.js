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
    [
      'transform-rename-import',
      {
        replacements: [
          { original: 'styled-jsx/style', replacement: '../styled-jsx.es.js' },
          { original: 'styled-jsx/server', replacement: '../styled-jsx-server.es.js' },
        ],
      },
    ],
  ],

  ignore: [/@babel[\\|/]runtime/],
}
