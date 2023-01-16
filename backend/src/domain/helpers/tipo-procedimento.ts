import { TipoProcedimentoModel } from 'domain/models/tipo-procedimento'
import { ActorModel } from 'domain/models/actor'
import { ProcedimentoModel, Resposta } from 'domain/models/procedimento'
import { FormularioModel, CampoFormulario } from 'domain/models/formulario'
import { TipoCampoRespostaStrategy } from './formulario-campos-strategy'

type ExportDataResposta = {
  formulario: number
  data: object
}

// type CampoResposta = {
//   titulo: string
//   label: string
//   respostas: string[]
//   tipo: TipoCampoFormulario
// }

// type Grouped = {
//   [key: string]: string[]
// }

// const data: CampoResposta[] = [
//   {
//     label: 'Pergunta 1 [Linha 1]',
//     titulo: 'Pergunta 1',
//     tipo: 'grelha_multipla',
//     respostas: ['Coluna 2']
//   },
//   {
//     label: 'Pergunta 1 [Linha 2]',
//     titulo: 'Pergunta 1',
//     tipo: 'grelha_multipla',
//     respostas: ['Coluna 3']
//   },
//   {
//     label: 'Pergunta 2 [linha 1]',
//     titulo: 'Pergunta 2',
//     tipo: 'grelha_verificacao',
//     respostas: ['Opcão 2', 'Opcao 1']
//   }
// ]

// // quero respostas da pergunta 'Pergunta 1'
// const resultByPergunta = data.filter(value => value.titulo === 'Pergunta 1')

// // Vou agrupar por labels (cada label vai gerar um plot diferente)
// const groupedByLabel = resultByPergunta.reduce((current, value) => {
//   return { ...current, [value.label]: value.respostas }
// }, {} as Grouped)

export class TipoProcedimentoHelper {
  static belongsToPublico = (
    actor: ActorModel,
    tipo: TipoProcedimentoModel
  ) => {
    if (tipo.publicos.length === 0) {
      return true
    }

    return tipo.publicos.reduce((belongs, publico) => {
      if (actor.publico.includes(publico)) {
        return true
      }

      return belongs || false
    }, false)
  }

  private static getExportDataResposta = (
    resposta: Resposta,
    formulario: FormularioModel
  ) => {
    const camposMap: Record<number, CampoFormulario> = formulario.campos.reduce(
      (current, campo) => {
        current[campo.ordem] = campo

        return current
      },
      {}
    )

    const result = resposta.campos.reduce((current, campo) => {
      const formField = camposMap[campo.ordem]

      if (!formField) return current

      const handler = new TipoCampoRespostaStrategy(campo, formField)

      const data = handler.getExportFormat()

      return { ...current, ...data }
    }, {})

    return result
  }

  static getExportData = (
    procedimento: ProcedimentoModel,
    formularios: FormularioModel[]
  ) => {
    const data: ExportDataResposta[] = []

    procedimento.respostas.forEach(resposta => {
      const formulario = formularios.find(
        form => form.id === resposta.formulario
      )

      if (formulario) {
        const result = TipoProcedimentoHelper.getExportDataResposta(
          resposta,
          formulario
        )

        if (Object.keys(result).length > 0) {
          data.push({
            formulario: formulario.id,
            data: result
          })
        }
      }
    })

    return data
  }

  static getAnalyzableDataResposta(
    resposta: Resposta,
    formulario: FormularioModel,
    tituloCampo: string
  ) {
    const campoFormulario = formulario.campos.find(
      campo => campo.configuracao_campo.titulo === tituloCampo
    )

    const campoResposta = resposta.campos.find(
      campo => campo.ordem === campoFormulario.ordem
    )

    if (!campoFormulario || !campoResposta) return {}

    const handler = new TipoCampoRespostaStrategy(
      campoResposta,
      campoFormulario
    )

    return handler.getAnalyzableData()
  }

  static getAnalyzableData = (
    procedimento: ProcedimentoModel,
    formulario: FormularioModel,
    campo: string
  ) => {
    const resposta = procedimento.respostas.find(
      resposta => resposta.formulario === formulario.id
    )

    if (!resposta) return {}

    return this.getAnalyzableDataResposta(resposta, formulario, campo)
  }
}
