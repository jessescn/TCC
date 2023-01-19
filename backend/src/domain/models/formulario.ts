/* eslint-disable no-use-before-define */
/* istanbul ignore file */
import { sequelize } from 'database'
import Actor, { ActorModel } from 'domain/models/actor'
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model
} from 'sequelize'

export type TipoCampoFormulario =
  | 'paragrafo'
  | 'resposta'
  | 'data'
  | 'hora'
  | 'escolha_multipla'
  | 'caixa_verificacao'
  | 'grelha_multipla'
  | 'grelha_verificacao'

export type CampoFormulario<T = any> = {
  ordem: number
  tipo: TipoCampoFormulario
  obrigatorio?: boolean
  configuracao_campo?: T
}

export interface FormularioModel {
  id: number
  nome: string
  descricao: string
  campos: CampoFormulario[]
  deleted: boolean
  template?: string
  actor?: ActorModel
  createdAt?: Date
  updatedAt?: Date
}

export interface FormularioAttributes
  extends Model<
    InferAttributes<FormularioAttributes>,
    InferCreationAttributes<FormularioAttributes>
  > {
  id: CreationOptional<number>
  nome: string
  descricao: CreationOptional<string>
  campos: CampoFormulario[]
  deleted: CreationOptional<boolean>
  template: CreationOptional<string>
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
}

const Formulario = sequelize.define<FormularioAttributes>('formulario', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT
  },
  campos: {
    type: DataTypes.ARRAY(DataTypes.JSON),
    allowNull: false
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  template: {
    type: DataTypes.TEXT
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
})

Formulario.belongsTo(Actor, { foreignKey: 'createdBy' })
Actor.hasMany(Formulario)

export default Formulario
