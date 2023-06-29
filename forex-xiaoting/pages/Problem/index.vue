<template>
  <div>
    <ProblemListtitle />
  </div>
</template>

<script>
export default {
  middleware: "checkAuth",
  layout: "empty",
};
</script>
