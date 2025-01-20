import type { Config } from '@netlify/functions'
import { aquireTopStats } from '~~/server/analysis/stats'

export default async (req: Request) => {
  const { next_run } = await req.json()

  await aquireTopStats()

  console.info('Received event! Next invocation at:', next_run)
}

export const config: Config = {
  schedule: '@hourly',
}
