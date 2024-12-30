import { Graffle } from 'graffle'
import { parse } from 'graphql'

interface Result {
  token_type: string
  expires_in: number
  access_token: string
}

let storage = { access_token: '', aquired_at: 0, expires_in: 31104000 }

async function getToken(clientId: string, clientSecret: string) {
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

export default defineEventHandler(async (event) => {
  const { wcl: { clientId, clientSecret, host } } = useRuntimeConfig(event)
  const token = await getToken(clientId, clientSecret)

  console.log(token)
  const client = Graffle
    .create()
    .transport({
      url: host,
      headers: {
        authorization: `Bearer ${token}`,
      },
    })

  const data = await client.gql(parse(`
    query characterRanking($id: Int = 12660) {
      worldData {
        encounter(id: $id) {
          characterRankings(page:1, className: "Paladin", specName: "Protection", metric: playerscore, leaderboard: LogsOnly,)
        }
      }
    }
  `)).send({ id: 12660 })

  console.log(data)

  return { data }
})
