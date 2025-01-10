// models/TopStats.ts
import type { Optional } from 'sequelize'
import type { CharacterClass, CharacterStats, Dungeon, Specialization } from './types'
import { DataTypes, Model, Sequelize } from 'sequelize'

// Define the attributes for the TopStats model
interface TopStatsAttributes {
  id?: number
  name: string
  rank: number
  class: CharacterClass
  spec: Specialization
  dungeon: Dungeon
  stats: CharacterStats
}

// Define the input attributes for creation
interface TopStatsCreationAttributes extends Optional<TopStatsAttributes, 'id'> {}

// Define the Sequelize model
export class TopStatsStore extends Model<TopStatsAttributes, TopStatsCreationAttributes> implements TopStatsAttributes {
  public id!: number
  public name!: string
  public rank!: number
  public class!: CharacterClass
  public spec!: Specialization
  public dungeon!: Dungeon
  public stats!: CharacterStats

  // Timestamps
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

// Initialize the model
function initTopStatsModel(sequelize: any) {
  TopStatsStore.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rank: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      class: {
        type: DataTypes.ENUM(
          'DeathKnight',
          'Druid',
          'Hunter',
          'Mage',
          'Monk',
          'Paladin',
          'Priest',
          'Rogue',
          'Shaman',
          'Warlock',
          'Warrior',
          'DemonHunter',
          'Evoker',
        ),
        allowNull: false,
      },
      spec: {
        type: DataTypes.ENUM(
          'Blood',
          'Frost',
          'Unholy',
          'Balance',
          'Feral',
          'Guardian',
          'Restoration',
          'BeastMastery',
          'Marksmanship',
          'Survival',
          'Arcane',
          'Fire',
          'Brewmaster',
          'Mistweaver',
          'Windwalker',
          'Holy',
          'Protection',
          'Retribution',
          'Discipline',
          'Shadow',
          'Assassination',
          'Subtlety',
          'Outlaw',
          'Elemental',
          'Enhancement',
          'Affliction',
          'Demonology',
          'Destruction',
          'Arms',
          'Fury',
          'Havoc',
          'Vengeance',
          'Devastation',
          'Preservation',
          'Augmentation',
        ),
        allowNull: false,
      },
      dungeon: {
        type: DataTypes.ENUM(
          '12660', // Ara-Kara, City of Echoes
          '12669', // City of Threads
          '60670', // Grim Batol
          '62290', // Mists of Tirna Scithe
          '61822', // Siege of Boralus
          '12662', // The Dawnbreaker
          '62286', // The Necrotic Wake
          '12652', // The Stonevault
        ),
        allowNull: false,
      },
      stats: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'top_stats',
      indexes: [
        // Create a composite index for class, spec, and dungeon
        {
          name: 'class_spec_dungeon_index', // Name of the index
          fields: ['class', 'spec', 'dungeon'], // Fields to include in the index
          unique: false, // Set to true if the combination should be unique
        },
      ],
    },
  )
}

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite',
})

// Initialize models
initTopStatsModel(sequelize)

// Sync models with the database
sequelize.sync({ force: true }).then(() => {
  console.log('Database synced')
})

