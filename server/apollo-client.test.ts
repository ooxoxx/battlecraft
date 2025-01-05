import { gql } from '@apollo/client/core'
import { getIntrospectionQuery } from 'graphql'
import { expect, it } from 'vitest'
import { useClientWithEnv } from './apollo-client'

it('passes environment variables to the client', async () => {
  const client = await useClientWithEnv()
  const data = await client.query({ query: gql(getIntrospectionQuery()) })
  expect(data.data).not.toBeNaN()
})
