import type { Optional } from 'sequelize'
import { DataTypes, Model, Sequelize } from 'sequelize'

// Define the attributes for the PopularStats model
interface PopularStatsAttributes {
  id: number
  name: string
  region: string
  server: string
  class: string // Use "className" if "class" causes a conflict
  spec: string
  primaryStat: string // Strength, Intellect, etc.
  haste: number
  crit: number
  mastery: number
  versatility: number
  parry: number
  block: number
}

// Define attributes that are optional when creating a new instance
type PopularStatsCreationAttributes = Optional<PopularStatsAttributes, 'id'>

// Define the PopularStats model
class PopularStats extends Model<PopularStatsAttributes, PopularStatsCreationAttributes> {
  declare id: number
  declare name: string
  declare region: string
  declare server: string
  declare class: string
  declare spec: string
  declare primaryStat: string
  declare haste: number
  declare crit: number
  declare mastery: number
  declare versatility: number
  declare parry: number
  declare block: number
}

// Initialize Sequelize with SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite', // SQLite file location
})

// Initialize the PopularStats model
PopularStats.init(
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
    region: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    server: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    class: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    spec: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    primaryStat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    haste: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    crit: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    mastery: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    versatility: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    parry: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    block: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize, // Pass the Sequelize instance
    tableName: 'popular_stats', // Define the table name
    timestamps: false, // Disable createdAt and updatedAt columns
  },
)

// Sync the model with the database
sequelize.sync({ alter: true }).then(() => {
  console.log('PopularStats table has been created or updated.')
})

export { PopularStats, sequelize }

