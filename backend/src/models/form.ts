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

export interface FormModel {
  id: number
  name: string
  fields: FormField[]
  createdAt?: Date
  updatedAt?: Date
}

class Form extends Model<InferAttributes<Form>, InferCreationAttributes<Form>> {
  id: number
  name: string
  fields: FormField[]
  createdAt: Date
  updatedAt: Date
}

Form.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fields: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  { sequelize, tableName: 'forms' }
)

export default Form
