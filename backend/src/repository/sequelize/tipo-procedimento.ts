import TipoProcedimento, {
  TipoProcedimentoAttributes,
  TipoProcedimentoModel
} from 'models/tipo-procedimento'
import { IRepository } from 'repository'
import { InferAttributes, WhereOptions } from 'sequelize/types'

export type TipoRepositorioQuery = WhereOptions<
  InferAttributes<TipoProcedimentoAttributes>
>

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
  findAll = async (query: TipoRepositorioQuery = {}) => {
    const tipoProcedimentos = await TipoProcedimento.findAll({
      where: { deleted: false, ...query }
    })

    return tipoProcedimentos
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
