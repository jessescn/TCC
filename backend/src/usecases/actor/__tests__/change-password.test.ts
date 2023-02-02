import { ActorModel } from 'domain/models/actor'
import jwt from 'jsonwebtoken'
import { IActorRepository } from 'repositories/sequelize/actor'
import { createMock } from 'ts-auto-mock'
import { Request } from 'types/express'
import { NotFoundError, UnauthorizedError } from 'types/express/errors'
import { ChangePasswordUseCase } from '../change-password'

describe('ChangePassword UseCase', () => {
  const actor = createMock<ActorModel>({ email: 'actor@teste.com' })
  const token = jwt.sign({ data: actor }, process.env.JWT_SECRET_KEY, {
    expiresIn: '5m'
  })

  const repo = createMock<IActorRepository>({
    findAll: jest.fn().mockResolvedValue([actor]),
    update: jest.fn().mockResolvedValue(actor)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should update actor password', async () => {
    const request = createMock<Request>({
      body: { code: token, password: 'teste2' }
    })
    const sut = new ChangePasswordUseCase(repo)

    const result = await sut.execute(request)

    expect(result).toEqual(actor)
    expect(repo.update).toBeCalled()
  })

  it('should throw a UnauthorizedError if code is invalid', async () => {
    const invalidToken = jwt.sign({ data: {} }, process.env.JWT_SECRET_KEY, {
      expiresIn: '5m'
    })
    const request = createMock<Request>({
      body: { code: invalidToken, password: 'teste2' }
    })
    const sut = new ChangePasswordUseCase(repo)

    const shouldThrow = async () => {
      await sut.execute(request)
    }

    await expect(shouldThrow).rejects.toThrow(UnauthorizedError)
  })

  it('should throw NotFoundError if actor not found', async () => {
    const repo = createMock<IActorRepository>({
      findAll: jest.fn().mockResolvedValue([])
    })
    const request = createMock<Request>({
      body: { code: token, password: 'teste2' }
    })
    const sut = new ChangePasswordUseCase(repo)

    const shouldThrow = async () => {
      await sut.execute(request)
    }

    await expect(shouldThrow).rejects.toThrow(NotFoundError)
  })
})
