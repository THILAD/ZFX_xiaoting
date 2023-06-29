<template>
  <v-app dark style="margin-bottom: 40px">
    <v-app-bar fixed app class="pt-1">
      <v-spacer />
      <!-- <v-img src="/images/logo.jpeg"></v-img> -->
      <H4>abc</H4>
      <!-- <v-text-field
        prepend-inner-icon="mdi-magnify"
        placeholder="Search"
        variant="outlined"
        dense
      ></v-text-field> -->
      <v-spacer />

      <v-icon class="mb-3" dense>mdi-bell-ring</v-icon>
    </v-app-bar>
  </v-app>
</template>
<script>
import secureStorage from "~/plugins/secure-storage";
export default {
  data() {
    return {
      drawer: false,
      userInfo: null,
    };
  },
  mounted() {},
};
</script>
