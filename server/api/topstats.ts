'use strict'
import { z } from 'zod'
import { topStatsBySpecDungeon } from '../analysis/stats'

const schema = z.object({
  className: z.string(),
  specName: z.string(),
  dungeon: z.string(),
})

export default defineCachedEventHandler(async (event) => {
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

  try {
    const res = await topStatsBySpecDungeon({
      specName,
      className,
      dungeon,
    })
    // TopStatsStore.bulkCreate(res)
    return res
  }
  catch (e) {
    console.error(e)
    throw e
  }
}, {
  name: 'api/topstats',
  maxAge: 60 * 60,
  staleMaxAge: -1,
})
