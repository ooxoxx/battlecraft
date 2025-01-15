<script setup lang="ts">
import type { Gradient } from '@svgdotjs/svg.js'
import type { TopStats } from '~~/server/analysis/stats'
import { Number, SVG } from '@svgdotjs/svg.js'
import { Dungeons } from '~/constants'

const { data } = defineProps<{
  data: TopStats
}>()

const container = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (!container.value)
    return
  drawChart(data, container.value)
})

function drawChart(data: TopStats, ref: HTMLElement) {
  const draw = SVG().addTo(ref).size('100%', '100%')
  draw.text((add) => {
    add.tspan(data.name)
    add.tspan(`Item Level: ${data.stats['item-level']}`).dx(20)
    add.tspan(`Strength: ${data.stats.strength}`).dx(20)
    const enumName = Dungeons[data.dungeon]
    add.tspan(`Dungeon: ${enumName}`).newLine()
  }).fill('#666').font({ weight: 'bold' }).move(0, 0)

  const green = ['crit', 'haste', 'mastery', 'versatility'] as const
  const max = Math.max(...green.map(g => data.stats[g])) * 1.2

  function bar(stat: keyof TopStats['stats'], y: number, color: string | Gradient, textColor: string = '#000') {
    if (!data.stats[stat])
      throw new Error(`Stat ${stat} not found`)
    const val = data.stats[stat]
    const width = new Number(val).divide(max).convert('%')

    const _bar = draw.rect(width, 20).y(y)
    switch (typeof color) {
      case 'object':
        _bar.fill(color)
        break
      case 'string': _bar.fill(color)
    }
    draw.text(add => add.tspan(stat).dy(y)).font({ fill: '#000', weight: 'medium' })
    draw.text(add => add.tspan(val.toString()).dx(width)).y(y).dy('1rem').font({ size: 12, fill: textColor })
  }

  const m = 60
  const s = 40
  bar('crit', m, '#196f3d')
  bar('haste', m + s, '#229954')
  bar('mastery', m + s * 2, '#52be80')
  bar('versatility', m + s * 3, '#a9dfbf')
}
</script>

<template>
  <div ref="container" class="h-220px w-md" />
</template>
