<script setup lang="ts">
const { data } = useFetch('/api/topstats', {
  query: { className: 'Mage', specName: 'Frost', dungeon: 12660 },
})
</script>

<template>
  <div text-gray:80>
    <span text-gray>{{ data }}</span>
  </div>
</template>
