<script setup lang="ts">
</script>

<template>
  <div>
    <Suspense>
      <TopStats />
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
