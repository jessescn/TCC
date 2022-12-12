import { ProcedimentoModel, VotoProcedimento } from 'domain/models/procedimento'

export class ProcedimentoHelper {
  static insertOrUpdateVote = (
    votes: VotoProcedimento[],
    newVote: VotoProcedimento
  ) => {
    const index = votes.findIndex(vote => vote.autor === newVote.autor)

    if (index === -1) {
      return [...votes, newVote]
    }

    return votes.reduce((current, vote) => {
      if (vote.autor === newVote.autor) {
        return [...current, newVote]
      }

      return [...current, vote]
    }, [])
  }

  static isMaioria = (votes: VotoProcedimento[]) => {
    const numberOfColegiados = Number(process.env.COLEGIADO_QUANTITY) || 0

    const numberOfVotes = votes.length

    return numberOfVotes >= Math.ceil(numberOfColegiados / 2)
  }

  static getCurrentStatus = (procedimento: ProcedimentoModel) => {
    return procedimento.status[procedimento.status.length - 1]?.status
  }

  static isProcedimentoAprovado = (procedimento: ProcedimentoModel) => {
    const votes = procedimento.votos

    const positive = votes.filter(vote => vote.aprovado).length
    const negative = votes.length - positive

    return positive > negative
  }
}
