import TipoProcedimento from 'models/tipo-procedimento'
import User from 'models/user'
import { InferAttributes, WhereOptions } from 'sequelize/types'
import { NotFoundError } from 'types/express/errors'
import { TipoProcedimentoModel } from '../../models/tipo-procedimento'

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

export const TipoProcedimentoService = {
  create: async function (data: CreateTipoProcedimento) {
    const newProcedimento = await TipoProcedimento.create(data)
    return newProcedimento
  },
  getById: async function (id: number) {
    const tipoProcedimento = await TipoProcedimento.findOne({
      where: { id, deleted: false },
      include: User
    })

    if (!tipoProcedimento) {
      throw new NotFoundError()
    }

    return tipoProcedimento
  },
  getAll: async function (
    query: WhereOptions<InferAttributes<TipoProcedimentoModel>> = {}
  ) {
    const tipoProcedimentos = await TipoProcedimento.findAll({
      include: User,
      where: { deleted: false, ...query }
    })
    return tipoProcedimentos
  },
  update: async function (id: number, data: any) {
    const updatedTipoProcedimento = await TipoProcedimento.findOne({
      where: { id, deleted: false },
      include: User
    })

    if (!updatedTipoProcedimento) {
      throw new NotFoundError()
    }

    updatedTipoProcedimento.set({ ...data })

    await updatedTipoProcedimento.save()

    return updatedTipoProcedimento
  },
  destroy: async function (id: number) {
    const tipoProcedimento = await TipoProcedimento.findOne({
      where: { id, deleted: false },
      include: User
    })

    if (!tipoProcedimento) {
      throw new NotFoundError()
    }

    tipoProcedimento.set({ deleted: true })

    await tipoProcedimento.save()

    return tipoProcedimento
  }
}
