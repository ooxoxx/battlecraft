<script setup lang="ts">
const { data } = await useFetch('/api/wcl')
</script>

<template>
  <div text-gray:80>
    data:
    <span text-gray>{{ data }}</span>
  </div>
</template>
