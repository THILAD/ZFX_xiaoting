<template>
  <div>
    <BalanceDepositerequest />
  </div>
</template>

<script>
export default {
  layout: "empty",
  middleware: "checkAuth",
};
</script>
