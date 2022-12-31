import TipoProcedimento, {
  TipoProcedimentoAttributes,
  TipoProcedimentoModel,
  TipoProcedimentoStatus
} from 'domain/models/tipo-procedimento'
import { IRepository } from 'repositories'
import { InferAttributes, Op, WhereOptions } from 'sequelize'
import { isNumber } from 'utils/value'

export type TipoProcedimentoQuery = WhereOptions<
  InferAttributes<TipoProcedimentoAttributes>
>

export type NewTipoProcedimento = {
  nome: string
  descricao?: string
  dataInicio?: string
  dataFim?: string
  escopo: string
  publicos: string[]
  colegiado: boolean
  formularios: number[]
  status?: TipoProcedimentoStatus
}

export type CreateTipoProcedimento = {
  nome: string
  descricao?: string
  dataInicio?: string
  dataFim?: string
  escopo: string
  publicos: string[]
  colegiado: boolean
  createdBy: number
  formularios: number[]
  status: TipoProcedimentoStatus
}

export interface ITipoProcedimentoRepository extends IRepository {
  findOne: (id: number) => Promise<TipoProcedimentoAttributes>
  findAll: (
    query: TipoProcedimentoQuery,
    term?: string | null
  ) => Promise<TipoProcedimentoAttributes[]>
  create: (data: CreateTipoProcedimento) => Promise<TipoProcedimentoAttributes>
  update: (
    id: number,
    data: Partial<TipoProcedimentoModel>
  ) => Promise<TipoProcedimentoAttributes>
  destroy: (id: number) => Promise<TipoProcedimentoAttributes>
}

export class TipoProcedimentoRepository implements ITipoProcedimentoRepository {
  findAll = async (query: TipoProcedimentoQuery, term?: string) => {
    const searchId = isNumber(term) ? { id: { [Op.eq]: term } } : {}
    const search = term
      ? {
          [Op.or]: [
            { nome: { [Op.iLike]: '%' + term + '%' } },
            { status: { [Op.eq]: term } },
            { ...searchId }
          ]
        }
      : {}

    return TipoProcedimento.findAll({
      where: { ...query, ...search },
      order: [['updatedAt', 'DESC']]
    })
  }

  findOne = async (id: number) => {
    const tipoProcedimento = await TipoProcedimento.findOne({
      where: { id }
    })

    return tipoProcedimento
  }

  create = async (data: CreateTipoProcedimento) => {
    const newProcedimento = await TipoProcedimento.create(data)
    return newProcedimento
  }

  update = async (id: number, data: Partial<TipoProcedimentoModel>) => {
    const updatedTipoProcedimento = await this.findOne(id)

    updatedTipoProcedimento.set({ ...data })

    await updatedTipoProcedimento.save()

    return updatedTipoProcedimento
  }

  destroy = async (id: number) => {
    const tipoProcedimento = await this.findOne(id)

    tipoProcedimento.set({ deleted: true })

    await tipoProcedimento.save()

    return tipoProcedimento
  }
}
