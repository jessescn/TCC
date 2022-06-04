/* eslint-disable no-use-before-define */
/* istanbul ignore file */
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model
} from 'sequelize'
import { sequelize } from 'database'

export type CampoInvalido = {
  order: number
  comentario: string
  autor: number
}

class Processo extends Model<
  InferAttributes<Processo>,
  InferCreationAttributes<Processo>
> {
  id: number
  nome: string
  data_fim: Date
  data_inicio: Date
  formulario: number
  usuario: number
  status: string
  dados_preenchidos: string // JSON.stringify do formulario preenchido
  campos_invalidos: CampoInvalido[]
  comentarios: string[] // TODO: linkar quando implementar a entidade comentário
  createdAt: Date
  updatedAt: Date
  deleted: boolean
}

Processo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    comentarios: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    usuario: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    formulario: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dados_preenchidos: {
      type: DataTypes.STRING
    },
    campos_invalidos: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: false
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    data_inicio: DataTypes.DATE,
    data_fim: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  { sequelize, tableName: 'processos', freezeTableName: true }
)

export default Processo
