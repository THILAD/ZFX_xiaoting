<template>
  <div style="margin-top: 57px">
    <WidgetsNavbar
      leftIcon="mdi-chevron-left"
      RouteTo="/Wallet"
      :title="$t('security')"
    />
    <div>
      <v-list>
        <v-list-item @click="router('/Resetlogin')">
          <v-icon color="#19309f">mdi-lock-outline</v-icon>&nbsp;
          <v-list-item-title>{{ $t("loginPassword") }}</v-list-item-title>
          <v-list-item-icon>
            <v-icon>mdi-chevron-right</v-icon>
          </v-list-item-icon>
        </v-list-item>
        <v-list-item @click="router('/setpasscode')">
          <v-icon color="#19309f">mdi-server-security</v-icon>&nbsp;
          <v-list-item-title>{{ $t("withdrawPassword") }}</v-list-item-title>
          <v-list-item-icon>
            <v-icon>mdi-chevron-right</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </div>
  </div>
</template>
<script>
export default {
  middleware: "checkAuth",
  methods: {
    router(path) {
      this.$router.push(path);
    },
  },
};
</script>
