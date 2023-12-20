const CompressionPlugin = require('compression-webpack-plugin');

export default {
  vue: {
    config: {
      productionTip: true,
      devtools: true
    }
  },
  ssr: true,
  
  hooks: {
    'render:route': (url, result) => {
      result.html = result.html.replace(/data-n-head=\"ssr\"/gi,'')
    }
  },
  head: {
    title: 'Free Porn Videos in HD, Porno Sex Movies, and XXX Porn Tube | Nottyhub.com',
    // htmlAttrs: {
    //   lang: 'pt_PT'
    // },
    script: [
      {
        src: "https://cdn.jsdelivr.net/npm/hls.js@0.14.6/dist/hls.min.js",
        async: true,
        mode: 'client'
      },
      {
        src: "https://cdn.jsdelivr.net/npm/dplayer@1.26.0/dist/DPlayer.min.js",
        async: true,
        mode: 'client'
      },
      {
        src: "https://www.googletagmanager.com/gtag/js",
        async: true,
        mode: 'client'
      },
      { 
        src: "/js/analitics.js", 
        mode: 'client' 
      },
    ],

    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, minimal-ui' },
      { name: 'theme-color', content: '#1E1E1E' },
      { name: 'format-detection', content: 'telephone=no' },
      // { property: 'og:site_name', content: "Nottyhub" },
      // { property: 'og:type', content: "video.movie" },
      // { property: 'og:url', content: "https://www.Nottyhub.com/" },
      // { property: 'og:image', content: "https://busa.dasao88.com/brazil-bikini-girl-440x440.png" },
      // { property: 'og:locale', content: "pt_PT" },
      // { property: 'og:description', content: "Assista gratuitamente. Sem compromissos." },
      { name: 'description', content: "With Nottyhub, you can watch Free Porn Videos in HD! Daily New XXX Porn Movies and Clips. " },
      { name: 'keywords', content: "Free Porn Videos " },
      { name: 'BASE_URL', content: process.env.BASE_URL },
      
    ],

    link: [
    
      { rel: "icon", sizes: "192x192", href: "/linklogo/ic_launcher192x192.png" },
      { rel: "icon", sizes: "36x36", href: "/linklogo/ic_launcher36x36.png"},
      { rel: "icon", sizes: "48x48", href: "/linklogo/ic_launcher48x48.png"},
      { rel: "icon", sizes: "72x72", href: "/linklogo/ic_launcher72x72.png"},
      { rel: "icon", sizes: "96x96", href: "/linklogo/ic_launcher96x96.png"},
      { rel: "icon", sizes: "144x144", href: "/linklogo/ic_launcher144x144.png"},
      

  
      { rel: "apple-touch-icon", sizes: "180x180", href: "/linklogo/icon-60@3x.png"},
      { rel: "apple-touch-icon", sizes: "120x120", href: "/linklogo/icon-60@2x.png"},
      { rel: "apple-touch-icon", sizes: "128x128", href: "/linklogo/icon-64@2x.png"},
      { rel: "apple-touch-icon", sizes: "152x152", href: "/linklogo/icon-76@2x.png"},
      { rel: "manifest", href: "/site.webmanifest" }
    ]
  },

  css: [
    'vant/lib/index.css',
    '~/static/less/common.less',
    '~/static/less/theme.less'
  ],
  plugins: [
    '~/plugins/utils.js',
    '~/plugins/vant.js',
    "~/plugins/axios/index.js",
    { src: '~/plugins/store-cache', ssr: false },
  ],
  loading: {
    color: '#FF5502',
    height: '2px'
  },
  components: true,

  buildModules: [
  ],

  modules: [
    'nuxt-i18n',
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],

  axios: {
    proxy: true
  },

  proxy: {
    '/api': {
      target: process.env.BASE_URL,
      changeOrigin: true,
      logLevel: "debug",
      secure: false
    }
  },

  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
      },
      {
        code: 'pt',
        iso: 'pt-PT',
        name: 'Português',
      },
    ],
    strategy: 'prefix',
    defaultLocale: 'pt',
    vueI18n: {
      fallbackLocale: 'pt',
      lazy: true,
      messages: {
        en_US: require('./locales/en_US.json'),
        pt_PT: require('./locales/pt_PT.json'),
      },
    },
    detectBrowserLanguage: false,

  },

  build: {
    // 配置less
    loaders: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
    // 配置postcss 
    postcss: {
      postcssOptions: {
        plugins: {
          'postcss-px-to-viewport-8-plugin': {
            viewportWidth: 375, // 设计稿的宽度
            // viewportHeight: 667, // 设计稿的高度
            unitPrecision: 3, // px to vw无法整除时，保留几位小数
            viewportUnit: 'vw', // 转换成vw单位
            selectorBlackList: ['.ignore', '.hairlines'], // 不转换的类名
            minPixelValue: 1, // 小于1px不转换
            mediaQuery: false, // 允许在媒体查询中转换px
          },
          'postcss-mobile-forever': {
            "viewportWidth": 750,
            "appSelector": "#__nuxt",
            "maxDisplayWidth": 600
          }
        },
      },
    },

    plugins: [
      new CompressionPlugin({
        test: /\.js$|\.html$|\.css/,
        threshold: 10240, 
        deleteOriginalAssets: false 
      })
    ],

    optimization: {
      minimize: true,
      minimizer: [],
      splitChunks: {
        chunks: "all",
        automaticNameDelimiter: "-",
        maxSize: 102400,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10, //优先级
            reuseExistingChunk: true,
          },
          common: {
            minChunks: 2,
            priority: -20, //优先级
            reuseExistingChunk: true,
          },
        },
      },
    },
  },
}
