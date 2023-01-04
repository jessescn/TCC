import { getEncaminhamentoSecretariaTemplate } from './encaminhamento-secretaria'
import { ProcedimentoModel } from 'domain/models/procedimento'
import { getEmailVerificationTemplate } from './email-verification'
import { getResetPasswordTemplate } from './reset-password'
import { getUpdateStatusTemplate } from './update-status'
import { TipoProcedimentoModel } from 'domain/models/tipo-procedimento'
import { ActorModel } from 'domain/models/actor'

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
  html: getResetPasswordTemplate(data.link)
})

type EmailVerificationData = {
  link: string
}

const emailVerification: Template<EmailVerificationData> = (to, data) => ({
  to,
  subject: '[PPGCC/UFCG] Confirmação de email',
  html: getEmailVerificationTemplate(data.link)
})

type UpdateProcedimentoData = {
  procedimento: ProcedimentoModel
  statusAntigo?: string
  novoStatus: string
  dataAtualizacao: string
}

const updateProcedimentoStatus: Template<UpdateProcedimentoData> = (
  to,
  data
) => ({
  to,
  subject: `[PPGCC/UFCG] Atualizacão Procedimento #${data.procedimento.id}`,
  html: getUpdateStatusTemplate({
    url: `${process.env.WEB_URL}/meus-procedimentos/${data.procedimento.id}`,
    date: data.dataAtualizacao,
    previousStatus: data.statusAntigo,
    currentStatus: data.novoStatus,
    procedimentoId: data.procedimento.id
  })
})

type AnaliseProcedimentoCoordenacaoData = {
  procedimento: ProcedimentoModel
}

const analiseProcedimentoCoordenacao: Template<
  AnaliseProcedimentoCoordenacaoData
> = (to, data) => ({
  to,
  subject: `[PPGCC/UFCG] Novo Procedimento em análise`,
  html: getUpdateStatusTemplate({
    url: `${process.env.WEB_URL}/coordenacao/procedimentos/${data.procedimento.id}`,
    currentStatus: 'EM ANÁLISE',
    procedimentoId: data.procedimento.id
  })
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
  html: getUpdateStatusTemplate({
    url: `${process.env.WEB_URL}/colegiado/procedimentos/${data.procedimento.id}`,
    currentStatus: 'EM HOMOLOGAÇÃO',
    procedimentoId: data.procedimento.id
  })
})

type EncaminhamentoSecretariaData = {
  tipoProcedimento: TipoProcedimentoModel
  autor: ActorModel
}

const encaminhamentoSecretaria: Template<EncaminhamentoSecretariaData> = (
  to,
  data
) => ({
  to,
  subject: '[PPGCC/UFCG] Novo Procedimento',
  html: getEncaminhamentoSecretariaTemplate(data.tipoProcedimento, data.autor)
})

export default {
  'change-password': changePassword,
  'update-procedimento-status': updateProcedimentoStatus,
  'analise-procedimento-coordenacao': analiseProcedimentoCoordenacao,
  'homologacao-colegiado': homologacaoColegiado,
  'verificacao-email': emailVerification,
  'encaminhamento-secretaria': encaminhamentoSecretaria
}
