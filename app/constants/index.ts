export const appName = 'BattleCraft'
export const appDescription = 'Data-driven class guides for World of Warcraft.'

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
    compactName: 'DeathKnight',
    specs: [
      { name: 'Blood', compactName: 'Blood', role: 'tank', primaryStat: 'strength' },
      { name: 'Frost', compactName: 'Frost', role: 'dps', primaryStat: 'strength' },
      { name: 'Unholy', compactName: 'Unholy', role: 'dps', primaryStat: 'strength' },
    ],
  },
  {
    name: 'Druid',
    compactName: 'Druid',
    specs: [
      { name: 'Balance', compactName: 'Balance', role: 'dps', primaryStat: 'intellect' },
      { name: 'Feral', compactName: 'Feral', role: 'dps', primaryStat: 'agility' },
      { name: 'Guardian', compactName: 'Guardian', role: 'tank', primaryStat: 'agility' },
      { name: 'Restoration', compactName: 'Restoration', role: 'healer', primaryStat: 'intellect' },
    ],
  },
  {
    name: 'Hunter',
    compactName: 'Hunter',
    specs: [
      { name: 'Beast Mastery', compactName: 'BeastMastery', role: 'dps', primaryStat: 'agility' },
      { name: 'Marksmanship', compactName: 'Marksmanship', role: 'dps', primaryStat: 'agility' },
      { name: 'Survival', compactName: 'Survival', role: 'dps', primaryStat: 'agility' },
    ],
  },
  {
    name: 'Mage',
    compactName: 'Mage',
    specs: [
      { name: 'Arcane', compactName: 'Arcane', role: 'dps', primaryStat: 'intellect' },
      { name: 'Fire', compactName: 'Fire', role: 'dps', primaryStat: 'intellect' },
      { name: 'Frost', compactName: 'Frost', role: 'dps', primaryStat: 'intellect' },
    ],
  },
  {
    name: 'Monk',
    compactName: 'Monk',
    specs: [
      { name: 'Brewmaster', compactName: 'Brewmaster', role: 'tank', primaryStat: 'agility' },
      { name: 'Mistweaver', compactName: 'Mistweaver', role: 'healer', primaryStat: 'intellect' },
      { name: 'Windwalker', compactName: 'Windwalker', role: 'dps', primaryStat: 'agility' },
    ],
  },
  {
    name: 'Paladin',
    compactName: 'Paladin',
    specs: [
      { name: 'Holy', compactName: 'Holy', role: 'healer', primaryStat: 'intellect' },
      { name: 'Protection', compactName: 'Protection', role: 'tank', primaryStat: 'strength' },
      { name: 'Retribution', compactName: 'Retribution', role: 'dps', primaryStat: 'strength' },
    ],
  },
  {
    name: 'Priest',
    compactName: 'Priest',
    specs: [
      { name: 'Discipline', compactName: 'Discipline', role: 'healer', primaryStat: 'intellect' },
      { name: 'Holy', compactName: 'Holy', role: 'healer', primaryStat: 'intellect' },
      { name: 'Shadow', compactName: 'Shadow', role: 'dps', primaryStat: 'intellect' },
    ],
  },
  {
    name: 'Rogue',
    compactName: 'Rogue',
    specs: [
      { name: 'Assassination', compactName: 'Assassination', role: 'dps', primaryStat: 'agility' },
      { name: 'Outlaw', compactName: 'Outlaw', role: 'dps', primaryStat: 'agility' },
      { name: 'Subtlety', compactName: 'Subtlety', role: 'dps', primaryStat: 'agility' },
    ],
  },
  {
    name: 'Shaman',
    compactName: 'Shaman',
    specs: [
      { name: 'Elemental', compactName: 'Elemental', role: 'dps', primaryStat: 'intellect' },
      { name: 'Enhancement', compactName: 'Enhancement', role: 'dps', primaryStat: 'agility' },
      { name: 'Restoration', compactName: 'Restoration', role: 'healer', primaryStat: 'intellect' },
    ],
  },
  {
    name: 'Warlock',
    compactName: 'Warlock',
    specs: [
      { name: 'Affliction', compactName: 'Affliction', role: 'dps', primaryStat: 'intellect' },
      { name: 'Demonology', compactName: 'Demonology', role: 'dps', primaryStat: 'intellect' },
      { name: 'Destruction', compactName: 'Destruction', role: 'dps', primaryStat: 'intellect' },
    ],
  },
  {
    name: 'Warrior',
    compactName: 'Warrior',
    specs: [
      { name: 'Arms', compactName: 'Arms', role: 'dps', primaryStat: 'strength' },
      { name: 'Fury', compactName: 'Fury', role: 'dps', primaryStat: 'strength' },
      { name: 'Protection', compactName: 'Protection', role: 'tank', primaryStat: 'strength' },
    ],
  },
  {
    name: 'Demon Hunter',
    compactName: 'DemonHunter',
    specs: [
      { name: 'Havoc', compactName: 'Havoc', role: 'dps', primaryStat: 'agility' },
      { name: 'Vengeance', compactName: 'Vengeance', role: 'tank', primaryStat: 'agility' },
    ],
  },
  {
    name: 'Evoker',
    compactName: 'Evoker',
    specs: [
      { name: 'Devastation', compactName: 'Devastation', role: 'dps', primaryStat: 'intellect' },
      { name: 'Preservation', compactName: 'Preservation', role: 'healer', primaryStat: 'intellect' },
      { name: 'Augmentation', compactName: 'Augmentation', role: 'dps', primaryStat: 'intellect' },
    ],
  },
] as const

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

export const Dungeons = {
  12660: 'Ara-Kara, City of Echoes', // Ara-Kara, City of Echoes
  12669: 'City of Threads', // City of Threads
  60670: 'Grim Batol', // Grim Batol
  62290: 'Mists of Tirna Scithe', // Mists of Tirna Scithe
  61822: 'Siege of Boralus', // Siege of Boralus
  12662: 'The Dawnbreaker', // The Dawnbreaker
  62286: 'The Necrotic Wake', // The Necrotic Wake
  12652: 'The Stonevault', // The Stonevault
} as const
