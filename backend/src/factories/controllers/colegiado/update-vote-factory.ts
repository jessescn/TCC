import { UpdateVoteController } from 'controllers/colegiado/update-vote'
import { makeColegiadoService } from 'factories/services/colegiado-factory'

export const makeUpdateVoteController = () => {
  return new UpdateVoteController(makeColegiadoService())
}
