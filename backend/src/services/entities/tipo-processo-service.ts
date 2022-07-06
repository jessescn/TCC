import TipoProcesso, { CampoTipoProcesso } from 'models/tipo-processo'
import User from 'models/user'
import { InferAttributes, WhereOptions } from 'sequelize/types'
import { NotFoundError } from 'types/express/errors'
import { TipoProcessoModel } from './../../models/tipo-processo'

export type RemoteTipoProcesso = {
  nome: string
  descricao?: string
  dataInicio?: Date
  dataFim?: Date
  escopo: string
  campos: CampoTipoProcesso[]
  colegiado: boolean
  createdBy: number
}

export const TipoProcessoService = {
  getById: async function (id: number) {
    const tipoProcesso = await TipoProcesso.findByPk(id)

    if (!tipoProcesso || tipoProcesso.deleted) {
      throw new NotFoundError()
    }

    return tipoProcesso
  },
  getAll: async function (
    query: WhereOptions<InferAttributes<TipoProcessoModel>> = {}
  ) {
    const tipoProcessos = await TipoProcesso.findAll({
      include: User,
      where: { deleted: false, ...query }
    })
    return tipoProcessos
  },
  create: async function (data: RemoteTipoProcesso) {
    const novoTipoProcesso = await TipoProcesso.create(data)
    return novoTipoProcesso
  },
  update: async function (id: number, data: any) {
    const tipoProcesso = await TipoProcesso.findByPk(id)

    if (!tipoProcesso || tipoProcesso.deleted) {
      throw new NotFoundError()
    }

    tipoProcesso.set({ ...data })

    await tipoProcesso.save()

    return tipoProcesso
  },
  destroy: async function (id: number) {
    const tipoProcesso = await TipoProcesso.findByPk(id)

    if (!tipoProcesso || tipoProcesso.deleted) {
      throw new NotFoundError()
    }

    tipoProcesso.set({ deleted: true })

    await tipoProcesso.save()

    return tipoProcesso
  }
}
