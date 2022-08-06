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

import { RemoteTipoProcesso } from 'controllers/tipo-processo'

export type TipoProcessoStatus = 'ativo' | 'inativo' | 'rascunho'

export interface TipoProcessoModel
  extends Model<
    InferAttributes<TipoProcessoModel>,
    InferCreationAttributes<TipoProcessoModel>
  > {
  id: CreationOptional<number>
  nome: string
  descricao: CreationOptional<string>
  status: CreationOptional<TipoProcessoStatus>
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

const TipoProcesso = sequelize.define<TipoProcessoModel>('tipo_processo', {
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
})

TipoProcesso.belongsTo(User, { foreignKey: 'createdBy' })

export const createInitialTipoProcesso = async (
  tipoProcesso: RemoteTipoProcesso
) => {
  await TipoProcesso.findOrCreate({
    where: {
      nome: tipoProcesso.nome
    },
    defaults: tipoProcesso
  })
}

export default TipoProcesso
