/* eslint-disable no-use-before-define */
/* istanbul ignore file */
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model
} from 'sequelize'
import { sequelize } from 'database'
import User from './user'

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
  dataInicio: CreationOptional<Date>
  dataFim: CreationOptional<Date>
  escopo: string
  formularios: number[]
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
    type: DataTypes.ARRAY(DataTypes.NUMBER),
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
  dataInicio: DataTypes.DATE,
  dataFim: DataTypes.DATE,
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
})

TipoProcesso.belongsTo(User, { foreignKey: 'createdBy' })

export default TipoProcesso