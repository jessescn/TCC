import Comentario from 'models/comentario'
import Processo, { ProcessoModel, VotoProcesso } from 'models/processo'
import TipoProcesso from 'models/tipo-processo'
import { InferAttributes, WhereOptions } from 'sequelize/types'
import { NotFoundError } from 'types/express/errors'

export type RemoteProcesso = {
  autor: number
  tipo: number
  resposta: string
  votos?: VotoProcesso[]
}

export const ProcessoService = {
  getById: async function (id: number) {
    const processo = await Processo.findByPk(id)

    if (!processo || processo.deleted) {
      throw new NotFoundError()
    }

    return processo
  },
  getAll: async function (
    query: WhereOptions<InferAttributes<ProcessoModel>> = {}
  ) {
    const processos = await Processo.findAll({
      include: [TipoProcesso, Comentario],
      where: { deleted: false, ...query }
    })
    return processos
  },
  create: async function (data: RemoteProcesso) {
    const novoProcesso = await Processo.create(data)
    return novoProcesso
  },
  update: async function (id: number, data: any) {
    const processo = await Processo.findByPk(id)

    if (!processo || processo.deleted) {
      throw new NotFoundError()
    }

    processo.set({ ...data })

    await processo.save()

    return processo
  },
  destroy: async function (id: number) {
    const processo = await Processo.findByPk(id)

    if (!processo || processo.deleted) {
      throw new NotFoundError()
    }

    processo.set({ deleted: true })

    await processo.save()

    return processo
  }
}
