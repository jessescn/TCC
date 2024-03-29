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
  TStatus
} from 'domain/models/procedimento'
import TipoProcedimento from 'domain/models/tipo-procedimento'
import Voto from 'domain/models/voto'
import { IRepository, Pagination } from 'repositories'
import { InferAttributes, Op, WhereOptions } from 'sequelize'
import { isNumber } from 'utils/value'

export type CreateProcedimento = {
  tipo: number
  respostas: Resposta[]
  createdBy: number
}

export type NewProcedimento = {
  tipo: number
  respostas: Resposta[]
}

export type NewRevisao = {
  aprovado: boolean
  comentario: string
  campos: CampoInvalido[]
}

export type ProcedimentoQuery = WhereOptions<
  InferAttributes<ProcedimentoAttributes>
>

export interface IProcedimentoRepo extends IRepository {
  findOne: (id: number) => Promise<ProcedimentoModel>
  findAll: (
    query: ProcedimentoQuery,
    term?: string | null,
    pagination?: Pagination
  ) => Promise<ProcedimentoModel[]>
  create: (data: CreateProcedimento) => Promise<ProcedimentoModel>
  update: (
    id: number,
    data: Partial<ProcedimentoModel>
  ) => Promise<ProcedimentoModel>
  destroy: (id: number) => Promise<ProcedimentoModel>
  findAllByStatus: (
    status: TStatus,
    term?: string | null
  ) => Promise<ProcedimentoModel[]>
  updateStatus: (id: number, status: Status) => Promise<ProcedimentoModel>
  newRevisao: (id: number, revisao: Revisao) => Promise<ProcedimentoModel>
}

export class ProcedimentoRepository implements IProcedimentoRepo {
  findOne = async (id: number) => {
    const procedimento = await Procedimento.findOne({
      where: { id },
      include: [
        TipoProcedimento,
        Comentario,
        {
          model: Voto,
          include: [
            {
              model: Actor,
              as: 'autor'
            }
          ]
        }
      ]
    })

    return procedimento
  }

  _findAllById = async (query: ProcedimentoQuery, term?: string | null) => {
    const searchId = isNumber(term) ? { id: { [Op.eq]: term } } : {}

    const procedimentos = await Procedimento.findAll({
      include: [
        TipoProcedimento,
        Voto,
        {
          model: Actor,
          attributes: ['nome']
        }
      ],
      where: { deleted: false, ...query, ...searchId },
      order: [['updatedAt', 'DESC']]
    })

    return procedimentos
  }

  _findAllBySearchTerm = async (
    query: ProcedimentoQuery,
    term?: string | null
  ) => {
    const whereClause = term
      ? {
          [Op.or]: [{ nome: { [Op.iLike]: '%' + term + '%' } }]
        }
      : {}

    const procedimentos = await Procedimento.findAll({
      include: [
        {
          model: Actor,
          attributes: ['nome']
        },
        {
          model: Voto,
          include: [
            {
              model: Actor,
              as: 'autor'
            }
          ]
        },
        {
          model: TipoProcedimento,
          where: { ...whereClause }
        }
      ],
      where: { deleted: false, ...query },
      order: [['updatedAt', 'DESC']]
    })

    return procedimentos
  }

  _filterByStatus = (
    status: TStatus[] | TStatus,
    procedimentos: ProcedimentoModel[]
  ) => {
    return procedimentos.filter(procedimento => {
      const currentStatus = ProcedimentoHelper.getCurrentStatus(procedimento)

      if (Array.isArray(status)) {
        return status.includes(currentStatus)
      }

      return status === currentStatus
    })
  }

  _filterByDates = (
    procedimentos: ProcedimentoModel[],
    start?: string,
    end?: string
  ) => {
    let result: ProcedimentoModel[] = []

    if (start) {
      try {
        const startDate = new Date(start)
        result = procedimentos.filter(procedimento => {
          const data = new Date(procedimento.createdAt)

          return data > startDate
        })
      } catch (error) {}
    }

    if (end) {
      try {
        const endDate = new Date(end)
        result = procedimentos.filter(procedimento => {
          const data = new Date(procedimento.createdAt)

          return data > endDate
        })
      } catch (error) {}
    }

    return result
  }

  findAll = async (
    query: ProcedimentoQuery = {},
    term?: string | null,
    pagination?: Pagination
  ) => {
    let result: ProcedimentoModel[] = []
    const procedimentosById = await this._findAllById(query, term)
    const procedimentosByName = await this._findAllBySearchTerm(query, term)

    result =
      isNumber(term) && procedimentosById.length > 0
        ? procedimentosById
        : procedimentosByName

    if (pagination?.status) {
      result = this._filterByStatus(pagination?.status, result)
    }

    if (pagination?.dataInicio || pagination?.dataFim) {
      result = this._filterByDates(
        result,
        pagination?.dataInicio,
        pagination?.dataFim
      )
    }

    return result
  }

  findAllByStatus = async (status: TStatus, term?: string | null) => {
    const procedimentos = await this.findAll({}, term)

    const filteredByStatus = procedimentos.filter(
      procedimento =>
        ProcedimentoHelper.getCurrentStatus(procedimento) === status
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
