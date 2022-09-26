import { DeleteVoteController } from 'controllers/colegiado/delete-vote'
import { makeColegiadoService } from 'factories/services/colegiado-factory'

export const makeDeleteVoteController = () => {
  return new DeleteVoteController(makeColegiadoService())
}
