import Formulario, { FormField, FormularioModel } from 'models/formulario'
import User from 'models/user'
import { InferAttributes, WhereOptions } from 'sequelize/types'
import { NotFoundError } from 'types/express/errors'

export type RemoteFormulario = {
  nome: string
  campos: FormField[]
  userId: number
}

export const FormService = {
  getById: async function (id: number) {
    const form = await Formulario.findByPk(id)

    if (!form || form.deleted) {
      throw new NotFoundError()
    }

    return form
  },
  getAll: async function (
    query: WhereOptions<InferAttributes<FormularioModel>> = {}
  ) {
    const forms = await Formulario.findAll({
      include: User,
      where: { deleted: false, ...query }
    })
    return forms
  },
  create: async function (data: RemoteFormulario) {
    const newForm = await Formulario.create(data)
    return newForm
  },
  update: async function (id: number, data: any) {
    const form = await Formulario.findByPk(id)

    if (!form || form.deleted) {
      throw new NotFoundError()
    }

    form.set({ ...data })

    await form.save()

    return form
  },
  destroy: async function (id: number) {
    const form = await Formulario.findByPk(id)

    if (!form || form.deleted) {
      throw new NotFoundError()
    }

    form.set({ deleted: true })

    await form.save()

    return form
  }
}
