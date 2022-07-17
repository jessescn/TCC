import TipoProcesso from 'models/tipo-processo'
import User from 'models/user'
import { InferAttributes, WhereOptions } from 'sequelize/types'
import { NotFoundError } from 'types/express/errors'
import { TipoProcessoModel } from './../../models/tipo-processo'

export type CreateTipoProcesso = {
  nome: string
  descricao?: string
  dataInicio?: string
  dataFim?: string
  escopo: string
  colegiado: boolean
  createdBy: number
  formularios: number[]
}

export const TipoProcessoService = {
  getById: async function (id: number) {
    const resource = await TipoProcesso.findOne({
      where: { id, deleted: false }
    })

    if (!resource) {
      throw new NotFoundError()
    }

    return resource
  },
  getAll: async function (
    query: WhereOptions<InferAttributes<TipoProcessoModel>> = {}
  ) {
    const resources = await TipoProcesso.findAll({
      include: User,
      where: { deleted: false, ...query }
    })
    return resources
  },
  create: async function (data: CreateTipoProcesso) {
    const newResource = await TipoProcesso.create(data)
    return newResource
  },
  update: async function (id: number, data: any) {
    const resource = await TipoProcesso.findOne({
      where: { id, deleted: false }
    })

    if (!resource) {
      throw new NotFoundError()
    }

    resource.set({ ...data })

    await resource.save()

    return resource
  },
  destroy: async function (id: number) {
    const resource = await TipoProcesso.findOne({
      where: { id, deleted: false }
    })

    if (!resource) {
      throw new NotFoundError()
    }

    resource.set({ deleted: true })

    await resource.save()

    return resource
  }
}
