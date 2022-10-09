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

type TipoCampoFormulario =
  | 'paragrafo'
  | 'resposta'
  | 'data'
  | 'hora'
  | 'ficheiro'
  | 'escolha_multipla'
  | 'caixa_verificacao'
  | 'grelha_multipla'
  | 'grelha_verificacao'

export type CampoFormulario = {
  ordem: number
  tipo: TipoCampoFormulario
  obrigatorio?: boolean
  configuracao_campo?: any
}

export interface FormularioModel {
  id: number
  nome: string
  descricao: string
  campos: CampoFormulario[]
  deleted: boolean
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
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.STRING
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
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
})

Formulario.belongsTo(Actor, { foreignKey: 'createdBy' })
Actor.hasMany(Formulario)

export default Formulario
