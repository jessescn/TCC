import Comentario from 'models/comentario'
import Procedimento, {
  CampoInvalido,
  ProcedimentoModel,
  Resposta,
  Revisao,
  Status,
  TStatus,
  VotoProcedimento
} from 'models/procedimento'
import TipoProcedimento from 'models/tipo-procedimento'
import User from 'models/user'
import { Includeable, InferAttributes, WhereOptions } from 'sequelize/types'
import {
  changeProcedimentoStatus,
  isProcedimentoAprovado
} from 'services/procedimento/status'
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError
} from 'types/express/errors'
import { belongsToPublico, getCurrentStatus } from 'utils/procedimento'
import { TipoProcedimentoService } from './tipo-procedimento-service'
import { UsuarioService } from './usuario-service'

export type NewProcedimento = {
  tipo: number
  respostas: Resposta[]
  votos?: VotoProcedimento[]
  createdBy: number
}

export type NewRevisao = {
  aprovado: boolean
  comentario: string
  campos: CampoInvalido[]
}

export type ProcedimentoQuery = WhereOptions<InferAttributes<ProcedimentoModel>>

const isMaioria = (votes: VotoProcedimento[]) => {
  const numberOfColegiados = Number(process.env.COLEGIADO_QUANTITY) || 0
  const numberOfVotes = votes.length

  return numberOfVotes >= Math.floor(numberOfColegiados / 2) // TODO; O que acontece quando a quantidade for par?
}

const includeableUser: Includeable = {
  model: User,
  as: 'user',
  required: false,
  attributes: ['nome', 'email', 'id']
}

export const ProcedimentoService = {
  getById: async function (id: number) {
    const procedimento = await Procedimento.findOne({
      where: { id, deleted: false },
      include: [TipoProcedimento, Comentario, includeableUser]
    })

    if (!procedimento) {
      throw new NotFoundError()
    }

    return procedimento
  },
  getAll: async function (query: ProcedimentoQuery = {}) {
    const procedimentos = await Procedimento.findAll({
      include: [TipoProcedimento, Comentario, includeableUser],
      where: { deleted: false, ...query }
    })

    return procedimentos
  },
  create: async function (data: NewProcedimento) {
    const user = await UsuarioService.getById(data.createdBy)
    const tipoProcedimento = await TipoProcedimentoService.getById(data.tipo)

    if (!user || !tipoProcedimento) {
      throw new BadRequestError('createdBy or tipo not found')
    }

    if (!belongsToPublico(user, tipoProcedimento)) {
      throw new UnauthorizedError(
        'Does not have permission to this procedimento'
      )
    }

    const statusCreated: Status = {
      data: new Date().toISOString(),
      status: 'criado'
    }

    const { id } = await Procedimento.create({
      ...data,
      status: [statusCreated]
    })

    const procedimento = await changeProcedimentoStatus(id, 'em_analise')

    return procedimento
  },
  update: async function (
    id: number,
    { status, ...data }: Partial<ProcedimentoModel>
  ) {
    const procedimento = await Procedimento.findOne({
      where: { id, deleted: false },
      include: [TipoProcedimento, Comentario, includeableUser]
    })

    if (!procedimento) {
      throw new NotFoundError()
    }

    const currentStatus = getCurrentStatus(procedimento)

    if (currentStatus !== 'correcoes_pendentes') {
      throw new BadRequestError('Cannot update in this current status')
    }

    procedimento.set({ ...data })

    await procedimento.save()

    return procedimento
  },
  destroy: async function (id: number) {
    const procedimento = await Procedimento.findOne({
      where: { id, deleted: false },
      include: [TipoProcedimento, Comentario, includeableUser]
    })

    if (!procedimento) {
      throw new NotFoundError()
    }

    procedimento.set({ deleted: true })

    await procedimento.save()

    return procedimento
  },
  updateVote: async function (id: number, newVote: VotoProcedimento) {
    const procedimento = await Procedimento.findOne({
      where: { id, deleted: false },
      include: [TipoProcedimento, Comentario, includeableUser]
    })

    if (!procedimento) {
      throw new NotFoundError()
    }

    const status = getCurrentStatus(procedimento)

    if (status !== 'em_homologacao') {
      throw new BadRequestError('Cannot homologate from this current status.')
    }

    let votes = [...procedimento.votos]

    const voteIdx = procedimento.votos.findIndex(
      vote => vote.autor === newVote.autor
    )

    if (voteIdx === -1) {
      votes = [...votes, newVote]
    } else {
      votes.splice(voteIdx, 1, newVote)
    }

    procedimento.set({ votos: votes })

    await procedimento.save()

    let updatedResource = procedimento

    const isMaioriaVotos = isMaioria(votes)

    if (isMaioriaVotos) {
      const novoStatus: TStatus = isProcedimentoAprovado(votes)
        ? 'deferido'
        : 'indeferido'

      updatedResource = await changeProcedimentoStatus(
        procedimento.id,
        novoStatus
      )
    }

    return updatedResource
  },
  removeVote: async function (id: number, autor: number) {
    const procedimento = await Procedimento.findOne({
      where: { id, deleted: false },
      include: [TipoProcedimento, Comentario, includeableUser]
    })

    if (!procedimento) {
      throw new NotFoundError()
    }

    const status = getCurrentStatus(procedimento)

    if (status !== 'em_homologacao') {
      throw new BadRequestError()
    }

    const filteredVotes = procedimento.votos.filter(
      voto => voto.autor !== autor
    )

    procedimento.set({ votos: filteredVotes })

    await procedimento.save()

    return procedimento
  },
  updateStatus: async function (id: number, status: TStatus) {
    const updatedProcedimento = await changeProcedimentoStatus(id, status)

    return updatedProcedimento
  },
  newRevisao: async function (id: number, revisao: Revisao) {
    const procedimento = await Procedimento.findOne({
      where: { id, deleted: false },
      include: [TipoProcedimento, Comentario, includeableUser]
    })

    if (!procedimento) {
      throw new NotFoundError()
    }

    procedimento.set({ revisoes: [...procedimento.revisoes, revisao] })

    await procedimento.save()

    return procedimento
  }
}
