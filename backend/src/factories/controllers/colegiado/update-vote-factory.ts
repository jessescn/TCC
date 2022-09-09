import { UpdateVoteController } from 'controllers/colegiado/update-vote'
import { makeProcedimentoRepository } from 'factories/repositories/procedimento-factory'

export const makeUpdateVoteController = () => {
  return new UpdateVoteController(makeProcedimentoRepository())
}
