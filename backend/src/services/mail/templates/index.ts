import { ProcessoModel } from 'models/processo'
import { EmailTemplate } from '..'

type Template = (to: string, data?: any) => EmailTemplate

const passwordRecovery: Template = (to: string, data: any) => ({
  to,
  subject: 'Recuperação de senha',
  text: `Aqui está sua nova senha: ${data.newPassword}`
})

type ApproveProcessoData = {
  processo: ProcessoModel
}

const approveProcesso: Template = (to: string, data: ApproveProcessoData) => ({
  to,
  subject: `Processo #${data.processo.id} aprovado!`,
  text: `O processo #${data.processo.id} foi aprovado pelo colegiado e foi encaminhado a secretaria para as próximas etapas`
})

export default {
  'password-recovery': passwordRecovery,
  'approve-processo': approveProcesso
}
