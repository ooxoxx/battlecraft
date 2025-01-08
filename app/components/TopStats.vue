<script setup lang="ts">
import { ref, watch } from 'vue'

const classes = [
  { name: 'Death Knight', specs: ['Blood', 'Frost', 'Unholy'] },
  { name: 'Druid', specs: ['Balance', 'Feral', 'Guardian', 'Restoration'] },
  { name: 'Hunter', specs: ['Beast Mastery', 'Marksmanship', 'Survival'] },
  { name: 'Mage', specs: ['Arcane', 'Fire', 'Frost'] },
  { name: 'Monk', specs: ['Brewmaster', 'Mistweaver', 'Windwalker'] },
  { name: 'Paladin', specs: ['Holy', 'Protection', 'Retribution'] },
]

const selectedClass = ref(classes[0]?.name)
const selectedSpec = ref(classes[0]?.specs[0])

// Watch for changes in selectedClass and update selectedSpec
watch(selectedClass, (newClass) => {
  const classData = classes.find(c => c.name === newClass)
  if (classData) {
    selectedSpec.value = classData.specs[0] // Default to the first spec
  }
})
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-6 p-6 md:flex-row">
    <!-- Level 1 Dropdown: Select Class -->
    <div class="flex flex-col items-center md:items-start">
      <label for="class-select" class="mb-2 block font-semibold">Select Class</label>
      <select
        id="class-select"
        v-model="selectedClass"
        class="min-w-xs w-full border rounded-md bg-transparent p-2 md:w-auto"
      >
        <option v-for="classItem in classes" :key="classItem.name" :value="classItem.name">
          {{ classItem.name }}
        </option>
      </select>
    </div>

    <!-- Level 2 Dropdown: Select Spec -->
    <div class="flex flex-col items-center md:items-start">
      <label for="spec-select" class="mb-2 block font-semibold">Select Spec</label>
      <select
        id="spec-select"
        v-model="selectedSpec"
        class="min-w-xs w-full border rounded-md bg-transparent p-2 md:w-auto"
      >
        <option
          v-for="spec in classes.find(c => c.name === selectedClass)?.specs"
          :key="spec"
          :value="spec"
        >
          {{ spec }}
        </option>
      </select>
    </div>
  </div>

  <div />
</template>

