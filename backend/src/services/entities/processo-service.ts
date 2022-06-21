import Formulario from 'models/formulario'
import Processo from 'models/processo'
import User from 'models/user'
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
  getAll: async function () {
    const processos = await Processo.findAll({
      include: Formulario,
      where: { deleted: false }
    })
    return processos
  },
  getAllByUser: async function (userId: number) {
    const usuario = await User.findByPk(userId, { include: Processo })
    return usuario.processos.filter(processo => !processo.deleted)
  },
  create: async function (data: CreateProcesso) {
    const newProcesso = await Processo.create({
      ...data,
      camposInvalidos: [],
      comentarios: []
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
