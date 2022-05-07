/* eslint-disable no-use-before-define */
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model
} from 'sequelize'
import { sequelize } from '../database'
import bcrypt from 'bcrypt'

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  id: number
  name: string
  email: string
  password: string
  deleted: boolean
  permissions: Record<string, string>
  createdAt: Date
  updatedAt: Date
  validPassword(password: string) {
    return bcrypt.compare(password, this.password)
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    permissions: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {}
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  { tableName: 'users', sequelize }
)

User.beforeCreate(async (user, options) => {
  try {
    const hash = await bcrypt.hash(user.password, 10)
    user.setDataValue('password', hash)
  } catch (error) {
    throw new Error(error)
  }
})

export default User
