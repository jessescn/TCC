import Formulario from 'models/formulario'
import Processo, { ProcessoModel } from 'models/processo'
import { NotFoundError } from 'types/express/errors'
import { BaseService } from './base-service'

export type RemoteCreateProcesso = {
  nome: string
  dataInicio: Date
  dataFim: Date
  usuario: number
  formulario: number
  dadosPreenchidos: string
}

export const ProcessoService: BaseService<ProcessoModel> = {
  getById: async function (id: number) {
    const processo = await Processo.findByPk(id)

    if (!processo) {
      throw new NotFoundError()
    }

    return processo
  },
  getAll: async function () {
    const processos = await Processo.findAll({ include: Formulario })
    return processos
  },
  create: async function (data: RemoteCreateProcesso) {
    const newProcesso = await Processo.create({
      ...data,
      camposInvalidos: [],
      comentarios: []
    })
    return newProcesso
  },
  update: async function (id: number, data: any) {
    const processo = await Processo.findByPk(id)

    if (!processo) {
      throw new NotFoundError()
    }

    processo.set({ ...data })

    await processo.save()

    return processo
  },
  destroy: async function (id: number) {
    const processo = await Processo.findByPk(id)

    if (!processo) {
      throw new NotFoundError()
    }

    await processo.destroy()

    return processo
  }
}
