<template>
  <div>
    <TradeChart />
  </div>
</template>

<script>
export default {
  middleware: "checkAuth",
  layout: "noheadernocon",
};
</script>
