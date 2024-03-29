/* eslint-disable no-use-before-define */
/* istanbul ignore file */
import { sequelize } from 'database'
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model
} from 'sequelize'
import Actor, { ActorModel } from './actor'

export type TipoProcedimentoStatus = 'ativo' | 'inativo' | 'rascunho'

export interface TipoProcedimentoModel {
  id: number
  nome: string
  descricao: string
  status: TipoProcedimentoStatus
  dataInicio: string
  dataFim: string
  escopo: string
  formularios: number[]
  publicos: string[]
  colegiado: boolean
  revisao_coordenacao: boolean
  deleted: boolean
  actor?: ActorModel
  createdAt?: Date
  updatedAt?: Date
}

export interface TipoProcedimentoAttributes
  extends Model<
    InferAttributes<TipoProcedimentoAttributes>,
    InferCreationAttributes<TipoProcedimentoAttributes>
  > {
  id: CreationOptional<number>
  nome: string
  descricao: CreationOptional<string>
  status: CreationOptional<TipoProcedimentoStatus>
  dataInicio: CreationOptional<string>
  dataFim: CreationOptional<string>
  escopo: CreationOptional<string>
  formularios: number[]
  publicos: string[]
  colegiado: boolean
  revisao_coordenacao: boolean
  deleted: CreationOptional<boolean>
  createdAt?: CreationOptional<Date>
  updatedAt?: CreationOptional<Date>
  createdBy?: CreationOptional<number>
}

const TipoProcedimento = sequelize.define<TipoProcedimentoAttributes>(
  'tipo_procedimento',
  {
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
    status: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: 'inativo'
    },
    escopo: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: 'privado'
    },
    formularios: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false,
      defaultValue: []
    },
    publicos: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: []
    },
    colegiado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    revisao_coordenacao: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    dataInicio: DataTypes.STRING,
    dataFim: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }
)

TipoProcedimento.belongsTo(Actor, { foreignKey: 'createdBy' })

export default TipoProcedimento
