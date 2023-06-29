<template>
  <div>
    <WidgetsNavbar
      leftIcon="mdi-chevron-left"
      RouteTo="/Wallet"
      title="Setting"
    />

    <!-- <v-subheader>Settings</v-subheader> -->
    <v-list-item-group v-model="selectedItem" color="white">
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="#19309f">mdi-earth</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title style="color: black; font-weight: bold"
            >Language</v-list-item-title
          >
        </v-list-item-content>
        <v-list-item-content align="end">
          <v-list-item-title style="color: #19309f">English</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="#19309f">mdi-cash-multiple</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title style="color: black; font-weight: bold"
            >Currency</v-list-item-title
          >
        </v-list-item-content>
        <v-list-item-content align="end">
          <v-list-item-title style="color: #19309f">USD</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="#19309f">mdi-brightness-4</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title style="color: black; font-weight: bold"
            >Theme</v-list-item-title
          >
        </v-list-item-content>
        <v-list-item-content align="end">
          <v-list-item-title style="color: #19309f">Light</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="#19309f">mdi-account-multiple</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title style="color: black; font-weight: bold"
            >About us</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
      <v-list-item @click="onLogout">
        <v-list-item-icon>
          <v-icon color="error">mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title style="color: red; font-weight: bold"
            >Logout</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      selectedItem: 0,
    };
  },
  methods: {
    ...mapActions("authen", ["logout"]),
    onLogout() {
      this.logout();
      this.$router.push("/");
    },
  },
};
</script>
