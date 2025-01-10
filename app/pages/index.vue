<script setup lang="ts">
import { classColors, classesAndSpecs, toCompact } from '~/constants'
</script>

<template>
  <div class="mx-auto max-w-screen-xl p-6">
    <h1 class="mb-8 text-center text-4xl text-gray-800 font-bold">
      WoW Classes & Specs
    </h1>

    <div class="grid grid-cols-1 gap-8 lg:grid-cols-3 sm:grid-cols-2">
      <div
        v-for="(classData, index) in classesAndSpecs"
        :key="index"
        class="overflow-hidden border border-gray-200 rounded-lg bg-transparent shadow-md"
      >
        <!-- Header with class color -->
        <div
          class="py-4 text-center"
          :style="{ backgroundColor: classColors[classData.name], color: classData.name === 'Priest' ? '#000' : '#FFF' }"
        >
          <h2 class="text-2xl font-semibold">
            {{ classData.name }}
          </h2>
        </div>

        <div class="p-4 space-y-2">
          <NuxtLink
            v-for="(spec, specIndex) in classData.specs"
            :key="specIndex"
            :to="`/build/${toCompact(classData.name)}-${toCompact(spec)}`"
            class="block rounded-lg bg-gray-300/50 p-2 text-center font-medium hover:bg-gray-400/50"
          >
            {{ spec }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
