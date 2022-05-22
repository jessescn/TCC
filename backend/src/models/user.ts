/* eslint-disable no-use-before-define */
/* istanbul ignore file */

import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model
} from 'sequelize'
import { sequelize } from 'database'
import bcrypt from 'bcrypt'
import { allPermissions } from 'middlewares/permissions'

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
  {
    tableName: 'users',
    sequelize
  }
)

User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get())

  delete values.password
  return values
}

User.beforeCreate(async (user, options) => {
  try {
    const hash = await bcrypt.hash(user.password, 10)
    user.setDataValue('password', hash)
  } catch (error) {
    throw new Error(error)
  }
})

User.create({
  password: 'admin',
  email: 'admin@admin.com',
  permissions: { ...allPermissions }
})

export default User
