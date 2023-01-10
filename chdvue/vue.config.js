const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  devServer: {
      open: true, // auto open brower 项目启动后自动打开浏览器...
      disableHostCheck: false,
      host: "0.0.0.0",
      port: 8080, // 修改端口号
      https: false,
      hotOnly: false, // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy
      proxy: {     // string | Object 解决跨域问题
          '/api': {
              target: 'http://192.168.124.14:8080/', // 对应自己的 跨域地址 即请求的后端地址
              changeOrigin: true,
              ws: true,
              pathRewrite: {
                  '^/api': ''
              }
          }
      }
  }
};