import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model
} from 'sequelize'
import { sequelize } from 'database'
import { Permissions } from 'domain/profiles'

export interface ProfileModel {
  id: number
  nome: string
  permissoes: Permissions
  createdAt?: Date
  updatedAt?: Date
}

export interface ProfileAttributes
  extends Model<
    InferAttributes<ProfileAttributes>,
    InferCreationAttributes<ProfileAttributes>
  > {
  id: CreationOptional<number>
  nome: string
  permissoes: any
  deleted: CreationOptional<boolean>
  createdAt?: Date
  updatedAt?: Date
}

const Profile = sequelize.define<ProfileAttributes>('profile', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  permissoes: {
    type: DataTypes.JSON,
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

export default Profile
