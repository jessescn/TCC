/* eslint-disable no-use-before-define */
/* istanbul ignore file */
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model
} from 'sequelize'
import { sequelize } from 'database'

export type FormField = {
  name: string
  placeholder: string
  order: number
  required: boolean
  type: string
}

export type FormularioStatus = 'ativo' | 'inativo' | 'rascunho'

export interface FormModel {
  id: number
  nome: string
  status: FormularioStatus // 'ativo' | 'inativo'
  campos: FormField[]
  createdAt?: Date
  updatedAt?: Date
}

class Formulario extends Model<
  InferAttributes<Formulario>,
  InferCreationAttributes<Formulario>
> {
  id: number
  nome: string
  status: string
  campos: FormField[]
  createdAt: Date
  updatedAt: Date
}

Formulario.init(
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
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    campos: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  { sequelize, tableName: 'formularios', freezeTableName: true }
)

// Form.belongsTo(User)
// User.hasMany(Form, {
//   foreignKey: {
//     name: 'user',
//     allowNull: false
//   }
// })

export default Formulario
