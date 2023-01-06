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
import TipoProcedimento from './tipo-procedimento'

export const statusList = {
  criado: { label: 'Criado', color: 'info.warning' },
  correcoes_pendentes: { label: 'Correções Pendentes', color: 'info.warning' },
  em_analise: { label: 'Em análise', color: 'info.warning' },
  em_homologacao: { label: 'Em homologação', color: 'info.warning' },
  deferido: { label: 'Deferido', color: 'info.warning' },
  indeferido: { label: 'Indeferido', color: 'info.warning' },
  encaminhado: { label: 'Encaminhado', color: 'info.success' }
}

export type TStatus = keyof typeof statusList

export type CampoInvalido = {
  formulario: number
  ordem: number
}

export type RespostaCampo = {
  valor: any
  ordem: number
}

export type Resposta = {
  formulario: number
  campos: RespostaCampo[]
}

export type Status = {
  data: string
  status: TStatus
}

export type Revisao = {
  comentario: string
  data: string
  autor: ActorModel
  campos: CampoInvalido[]
}

export interface ProcedimentoModel {
  id: number
  status: Status[]
  revisoes: Revisao[]
  respostas: Resposta[]
  deleted: boolean
  tipo?: number
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
}

export interface ProcedimentoAttributes
  extends Model<
    InferAttributes<ProcedimentoAttributes>,
    InferCreationAttributes<ProcedimentoAttributes>
  > {
  id: CreationOptional<number>
  status: Status[]
  revisoes: Revisao[]
  respostas: Resposta[]
  deleted: boolean
  tipo?: number
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
}

const Procedimento = sequelize.define<ProcedimentoAttributes>('procedimento', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  status: {
    type: DataTypes.ARRAY(DataTypes.JSON),
    allowNull: false,
    defaultValue: []
  },
  respostas: {
    type: DataTypes.ARRAY(DataTypes.JSON),
    allowNull: false,
    defaultValue: []
  },
  revisoes: {
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

Procedimento.belongsTo(TipoProcedimento, { foreignKey: 'tipo' })
Procedimento.belongsTo(Actor, { foreignKey: 'createdBy' })

Actor.hasMany(Procedimento)

export default Procedimento
