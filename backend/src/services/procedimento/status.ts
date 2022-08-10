import Procedimento, {
  ProcedimentoModel,
  Status,
  statusList,
  TStatus,
  VotoProcedimento
} from 'models/procedimento'
import Comentario from 'models/comentario'
import TipoProcedimento from 'models/tipo-procedimento'
import User, { UserModel } from 'models/user'
import { UsuarioService } from 'services/entities/usuario-service'
import { NodeMailer } from 'services/mail'
import templates from 'services/mail/templates'
import { Includeable } from 'sequelize/types'

const includeableUser: Includeable = {
  model: User,
  as: 'user',
  required: false,
  attributes: ['nome', 'email', 'id']
}

export const isProcedimentoAprovado = (votes: VotoProcedimento[]) => {
  const positive = votes.filter(vote => vote.aprovado).length
  const negative = votes.length - positive

  return positive > negative
}

type Handler = (
  procedimento: ProcedimentoModel,
  autor: UserModel
) => Promise<Status>

const mailService = new NodeMailer()

export const ProcedimentoStatusHandler: Record<TStatus, Handler> = {
  criado: async function (): Promise<Status> {
    const statusCriado: Status = {
      status: 'criado',
      data: new Date().toISOString()
    }

    return statusCriado
  },
  em_analise: async function (
    procedimento: ProcedimentoModel
  ): Promise<Status> {
    const sendEmailCoordenacao = async () => {
      // Envia email a coordenacão avisando de um novo procedimento está pronto para ser analisado
      const coordenacaoUsers = await UsuarioService.getByRole('coordenacao')

      if (coordenacaoUsers.length === 0) return

      const mailList = coordenacaoUsers.map(user => user.email).toString()

      const email = templates['analise-procedimento-coordenacao'](mailList, {
        procedimento
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
  em_homologacao: async function (procedimento) {
    const sendEmailColegiado = async () => {
      // Envia email aos membros do colegiado avisando que um novo procedimento está para ser votado
      const colegiado = await UsuarioService.getByRole('colegiado')

      if (colegiado.length === 0) return

      const mailList = colegiado.map(user => user.email).toString()

      const email = templates['homologacao-colegiado'](mailList, {
        procedimento
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
  deferido: async function (procedimento, autor) {
    const sendEmailSecretaria = async () => {
      // definir melhor quais emails devem ser enviados nessa etapa
      // envia um email a secretaria contendo as informacões necessárias para dar continuidade ao procedimento

      const email = templates['approve-procedimento'](autor.email, {
        procedimento
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
  procedimento: ProcedimentoModel,
  status: Status
) => {
  const email = templates['update-procedimento-status'](autor.email, {
    procedimento,
    novoStatus: statusList[status.status].label
  })

  await mailService.send(email)
}

export const changeProcedimentoStatus = async (
  procedimentoId: number,
  novoStatus: TStatus
): Promise<ProcedimentoModel> => {
  const procedimento = await Procedimento.findOne({
    where: { id: procedimentoId, deleted: false },
    include: [TipoProcedimento, Comentario, includeableUser]
  })

  const autor = await UsuarioService.getById(procedimento.createdBy)

  const status = await ProcedimentoStatusHandler[novoStatus](
    procedimento,
    autor
  )

  procedimento.set({ status: [...procedimento.status, status] })

  await procedimento.save()

  sendUpdateStatusEmail(autor, procedimento, status)

  return procedimento
}
