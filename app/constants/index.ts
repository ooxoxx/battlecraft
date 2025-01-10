export const appName = 'Vitesse for Nuxt 3'
export const appDescription = 'Vitesse for Nuxt 3'

export const dungeons = [
  { name: 'AraKaraCityOfEchoes', id: '12660' },
  { name: 'CityOfThreads', id: '12669' },
  { name: 'GrimBatol', id: '60670' },
  { name: 'MistsOfTirnaScithe', id: '62290' },
  { name: 'SiegeOfBoralus', id: '61822' },
  { name: 'TheDawnbreaker', id: '12662' },
  { name: 'TheNecroticWake', id: '62286' },
  { name: 'TheStonevaul', id: '12652' },
]

export const classesAndSpecs = [
  {
    name: 'Death Knight',
    specs: ['Blood', 'Frost', 'Unholy'],
  },
  {
    name: 'Druid',
    specs: ['Balance', 'Feral', 'Guardian', 'Restoration'],
  },
  {
    name: 'Hunter',
    specs: ['Beast Mastery', 'Marksmanship', 'Survival'],
  },
  {
    name: 'Mage',
    specs: ['Arcane', 'Fire', 'Frost'],
  },
  {
    name: 'Monk',
    specs: ['Brewmaster', 'Mistweaver', 'Windwalker'],
  },
  {
    name: 'Paladin',
    specs: ['Holy', 'Protection', 'Retribution'],
  },
  {
    name: 'Priest',
    specs: ['Discipline', 'Holy', 'Shadow'],
  },
  {
    name: 'Rogue',
    specs: ['Assassination', 'Outlaw', 'Subtlety'],
  },
  {
    name: 'Shaman',
    specs: ['Elemental', 'Enhancement', 'Restoration'],
  },
  {
    name: 'Warlock',
    specs: ['Affliction', 'Demonology', 'Destruction'],
  },
  {
    name: 'Warrior',
    specs: ['Arms', 'Fury', 'Protection'],
  },
  {
    name: 'Demon Hunter',
    specs: ['Havoc', 'Vengeance'],
  },
  {
    name: 'Evoker',
    specs: ['Devastation', 'Preservation', 'Augmentation'],
  },
]

export function toCompact(str: string): string {
  return str.replace(/ /g, '')
}

// WoW Class Colors
export const classColors: Record<string, string> = {
  'Death Knight': '#C41F3B',
  'Druid': '#FF7D0A',
  'Hunter': '#A9D271',
  'Mage': '#40C7EB',
  'Monk': '#00FF96',
  'Paladin': '#F58CBA',
  'Priest': '#FFFFFF',
  'Rogue': '#FFF569',
  'Shaman': '#0070DE',
  'Warlock': '#8787ED',
  'Warrior': '#C79C6E',
  'Demon Hunter': '#A330C9',
  'Evoker': '#33937F',
}
