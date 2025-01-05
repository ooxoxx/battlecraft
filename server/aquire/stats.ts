import type { ApolloClient, InMemoryCache } from '@apollo/client'
import type { Dungeon } from '../types'
import { gql } from '../__generated__/gql'
import { client } from '../apollo-client'
import { ClassName, SpecName } from '../types'

interface StatsByPlayerArgs {
  id: number
  dungeon: Dungeon
}

const CHARACTER_RANKING = gql(/* GraphQL */ `
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
          count: 5
        )
      }
    }
  }
`)

async function statsByPlayer({ id, dungeon }: StatsByPlayerArgs) {

}

interface TopkBySpecAndDungeonArgs {
  className: ClassName
  spec: SpecName
  dungeon: Dungeon
}

export async function topkBySpecAndDungeon({ className, spec, dungeon }: TopkBySpecAndDungeonArgs) {
  const data = await client.query({ query: CHARACTER_RANKING, variables: {
    className: (<any>ClassName)[className],
    specName: (<any>SpecName)[spec],
  } })
  return data.data?.worldData?.encounter?.characterRankings
}
