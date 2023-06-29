<template>
  <div align="center" style="margin-top: 50px">
    <!-- <img
      src="/images/loading.gif"
      style="text-align: center; margin-bottom: 300px"
      :width="loadWidth"
      :height="loadheight"
      alt=""
    /> -->
    <v-progress-circular
      indeterminate
      size="50"
      color="#19309f"
    ></v-progress-circular>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loadWidth: 60,
      loadheight: 60,
    };
  },
};
</script>
