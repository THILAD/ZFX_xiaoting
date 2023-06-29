<template>
  <div>
    <v-main style="padding: 0px !important; margin-bottom: 10px">
      <v-app-bar
        style="background-color: white !important"
        app
        density="compact"
      >
        <v-row>
          <v-col cols="2" align="center">
            <v-icon
              v-if="leftIcon"
              @click="routerTo(RouteTo)"
              color="#19309f"
              >{{ leftIcon }}</v-icon
            >
          </v-col>
          <v-col cols="8" align="center">
            <h3 style="color: #19309f">{{ title }}</h3>
          </v-col>
          <v-col cols="2" align="center">
            <v-icon
              v-if="rightIcon"
              @click="onClickRightIcon"
              color="#19309f"
              >{{ rightIcon }}</v-icon
            >
          </v-col>
        </v-row>
      </v-app-bar></v-main
    >
  </div>
</template>
<script>
export default {
  props: {
    RouteTo: String,
    title: String,
    rightIcon: String,
    leftIcon: String,
    onClickRightIcon: Function,
  },
  methods: {
    routerTo(path) {
      if (String(path).toLocaleLowerCase() === "back") {
        this.$router.back();
      } else {
        this.$router.push(path);
      }
    },
  },
};
</script>
<style scoped>
.col {
  padding: 7px !important;
}
</style>
