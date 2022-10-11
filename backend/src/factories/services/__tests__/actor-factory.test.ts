import { ActorService } from 'services/actor'
import { makeActorService } from '../actor-factory'

describe('ActorService Factory', () => {
  it('should create a instance of ActorService', () => {
    const result = makeActorService()

    expect(result).toBeInstanceOf(ActorService)
  })
})
