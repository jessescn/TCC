import { FormularioModel } from 'domain/models/formulario'
import { Resposta } from 'domain/models/procedimento'
import { escapeRegExp, extract } from 'utils/format'

export class FormularioHelper {
  static insertRespostasIntoTemplate(
    formulario: FormularioModel,
    respostaFormulario: Resposta
  ) {
    if (!formulario.template) return

    const slotExtractor = extract('<<', '>>')
    const slotsToFill = [...new Set(slotExtractor(formulario.template))]

    return slotsToFill.reduce((current, slot) => {
      const pergunta = formulario.campos.find(
        campo => campo.configuracao_campo?.titulo === slot
      )
      const resposta = respostaFormulario.campos.find(
        campo => campo.ordem === pergunta?.ordem
      )

      const replaceText = resposta ? resposta.valor : 'NOT_FOUND'
      const findExpression = escapeRegExp(`<<${slot}>>`)
      const replacer = new RegExp(findExpression, 'g')

      return current.replace(replacer, replaceText)
    }, formulario.template)
  }
}
