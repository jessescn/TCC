import Comentario from 'models/comentario'
import Procedimento, {
  CampoInvalido,
  ProcedimentoAttributes,
  ProcedimentoModel,
  Resposta,
  Revisao,
  Status,
  TStatus,
  VotoProcedimento
} from 'models/procedimento'
import TipoProcedimento from 'models/tipo-procedimento'
import User from 'models/user'
import { IProcedimentoRepo } from 'repository'
import { Includeable, InferAttributes, WhereOptions } from 'sequelize/types'
import { ProcedimentoStatusService } from 'services/procedimento-status'
import { BadRequestError, NotFoundError } from 'types/express/errors'
import { getCurrentStatus } from 'utils/validations/procedimento'

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

const includeableUser: Includeable = {
  model: User,
  as: 'user',
  required: false,
  attributes: ['nome', 'email', 'id']
}

export type ProcedimentoQuery = WhereOptions<
  InferAttributes<ProcedimentoAttributes>
>

const isMaioria = (votes: VotoProcedimento[]) => {
  const numberOfColegiados = Number(process.env.COLEGIADO_QUANTITY) || 0
  const numberOfVotes = votes.length

  return numberOfVotes >= Math.floor(numberOfColegiados / 2) // TODO; O que acontece quando a quantidade for par?
}

export class ProcedimentoRepository implements IProcedimentoRepo {
  findOne = async (id: number) => {
    const procedimento = await Procedimento.findOne({
      where: { id, deleted: false },
      include: [TipoProcedimento, Comentario, includeableUser]
    })

    if (!procedimento) {
      throw new NotFoundError()
    }

    return procedimento
  }

  findAll = async (query: ProcedimentoQuery) => {
    const procedimentos = await Procedimento.findAll({
      include: [TipoProcedimento, Comentario, includeableUser],
      where: { deleted: false, ...query }
    })

    return procedimentos
  }

  create = async (data: NewProcedimento) => {
    const statusCreated: Status = {
      data: new Date().toISOString(),
      status: 'criado'
    }

    const createdProcedimento = await Procedimento.create({
      ...data,
      status: [statusCreated]
    })

    const procedimento =
      await ProcedimentoStatusService.changeProcedimentoStatus(
        createdProcedimento,
        'em_analise'
      )

    return procedimento
  }

  update = async (id: number, data: Partial<ProcedimentoModel>) => {
    const procedimento = await Procedimento.findOne({
      where: { id, deleted: false },
      include: [TipoProcedimento, Comentario, includeableUser]
    })

    if (!procedimento) {
      throw new NotFoundError()
    }

    procedimento.set({ ...data })

    await procedimento.save()

    return procedimento
  }

  destroy = async (id: number) => {
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
  }

  updateVote = async (id: number, newVote: VotoProcedimento) => {
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

    let updatedResource: ProcedimentoModel = procedimento

    const isMaioriaVotos = isMaioria(votes)

    if (isMaioriaVotos) {
      const novoStatus: TStatus =
        ProcedimentoStatusService.isProcedimentoAprovado(votes)
          ? 'deferido'
          : 'indeferido'

      updatedResource =
        await ProcedimentoStatusService.changeProcedimentoStatus(
          procedimento,
          novoStatus
        )
    }

    return updatedResource
  }

  removeVote = async (id: number, autor: number) => {
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
  }

  updateStatus = async (id: number, status: TStatus) => {
    const procedimento = await Procedimento.findOne({
      where: { id, deleted: false },
      include: [TipoProcedimento, Comentario, includeableUser]
    })

    if (!procedimento) {
      throw new NotFoundError()
    }

    const updatedProcedimento =
      await ProcedimentoStatusService.changeProcedimentoStatus(
        procedimento,
        status
      )

    return updatedProcedimento
  }

  newRevisao = async (id: number, revisao: Revisao) => {
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
