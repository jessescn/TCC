import { makeDeleteVoteController } from './delete-vote-factory'
import { makeReadEmHomologacaoController } from './read-factory'
import { makeUpdateVoteController } from './update-vote-factory'

export const voteController = makeUpdateVoteController()
export const deleteVoteController = makeDeleteVoteController()
export const readEmHomologacaoController = makeReadEmHomologacaoController()
