import { ProcessoModel, Status, VotoProcesso } from 'models/processo'
import { UserService } from 'services/entities/user-service'
import { NodeMailer } from 'services/mail'
import templates from 'services/mail/templates'

const isProcessoAprovado = (votes: VotoProcesso[]) => {
  const positive = votes.filter(vote => vote.aprovado).length
  const negative = votes.length - positive

  return positive > negative
}

export const ProcessoStatusService = {
  votado: async function (processo: ProcessoModel): Promise<Status> {
    const isAprovado = isProcessoAprovado(processo.votos)
    const self = ProcessoStatusService

    const status = isAprovado
      ? self.approved(processo)
      : self.declined(processo)

    return Promise.resolve(status)
  },
  approved: async function (processo: ProcessoModel): Promise<Status> {
    const autor = await UserService.getById(processo.createdBy)

    // definir melhor quais emails devem ser enviados nessa etapa

    const email = templates['approve-processo'](autor.email, {
      processo
    })

    const mailService = new NodeMailer()
    mailService.send(email)

    return { status: 'homologado', data: new Date().toISOString() }
  },
  declined: async function (processo: ProcessoModel): Promise<Status> {
    return { status: 'declinado', data: new Date().toISOString() }
  }
}
