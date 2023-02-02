import { ActorModel } from 'domain/models/actor'
import { IActorRepository } from 'repositories/sequelize/actor'
import { createMock } from 'ts-auto-mock'
import { Request } from 'types/express'
import { NotFoundError, UnauthorizedError } from 'types/express/errors'
import { Credentials, TokenUseCase } from '../token'

describe('Token UseCase', () => {
  const encrypted =
    '$2b$10$Lj81LDlaLDS7.Pg1PYOYdu.qpZxakzirC9jxQmWDKo/ilqw2LsCCK'
  const actor = createMock<ActorModel>({
    email: 'teste@teste.com',
    senha: encrypted
  })
  const credentials: Credentials = { email: 'teste@teste.com', senha: 'teste' }

  it('should return token info', async () => {
    const request = createMock<Request>({ body: credentials })
    const repo = createMock<IActorRepository>({
      findAll: jest.fn().mockResolvedValue([actor])
    })
    const sut = new TokenUseCase(repo)

    const result = await sut.execute(request)

    expect(result).toBeTruthy()
    expect(result.verificado).toEqual(actor.verificado)
    expect(result.email).toEqual(actor.email)
  })

  it('should throw NotFoundError if actor not found', async () => {
    const request = createMock<Request>({ body: credentials })
    const repo = createMock<IActorRepository>({
      findAll: jest.fn().mockResolvedValue([])
    })
    const sut = new TokenUseCase(repo)

    const shouldThrow = async () => {
      await sut.execute(request)
    }

    await expect(shouldThrow).rejects.toThrow(NotFoundError)
  })

  it('should throw UnauthorizedError if credentials are invalid', async () => {
    const invalidCredentials: Credentials = {
      email: actor.email,
      senha: 'invalid password'
    }
    const request = createMock<Request>({ body: invalidCredentials })
    const repo = createMock<IActorRepository>({
      findAll: jest.fn().mockResolvedValue([actor])
    })
    const sut = new TokenUseCase(repo)

    const shouldThrow = async () => {
      await sut.execute(request)
    }

    await expect(shouldThrow).rejects.toThrow(UnauthorizedError)
  })
})
