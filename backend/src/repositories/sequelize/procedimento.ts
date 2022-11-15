import { ProcedimentoHelper } from 'domain/helpers/procedimento'
import Actor from 'domain/models/actor'
import Comentario from 'domain/models/comentario'
import Procedimento, {
  CampoInvalido,
  ProcedimentoAttributes,
  ProcedimentoModel,
  Resposta,
  Revisao,
  Status,
  TStatus,
  VotoProcedimento
} from 'domain/models/procedimento'
import TipoProcedimento from 'domain/models/tipo-procedimento'
import { IProcedimentoRepo } from 'repositories'
import { InferAttributes, Op, WhereOptions } from 'sequelize'
import { getCurrentStatus, isNumber } from 'utils/value'

export type CreateProcedimento = {
  tipo: number
  respostas: Resposta[]
  votos?: VotoProcedimento[]
  createdBy: number
}

export type NewProcedimento = {
  tipo: number
  respostas: Resposta[]
  votos?: VotoProcedimento[]
}

export type NewRevisao = {
  aprovado: boolean
  comentario: string
  campos: CampoInvalido[]
}

export type ProcedimentoQuery = WhereOptions<
  InferAttributes<ProcedimentoAttributes>
>
export class ProcedimentoRepository implements IProcedimentoRepo {
  findOne = async (id: number) => {
    const procedimento = await Procedimento.findOne({
      where: { id },
      include: [TipoProcedimento, Comentario]
    })

    return procedimento
  }

  findAll = async (query: ProcedimentoQuery, term?: string | null) => {
    const searchId = isNumber(term) ? { id: { [Op.eq]: term } } : {}

    const procedimentosById = await Procedimento.findAll({
      include: [
        TipoProcedimento,
        {
          model: Actor,
          attributes: ['nome']
        }
      ],
      where: { deleted: false, ...query, ...searchId },
      order: [['updatedAt', 'DESC']]
    })

    const whereTipo = term
      ? {
          [Op.or]: [{ nome: { [Op.substring]: '%' + term + '%' } }]
        }
      : {}

    const procedimentosByName = await Procedimento.findAll({
      include: [
        {
          model: Actor,
          attributes: ['nome']
        },
        {
          model: TipoProcedimento,
          where: { ...whereTipo }
        }
      ],
      where: { deleted: false, ...query },
      order: [['updatedAt', 'DESC']]
    })

    const procedimentos =
      isNumber(term) && procedimentosById.length > 0
        ? procedimentosById
        : procedimentosByName

    return procedimentos
  }

  findAllByStatus = async (status: TStatus, term?: string | null) => {
    const procedimentos = await this.findAll({}, term)

    const filteredByStatus = procedimentos.filter(
      procedimento => getCurrentStatus(procedimento) === status
    )

    return filteredByStatus
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

    const votes = ProcedimentoHelper.insertOrUpdateVote(
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

  updateStatus = async (id: number, status: Status) => {
    const procedimento = await this.findOne(id)

    procedimento.set({ status: [...procedimento.status, status] })

    await procedimento.save()

    return procedimento
  }

  newRevisao = async (id: number, revisao: Revisao) => {
    const procedimento = await this.findOne(id)

    procedimento.set({ revisoes: [...procedimento.revisoes, revisao] })

    await procedimento.save()

    return procedimento
  }
}
