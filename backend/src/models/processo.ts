/* eslint-disable no-use-before-define */
/* istanbul ignore file */
import { sequelize } from 'database'
import User from 'models/user'
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model
} from 'sequelize'
import TipoProcesso from './tipo-processo'

export type CampoInvalido = {
  order: number
  comentario: string
  autor: number
}

export type VotoProcesso = {
  aprovado: boolean
  autor: number
  data: Date
}

export interface ProcessoModel
  extends Model<
    InferAttributes<ProcessoModel>,
    InferCreationAttributes<ProcessoModel>
  > {
  id: CreationOptional<number>
  status: string
  camposInvalidos: CampoInvalido[]
  resposta: string
  votos?: VotoProcesso[]
  deleted: boolean
  createdAt?: Date
  updatedAt?: Date
}

const Processo = sequelize.define<ProcessoModel>('processo', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'criado'
  },
  resposta: {
    type: DataTypes.STRING
  },
  camposInvalidos: {
    type: DataTypes.ARRAY(DataTypes.JSON),
    allowNull: false,
    defaultValue: []
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
})

Processo.belongsTo(TipoProcesso, { foreignKey: 'tipo' })
Processo.belongsTo(User, { foreignKey: 'autor' })
User.hasMany(Processo)

export default Processo
