import { CustomCampoInvalido } from 'components/pages/coordenacao/analise-procedimento'
import { CampoFormulario, FormularioModel } from 'domain/models/formulario'
import {
  ProcedimentoModel,
  Resposta,
  RespostaCampo,
  ProcedimentoStatus
} from 'domain/models/procedimento'
import { removeAccents } from 'utils/format'
import { getCurrentStatus } from 'utils/procedimento'

export class Procedimento {
  static getRevisao = (procedimento: ProcedimentoModel) => {
    if (procedimento.revisoes.length === 0) return

    return procedimento.revisoes[procedimento.revisoes.length - 1]
  }

  static getCamposInvalidos = (
    procedimento: ProcedimentoModel,
    formularios: FormularioModel[]
  ): CustomCampoInvalido[] => {
    const campos: Map<number, CampoFormulario> = new Map()

    formularios.forEach(formulario => {
      formulario.campos.forEach(campo => campos.set(campo.ordem, campo))
    })

    const revisao = this.getRevisao(procedimento)

    if (!revisao) {
      return []
    }

    return revisao.campos.reduce((camposRevisao, campoRevisao) => {
      const campoFormulario = campos.get(campoRevisao.ordem)

      if (!campoFormulario) {
        return camposRevisao
      }

      return [...camposRevisao, { ...campoRevisao, campo: campoFormulario }]
    }, [] as CustomCampoInvalido[])
  }

  static filterByCreatedBy(
    procedimentos: ProcedimentoModel[],
    createdBy: number
  ) {
    return procedimentos.filter(
      procedimento => procedimento.createdBy === createdBy
    )
  }

  static getRespostaByFormulario(respostas: Resposta[], formularioId: number) {
    return respostas.find(resposta => resposta.formulario === formularioId)
  }

  static matchBySearch(procedimento: ProcedimentoModel, term: string) {
    const termAsLowerCase = term.toLowerCase()
    const termCleaned = removeAccents(termAsLowerCase)

    if (termCleaned.localeCompare(String(procedimento.id)) === 0) return true

    const lastStatus = getCurrentStatus(procedimento)?.split('_').join(' ')

    if (lastStatus && lastStatus.includes(term)) return true

    const procedimentoNome = removeAccents(
      procedimento.tipo_procedimento?.nome || ''
    ).toLowerCase()

    const terms = term.split(' ')
    let includes = false

    terms.forEach(term => {
      if (procedimentoNome.includes(term.toLowerCase())) {
        includes = true
      }
    })

    return includes
  }

  static search(procedimentos: ProcedimentoModel[], term: string) {
    if (term.trim().length === 0) {
      return procedimentos
    }

    return procedimentos.filter(procedimento =>
      this.matchBySearch(procedimento, term)
    )
  }

  static getCampoByFormulario(
    respostas: Resposta[],
    formularioId: number,
    ordem: number
  ) {
    const resposta = this.getRespostaByFormulario(respostas, formularioId)

    return resposta?.campos.find(campo => campo.ordem === ordem)
  }

  static updateRespostaCampoByFormulario(
    respostas: Resposta[],
    novoCampo: RespostaCampo,
    formularioId: number
  ): Resposta[] {
    const respostaIdx = respostas.findIndex(
      resposta => resposta.formulario === formularioId
    )

    const resposta = respostas[respostaIdx]

    if (!resposta) {
      return [...respostas, { campos: [novoCampo], formulario: formularioId }]
    }

    const campoIdx = resposta.campos.findIndex(
      campo => campo.ordem === novoCampo.ordem
    )

    let novoCampos = [...resposta.campos]

    if (campoIdx !== -1) {
      novoCampos.splice(campoIdx, 1, novoCampo)
    } else {
      novoCampos = [...novoCampos, novoCampo]
    }

    const novasRespostas = [...respostas]
    novasRespostas.splice(respostaIdx, 1, { ...resposta, campos: novoCampos })

    return novasRespostas
  }

  static canForwardToSecretaria(procedimento: ProcedimentoModel) {
    const currentStatus = getCurrentStatus(procedimento)
    const possibleStatus: ProcedimentoStatus[] = ['deferido', 'encaminhado']

    return currentStatus && possibleStatus.includes(currentStatus)
  }
}
