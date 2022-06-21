import Formulario from 'models/formulario'
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
import User from 'models/user'

export type CampoInvalido = {
  order: number
  comentario: string
  autor: number
}

export interface ProcessoModel
  extends Model<
    InferAttributes<ProcessoModel>,
    InferCreationAttributes<ProcessoModel>
  > {
  id: CreationOptional<number>
  nome: string
  dataFim: Date
  dataInicio: Date
  status: CreationOptional<string>
  dadosPreenchidos: string // JSON.stringify do formulario preenchido
  camposInvalidos: CampoInvalido[]
  comentarios: string[] // TODO: linkar quando implementar a entidade comentário
  deleted: CreationOptional<boolean>
  createdAt?: Date
  updatedAt?: Date
}

const Processo = sequelize.define<ProcessoModel>('processo', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'criado'
  },
  comentarios: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false
  },
  dadosPreenchidos: {
    type: DataTypes.STRING
  },
  camposInvalidos: {
    type: DataTypes.ARRAY(DataTypes.JSON),
    allowNull: false
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

Processo.belongsTo(Formulario)
Processo.belongsTo(User)
User.hasMany(Processo)

export default Processo
