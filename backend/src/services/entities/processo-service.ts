import Comentario from 'models/comentario'
import Processo, {
  ProcessoModel,
  Resposta,
  Status,
  TStatus,
  VotoProcesso
} from 'models/processo'
import TipoProcesso from 'models/tipo-processo'
import User from 'models/user'
import { InferAttributes, WhereOptions } from 'sequelize/types'
import {
  isProcessoAprovado,
  changeProcedimentoStatus
} from 'services/processo/status'
import { BadRequestError, NotFoundError } from 'types/express/errors'

export type RemoteProcesso = {
  tipo: number
  respostas: Resposta[]
  votos?: VotoProcesso[]
  createdBy: number
}

export type ProcessoQuery = WhereOptions<InferAttributes<ProcessoModel>>

const isMaioria = (votes: VotoProcesso[]) => {
  const numberOfColegiados = Number(process.env.COLEGIADO_QUANTITY) || 0
  const numberOfVotes = votes.length

  return numberOfVotes >= Math.floor(numberOfColegiados / 2) // TODO; O que acontece quando a quantidade for par?
}

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
      include: [TipoProcesso, Comentario, User],
      where: { deleted: false, ...query }
    })
    return resources
  },
  create: async function (data: RemoteProcesso) {
    const createStatus: Status = {
      data: new Date().toISOString(),
      status: 'criado'
    }
    const newResource = await Processo.create({
      ...data,
      status: [createStatus]
    })

    const processo = await changeProcedimentoStatus(
      newResource.id,
      'em_analise'
    )

    return processo
  },
  update: async function (id: number, { status, ...data }: any) {
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
  },
  vote: async function (id: number, newVote: VotoProcesso) {
    const resource = await Processo.findOne({ where: { id, deleted: false } })

    if (!resource) {
      throw new NotFoundError()
    }

    if (
      resource.status[resource.status.length - 1]?.status !== 'em_homologacao'
    ) {
      throw new BadRequestError()
    }

    let votes = [...resource.votos]

    const voteIdx = resource.votos.findIndex(
      vote => vote.autor === newVote.autor
    )

    if (voteIdx === -1) {
      votes = [...votes, newVote]
    } else {
      votes.splice(voteIdx, 1, newVote)
    }

    resource.set({ votos: votes })

    await resource.save()

    const isMaioriaVotos = isMaioria(votes)

    if (isMaioriaVotos) {
      const novoStatus: TStatus = isProcessoAprovado(votes)
        ? 'deferido'
        : 'indeferido'

      await changeProcedimentoStatus(resource.id, novoStatus)
    }

    return resource
  },
  updateStatus: async function (id: number, status: TStatus) {
    const resource = await changeProcedimentoStatus(id, status)

    return resource
  }
}
