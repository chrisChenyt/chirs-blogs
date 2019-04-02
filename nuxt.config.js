const webpack = require('webpack')
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'blogs-ssr',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: '/js/qrcode.min.js' },
      // { src: '/js/jquery-1.8.3.min.js' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    '~assets/css/style.less',
    {
      src: 'assets/css/style.less',
      lang: 'less'
    },
    { src: "swiper/dist/css/swiper.css" }
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },

  plugins: [
    { src: '~assets/js/prism.js', ssr: false },
    '~plugins/filters.js',
    '~plugins/route',
    { src: '~plugins/element-ui', ssr: true },
    { src: "~/plugins/vue-swiper.js", ssr: false },
  ],
  loader:[
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        extractCSS: process.env.NODE_ENV === 'production',
        preserveWhitespace: false
      }
    },
    {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    },
    {
      test:/\.less$/,
      loaders:'style-loader!css-loader!less-loader'
    }
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  proxy: [
    [
      '/api',{
        target: 'http://localhost:8888',
        changeOrigin: true
      }
    ],
    [
      '/blog',{
        target: 'http://localhost:8888',
        changeOrigin: true
      }
    ]
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      // if (isDev && isClient) {
      //   config.module.rules.push({
      //     enforce: 'pre',
      //     test: /\.(js|vue)$/,
      //     loader: 'eslint-loader',
      //     exclude: /(node_modules)/
      //   })
      // }
    },
    vender: [
      'axios',
      'element-ui'
    ]
    ,plugins: [
      new webpack.ProvidePlugin({
        '$': 'jquery'
      })
    ],
    babel:{
      "plugins": [
        [
          "component",
          {
            "libraryName": "element-ui",
            "styleLibraryName": "theme-chalk"
          }
        ]
      ]
    },
  }
}

