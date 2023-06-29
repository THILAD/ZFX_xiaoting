<template>
  <div>
    <BalanceProfile />
  </div>
</template>

<script>
export default {
  layout: "empty",
  middleware: "checkAuth",
};
</script>
