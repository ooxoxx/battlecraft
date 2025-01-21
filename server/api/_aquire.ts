import { aquireTopStats } from '../analysis/stats'

export default defineEventHandler(async () => {
  console.log('/api/_aquire entered')
  aquireTopStats()
  return {
    result: 'aquire success',
  }
})
