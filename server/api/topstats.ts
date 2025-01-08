'use strict'
import { z } from 'zod'
import { topStatsBySpecDungeon } from '../aquire/stats'
import { CharacterClass, Dungeon, Specialization } from '../types'

const schema = z.object({
  className: z.nativeEnum(CharacterClass),
  specName: z.nativeEnum(Specialization),
  dungeon: z.nativeEnum(Dungeon),
})

export default defineEventHandler(async (event) => {
  console.log('/api/characterRanking entered')
  const res = await getValidatedQuery(event, q => schema.safeParse(q))
  if (!res.success) {
    console.error(res.error)
    throw createError({
      statusCode: 400,
      message: res.error.message,
    })
  }

  const { className, specName, dungeon } = res.data

  return await topStatsBySpecDungeon({
    specName,
    className,
    dungeon,
  })
})
