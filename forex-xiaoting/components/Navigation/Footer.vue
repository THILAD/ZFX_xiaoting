<template>
  <v-app dark>
    <AuthenLogin ref="loginRef" />
    <v-footer :absolute="false" app style="background-color: white">
      <v-layout class="overflow-visible" style="height: 56px">
        <v-bottom-navigation
          v-model="value"
          color="#19309f"
          vertical
          style="justify-content: space-around"
        >
          <v-btn
            height="100%"
            :width="isLogin ? '25vw' : '33.33vw'"
            @click="routeHandler('/', 0)"
          >
            {{ $t("home") }}
            <v-icon>mdi-home</v-icon>
          </v-btn>
          <v-btn
            height="100%"
            :width="isLogin ? '25vw' : '33.33vw'"
            @click="routeHandler('/Market', 1)"
          >
            {{ $t("market") }}
            <v-icon>mdi-trending-up</v-icon>
          </v-btn>
          <v-btn
            height="100%"
            :width="isLogin ? '25vw' : '33.33vw'"
            @click="routeHandler('/Chart', 2)"
          >
            {{ $t("trade") }}

            <v-icon>mdi-chart-bar</v-icon>
          </v-btn>

          <v-btn
            height="100%"
            :width="isLogin ? '25vw' : '33.33vw'"
            v-show="isLogin"
            @click="routeHandler('/Wallet', 3)"
          >
            {{ $t("wallet") }}
            <v-icon>mdi-wallet</v-icon>
          </v-btn>
        </v-bottom-navigation>
      </v-layout>
    </v-footer>
  </v-app>
</template>
<style scoped>
p {
  font-weight: bold;
  color: grey;
}
.v-footer {
  padding: 0;
}
.v-item-group.v-bottom-navigation .v-btn {
  max-width: none;
}
</style>
<script>
import { mapGetters } from "vuex";
import secureStorage from "~/plugins/secure-storage";
export default {
  name: "DefaultLayout",
  data() {
    return {
      fHome: true,
      fMarket: false,
      fTrade: false,
      fFuture: false,
      fBalance: false,
      value: 0,
    };
  },
  computed: {
    ...mapGetters("authen", ["isLogin"]),
  },
  mounted() {
    if (secureStorage.getItem("navitab")) {
      this.value = secureStorage.getItem("navitab");
    }
  },
  methods: {
    routeHandler(path, value) {
      if ((path === "/Chart" || path === "/Wallet") && this.isLogin == false) {
        this.$refs["loginRef"].dialog = true;
      } else {
        if (path.includes("/Chart")) {
          this.$router.push("/Chart/XAUUSD");
          this.setValueNaviTab(value);
        } else {
          this.router(path);
          this.setValueNaviTab(value);
        }
      }
    },
    router(path) {
      this.$router.push(path);
    },
    setValueNaviTab(value) {
      secureStorage.setItem("navitab", value);
    },
    changeColorFocus(key) {
      switch (key) {
        case "fHome":
          this.fHome = true;
          this.fMarket = false;
          this.fTrade = false;
          this.fFuture = false;
          this.fBalance = false;
          break;
        case "fMarket":
          this.fHome = false;
          this.fMarket = true;
          this.fTrade = false;
          this.fFuture = false;
          this.fBalance = false;
          break;
        case "fTrade":
          this.fHome = false;
          this.fMarket = false;
          this.fTrade = true;
          this.fFuture = false;
          this.fBalance = false;
          this.$router.push("/Chart");
          break;
        case "fFuture":
          this.fHome = false;
          this.fMarket = false;
          this.fTrade = false;
          this.fFuture = true;
          this.fBalance = false;
          break;
        case "fBalance":
          this.fHome = false;
          this.fMarket = false;
          this.fTrade = false;
          this.fFuture = false;
          this.fBalance = true;
          break;
      }
    },
  },
};
</script>
<style>
/* .nuxt-link-active {
  color: red !important;
}
.nuxt-link-exact-active {
  color: green !important;
} */
main.v-main {
  padding: 0 0 10px !important;
}
</style>
