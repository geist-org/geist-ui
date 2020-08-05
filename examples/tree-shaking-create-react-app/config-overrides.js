const { override, fixBabelImports } = require('customize-cra')
module.exports = override(
  fixBabelImports('@cfxjs/react-ui', {
    libraryDirectory: 'esm',
  }),
)
