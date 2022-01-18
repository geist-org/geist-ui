const { override, fixBabelImports } = require('customize-cra')
module.exports = override(
  fixBabelImports('@geist-ui/core', {
    libraryDirectory: 'esm',
  }),
)
