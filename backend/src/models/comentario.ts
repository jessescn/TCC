/* eslint-disable no-use-before-define */
/* istanbul ignore file */
import { sequelize } from 'database'
import Procedimento, { ProcedimentoModel } from 'models/procedimento'
import User, { UserModel } from 'models/user'
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
  procedimentoId: CreationOptional<number>
  conteudo: string
  deleted: CreationOptional<boolean>
  procedimento?: ProcedimentoModel
  user?: UserModel
  createdAt?: Date
  updatedAt?: Date
}

const Comentario = sequelize.define<ComentarioModel>('comentario', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  procedimentoId: {
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

Comentario.belongsTo(Procedimento)
Comentario.belongsTo(User, { foreignKey: 'createdBy' })
Procedimento.hasMany(Comentario)

export default Comentario
