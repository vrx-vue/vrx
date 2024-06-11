<script setup lang="ts">
  const { data } = $useAsyncData(() => Promise.resolve('vrx/core'), { immediate: true })
</script>
<template>
  <div>{{ data }}</div>
</template>
