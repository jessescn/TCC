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

export const statusList = {
  criado: { label: 'Criado', color: 'info.warning' },
  correcoes_pendentes: { label: 'Correções Pendentes', color: 'info.warning' },
  em_analise: { label: 'Em análise', color: 'info.warning' },
  em_homologacao: { label: 'Em homologação', color: 'info.warning' },
  deferido: { label: 'Deferido', color: 'info.warning' },
  indeferido: { label: 'Infererido', color: 'info.warning' }
}

export type TStatus =
  | 'criado'
  | 'correcoes_pendentes'
  | 'em_analise'
  | 'em_homologacao'
  | 'deferido'
  | 'indeferido'

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

export type VotoProcesso = {
  aprovado: boolean
  autor: number
  data?: string
}

export type Status = {
  data: string
  status: TStatus
}

export type Revisao = {
  comentario: string
  data: string
  autor: number
  campos: CampoInvalido[]
}

export interface ProcessoModel
  extends Model<
    InferAttributes<ProcessoModel>,
    InferCreationAttributes<ProcessoModel>
  > {
  id: CreationOptional<number>
  status: Status[]
  revisoes: Revisao[]
  respostas: Resposta[]
  votos: VotoProcesso[]
  deleted: boolean
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
}

const Processo = sequelize.define<ProcessoModel>('processo', {
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
  votos: {
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
Processo.belongsTo(User, { foreignKey: 'createdBy' })

User.hasMany(Processo)

export default Processo
