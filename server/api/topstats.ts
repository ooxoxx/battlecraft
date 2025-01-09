'use strict'
import { z } from 'zod'
import { topStatsBySpecDungeon } from '../aquire/stats'
import { CharacterClass, Dungeon, Specialization } from '../types'

const schema = z.object({
  className: z.string(),
  specName: z.string(),
  dungeon: z.string(),
})

export default defineEventHandler(async (event) => {
  // console.log('/api/topstats entered')
  const res = await getValidatedQuery(event, q => schema.safeParse(q))
  if (!res.success) {
    console.error(res.error)
    throw createError({
      statusCode: 400,
      message: res.error.message,
    })
  }

  const { className, specName, dungeon } = res.data
  const CharacterClassEnum = z.nativeEnum(CharacterClass)
  const SpecializationEnum = z.nativeEnum(Specialization)
  const DungeonEnum = z.nativeEnum(Dungeon)

  try {
    const res = await topStatsBySpecDungeon({
      specName: SpecializationEnum.parse(specName.replace(' ', '')),
      className: CharacterClassEnum.parse(className.replace(' ', '')),
      dungeon: DungeonEnum.parse(dungeon),
    })
    return res
  }
  catch (e) {
    console.error(e)
    throw e
  }
})
