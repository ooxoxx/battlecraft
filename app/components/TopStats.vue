<script setup lang="ts">
const route = useRoute()
const className = 'className' in route.params && route.params.className
const specName = 'specName' in route.params && route.params.specName
const { data } = await useFetch('/api/topstats', {
  query: { className, specName, dungeon: 12660 },
})
</script>

<template>
  <span>{{ data }}</span>
</template>
