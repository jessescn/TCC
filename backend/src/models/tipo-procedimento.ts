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
import User from './user'

import { RemoteTipoProcedimento } from 'controllers/tipo-procedimento'

export type TipoProcedimentoStatus = 'ativo' | 'inativo' | 'rascunho'

export interface TipoProcedimentoModel
  extends Model<
    InferAttributes<TipoProcedimentoModel>,
    InferCreationAttributes<TipoProcedimentoModel>
  > {
  id: CreationOptional<number>
  nome: string
  descricao: CreationOptional<string>
  status: CreationOptional<TipoProcedimentoStatus>
  dataInicio: CreationOptional<string>
  dataFim: CreationOptional<string>
  escopo: string
  formularios: number[]
  publicos: string[]
  colegiado: boolean
  deleted: boolean
  createdAt?: Date
  updatedAt?: Date
}

const TipoProcedimento = sequelize.define<TipoProcedimentoModel>(
  'tipo_procedimento',
  {
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
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'inativo'
    },
    escopo: {
      type: DataTypes.STRING,
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

TipoProcedimento.belongsTo(User, { foreignKey: 'createdBy' })

export const createInitialTipoProcedimento = async (
  tipoProcedimento: RemoteTipoProcedimento
) => {
  await TipoProcedimento.findOrCreate({
    where: {
      nome: tipoProcedimento.nome
    },
    defaults: tipoProcedimento
  })
}

export default TipoProcedimento
