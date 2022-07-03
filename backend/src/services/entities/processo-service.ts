import Comentario from 'models/comentario'
import Formulario from 'models/formulario'
import Processo, { ProcessoModel } from 'models/processo'
import { InferAttributes, WhereOptions } from 'sequelize/types'
import { NotFoundError } from 'types/express/errors'

export type CreateProcesso = {
  nome: string
  dataInicio: Date
  dataFim: Date
  userId: number
  formularioId: number
  dadosPreenchidos: string
}

export const ProcessoService = {
  getById: async function (id: number) {
    const processo = await Processo.findByPk(id)

    if (!processo || processo.deleted) {
      throw new NotFoundError()
    }

    return processo
  },
  getAll: async function (
    query: WhereOptions<InferAttributes<ProcessoModel>> = {}
  ) {
    const processos = await Processo.findAll({
      include: [Formulario, Comentario],
      where: { deleted: false, ...query }
    })
    return processos
  },
  create: async function (data: CreateProcesso) {
    const newProcesso = await Processo.create({
      ...data,
      camposInvalidos: []
    })
    return newProcesso
  },
  update: async function (id: number, data: any) {
    const processo = await Processo.findByPk(id)

    if (!processo || processo.deleted) {
      throw new NotFoundError()
    }

    processo.set({ ...data })

    await processo.save()

    return processo
  },
  destroy: async function (id: number) {
    const processo = await Processo.findByPk(id)

    if (!processo || processo.deleted) {
      throw new NotFoundError()
    }

    processo.set({ deleted: true })

    await processo.save()

    return processo
  }
}
