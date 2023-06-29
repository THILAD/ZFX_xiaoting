<template>
  <div>
    <BalanceNewbalance />
  </div>
</template>

<script>
export default {
  layout: "noheader",
  middleware: "checkAuth",
};
</script>
