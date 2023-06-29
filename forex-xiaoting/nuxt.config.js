import colors from "vuetify/es5/util/colors";

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  loading: false,
  // target: "static",
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - trader",
    title:
      "ZFX | Zeal Capital Market (UK) Limited | Online Multi-Asset Trading Forex and found",
    htmlAttrs: {
      lang: "en",
    },
  
    link: [{ rel: "image", type: "image/*", href: "./static/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/css/style.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "@/plugins/i18n",
    "~/plugins/axios.client.js",
    "@plugins/secure-storage",
    "~/plugins/encrypt",
    "~/plugins/global.js",
    "~/plugins/vueLoadmore.js",
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/dotenv",
    "@nuxtjs/axios",
    "@nuxtjs/proxy",
    "vue-sweetalert2/nuxt",
    "cookie-universal-nuxt",
    "@nuxtjs/pwa",
  ],
  pwa: {
    manifest: {
      name: "ZFX",
      short_name: "ZFX",
      lang: "en",
    },
    icon: {
      fileName: "logo.jpeg",
    },
  },
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    retry: { retries: 3 },
    proxy: true,
  },

  env: {
    BASE_URL: process.env.BASE_URL,
    POLYGONTOKEN: process.env.POLYGONTOKEN,
  },
  // Other Nuxt.js configuration options

  proxy: {
    "/api/": {
      target: process.env.BASE_URL,
      pathRewrite: { "^/api/": "/" },
    },
    // '/api2/': {
    //   target: process.env.BASE_URL2,
    //   pathRewrite: { '^/api2/': '/' },
    // },
  },
  router: {
    extendRoutes(routes, resolve) {
      return [
        {
          name: "IndexPage",
          path: "/", // <--- change this
          component: resolve(__dirname, "pages/index.vue"),
          meta: {
            title: "Home",
          },
        },
        {
          name: "MargetPage",
          path: "/Market", // <--- change this
          component: resolve(__dirname, "pages/Market/index.vue"),
          meta: {
            title: "Market",
          },
        },
        {
          name: "ChartPage",
          path: "/Chart/:pair", // <--- change this
          component: resolve(__dirname, "pages/Trade/index.vue"),
          meta: {
            title: "Chart",
          },
        },
        {
          name: "ProfilePage",
          path: "/Profile", // <--- change this
          component: resolve(__dirname, "pages/Balance/index.vue"),
          meta: {
            title: "Profile",
          },
        },
        {
          name: "WalletPage",
          path: "/Wallet", // <--- change this
          component: resolve(__dirname, "pages/Balance/Wallet.vue"),
          meta: {
            title: "Wallet",
          },
        },
        {
          name: "Transaction old",
          path: "/Balance/History", // <--- change this
          component: resolve(__dirname, "components/Balance/History.vue"),
          meta: {
            title: "Wallet",
          },
        },
        {
          name: "RequestDeposit",
          path: "/Request/Deposit", // <--- change this
          component: resolve(__dirname, "pages/Balance/Deposit.vue"),
          meta: {
            title: "Deposit",
          },
        },
        {
          name: "RequestWithdraw",
          path: "/Request/Withdraw", // <--- change this
          component: resolve(__dirname, "pages/Balance/Withdraw.vue"),
          meta: {
            title: "Deposit",
          },
        },
        {
          name: "MyRequest",
          path: "/Myrequest", // <--- change this
          component: resolve(__dirname, "components/Balance/Myrequest.vue"),
          meta: {
            title: "Deposit",
          },
        },
        {
          name: "VerifyForm",
          path: "/Verify/Form/:status", // <--- change this
          component: resolve(__dirname, "pages/Verify/index.vue"),
          meta: {
            title: "Deposit",
          },
        },
        {
          name: "SettingPage",
          path: "/Setting", // <--- change this
          component: resolve(__dirname, "pages/Setting/index.vue"),
          meta: {
            title: "Setting",
          },
        },
        {
          name: "Ticket",
          path: "/Ticket", // <--- change this
          component: resolve(__dirname, "pages/Problem/index.vue"),
          meta: {
            title: "Ticket",
          },
        },
        {
          name: "About",
          path: "/Setting/about", // <--- change this
          component: resolve(__dirname, "components/Setting/aboutzfx.vue"),
          meta: {
            title: "About",
          },
        },
        {
          name: "help",
          path: "/Setting/help", // <--- change this
          component: resolve(__dirname, "components/Setting/helpcenter.vue"),
          meta: {
            title: "Help",
          },
        },
        {
          name: "Policy",
          path: "/Setting/help", // <--- change this
          component: resolve(
            __dirname,
            "components/Setting/leveragepolicy.vue"
          ),
          meta: {
            title: "Policy",
          },
        },
        {
          name: "Notification",
          path: "/Setting/notification", // <--- change this
          component: resolve(__dirname, "components/Setting/notification.vue"),
          meta: {
            title: "Notification",
          },
        },
        {
          name: "Term",
          path: "/Setting/term", // <--- change this
          component: resolve(__dirname, "components/Setting/termwebsite.vue"),
          meta: {
            title: "Term",
          },
        },
        {
          name: "Transaction",
          path: "/Transaction", // <--- change this
          component: resolve(__dirname, "components/Balance/Transaction.vue"),
          meta: {
            title: "Transaction",
          },
        },
        {
          name: "Tradehistory",
          path: "/Tradehistory", // <--- change this
          component: resolve(__dirname, "components/Balance/Tradehistory.vue"),
          meta: {
            title: "Trade History",
          },
        },
        {
          name: "Security",
          path: "/Security", // <--- change this
          component: resolve(__dirname, "components/Setting/Security.vue"),
          meta: {
            title: "Security",
          },
        },
        {
          name: "Resetlogin",
          path: "/Resetlogin", // <--- change this
          component: resolve(__dirname, "components/Setting/Resetlogin.vue"),
          meta: {
            title: "Resetlogin",
          },
        },
        {
          name: "Staking",
          path: "/Staking", // <--- change this
          component: resolve(__dirname, "pages/Staking/index.vue"),
          meta: {
            title: "Staking",
          },
        },
        {
          name: "confirmStaking",
          path: "/Confirmstaking/:position", // <--- change this
          component: resolve(__dirname, "components/Staking/Confirm.vue"),
          meta: {
            title: "Confirmation Staking",
          },
        },
        {
          name: "MyStaking",
          path: "/mystaking", // <--- change this
          component: resolve(__dirname, "components/Staking/Mystaking.vue"),
          meta: {
            title: "My Staking",
          },
        },
        {
          name: "Passcode",
          path: "/setpasscode", // <--- change this
          component: resolve(__dirname, "components/Setting/Setpasscode.vue"),
          meta: {
            title: "Passcode",
          },
        },
        // {
        //   name: "OTP",
        //   path: "/OPT/:fullname/:userid/:password/:email", // <--- change this
        //   component: resolve(__dirname, "components/Authen/Otp.vue"),
        //   meta: {
        //     title: "OTP",
        //   },
        // },
        {
          name: "OTP",
          path: "/OTP", // <--- change this
          component: resolve(__dirname, "components/Authen/Otp.vue"),
          meta: {
            title: "OTP",
          },
        },

        // {
        //   name: "Wallets",
        //   path: "/Wallettest", // <--- change this
        //   component: resolve(__dirname, "./components/test_component/wallet.vue"),
        //   meta: {
        //     title: "Ticket",
        //   },
        // },
      ];
    },
  },
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    // customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
      colors: {
        background: "#FFFFFF",
        surface: "#FFFFFF",
        primary: "#19309F",
        "primary-darken-1": "#fff",
        secondary: "#03DAC6",
        "secondary-darken-1": "#fff",
        error: "#B00020",
        myprimary: "#19309F",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FB8C00",
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
