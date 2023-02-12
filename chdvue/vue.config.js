/*
 * @Date: 2023-01-07 10:18:08
 * @LastEditors: aDong
 * @LastEditTime: 2023-02-12 18:46:48
 * @FilePath: \gD_Design\chdvue\vue.config.js
 */
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  lintOnSave: false,
  devServer: {
      open: true, // auto open brower 项目启动后自动打开浏览器...
      allowedHosts: 'all',
      host: "localhost",
      port: 8080, // 修改端口号
      https: false,
      proxy: {     // string | Object 解决跨域问题
          '/api': {
              target: 'http://localhost:3000', // 对应自己的 跨域地址 即请求的后端地址
              changeOrigin: true,
              ws:true,
              pathRewrite: {
                  '^/api': ''
              }
          }
      },
  }
};