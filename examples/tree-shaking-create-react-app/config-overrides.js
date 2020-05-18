const { override, fixBabelImports } = require('customize-cra');
 module.exports = override(
   fixBabelImports('@zeit-ui/react', {
     libraryDirectory: 'esm',
   }),
 );
