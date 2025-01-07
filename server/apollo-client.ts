import type { InMemoryCacheConfig } from '@apollo/client/core'
import process from 'node:process'
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core'
import dotenv from 'dotenv'

if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

interface Result {
  token_type: string
  expires_in: number
  access_token: string
}

let storage = { access_token: '', acquired_at: 0, expires_in: 31104000 }

export async function getToken(clientId: string, clientSecret: string) {
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

interface WclConfig {
  clientId: string
  clientSecret: string
  host: string
}

class ApolloClientSingleton {
  private static instance: ApolloClient<any> | null = null
  private static clientConfig: WclConfig | null = null
  private static options: InMemoryCacheConfig = {
    typePolicies: {
      ReportData: {
        keyFields: ['report', ['code']],
      },
      Report: {
        keyFields: ['code'],
      },
    },
  }

  public static async getInstance(config: WclConfig): Promise<ApolloClient<any>> {
    if (!this.instance) {
      if (!config && !this.clientConfig) {
        throw new Error('WclConfig must be provided on the first call to getInstance.')
      }

      this.clientConfig = config || this.clientConfig
      const { clientId, clientSecret, host } = this.clientConfig

      const token = await getToken(clientId, clientSecret)

      this.instance = new ApolloClient({
        link: new HttpLink({
          uri: host,
          headers: {
            authorization: `Bearer ${token}`,
          },
        }),
        cache: new InMemoryCache(this.options),
      })
    }

    return this.instance
  }
}

export async function useClient(config: WclConfig): Promise<ApolloClient<any>> {
  return ApolloClientSingleton.getInstance(config)
}

export async function useClientWithEnv(): Promise<ApolloClient<any>> {
  const wclConfig = {
    clientId: process.env.NUXT_WCL_CLIENT_ID ?? '',
    clientSecret: process.env.NUXT_WCL_CLIENT_SECRET ?? '',
    host: process.env.NUXT_WCL_HOST ?? '',
  }
  return ApolloClientSingleton.getInstance(wclConfig)
}
