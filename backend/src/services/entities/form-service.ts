import Form, { FormField } from 'models/form'
import { NotFoundError } from 'types/express/errors'
import { BaseService } from './base-service'

export type RemoteForm = {
  name: string
  fields: FormField[]
}

export const FormService: BaseService<Form> = {
  getById: async function (id: number) {
    const form = await Form.findByPk(id)

    if (!form) {
      throw new NotFoundError()
    }

    return form
  },
  getAll: async function () {
    const forms = await Form.findAll()
    return forms
  },
  create: async function (data: RemoteForm) {
    const newForm = await Form.create(data)
    return newForm
  },
  update: async function (id: number, data: any) {
    const form = await Form.findByPk(id)

    if (!form) {
      throw new NotFoundError()
    }

    form.set({ ...data })

    await form.save()

    return form
  },
  destroy: async function (id: number) {
    const form = await Form.findByPk(id)

    if (!form) {
      throw new NotFoundError()
    }

    await form.destroy()

    return form
  }
}
