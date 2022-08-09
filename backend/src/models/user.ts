import bcrypt from 'bcrypt'
import { sequelize } from 'database'
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model
} from 'sequelize'
import { PermissionKeys, Roles } from 'types/auth/actors'
import { ProcedimentoModel } from './procedimento'

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
  permissoes: PermissionKeys
  roles: Roles[]
  publico: string[]
  procedimentos?: ProcedimentoModel[]
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
  roles: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
    defaultValue: ['usuario']
  },
  publico: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
    defaultValue: []
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

type InitialUser = {
  senha: string
  email: string
  roles: Roles[]
  permissoes: PermissionKeys
}

export const createInitialUser = async ({
  email,
  permissoes,
  roles,
  senha
}: InitialUser) => {
  await User.findOrCreate({
    where: { email },
    defaults: {
      senha,
      email,
      roles,
      permissoes
    }
  })
}

export default User
