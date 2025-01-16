<script setup lang="ts">
import { classColors, classesAndSpecs, toCompact } from '~/constants'
</script>

<template>
  <div class="mx-auto max-w-screen-xl p-6">
    <h1 class="text-center text-4xl font-bold">
      BATTLECRAFT
    </h1>
    <p class="mb-8 text-gray-500/70">
      Data-driven class guides for World of Warcraft.
    </p>

    <div class="grid grid-cols-1 gap-8 lg:grid-cols-3 sm:grid-cols-2">
      <div
        v-for="(classData, index) in classesAndSpecs"
        :key="index"
        class="overflow-hidden border border-gray-200 rounded-lg bg-transparent shadow-md"
      >
        <!-- Header with class color -->
        <div
          class="py-4 text-center"
          :style="{
            backgroundColor: classColors[classData.name],
            opacity: 0.8,
            color: ['Priest', 'Rogue'].indexOf(classData.name) > -1 ? '#000' : '#FFF',
          }"
        >
          <h2 class="text-2xl font-semibold">
            {{ classData.name }}
          </h2>
        </div>

        <div class="p-4 space-y-2">
          <NuxtLink
            v-for="(spec, specIndex) in classData.specs"
            :key="specIndex"
            :to="`/build/${classData.compactName}/${spec.compactName}`"
            class="block border border-gray-200 rounded-lg bg-transparent p-2 text-center font-medium hover:bg-gray-400/50"
          >
            {{ spec.name }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
