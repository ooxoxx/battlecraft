'use strict'
import { gql } from '../__generated__'
import { useClient } from '../apollo-client'

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
        )
      }
    }
  }
`)

export default defineEventHandler(async (event) => {
  // console.log('/api/characterRanking entered')

  const { className, specName } = getQuery(event) as {
    className: string
    specName: string
  }

  const { wcl } = useRuntimeConfig(event)

  const client = await useClient(wcl)
  const data = await client.query({
    query: CHARACTER_RANKING,
    variables: { id: 12660, className, specName },
  })

  return data.data.worldData?.encounter?.characterRankings
})
