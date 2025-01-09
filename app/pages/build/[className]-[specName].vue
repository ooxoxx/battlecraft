<script setup lang="ts">
const route = useRoute()
const className = 'className' in route.params && route.params.className
const specName = 'specName' in route.params && route.params.specName
const { data } = useFetch('/api/topstats', {
  query: { className, specName, dungeon: 12660 },
})
</script>

<template>
  <div>
    <ClientOnly>
      <Suspense>
        <span>{{ data }}</span>
        <template #fallback>
          <div italic>
            <span animate-pulse>Loading...</span>
          </div>
        </template>
      </Suspense>
      <template #fallback>
        <div>
          <span animate-pulse>...</span>
        </div>
      </template>
    </ClientOnly>
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
