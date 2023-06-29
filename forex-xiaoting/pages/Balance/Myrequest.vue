<template>
  <div>
    <BalanceMyrequest />
  </div>
</template>

<script>
export default {
  layout: "empty",
  middleware: "checkAuth",
};
</script>
