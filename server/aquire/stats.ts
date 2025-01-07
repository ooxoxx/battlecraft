import type { CharacterClass, Dungeon, Specialization } from '../types'
import { JSONPath } from 'jsonpath-plus'
import { gql } from '../__generated__/gql'
import { useClientWithEnv } from '../apollo-client'

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
  className: CharacterClass
  specName: Specialization
  dungeon: Dungeon
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

export interface CharacterStats {
  'strength'?: number
  'agility'?: number
  'intellect'?: number
  'stamina': number
  'leech': number
  'armor': number
  'mastery': number
  'haste': number
  'crit': number
  'versatility': number
  'item-level': number // note the quoted key for compatibility
  'avoidance': number
  'speed': number
  'block': number
  'parry': number
  'dodge': number
}

interface TopStats {
  name: string
  rank: number
  class: CharacterClass
  spec: Specialization
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
  combatantInfo: CombatantInfo // Nested combatant info
}

export async function statsByPlayerReport({ name, server, code, fight }: StatsByPlayerReportsArgs): Promise<TopStats> {
  const client = await useClientWithEnv()
  const data = await client.query({ query: REPORT_SUMMARY, variables: { code, fight } })

  // find the player in report
  const players = data.data?.reportData?.report?.table.data.playerDetails as { tanks: PlayerSummary[], healers: PlayerSummary[], dps: PlayerSummary[] }
  server = server.replace(' ', '')
  const player = [players.tanks, players.dps, players.healers].flat().find(p => p.name === name && p.server === server)

  if (player === undefined) {
    throw new Error('Player not found in report')
  }

  // Extract keys and min values using JSONPath
  const keys = JSONPath<string[]>({ path: '$.*~', json: player.combatantInfo.stats }) // Extract keys
  const minValues = JSONPath<number[]>({ path: '$.*.min', json: player.combatantInfo.stats }) // Extract min values

  // Combine keys and values into a single object
  const stats = keys.reduce((acc, key, index) => {
    key = key.toLowerCase().replace(' ', '-')
    // @ts-expect-error: acc maybe of any type
    acc[key] = minValues[index]
    return acc
  }, {}) as CharacterStats

  return {
    name,
    class: player.type,
    spec: player.specs[0],
    rank: -1,
    stats,
  }
}

export async function topStatsBySpecDungeon({ className, specName, dungeon }: BySpecDungeonArgs): Promise<TopStats[]> {
  const details = await rankingsBySpecDungeon({ className, specName, dungeon })

  const top5Stats = details.slice(0, 5)

  // note that Promise.all preserve the order of its input array and output array
  return Promise.all(top5Stats.map(async (ts, i) => {
    const stats = await statsByPlayerReport({ name: ts.name, server: ts.server.name, code: ts.report.code, fight: ts.report.fightID })
    return {
      ...stats,
      rank: i,
    }
  }))
}
