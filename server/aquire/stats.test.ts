import { expect, it } from 'vitest'
import { ClassName, Dungeon, SpecName } from '../types'
import { topkBySpecAndDungeon } from './stats'

it('finds top k', async () => {
  const data = await topkBySpecAndDungeon({ className: ClassName.Paladin, spec: SpecName.Protection, dungeon: Dungeon.ARAK })
  console.log(data)
})
