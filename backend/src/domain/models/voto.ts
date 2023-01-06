import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model
} from 'sequelize'
import { sequelize } from 'database'
import Procedimento from './procedimento'
import Actor from './actor'

export interface VotoModel {
  id: number
  procedimentoId: number
  aprovado: boolean
  createdAt?: Date
  updatedAt?: Date
  autorId: number
}

export interface VotoAttributes
  extends Model<
    InferAttributes<VotoAttributes>,
    InferCreationAttributes<VotoAttributes>
  > {
  id: CreationOptional<number>
  aprovado: boolean
  procedimentoId: CreationOptional<number>
  autorId: CreationOptional<number>
  createdAt?: Date
  updatedAt?: Date
}

const Voto = sequelize.define<VotoAttributes>('voto', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  procedimentoId: {
    type: DataTypes.INTEGER
  },
  autorId: {
    type: DataTypes.INTEGER
  },
  aprovado: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
})

Voto.belongsTo(Procedimento)
Voto.belongsTo(Actor, { foreignKey: 'autorId', as: 'autor' })
Procedimento.hasMany(Voto)

export default Voto
