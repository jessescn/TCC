import Processo, { CampoInvalido } from 'models/processo'
import { NotFoundError } from 'types/express/errors'
import { BaseService } from './base-service'

export type RemoteCreateProcesso = {
  nome: string
  data_inicio: Date
  data_fim: Date
  usuario: number
  formulario: number
  dados_preenchidos: string
}

export type NewProcessoModel = RemoteCreateProcesso & {
  status: string
  dados_preenchidos: string // JSON.stringify do formulario preenchido
  campos_invalidos: CampoInvalido[]
  comentarios: string[] // TODO: linkar quando implementar a entidade comentário
  deleted: boolean
}

export const ProcessoService: BaseService<Processo> = {
  getById: async function (id: number) {
    const processo = await Processo.findByPk(id)

    if (!processo) {
      throw new NotFoundError()
    }

    return processo
  },
  getAll: async function () {
    const processos = await Processo.findAll()
    return processos
  },
  create: async function (data: RemoteCreateProcesso) {
    const content: NewProcessoModel = {
      ...data,
      status: 'criado',
      campos_invalidos: [],
      comentarios: [],
      deleted: false
    }

    const newProcess = await Processo.create(content)
    return newProcess
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
