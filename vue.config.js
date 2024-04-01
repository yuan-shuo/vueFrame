const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  publicPath: "./",
  transpileDependencies: true,
  // devServer: {
  //   proxy: {
  //     '/API': {
  //       // 域名
  //       target: 'https://api.alcex.cn/API',
  //       // 是否跨域
  //       changeOrigin: true,
  //       // 替换空白
  //       pathRewrite: {
  //         '^/API': ''
  //       }
  //     },
  //   }
  // }
});
