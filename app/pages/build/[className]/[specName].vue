<script setup lang="ts">
const route = useRoute()
const className = 'className' in route.params && route.params.className
const specName = 'specName' in route.params && route.params.specName
</script>

<template>
  <div>
    <Suspense>
      <div v-if="className && specName">
        <TopStats />
      </div>
      <div v-else>
        intended empty page
      </div>
      <template #fallback>
        <div animate-pulse op50>
          Loading...
        </div>
      </template>
    </Suspense>
    <div>
      <NuxtLink
        class="m-3 text-sm btn"
        to="/"
      >
        Back
      </NuxtLink>
    </div>
  </div>
</template>
