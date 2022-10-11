import { DeleteVoteController } from 'controllers/colegiado/delete-vote'
import { UpdateVoteController } from 'controllers/colegiado/update-vote'
import { deleteVoteController, voteController } from '..'

describe('Colegiado Controllers Factories', () => {
  it('should create a instance of UpdateVoteController', () => {
    expect(voteController).toBeInstanceOf(UpdateVoteController)
  })

  it('should create a instance of DeleteVoteController', () => {
    expect(deleteVoteController).toBeInstanceOf(DeleteVoteController)
  })
})
