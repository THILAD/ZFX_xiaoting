<template>
  <v-app>
    <Nuxt />

    <NavigationFooter />
  </v-app>
</template>
<style scoped>
p {
  font-weight: bold;
  color: grey;
}
</style>
<script>
export default {
  name: "standard",
  data() {
    return {
      // clipped: false,
      // drawer: false,
      // fixed: false,
      // items: [
      //   {
      //     icon: "mdi-apps",
      //     title: "Welcome",
      //     to: "/",
      //   },
      //   {
      //     icon: "mdi-chart-bubble",
      //     title: "Inspire",
      //     to: "/inspire",
      //   },
      // ],
      // miniVariant: false,
      // right: true,
      // rightDrawer: false,
      // title: "Vuetify.js",
      // fHome: true,
      // fMarket: false,
      // fTrade: false,
      // fFuture: false,
      // fBalance: false,
    };
  },
  // methods: {
  //   changeColorFocus(key) {
  //     switch (key) {
  //       case "fHome":
  //         this.fHome = true;
  //         this.fMarket = false;
  //         this.fTrade = false;
  //         this.fFuture = false;
  //         this.fBalance = false;
  //         break;
  //       case "fMarket":
  //         this.fHome = false;
  //         this.fMarket = true;
  //         this.fTrade = false;
  //         this.fFuture = false;
  //         this.fBalance = false;
  //         break;
  //       case "fTrade":
  //         this.fHome = false;
  //         this.fMarket = false;
  //         this.fTrade = true;
  //         this.fFuture = false;
  //         this.fBalance = false;
  //         break;
  //       case "fFuture":
  //         this.fHome = false;
  //         this.fMarket = false;
  //         this.fTrade = false;
  //         this.fFuture = true;
  //         this.fBalance = false;
  //         break;
  //       case "fBalance":
  //         this.fHome = false;
  //         this.fMarket = false;
  //         this.fTrade = false;
  //         this.fFuture = false;
  //         this.fBalance = true;
  //         break;
  //     }
  //   },
  // },
};
</script>
