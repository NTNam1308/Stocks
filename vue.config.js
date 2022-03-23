const webpack = require('webpack');
module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  productionSourceMap: false,
  configureWebpack: {
    //Necessary to run npm link https://webpack.js.org/configuration/resolve/#resolve-symlinks
    resolve: {
       symlinks: false
    },
    plugins: [
      // register Quill globally (source: https://www.vue2editor.com/examples/#how-to-use-custom-quill-modules)
      new webpack.ProvidePlugin({
          'window.Quill': 'quill/dist/quill.js',
          Quill: 'quill/dist/quill.js'
      })
   ],
  }
}
