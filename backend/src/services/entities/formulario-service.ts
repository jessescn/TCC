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
    const resource = await Formulario.findOne({ where: { id, deleted: false } })

    if (!resource) {
      throw new NotFoundError()
    }

    return resource
  },
  getAll: async function (query: FormularioQuery = {}) {
    const resources = await Formulario.findAll({
      include: User,
      where: { deleted: false, ...query }
    })
    return resources
  },
  create: async function (data: CreateFormulario) {
    const newResource = await Formulario.create(data)
    return newResource
  },
  update: async function (id: number, data: any) {
    const resource = await Formulario.findOne({ where: { id, deleted: false } })

    if (!resource) {
      throw new NotFoundError()
    }

    resource.set({ ...data })

    await resource.save()

    return resource
  },
  destroy: async function (id: number) {
    const resource = await Formulario.findOne({ where: { id, deleted: false } })

    if (!resource) {
      throw new NotFoundError()
    }

    resource.set({ deleted: true })

    await resource.save()

    return resource
  }
}
