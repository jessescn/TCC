/* eslint-disable no-use-before-define */
/* istanbul ignore file */
import { sequelize } from 'database'
import Procedimento, { ProcedimentoModel } from 'domain/models/procedimento'
import Actor, { ActorModel } from 'domain/models/actor'
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model
} from 'sequelize'

export interface ComentarioModel {
  id: number
  procedimentoId: number
  conteudo: string
  deleted: boolean
  procedimento?: ProcedimentoModel
  actor?: ActorModel
  createdAt?: Date
  updatedAt?: Date
}

export interface ComentarioAttributes
  extends Model<
    InferAttributes<ComentarioAttributes>,
    InferCreationAttributes<ComentarioAttributes>
  > {
  id: CreationOptional<number>
  procedimentoId: CreationOptional<number>
  conteudo: string
  deleted: CreationOptional<boolean>
  procedimento?: ProcedimentoModel
  createdAt?: Date
  updatedAt?: Date
  createdBy?: CreationOptional<number>
}

const Comentario = sequelize.define<ComentarioAttributes>('comentario', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  procedimentoId: {
    type: DataTypes.INTEGER
  },
  conteudo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
})

Comentario.belongsTo(Procedimento)
Comentario.belongsTo(Actor, { foreignKey: 'createdBy' })
Procedimento.hasMany(Comentario)

export default Comentario
