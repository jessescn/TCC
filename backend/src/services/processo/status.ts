import Processo, {
  ProcessoModel,
  Status,
  TStatus,
  VotoProcesso
} from 'models/processo'
import { UserService } from 'services/entities/user-service'
import { NodeMailer } from 'services/mail'
import templates from 'services/mail/templates'

export const isProcessoAprovado = (votes: VotoProcesso[]) => {
  const positive = votes.filter(vote => vote.aprovado).length
  const negative = votes.length - positive

  return positive > negative
}

type Handler = (processo: ProcessoModel) => Promise<Status>

export const ProcessoStatusService = {
  criado: async function (processo: ProcessoModel): Promise<Status> {
    const statusCriado: Status = {
      status: 'criado',
      data: new Date().toISOString()
    }

    return statusCriado
  },
  em_analise: async function (processo: ProcessoModel): Promise<Status> {
    // Envia email a coordenacão avisando de um novo processo está pronto para ser analisado

    const statusAnalise: Status = {
      status: 'em_analise',
      data: new Date().toISOString()
    }

    return statusAnalise
  },
  em_homologacao: async function (processo: ProcessoModel): Promise<Status> {
    // Envia email aos membros do colegiado avisando que um novo processo está para ser votado

    const statusHomologacao: Status = {
      status: 'em_analise',
      data: new Date().toISOString()
    }

    return statusHomologacao
  },
  homologado: async function (processo: ProcessoModel): Promise<Status> {
    const autor = await UserService.getById(processo.createdBy)

    // definir melhor quais emails devem ser enviados nessa etapa

    const email = templates['approve-processo'](autor.email, {
      processo
    })

    const mailService = new NodeMailer()
    await mailService.send(email)

    return { status: 'homologado', data: new Date().toISOString() }
  },
  declinado: async function (processo: ProcessoModel): Promise<Status> {
    return { status: 'declinado', data: new Date().toISOString() }
  },
  pendente: async function (processo: ProcessoModel): Promise<Status> {
    // envia um email ao autor avisando que precisa que certos campos sejam alterados
    return { status: 'pendente', data: new Date().toISOString() }
  },
  encaminhado: async function (processo: ProcessoModel): Promise<Status> {
    // envia um email a secretaria contendo as informacões necessárias para dar continuidade ao processo
    return { status: 'encaminhado', data: new Date().toISOString() }
  },
  handleChangeStatus: async function (
    processoId: number,
    novoStatus: TStatus
  ): Promise<ProcessoModel> {
    const self = ProcessoStatusService
    const processo = await Processo.findOne({
      where: { id: processoId, deleted: false }
    })

    const options: Record<TStatus, Handler> = {
      criado: self.criado,
      em_analise: self.em_analise,
      declinado: self.declinado,
      em_homologacao: self.em_homologacao,
      encaminhado: self.encaminhado,
      homologado: self.homologado,
      pendente: self.pendente
    }

    const status = await options[novoStatus](processo)

    processo.set({ status: [...processo.status, status] })

    await processo.save()

    // [EMAIL] toda alteracão de status envia email avisando ao autor

    return processo
  }
}
