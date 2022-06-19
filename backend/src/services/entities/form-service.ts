import Formulario, { FormField, FormularioModel } from 'models/formulario'
import User from 'models/user'
import { NotFoundError } from 'types/express/errors'
import { BaseService } from './base-service'

export type RemoteFormulario = {
  nome: string
  campos: FormField[]
}

export const FormService: BaseService<FormularioModel> = {
  getById: async function (id: number) {
    const form = await Formulario.findByPk(id)

    if (!form) {
      throw new NotFoundError()
    }

    return form
  },
  getAll: async function () {
    const forms = await Formulario.findAll({ include: User })
    return forms
  },
  create: async function (data: RemoteFormulario) {
    const newForm = await Formulario.create(data)
    return newForm
  },
  update: async function (id: number, data: any) {
    const form = await Formulario.findByPk(id)

    if (!form) {
      throw new NotFoundError()
    }

    form.set({ ...data })

    await form.save()

    return form
  },
  destroy: async function (id: number) {
    const form = await Formulario.findByPk(id)

    if (!form) {
      throw new NotFoundError()
    }

    await form.destroy()

    return form
  }
}
