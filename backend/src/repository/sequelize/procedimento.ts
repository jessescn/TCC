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
import { ProcedimentoUseCase } from 'usecases/procedimento'

export type CreateProcedimento = {
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

export const includeableUser: Includeable = {
  model: User,
  as: 'user',
  required: false,
  attributes: ['nome', 'email', 'id']
}

export type ProcedimentoQuery = WhereOptions<
  InferAttributes<ProcedimentoAttributes>
>
export class ProcedimentoRepository implements IProcedimentoRepo {
  findOne = async (id: number) => {
    const procedimento = await Procedimento.findOne({
      where: { id, deleted: false },
      include: [TipoProcedimento, Comentario, includeableUser]
    })

    return procedimento
  }

  findAll = async (query: ProcedimentoQuery = {}) => {
    const procedimentos = await Procedimento.findAll({
      include: [TipoProcedimento, Comentario, includeableUser],
      where: { deleted: false, ...query }
    })

    return procedimentos
  }

  create = async (data: CreateProcedimento) => {
    const statusCreated: Status = {
      data: new Date().toISOString(),
      status: 'criado'
    }

    const procedimento = await Procedimento.create({
      ...data,
      status: [statusCreated]
    })

    return procedimento
  }

  update = async (id: number, data: Partial<ProcedimentoModel>) => {
    const procedimento = await this.findOne(id)

    procedimento.set({ ...data })

    await procedimento.save()

    return procedimento
  }

  destroy = async (id: number) => {
    const procedimento = await this.findOne(id)

    procedimento.set({ deleted: true })

    await procedimento.save()

    return procedimento
  }

  updateVote = async (id: number, newVote: VotoProcedimento) => {
    const procedimento = await this.findOne(id)

    const votes = ProcedimentoUseCase.insertOrUpdateVote(
      procedimento.votos,
      newVote
    )

    procedimento.set({ votos: votes })

    await procedimento.save()

    return procedimento
  }

  removeVote = async (id: number, autor: number) => {
    const procedimento = await this.findOne(id)

    const filteredVotes = procedimento.votos.filter(
      voto => voto.autor !== autor
    )

    procedimento.set({ votos: filteredVotes })

    await procedimento.save()

    return procedimento
  }

  updateStatus = async (id: number, status: TStatus) => {
    const procedimento = await this.findOne(id)

    const updatedProcedimento =
      await ProcedimentoStatusService.changeProcedimentoStatus(
        procedimento,
        status
      )

    return updatedProcedimento
  }

  newRevisao = async (id: number, revisao: Revisao) => {
    const procedimento = await this.findOne(id)

    procedimento.set({ revisoes: [...procedimento.revisoes, revisao] })

    await procedimento.save()

    return procedimento
  }
}