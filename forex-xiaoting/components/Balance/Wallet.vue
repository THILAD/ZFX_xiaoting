<template>
  <div>
    <v-app-bar style="background-color: white" app density="compact">
      <v-row>
        <v-col cols="2" align="center">
          <v-app-bar-nav-icon @click="router('/Profile')"
            ><v-icon color="#19309F">mdi-account</v-icon></v-app-bar-nav-icon
          >
        </v-col>
        <v-col cols="8" align="center" class="my-auto">
          <h3 style="color: #19309f">Wallet</h3>
        </v-col>
        <v-col cols="2" align="center">
          <v-app-bar-nav-icon @click="router('/Setting')"
            ><v-icon color="#19309F"
              >mdi-cog-outline</v-icon
            ></v-app-bar-nav-icon
          >
        </v-col>
      </v-row>
    </v-app-bar>
    <v-card class="pb-4">
      <v-card-text align="center"
        ><h2>${{ BalanceInfo?.balance || 0 }}</h2>
      </v-card-text>
      <div style="padding: 15px">
        <v-row justify="space-between">
          <v-col cols="3" align="center" @click="router('/Request/Withdraw')">
            <v-icon color="#19309F" size="25">mdi-cash-multiple</v-icon>
            <p>Withdraw</p>
          </v-col>
          <v-col cols="3" align="center" @click="router('/Request/Deposit')">
            <v-icon color="#19309F" size="25">mdi-cash-fast</v-icon>
            <p>Deposit</p> </v-col
          ><v-col cols="3" align="center">
            <v-icon color="#19309F" size="25">mdi-wallet</v-icon>
            <p>Balance</p> </v-col
          ><v-col cols="3" align="center">
            <v-icon color="#19309F" size="25" @click="router('/Ticket')"
              >mdi-chat</v-icon
            >
            <p>Ticket</p>
          </v-col>
        </v-row>
      </div>
    </v-card>
    <BalanceHistory title="Transaction History" />
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  mounted() {
    this.myBalance();
    this.checkLogin();
  },
  computed: {
    ...mapGetters("balance", ["BalanceInfo"]),
  },
  methods: {
    ...mapActions("authen", ["register", "checkLogin"]),
    ...mapActions("balance", ["myBalance"]),

    router(path) {
      this.$router.push(path);
    },
  },
};
</script>
<style scoped>
p {
  padding: 0px;
  margin: 0px;
  font-size: 14px;
}
div.col.col-3 {
  padding: 0px !important;
}
</style>
