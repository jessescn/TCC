import Processo, {
  ProcessoModel,
  Status,
  statusList,
  TStatus,
  VotoProcesso
} from 'models/processo'
import Comentario from 'models/comentario'
import TipoProcesso from 'models/tipo-processo'
import User, { UserModel } from 'models/user'
import { UserService } from 'services/entities/user-service'
import { NodeMailer } from 'services/mail'
import templates from 'services/mail/templates'

export const isProcessoAprovado = (votes: VotoProcesso[]) => {
  const positive = votes.filter(vote => vote.aprovado).length
  const negative = votes.length - positive

  return positive > negative
}

type Handler = (processo: ProcessoModel, autor: UserModel) => Promise<Status>

const mailService = new NodeMailer()

export const ProcessoStatusHandler: Record<TStatus, Handler> = {
  criado: async function (): Promise<Status> {
    const statusCriado: Status = {
      status: 'criado',
      data: new Date().toISOString()
    }

    return statusCriado
  },
  em_analise: async function (processo: ProcessoModel): Promise<Status> {
    const sendEmailCoordenacao = async () => {
      // Envia email a coordenacão avisando de um novo processo está pronto para ser analisado
      const coordenacaoUsers = await UserService.getByRole('coordenacao')

      if (coordenacaoUsers.length === 0) return

      const mailList = coordenacaoUsers.map(user => user.email).toString()

      const email = templates['analise-procedimento-coordenacao'](mailList, {
        processo
      })

      await mailService.send(email)
    }

    await sendEmailCoordenacao()

    const statusAnalise: Status = {
      status: 'em_analise',
      data: new Date().toISOString()
    }

    return statusAnalise
  },
  em_homologacao: async function (processo) {
    const sendEmailColegiado = async () => {
      // Envia email aos membros do colegiado avisando que um novo processo está para ser votado
      const colegiado = await UserService.getByRole('colegiado')

      if (colegiado.length === 0) return

      const mailList = colegiado.map(user => user.email).toString()

      const email = templates['homologacao-colegiado'](mailList, {
        processo
      })

      await mailService.send(email)
    }

    await sendEmailColegiado()

    const statusHomologacao: Status = {
      status: 'em_homologacao',
      data: new Date().toISOString()
    }

    return statusHomologacao
  },
  deferido: async function (processo, autor) {
    const sendEmailSecretaria = async () => {
      // definir melhor quais emails devem ser enviados nessa etapa
      // envia um email a secretaria contendo as informacões necessárias para dar continuidade ao processo

      const email = templates['approve-processo'](autor.email, {
        processo
      })

      await mailService.send(email)
    }

    await sendEmailSecretaria()

    return { status: 'deferido', data: new Date().toISOString() }
  },
  indeferido: async function () {
    return { status: 'indeferido', data: new Date().toISOString() }
  },
  correcoes_pendentes: async function () {
    return { status: 'correcoes_pendentes', data: new Date().toISOString() }
  }
}

const sendUpdateStatusEmail = async (
  autor: UserModel,
  processo: ProcessoModel,
  status: Status
) => {
  const email = templates['update-procedimento-status'](autor.email, {
    processo,
    novoStatus: statusList[status.status].label
  })

  await mailService.send(email)
}

export const changeProcedimentoStatus = async (
  processoId: number,
  novoStatus: TStatus
): Promise<ProcessoModel> => {
  const processo = await Processo.findOne({
    where: { id: processoId, deleted: false },
    include: [TipoProcesso, Comentario, User]
  })

  const autor = await UserService.getById(processo.createdBy)

  const status = await ProcessoStatusHandler[novoStatus](processo, autor)

  processo.set({ status: [...processo.status, status] })

  await processo.save()

  sendUpdateStatusEmail(autor, processo, status)

  return processo
}
