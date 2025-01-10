<script setup lang="ts">
const route = useRoute()
const className = 'className' in route.params && route.params.className
const specName = 'specName' in route.params && route.params.specName
// const { data } = useFetch('/api/topstats', {
//   query: { className, specName, dungeon: 12660 },
// })
const { data } = useAsyncQuery(gql`
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
 `, { className, specName, id: 12660 })

// const { data: data2 } = useAsyncQuery(gql`
//   query Query {
//     gen1_species: pokemon_v2_pokemonspecies(
//       where: { pokemon_v2_generation: { name: { _eq: "generation-i" } } }
//         order_by: { id: asc }
//       ) {
//       name
//         id
//       }
//   }
// `)
</script>

<template>
  <div>
    <span>{{ data }}</span>
    <div>
      <NuxtLink
        class="m-3 text-sm btn"
        to="/"
      >
        Back
      </NuxtLink>
    </div>
  </div>
</template>
