import Comentario from 'models/comentario'
import Processo, {
  ProcessoModel,
  Resposta,
  Status,
  VotoProcesso
} from 'models/processo'
import TipoProcesso from 'models/tipo-processo'
import { InferAttributes, WhereOptions } from 'sequelize/types'
import { NotFoundError } from 'types/express/errors'

export type RemoteProcesso = {
  tipo: number
  respostas: Resposta[]
  votos?: VotoProcesso[]
  createdBy: number
}

export type ProcessoQuery = WhereOptions<InferAttributes<ProcessoModel>>

export const ProcessoService = {
  getById: async function (id: number) {
    const resource = await Processo.findOne({ where: { id, deleted: false } })

    if (!resource) {
      throw new NotFoundError()
    }

    return resource
  },
  getAll: async function (query: ProcessoQuery = {}) {
    const resources = await Processo.findAll({
      include: [TipoProcesso, Comentario],
      where: { deleted: false, ...query }
    })
    return resources
  },
  create: async function (data: RemoteProcesso) {
    const status: Status = { data: new Date().toISOString(), status: 'criado' }
    const newResource = await Processo.create({ ...data, status: [status] })
    return newResource
  },
  update: async function (id: number, data: any) {
    const resource = await Processo.findOne({ where: { id, deleted: false } })

    if (!resource) {
      throw new NotFoundError()
    }

    resource.set({ ...data })

    await resource.save()

    return resource
  },
  destroy: async function (id: number) {
    const resource = await Processo.findOne({ where: { id, deleted: false } })

    if (!resource) {
      throw new NotFoundError()
    }

    resource.set({ deleted: true })

    await resource.save()

    return resource
  }
}
