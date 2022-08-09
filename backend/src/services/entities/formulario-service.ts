import Formulario, { FormularioModel, CampoFormulario } from 'models/formulario'
import User from 'models/user'
import { InferAttributes, WhereOptions } from 'sequelize/types'
import { NotFoundError } from 'types/express/errors'

export type CreateFormulario = {
  nome: string
  campos: CampoFormulario[]
  createdBy: number
}

export type FormularioQuery = WhereOptions<InferAttributes<FormularioModel>>

export const FormularioService = {
  getById: async function (id: number) {
    const formulario = await Formulario.findOne({
      where: { id, deleted: false },
      include: User
    })

    if (!formulario) {
      throw new NotFoundError()
    }

    return formulario
  },
  getAll: async function (query: FormularioQuery = {}) {
    const formularios = await Formulario.findAll({
      include: User,
      where: { deleted: false, ...query }
    })
    return formularios
  },
  create: async function (data: CreateFormulario) {
    const newFormulario = await Formulario.create(data, { include: User })
    return newFormulario
  },
  update: async function (id: number, data: any) {
    const formulario = await Formulario.findOne({
      where: { id, deleted: false },
      include: User
    })

    if (!formulario) {
      throw new NotFoundError()
    }

    formulario.set({ ...data })

    await formulario.save()

    return formulario
  },
  destroy: async function (id: number) {
    const formulario = await Formulario.findOne({
      where: { id, deleted: false },
      include: User
    })

    if (!formulario) {
      throw new NotFoundError()
    }

    formulario.set({ deleted: true })

    await formulario.save()

    return formulario
  }
}
