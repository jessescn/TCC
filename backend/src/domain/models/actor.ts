import bcrypt from 'bcrypt'
import { sequelize } from 'database'
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model
} from 'sequelize'
import { ProcedimentoModel } from './procedimento'
import Profile, { ProfileModel } from './profile'

export interface ActorModel {
  id: number
  nome: string
  email: string
  senha: string
  deleted: boolean
  profile?: ProfileModel
  permissoes?: number
  publico: string[]
  procedimentos?: ProcedimentoModel[]
  createdAt?: Date
  updatedAt?: Date
}

export interface ActorAttributes
  extends Model<
    InferAttributes<ActorAttributes>,
    InferCreationAttributes<ActorAttributes>
  > {
  id: CreationOptional<number>
  nome: string
  email: string
  senha: string
  deleted: CreationOptional<boolean>
  permissoes?: number
  publico: string[]
  procedimentos?: ProcedimentoModel[]
  createdAt?: Date
  updatedAt?: Date
}

const Actor = sequelize.define<ActorAttributes>('actor', {
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
    type: DataTypes.INTEGER
  },
  publico: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
    defaultValue: []
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
})

Actor.belongsTo(Profile, { foreignKey: 'permissoes' })
Profile.hasMany(Actor)

Actor.prototype.toJSON = function () {
  const values = Object.assign({}, this.get())

  delete values.senha
  return values
}

Actor.beforeCreate(async (user, options) => {
  try {
    const hash = await bcrypt.hash(user.senha, 10)
    user.setDataValue('senha', hash)
  } catch (error) {
    throw new Error(error)
  }
})

export default Actor
