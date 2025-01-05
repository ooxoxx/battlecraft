import process from 'node:process'
import fetch from 'cross-fetch'
import { buildClientSchema, getIntrospectionQuery } from 'graphql'
import { getToken } from './apollo-client'
import 'dotenv/config'

export default async () => {
  const introspectionQuery = getIntrospectionQuery()

  const token = await getToken(process.env.NUXT_WCL_CLIENT_ID ?? '', process.env.NUXT_WCL_CLIENT_SECRET ?? '')

  const response = await fetch(process.env.NUXT_WCL_HOST ?? '', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ query: introspectionQuery }),
  })

  const data = await response.json()

  return buildClientSchema(data.data)
}
