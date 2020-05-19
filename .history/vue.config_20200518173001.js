const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

process.env.VUE_APP_VERSION = process.env.BUILD_NUMBER || '-'

module.exports = {
  // publicPath: './', // 系统路径
  publicPath: process.env.VUE_APP_BASE_PATH || './',
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // 设置路径别名
      .set('@pages', resolve('src/views/pages')) // 设置路径别名
  },
  devServer: {
    proxy: {
      /*  '/api': {
         target: 'http://hm.prettyvalley.net',
         changeOrigin: true,
         pathRewrite: {
           "^/api": "" // rewrite path
         }
       } */
    },

    open: true,  // 自动打开默认浏览器
    // port: '8888' // 设置默认端口
  },
  // publicPath: process.env.VUE_APP_BASE_PATH || '/', // 系统路径
}
