const { override, fixBabelImports, addLessLoader } = require('customize-cra');
 
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { 
      '@primary-color': '#000000',
      '@primary-1': '#9e9e9e',
      '@primary-2': '#9e9e9e',
      '@font-family': 'Product Sans'
    },
  }),
);