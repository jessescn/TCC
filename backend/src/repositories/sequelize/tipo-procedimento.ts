import TipoProcedimento, {
  TipoProcedimentoAttributes,
  TipoProcedimentoModel
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
}

export class TipoProcedimentoRepository implements IRepository {
  findAll = async (query: TipoProcedimentoQuery, term?: string) => {
    const searchId = isNumber(term) ? { id: { [Op.eq]: term } } : {}
    const search = term
      ? {
          [Op.or]: [
            { nome: { [Op.substring]: '%' + term + '%' } },
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
      where: { id, deleted: false }
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
