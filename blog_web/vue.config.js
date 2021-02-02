module.exports = {
  transpileDependencies:['axios','element-ui','dayjs','vue-awesome-swiper','vue-particles','highlight.js',
  'v-viewer','swiper','fastclick','vue-lazyload','vue','vue-router','vuex','ssr-window'],
  publicPath: process.env.NODE_ENV === 'production'
    ? '/web/'
    : '/',
  outputDir:'../blog_server/server/web'
  }