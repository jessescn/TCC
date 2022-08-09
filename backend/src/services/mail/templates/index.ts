import { ProcedimentoModel } from 'models/procedimento'
import { EmailTemplate } from '..'

type Template<T> = (to: string, data?: T) => EmailTemplate

const passwordRecovery: Template<any> = (to, data) => ({
  to,
  subject: '[PPGCC/UFCG] Recuperação de senha',
  text: `Aqui está sua nova senha: ${data.newPassword}`
})

type ApproveProcedimentoData = {
  procedimento: ProcedimentoModel
}

const approveProcedimento: Template<ApproveProcedimentoData> = (to, data) => ({
  to,
  subject: `[PPGCC/UFCG] Procedimento #${data.procedimento.id} aprovado!`,
  text: `O procedimento #${data.procedimento.id} foi aprovado pelo colegiado e foi encaminhado a secretaria para as próximas etapas`
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
  text: `O procedimento de número ${data.procedimento.id} teve status para ${data.novoStatus}. Para mais detalhes, acesse o sistema pelo link:`
})

type AnaliseProcedimentoCoordenacaoData = {
  procedimento: ProcedimentoModel
}

const analiseProcedimentoCoordenacao: Template<
  AnaliseProcedimentoCoordenacaoData
> = (to, data) => ({
  to,
  subject: `[PPGCC/UFCG] Novo Procedimento em análise`,
  text: `O procedimento de número ${data.procedimento.id} teve seus status atualizado para EM ANÁLISE. Acesse o sistema para oter mais detalhes.`
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
  text: `O procedimento de número ${data.procedimento.id} teve seus status atualizado para EM HOMOLOGAÇÃO. Para acompanhar a votação e definir seu deferimento, acesse o sistema.`
})

export default {
  'password-recovery': passwordRecovery,
  'approve-procedimento': approveProcedimento,
  'update-procedimento-status': updateProcedimentoStatus,
  'analise-procedimento-coordenacao': analiseProcedimentoCoordenacao,
  'homologacao-colegiado': homologacaoColegiado
}
