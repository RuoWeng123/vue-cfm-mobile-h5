const path = require('path')

module.exports = {
  lintOnSave: 'error',
  productionSourceMap: false,

  devServer: {
    // NOTE: 若加转发，请同步更新 nginx.conf
    //host:'192.168.43.14',
    proxy: {
      '/api': {
        target: 'http://server.test.haokegenjin.com/',
        changeOrigin: true,
        pathRewrite: {
          '^/': ''
        }
      },
      '/login': {
        target: 'http://server.test.haokegenjin.com/',
        changeOrigin: true,
        pathRewrite: {
          '^/': ''
        }
      }
    }
  },
  chainWebpack: (config) => {
    config.module
      .rule('js')
      .exclude
      .add(path.join(__dirname, 'src', 'lib'))
      .end()

    config.module
      .rule('eslint')
      .exclude
      .add(path.join(__dirname, 'src', 'lib'))
      .end()

    config.resolve.alias
      .set('trust', path.join(__dirname, 'package', 'index.js'))
  }
}
