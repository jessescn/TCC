import { ProcessoModel } from 'models/processo'
import { EmailTemplate } from '..'

type Template<T> = (to: string, data?: T) => EmailTemplate

const passwordRecovery: Template<any> = (to, data) => ({
  to,
  subject: '[PPGCC/UFCG] Recuperação de senha',
  text: `Aqui está sua nova senha: ${data.newPassword}`
})

type ApproveProcedimentoData = {
  processo: ProcessoModel
}

const approveProcesso: Template<ApproveProcedimentoData> = (to, data) => ({
  to,
  subject: `[PPGCC/UFCG] Processo #${data.processo.id} aprovado!`,
  text: `O processo #${data.processo.id} foi aprovado pelo colegiado e foi encaminhado a secretaria para as próximas etapas`
})

type UpdateProcedimentoData = {
  processo: ProcessoModel
  novoStatus: string
}

const updateProcedimentoStatus: Template<UpdateProcedimentoData> = (
  to,
  data
) => ({
  to,
  subject: `[PPGCC/UFCG] Atualizacão Procedimento #${data.processo.id}`,
  text: `O procedimento de número ${data.processo.id} teve status para ${data.novoStatus}. Para mais detalhes, acesse o sistema pelo link:`
})

type AnaliseProcedimentoCoordenacaoData = {
  processo: ProcessoModel
}

const analiseProcedimentoCoordenacao: Template<
  AnaliseProcedimentoCoordenacaoData
> = (to, data) => ({
  to,
  subject: `[PPGCC/UFCG] Novo Procedimento em análise`,
  text: `O procedimento de número ${data.processo.id} teve seus status atualizado para EM ANÁLISE. Acesse o sistema para oter mais detalhes.`
})

type HomologacaoColegiadoData = {
  processo: ProcessoModel
}

const homologacaoColegiado: Template<HomologacaoColegiadoData> = (
  to,
  data
) => ({
  to,
  subject: `[PPGCC/UFCG] Novo Processo a ser homologado`,
  text: `O procedimento de número ${data.processo.id} teve seus status atualizado para EM HOMOLOGAÇÃO. Para acompanhar a votação e definir seu deferimento, acesse o sistema.`
})

export default {
  'password-recovery': passwordRecovery,
  'approve-processo': approveProcesso,
  'update-procedimento-status': updateProcedimentoStatus,
  'analise-procedimento-coordenacao': analiseProcedimentoCoordenacao,
  'homologacao-colegiado': homologacaoColegiado
}
