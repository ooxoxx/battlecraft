import { z } from 'zod'

export enum Dungeon {
  AraKaraCityOfEchoes = '12660', // Ara-Kara, City of Echoes
  CityOfThreads = '12669', // City of Threads
  GrimBatol = '60670', // Grim Batol
  MistsOfTirnaScithe = '62290', // Mists of Tirna Scithe
  SiegeOfBoralus = '61822', // Siege of Boralus
  TheDawnbreaker = '12662', // The Dawnbreaker
  TheNecroticWake = '62286', // The Necrotic Wake
  TheStonevault = '12652', // The Stonevault
}

export enum CharacterClass {
  DeathKnight = 'DeathKnight',
  Druid = 'Druid',
  Hunter = 'Hunter',
  Mage = 'Mage',
  Monk = 'Monk',
  Paladin = 'Paladin',
  Priest = 'Priest',
  Rogue = 'Rogue',
  Shaman = 'Shaman',
  Warlock = 'Warlock',
  Warrior = 'Warrior',
  DemonHunter = 'DemonHunter',
  Evoker = 'Evoker',
}

export enum Specialization {
  Blood = 'Blood',
  Frost = 'Frost',
  Unholy = 'Unholy',
  Balance = 'Balance',
  Feral = 'Feral',
  Guardian = 'Guardian',
  Restoration = 'Restoration',
  BeastMastery = 'BeastMastery',
  Marksmanship = 'Marksmanship',
  Survival = 'Survival',
  Arcane = 'Arcane',
  Fire = 'Fire',
  Brewmaster = 'Brewmaster',
  Mistweaver = 'Mistweaver',
  Windwalker = 'Windwalker',
  Holy = 'Holy',
  Protection = 'Protection',
  Retribution = 'Retribution',
  Discipline = 'Discipline',
  Shadow = 'Shadow',
  Assassination = 'Assassination',
  Subtlety = 'Subtlety',
  Outlaw = 'Outlaw',
  Elemental = 'Elemental',
  Enhancement = 'Enhancement',
  Affliction = 'Affliction',
  Demonology = 'Demonology',
  Destruction = 'Destruction',
  Arms = 'Arms',
  Fury = 'Fury',
  Havoc = 'Havoc',
  Vengeance = 'Vengeance',
  Devastation = 'Devastation',
  Preservation = 'Preservation',
  Augmentation = 'Augmentation',
}

export interface CharacterStats {
  'strength'?: number
  'agility'?: number
  'intellect'?: number
  'stamina': number
  'leech': number
  'armor': number
  'mastery': number
  'haste': number
  'crit': number
  'versatility': number
  'item-level': number // note the quoted key for compatibility
  'avoidance': number
  'speed': number
  'block': number
  'parry': number
  'dodge': number
}

export const CharacterClassEnum = z.nativeEnum(CharacterClass)
export const SpecializationEnum = z.nativeEnum(Specialization)
export const DungeonEnum = z.nativeEnum(Dungeon)
