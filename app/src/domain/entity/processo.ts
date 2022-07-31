import { Resposta, RespostaCampo } from 'domain/models/processo'

export class Processo {
  static getRespostaByFormulario(respostas: Resposta[], formularioId: number) {
    return respostas.find(resposta => resposta.formulario === formularioId)
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
