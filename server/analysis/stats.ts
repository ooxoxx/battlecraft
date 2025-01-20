import type { CharacterClass, CharacterStats, Dungeon, Specialization } from '../types'
import { JSONPath } from 'jsonpath-plus'
import pLimit from 'p-limit'
import { classesAndSpecs, dungeons, toCompact } from '../../app/constants'
import { gql } from '../__generated__/gql'
import { useClientWithEnv } from '../apollo-client'
import { CharacterClassEnum, DungeonEnum, SpecializationEnum } from '../types'

const CHARACTER_RANKING = gql(/* GraphQL */`
  query characterRanking(
    $id: Int = 12660
    $className: String!
    $specName: String!
  ) {
    worldData {
      encounter(id: $id) {
        name
        characterRankings(
          page: 1
          className: $className
          specName: $specName
          metric: playerscore
          leaderboard: LogsOnly
        )
      }
    }
  }
`)

interface BySpecDungeonArgs {
  className: string
  specName: string
  dungeon: string
}

interface PlayerDetails {
  name: string
  class: string
  spec: string
  amount: number
  hardModeLevel: number
  duration: number
  startTime: number
  report: {
    code: string
    fightID: number
    startTime: number
  }
  server: {
    id: number
    name: string
  }
  bracketData: number
  faction: number
  affixes: number[]
  medal: string
  score: number
  leaderboard: number
  hidden?: boolean
}

export async function rankingsBySpecDungeon({ className, specName, dungeon }: BySpecDungeonArgs): Promise<PlayerDetails[]> {
  const client = await useClientWithEnv()
  const data = await client.query({ query: CHARACTER_RANKING, variables: {
    className,
    specName,
    dungeon,
  } })
  return data.data?.worldData?.encounter?.characterRankings?.rankings
}

const REPORT_SUMMARY = gql(/* GraphQL */`
  query ReportSummary($code: String!, $fight: Int!) {
    reportData {
      report(code: $code) {
        fights(fightIDs: [$fight]) {
          id
          encounterID
        }
        code
        table(fightIDs: [$fight], dataType: Summary)
      }
    }
}`)

interface StatsByPlayerReportsArgs {
  name: string
  server: string
  code: string
  fight: number
}

export interface TopStats {
  name: string
  rank: number
  class: CharacterClass
  spec: Specialization
  dungeon: Dungeon
  stats: CharacterStats
}

interface StatRange {
  min: number
  max: number
}

interface PlayerStats {
  'Speed': StatRange
  'Mastery': StatRange
  'Crit': StatRange
  'Item Level': StatRange
  'Stamina': StatRange
  'Strength'?: StatRange
  'Agility'?: StatRange
  'Intellect'?: StatRange
  'Avoidance': StatRange
  'Haste': StatRange
  'Versatility': StatRange
  'Leech': StatRange
  'Armor': StatRange
}

// Type for CombatantInfo (Combatant-specific details)
interface CombatantInfo {
  stats: PlayerStats
}

// Type for PlayerSummary (General player information)
interface PlayerSummary {
  name: string
  id: number
  guid: number
  type: CharacterClass // Enum for character class
  server: string
  icon: string
  specs: Specialization[] // Array of specializations (using the Specialization enum)
  minItemLevel: number
  maxItemLevel: number
  potionUse: number
  healthstoneUse: number
  combatantInfo: CombatantInfo | [] // Nested combatant info
}

export const statsByPlayerReport = defineCachedFunction< Promise<TopStats | undefined>, [StatsByPlayerReportsArgs]>(
  async ({ name, server, code, fight }) => {
    const client = await useClientWithEnv()
    const data = await client.query({ query: REPORT_SUMMARY, variables: { code, fight } })
    // console.log(data.data.reportData.report.code, data.data.reportData.report.fights[0].id)
    // console.log(client.cache.identify(data.data.reportData))

    // find the player in report
    const players = data.data?.reportData?.report?.table.data.playerDetails as { tanks: PlayerSummary[], healers: PlayerSummary[], dps: PlayerSummary[] }
    server = server.replace(' ', '')
    const player = [players.tanks, players.dps, players.healers].flat().find(p => p.name === name && p.server === server)

    if (player === undefined) {
      throw new Error('Player not found in report')
    }

    if (Array.isArray(player.combatantInfo)) {
      return
    }

    // Extract keys and min values using JSONPath
    const keys = JSONPath<string[]>({ path: '$.*~', json: player.combatantInfo.stats }) // Extract keys
    const minValues = JSONPath<number[]>({ path: '$.*.min', json: player.combatantInfo.stats }) // Extract min values

    // Combine keys and values into a single object
    const stats = keys?.reduce((acc, key, index) => {
      key = key.toLowerCase().replace(' ', '-') // handle 'item level'
      // @ts-expect-error: acc maybe of any type
      acc[key] = minValues[index]
      return acc
    }, {}) as CharacterStats

    const encounterID = data.data?.reportData?.report?.fights?.at(0)?.encounterID

    return {
      name,
      class: player.type,
      spec: player.specs[0],
      dungeon: DungeonEnum.parse(encounterID?.toString()),
      rank: -1,
      stats,
    }
  },
  {
    maxAge: 365 * 60 * 60 * 24,
    staleMaxAge: -1,
    name: 'statsByPlayerReport',
    getKey: ({ name, server, code, fight }) => `${name}-${server}-${code}-${fight}`,
  },
)

export const topStatsBySpecDungeon = defineCachedFunction<Promise<TopStats[]>, [BySpecDungeonArgs]>(
  async ({ className, specName, dungeon }) => {
    className = CharacterClassEnum.parse(toCompact(className))
    specName = SpecializationEnum.parse(toCompact(specName))
    dungeon = DungeonEnum.parse(dungeon)
    const details = await rankingsBySpecDungeon({ className, specName, dungeon })

    const top5Stats = details.slice(0, 7)

    // note that Promise.all preserve the order of its input array and output array
    return Promise.all(top5Stats.filter(ts => !ts.hidden).map(async (ts, i) => {
      const stats = await statsByPlayerReport({ name: ts?.name, server: ts.server.name, code: ts.report.code, fight: ts.report.fightID })
      if (stats === undefined) {
        return
      }
      return {
        ...stats,
        rank: i,
      }
    })).then(stats => stats.filter((s): s is TopStats => s !== undefined).slice(0, 5))
  },
  {
    name: 'topStatsBySpecDungeon',
    maxAge: 60 * 60,
    staleMaxAge: -1,
    getKey: async ({ className, specName, dungeon }) => {
      return `${className}-${specName}-${dungeon}`
    },
  },
)

export async function aquireTopStats() {
  // console.log('aquire entered')
  const limit = pLimit(10)
  await Promise.all(classesAndSpecs.map(
    ({ name, specs }) => specs.map(
      spec => dungeons.map(
        ({ id: dungID }) => limit(async () => {
          let counter = 0
          while (counter < 3) {
            try {
              // console.log(`aquiring topstats of class: ${name}, spec: ${spec.name}, dungeon: ${dungID}`)
              await topStatsBySpecDungeon({
                className: name,
                specName: spec.name,
                dungeon: dungID,
              })
            }
            catch (e) {
              console.warn(`Failed to fetch topstats ${name} ${spec} ${dungID} remaining ${3 - counter} retries`)
              console.warn(e)
              counter++
              continue
            }
            // console.log(`aquirie done topstats of class: ${name}, spec: ${spec.name}, dungeon: ${dungID}`)
            break
          }
        }),
      ),
    ),
  ).flat(3))
}
