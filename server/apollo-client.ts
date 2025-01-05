import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core'

interface Result {
  token_type: string
  expires_in: number
  access_token: string
}

let storage = { access_token: '', aquired_at: 0, expires_in: 31104000 }

export async function getToken(clientId: string, clientSecret: string) {
  if (storage.aquired_at > 0 && (Date.now() - storage.aquired_at < storage.expires_in)) {
    return storage.access_token
  }

  const form = new FormData()
  form.append('grant_type', 'client_credentials')

  const result = await fetch('https://www.warcraftlogs.com/oauth/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
    },
    body: form,
  })
    .then(response => response.json())
    .catch(err => console.error(err)) as Result

  storage = { ...result, aquired_at: Date.now() }

  return result.access_token
}

interface WclConfig {
  clientId: string
  clientSecret: string
  host: string
}

export function getClient({ clientId, clientSecret, host }: WclConfig) {
  return getToken(clientId, clientSecret).then(token =>
    new ApolloClient({
      link: new HttpLink({
        uri: host,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      cache: new InMemoryCache(),
    }),
  )
}
