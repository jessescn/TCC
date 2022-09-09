import { DeleteVoteController } from 'controllers/colegiado/delete-vote'
import { makeProcedimentoRepository } from 'factories/repositories/procedimento-factory'

export const makeDeleteVoteController = () => {
  return new DeleteVoteController(makeProcedimentoRepository())
}
