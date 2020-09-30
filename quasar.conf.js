// Configuration for your app

module.exports = function (ctx) {
  return {
    preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    boot: [
      'data-string',
      'mallcomm',
      'i18n',
      'axios',
      'emoji-one',
      'moment',
      'fontawesome-pro',
      'api-query',
      'lodash',
      'event-bus',
      'error-handler',
      'exif'
    ],

    css: [
      'app.styl'
    ],

    extras: [
      'roboto-font',
      'material-icons'
    ],

    framework: {
      // all: true, // --- includes everything; for dev only!

      components: [
        'QLayout',
        'QHeader',
        'QDrawer',
        'QScrollArea',
        'QPageContainer',
        'QPage',
        'QToolbar',
        'QToolbarTitle',
        'QBtn',
        'QIcon',
        'QList',
        'QItem',
        'QImg',
        'QItemSection',
        'QItemLabel',
        'QCard',
        'QCardActions',
        'QCardSection',
        'QTabs',
        'QTab',
        'QTabPanels',
        'QTabPanel',
        'QBadge',
        'QItem',
        'QItemLabel',
        'QItemSection',
        'QAvatar',
        'QLayout',
        'QDrawer',
        'QPageContainer',
        'QBtn',
        'QHeader',
        'QInput',
        'QList',
        'QSelect',
        'QSeparator',
        'QFab',
        'QFabAction',
        'QSpinner',
        'QSpinnerBars',
        'QSpinnerDots',
        'QSpinnerComment',
        'QSpinnerPuff',
        'QChatMessage',
        'QInnerLoading',
        'QChip',
        'QMenu',
        'QDialog',
        'QLinearProgress',
        'QInfiniteScroll',
        'QSpace',
        'QBanner',
        'QForm'
      ],

      directives: [
        'Ripple',
        'TouchHold',
        'ClosePopup',
        'GoBack'
      ],

      // Quasar plugins
      plugins: [
        'Notify',
        'BottomSheet',
        'Loading'
      ],

      iconSet: 'fontawesome-v5-pro'
      // lang: 'de' // Quasar language
    },

    sourceFiles: {
      rootComponent: 'src/App.vue',
      router: 'src/router/index',
      store: 'src/store/index',
      indexHtmlTemplate: 'resources/views/spa.blade.php',
      registerServiceWorker: 'src-pwa/register-service-worker.js',
      serviceWorker: 'src-pwa/custom-service-worker.js',
      electronMainDev: 'src-electron/main-process/electron-main.dev.js',
      electronMainProd: 'src-electron/main-process/electron-main.js',
      ssrServerIndex: 'src-ssr/index.js'
    },

    supportIE: true,

    build: {
      scopeHoisting: true,
      // vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      distDir: 'public/client',
      extendWebpack (cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
        })
        cfg.module.rules.push({
          resourceQuery: /blockType=i18n/,
          use: [
            { loader: '@kazupon/vue-i18n-loader' },
            { loader: 'yaml-loader' }
          ]
        })
      },
      env: ctx.dev
        ? { // so on dev we'll have
          API: JSON.stringify('http://localhost:8000'),
        }
        : { // and on build (production):
          API: JSON.stringify('https://social-network.mallcommapp.co.uk'),
        }
    },

    devServer: {
      // https: true,
      port: 8080,
      open: false // opens browser window automatically
    },

    animations: 'all',

    ssr: {
      pwa: false
    },

    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {}, // only for NON InjectManifest
      manifest: {
        // name: 'Quasar App',
        // short_name: 'Quasar-PWA',
        // description: 'Best PWA App in town!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },

    cordova: {
      // id: 'org.cordova.quasar.app'
      // noIosLegacyBuildFlag: true // uncomment only if you know what you are doing
    },

    electron: {
      // bundler: 'builder', // or 'packager'

      extendWebpack (cfg) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      },

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'quasar-app'
      }
    }
  }
}
