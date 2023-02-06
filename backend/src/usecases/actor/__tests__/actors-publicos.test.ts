import { ActorModel } from 'domain/models/actor'
import { IActorRepository } from 'repositories/sequelize/actor'
import { createMock } from 'ts-auto-mock'
import { ActorsPublicosUseCase } from '../actors-publicos'

describe('ActorsPublicos UseCase', () => {
  const actors = [
    createMock<ActorModel>({ publico: ['publico1', 'publico2'] }),
    createMock<ActorModel>({ publico: ['publico2', 'publico4'] }),
    createMock<ActorModel>({ publico: [] })
  ]
  const repo = createMock<IActorRepository>({
    findAll: jest.fn().mockResolvedValue(actors)
  })

  it('should return publicos from all actors', async () => {
    const sut = new ActorsPublicosUseCase(repo)

    const result = await sut.execute()

    expect(result).toEqual(['publico1', 'publico2', 'publico4'])
  })
})
