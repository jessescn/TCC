/* eslint-disable no-use-before-define */
/* istanbul ignore file */
import { sequelize } from 'database'
import Processo from 'models/processo'
import User from 'models/user'
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model
} from 'sequelize'

export interface ComentarioModel
  extends Model<
    InferAttributes<ComentarioModel>,
    InferCreationAttributes<ComentarioModel>
  > {
  id: CreationOptional<number>
  processoId: CreationOptional<number>
  conteudo: string
  deleted: CreationOptional<boolean>
  createdAt?: Date
  updatedAt?: Date
}

const Comentario = sequelize.define<ComentarioModel>('comentario', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  processoId: {
    type: DataTypes.INTEGER
  },
  conteudo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
})

Comentario.belongsTo(Processo)
Comentario.belongsTo(User, { foreignKey: 'createdBy' })
Processo.hasMany(Comentario)

export default Comentario
