import { aquireTopStats } from '~~/server/analysis/stats'

export default defineTask({
  meta: {
    name: 'aq:topstats',
    description: 'Fetch top stats for all classes, specs, and dungeons',
  },
  async run() {
    await aquireTopStats()
    return { result: 'success' }
  },
})
