import Formulario, { FormField } from 'models/formulario'
import { NotFoundError } from 'types/express/errors'
import { BaseService } from './base-service'

export type RemoteFormulario = {
  nome: string
  campos: FormField[]
}

export const FormService: BaseService<Formulario> = {
  getById: async function (id: number) {
    const form = await Formulario.findByPk(id)

    if (!form) {
      throw new NotFoundError()
    }

    return form
  },
  getAll: async function () {
    const forms = await Formulario.findAll()
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
