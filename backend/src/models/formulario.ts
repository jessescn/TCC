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

export type FormField = {
  name: string
  placeholder: string
  order: number
  required: boolean
  type: string
}

export type FormularioStatus = 'ativo' | 'inativo' | 'rascunho'

export interface FormularioModel
  extends Model<
    InferAttributes<FormularioModel>,
    InferCreationAttributes<FormularioModel>
  > {
  id: CreationOptional<number>
  nome: string
  descricao: CreationOptional<string>
  status: CreationOptional<FormularioStatus>
  campos: FormField[]
  deleted: CreationOptional<boolean>
  createdAt?: Date
  updatedAt?: Date
}

const Formulario = sequelize.define<FormularioModel>('formulario', {
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

Formulario.belongsTo(User, { constraints: true })

User.hasMany(Formulario)

export default Formulario
