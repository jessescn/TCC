import { CustomCampoInvalido } from 'components/pages/analisar-procedimento/content'
import { CampoFormulario, FormularioModel } from 'domain/models/formulario'
import {
  ProcedimentoModel,
  Resposta,
  RespostaCampo
} from 'domain/models/procedimento'
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

  static search(procedimentos: ProcedimentoModel[], term: string) {
    if (term.trim().length === 0) {
      return procedimentos
    }

    return procedimentos.filter(procedimento => {
      if (
        term
          .toLowerCase()
          .localeCompare(String(procedimento.id).toLowerCase()) === 0
      )
        return true

      const lastStatus = getCurrentStatus(procedimento)

      if (lastStatus && term.includes(lastStatus)) return true

      const terms = term.split(' ')
      let includes = false

      terms.forEach(term => {
        if (
          procedimento.tipo_procedimento?.nome
            .toLowerCase()
            .includes(term.toLowerCase())
        ) {
          includes = true
        }
      })

      return includes
    })
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
}
