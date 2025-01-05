import { generate } from '@graphql-codegen/cli'

generate({
  schema: [{
    wcl: {
      loader: './server/schema-loader.ts',
    },
  }],
  documents: ['server/**/*.ts'],
  generates: {
    './server/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
})
