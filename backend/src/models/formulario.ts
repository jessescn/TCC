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

export type CampoFormulario = {
  ordem: number
  pergunta?: string
  descricao?: string
  obrigatorio: boolean
  outros?: any
}

export interface FormularioModel
  extends Model<
    InferAttributes<FormularioModel>,
    InferCreationAttributes<FormularioModel>
  > {
  id: CreationOptional<number>
  campos: CampoFormulario[]
  deleted: CreationOptional<boolean>
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
}

const Formulario = sequelize.define<FormularioModel>('formulario', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
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

Formulario.belongsTo(User, { foreignKey: 'createdBy' })
User.hasMany(Formulario)

export default Formulario
