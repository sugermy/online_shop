// const path = require('path');//引入path模块
module.exports = {
  devServer: {
    port: 9527,
    disableHostCheck: true,
    // open: true
    // proxy: {
    //   '/api': {
    //     target: 'http://www.example.org',
    //     changeOrigin: true,
    //     ws: true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // }
  },
  // configureWebpack: config => {

  // }
  // chainWebpack: (config) => {
  //   //set第一个参数：设置的别名，第二个参数：设置的路径
  //   config.resolve.alias.set('@', path.join(__dirname, './src'))
  // }
};
