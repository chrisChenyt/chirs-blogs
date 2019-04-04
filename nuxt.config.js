const webpack = require('webpack')
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: "Chirs's blogs",
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '克里斯儿的个人博客网站，主要分享前端技术以及个人博客。提供免费的常用工具库及文档链接。' },
      { name: "keywords", content: "个人博客,技术分享,克里斯儿的博客,Vue,JavaScript,CSS,webpack" }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: '/js/qrcode.min.js' }
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
    }
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },

  plugins: [
    // { src: '~assets/js/prism.js', ssr: false },
    '~plugins/filters.js',
    '~plugins/route',
    '~plugins/lazyload',
    { src: '~plugins/element-ui', ssr: true }
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

