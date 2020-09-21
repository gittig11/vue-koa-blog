module.exports = {
  //是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: true,
  publicPath:'./',
  productionSourceMap: false,
  devServer: {
    open: true, //是否自动弹出浏览器页面
    host: "localhost", 
    port: '5001',
    https: false,
    hotOnly: false, 
    proxy: {
      '/api': {
        target: 'https://www.yuque.com/api',
        ws: true,  //代理websockets
        changeOrigin: true, // 虚拟的站点需要更管origin
        pathRewrite: {
          '^/api': ''
        }
      }
    },
  },
  chainWebpack: config => {
    // 添加别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
  }
}
