<template>
  <v-app style="height: 100vh; margin-top: 56px">
    <main>
      <v-container>
        <Nuxt />
      </v-container>
    </main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "empty",
  data() {
    return {};
  },
};
</script>
