import { FormularioModel } from 'domain/models/formulario'
import { ProcedimentoModel } from 'domain/models/procedimento'
import { VotoModel } from 'domain/models/voto'
import { FormularioHelper } from './formulario'

export type ForwardData = {
  data: string
  formulario: FormularioModel
}

export class ProcedimentoHelper {
  static isMaioria = (votes: VotoModel[], numberOfColegiados: number) => {
    const numberOfVotes = votes.length

    return numberOfVotes >= Math.ceil(numberOfColegiados / 2)
  }

  static getCurrentStatus = (procedimento: ProcedimentoModel) => {
    return procedimento.status[procedimento.status.length - 1]?.status
  }

  static isProcedimentoAprovado = (votes: VotoModel[]) => {
    const positive = votes.filter(vote => vote.aprovado).length
    const negative = votes.length - positive

    return positive > negative
  }

  static getForwardData = (
    procedimento: ProcedimentoModel,
    formularios: FormularioModel[]
  ) => {
    const previews = formularios
      .filter(formulario => formulario.template)
      .reduce((current, formulario) => {
        const respostaToForm = procedimento.respostas.find(
          resposta => resposta.formulario === formulario.id
        )

        if (!respostaToForm) {
          return current
        }

        const filledTemplate = FormularioHelper.insertRespostasIntoTemplate(
          formulario,
          respostaToForm
        )

        return [...current, { data: filledTemplate, formulario }]
      }, [] as ForwardData[])

    return previews
  }
}
