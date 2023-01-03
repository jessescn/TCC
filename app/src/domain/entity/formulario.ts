import { CampoFormulario } from 'domain/models/formulario'
import { extract } from 'utils/validation'

export class Formulario {
  static validateTemplate = (template: string, campos: CampoFormulario[]) => {
    if (!template) return []

    const extractor = extract('<<', '>>')
    const fieldTitles = extractor(template)
    const invalids: string[] = []

    fieldTitles.forEach(title => {
      const matched = campos.find(
        campo => campo.configuracao_campo.titulo === title
      )

      if (!matched) {
        invalids.push(title)
      }
    })

    return [...new Set(invalids)]
  }
}
