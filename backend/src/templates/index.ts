import { ProcedimentoModel } from 'domain/models/procedimento'

export type EmailTemplate = {
  to: string
  subject: string
  html: string
}

type Template<T> = (to: string, data?: T) => EmailTemplate

type ChangePasswordData = {
  link: string
  name: string
}

const changePassword: Template<ChangePasswordData> = (to, data) => ({
  to,
  subject: '[PPGCC/UFCG] Alteração de senha',
  html: `Olá ${data.name}. Foi requisitado uma alteração de senha. Para alterar a senha, acesse <a href="${data.link}">esse link</a>. Caso não tenha requisitado essa alteração, por favor ignore esse email.`
})

type ApproveProcedimentoData = {
  procedimento: ProcedimentoModel
}

type EmailVerificationData = {
  link: string
}

const emailVerification: Template<EmailVerificationData> = (to, data) => ({
  to,
  subject: '[PPGCC/UFCG] Confirmação de email',
  html: `Para confirmar o seu email <a href="${data.link}">acesse este link</a>. O link se expira em 5 minutos.`
})

const approveProcedimento: Template<ApproveProcedimentoData> = (to, data) => ({
  to,
  subject: `[PPGCC/UFCG] Procedimento #${data.procedimento.id} aprovado!`,
  html: `O procedimento #${data.procedimento.id} foi aprovado pelo colegiado e foi encaminhado a secretaria para as próximas etapas`
})

type UpdateProcedimentoData = {
  procedimento: ProcedimentoModel
  novoStatus: string
}

const updateProcedimentoStatus: Template<UpdateProcedimentoData> = (
  to,
  data
) => ({
  to,
  subject: `[PPGCC/UFCG] Atualizacão Procedimento #${data.procedimento.id}`,
  html: `O procedimento de número ${data.procedimento.id} teve status para ${data.novoStatus}. Para mais detalhes, acesse o sistema pelo link:`
})

type AnaliseProcedimentoCoordenacaoData = {
  procedimento: ProcedimentoModel
}

const analiseProcedimentoCoordenacao: Template<
  AnaliseProcedimentoCoordenacaoData
> = (to, data) => ({
  to,
  subject: `[PPGCC/UFCG] Novo Procedimento em análise`,
  html: `O procedimento de número ${data.procedimento.id} teve seus status atualizado para EM ANÁLISE. Acesse o sistema para oter mais detalhes.`
})

type HomologacaoColegiadoData = {
  procedimento: ProcedimentoModel
}

const homologacaoColegiado: Template<HomologacaoColegiadoData> = (
  to,
  data
) => ({
  to,
  subject: `[PPGCC/UFCG] Novo Procedimento a ser homologado`,
  html: `O procedimento de número ${data.procedimento.id} teve seus status atualizado para EM HOMOLOGAÇÃO. Para acompanhar a votação e definir seu deferimento, acesse o sistema.`
})

export default {
  'change-password': changePassword,
  'approve-procedimento': approveProcedimento,
  'update-procedimento-status': updateProcedimentoStatus,
  'analise-procedimento-coordenacao': analiseProcedimentoCoordenacao,
  'homologacao-colegiado': homologacaoColegiado,
  'verificacao-email': emailVerification
}
