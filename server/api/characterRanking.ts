'use strict'
import { rankingsBySpecDungeon } from '../aquire/stats'
import { CharacterClass, Dungeon, Specialization } from '../types'

export default defineEventHandler(async () => {
  // console.log('/api/characterRanking entered')

  return await rankingsBySpecDungeon({ specName: Specialization.Protection, className: CharacterClass.Paladin, dungeon: Dungeon.AraKaraCityOfEchoes })
})
