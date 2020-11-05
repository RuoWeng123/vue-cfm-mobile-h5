const path = require('path')

module.exports = {
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
      'trust': path.join(__dirname, 'package', 'index.js')
    }
  }
}
