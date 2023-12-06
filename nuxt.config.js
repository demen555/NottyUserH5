export default {
  ssr: true,
  head: {
    title: 'Nottyhub',
    htmlAttrs: {
      lang: 'pt_PT'
    },
    script: [
      {
        src: "https://cdn.jsdelivr.net/npm/hls.js@0.14.6/dist/hls.min.js",
        async: false,
      },
      {
        src: "https://cdn.jsdelivr.net/npm/dplayer@1.26.0/dist/DPlayer.min.js",
        async: false,
      },
      {
        src: "https://www.googletagmanager.com/gtag/js",
        async: false,
        mode: 'client'
      },
      { 
        src: "/js/analitics.js", 
        mode: 'client' 
      },
    ],

    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' },
      { property: 'og:site_name', content: "Nottyhub" },
      { property: 'og:type', content: "video.movie" },
      { property: 'og:url', content: "https://www.Nottyhub.com/" },
      { property: 'og:image', content: "https://busa.dasao88.com/brazil-bikini-girl-440x440.png" },
      { property: 'og:locale', content: "pt_PT" },
      { property: 'og:description', content: "Assista gratuitamente. Sem compromissos." },
      { name: 'description', content: "Assista gratuitamente. Sem compromissos." },
    ],
  },
  manifest: {
    name: "NottyHub",
    short_name: "NottyHub",
    display: "standalone",
    orientation: "portrait"
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
  ],
  
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
      // target: "https://api.uw1wieda.com",
      target: "https://api.jdsesasc.com",
      changeOrigin: true,
      logLevel: "debug",
      secure: false
    }
  },

  i18n: {
    locales: [
      {
        code: 'en_US',
        iso: 'en-US',
        name: 'English',
      },
      {
        code: 'pt_PT',
        iso: 'pt-PT',
        name: 'Português',
      },
    ],
    strategy: 'no_prefix',
    defaultLocale: 'pt_PT',
    vueI18n: {
      fallbackLocale: 'pt_PT',
      lazy: true,
      messages: {
        en_US: require('./locales/en_US.json'),
        pt_PT: require('./locales/pt_PT.json'),
      },
    },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'lang',
    }
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
            viewportHeight: 667, // 设计稿的高度
            unitPrecision: 3, // px to vw无法整除时，保留几位小数
            viewportUnit: 'vw', // 转换成vw单位
            selectorBlackList: ['.ignore', '.hairlines'], // 不转换的类名
            minPixelValue: 1, // 小于1px不转换
            mediaQuery: false, // 允许在媒体查询中转换px
          },
        },
      },
    },
  },
}
