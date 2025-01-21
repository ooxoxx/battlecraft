import type { Config } from '@netlify/functions'

export default async (req: Request) => {
  const { next_run } = await req.json()

  await fetch('/api/_aquire')

  console.info('Received event! Next invocation at:', next_run)
}

export const config: Config = {
  schedule: '*/2 * * * *',
}
