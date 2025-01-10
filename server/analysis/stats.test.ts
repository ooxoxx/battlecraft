import { expect, it } from 'vitest'
import { TopStatsStore } from '../store'
import { CharacterClass, Dungeon, Specialization } from '../types'
import { rankingsBySpecDungeon, statsByPlayerReport, topStatsBySpecDungeon } from './stats'

it('finds top k', async () => {
  const data = await rankingsBySpecDungeon({ className: CharacterClass.Hunter, specName: Specialization.BeastMastery, dungeon: Dungeon.AraKaraCityOfEchoes })
  // console.log(data.slice(0, 5))
  expect(data).toHaveLength(100)
})

it('finds stats by report', async () => {
  const data = await statsByPlayerReport({ name: '丶将息', server: '罗宁', code: 'GLQzYMwm1XDRV6Pn', fight: 54 })
  // console.log(data)
  expect(data).toHaveProperty('name')
  expect(data?.name).toEqual('丶将息')
  expect(data).toMatchSnapshot()
})

it('finds top players\' stats  by spec and dungeon.', async () => {
  const data = await topStatsBySpecDungeon({ className: CharacterClass.Hunter, specName: Specialization.BeastMastery, dungeon: Dungeon.AraKaraCityOfEchoes })
  expect(data).toHaveLength(5)
})

// it('aquires all top stats of all class/spec/dungeon combinations.', async () => {
//   await aquireTopStats()
//   const data = await TopStatsStore.findAll()
//   console.log(data.length)
// })
it ('stores all the top stats', async () => {
  const data = TopStatsStore.findAll()
  console.log(data)
})
