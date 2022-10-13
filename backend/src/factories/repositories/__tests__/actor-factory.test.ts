import { ActorRepository } from 'repositories/sequelize/actor'
import { makeActorRepository } from '../actor-factory'

describe('ActorRepository Factory', () => {
  it('should create a instance of ActorRepository', () => {
    const result = makeActorRepository()

    expect(result).toBeInstanceOf(ActorRepository)
  })
})
