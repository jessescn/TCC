/* eslint-disable no-use-before-define */
/* istanbul ignore file */
import { sequelize } from 'database'
import User from 'models/user'
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model
} from 'sequelize'

import { RemoteFormulario } from 'controllers/formulario'

type TipoCampoFormulario =
  | 'paragrafo'
  | 'resposta'
  | 'data'
  | 'hora'
  | 'ficheiro'
  | 'escolha_multipla'
  | 'caixa_verificacao'
  | 'grelha_multipla'
  | 'grelha_verificacao'

export type CampoFormulario = {
  ordem: number
  tipo: TipoCampoFormulario
  obrigatorio?: boolean
  configuracao_campo?: any
}

export interface FormularioModel
  extends Model<
    InferAttributes<FormularioModel>,
    InferCreationAttributes<FormularioModel>
  > {
  id: CreationOptional<number>
  nome: string
  descricao: CreationOptional<string>
  campos: CampoFormulario[]
  deleted: CreationOptional<boolean>
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
}

const Formulario = sequelize.define<FormularioModel>('formulario', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.STRING
  },
  campos: {
    type: DataTypes.ARRAY(DataTypes.JSON),
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

Formulario.belongsTo(User, { foreignKey: 'createdBy' })
User.hasMany(Formulario)

export const createInitialFormulario = async (formulario: RemoteFormulario) => {
  Formulario.findOrCreate({
    where: {
      nome: formulario.nome
    },
    defaults: formulario
  })
}

export default Formulario
