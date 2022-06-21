import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model
} from 'sequelize'
import { sequelize } from 'database'
import bcrypt from 'bcrypt'
import { Admin } from 'types/auth/actors'
import { ProcessoModel } from './processo'

export interface UserModel
  extends Model<
    InferAttributes<UserModel>,
    InferCreationAttributes<UserModel>
  > {
  id: CreationOptional<number>
  nome: string
  email: string
  senha: string
  deleted: CreationOptional<boolean>
  permissoes: Record<string, string>
  processos?: ProcessoModel[]
  createdAt?: Date
  updatedAt?: Date
}

const User = sequelize.define<UserModel>('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  permissoes: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: {}
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
})

User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get())

  delete values.senha
  return values
}

User.beforeCreate(async (user, options) => {
  try {
    const hash = await bcrypt.hash(user.senha, 10)
    user.setDataValue('senha', hash)
  } catch (error) {
    throw new Error(error)
  }
})

User.findOrCreate({
  where: { email: process.env.ADMIN_EMAIL },
  defaults: {
    senha: process.env.ADMIN_PASSWORD,
    email: process.env.ADMIN_EMAIL,
    permissoes: { ...Admin }
  }
})

export default User
