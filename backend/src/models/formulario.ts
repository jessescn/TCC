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

export type NewFormulario = {
  nome: string
  descricao?: string
  campos: CampoFormulario[]
}

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

export interface FormularioModel {
  id: number
  nome: string
  descricao: string
  campos: CampoFormulario[]
  deleted: boolean
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
}

export interface FormularioAttributes
  extends Model<
    InferAttributes<FormularioAttributes>,
    InferCreationAttributes<FormularioAttributes>
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

const Formulario = sequelize.define<FormularioAttributes>('formulario', {
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

export const createInitialFormulario = async (formulario: NewFormulario) => {
  Formulario.findOrCreate({
    where: {
      nome: formulario.nome
    },
    defaults: formulario
  })
}

export default Formulario
