import { ProcessoModel, Resposta, RespostaCampo } from 'domain/models/processo'

export class Processo {
  static getRespostaByFormulario(respostas: Resposta[], formularioId: number) {
    return respostas.find(resposta => resposta.formulario === formularioId)
  }

  static search(processos: ProcessoModel[], term: string) {
    if (term.trim().length === 0) {
      return processos
    }

    return processos.filter(processo => {
      if (
        term.toLowerCase().localeCompare(String(processo.id).toLowerCase()) ===
        0
      )
        return true

      const lastStatus = processo.status[processo.status.length - 1]?.status

      if (term.includes(lastStatus)) return true

      const terms = term.split(' ')
      let includes = false

      terms.forEach(term => {
        if (
          processo.tipo_processo?.nome
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
