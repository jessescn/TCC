import { FormularioModel } from 'domain/models/formulario'
import { Resposta } from 'domain/models/procedimento'
import { extract } from 'utils/format'

export class FormularioHelper {
  insertRespostasIntoTemplate(formulario: FormularioModel, resposta: Resposta) {
    if (!formulario.template) return

    let template = formulario.template

    const extractor = extract('<<', '>>')
    const insertionEntries = [...new Set(extractor(template))]

    insertionEntries.forEach(insertion => {
      const campoFormulario = formulario.campos.find(
        campo => campo.configuracao_campo?.titulo === insertion
      )

      const campoResposta = resposta.campos.find(
        campo => campo.ordem === campoFormulario?.ordem
      )

      const replaceText = campoResposta ? campoResposta.valor : 'NOT_FOUND'
      const replacer = new RegExp(`<<${insertion}>>`, 'g')

      template = template.replace(replacer, replaceText)
    })

    return template
  }
}
