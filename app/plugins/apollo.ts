import type { ApolloClient } from '@apollo/client'
import type { HookResult } from 'nuxt/schema'
import process from 'node:process'

interface Result {
  token_type: string
  expires_in: number
  access_token: string
}

let storage = { access_token: '', acquired_at: 0, expires_in: 31104000 }
async function getToken(clientId: string, clientSecret: string) {
  if (
    storage.acquired_at > 0
    && Date.now() - storage.acquired_at < storage.expires_in * 1000
  ) {
    return storage.access_token
  }

  const form = new FormData()
  form.append('grant_type', 'client_credentials')

  const result = (await fetch('https://www.warcraftlogs.com/oauth/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
    },
    body: form,
  })
    .then(response => response.json())
    .catch(err => console.error(err))) as Result

  storage = { ...result, acquired_at: Date.now() }

  return result.access_token
}

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig()
  const clientId = config.wcl.clientId
  const clientSecret = config.wcl.clientSecret

  const newToken = await getToken(clientId, clientSecret)

  nuxtApp.hook('apollo:auth', ({ client: _, token }) => {
    console.log(newToken)
    token.value = newToken
  })

  console.log('plugin apollo ended')
})

declare module '#app' {
  interface NuxtHooks {
    'apollo:auth': (ctx: { client: ApolloClient<any>, token: Ref<string> }) => HookResult
  }
}
