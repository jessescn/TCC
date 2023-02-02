import { ActorModel } from 'domain/models/actor'
import { createMock } from 'ts-auto-mock'
import jwt from 'jsonwebtoken'
import { IActorRepository } from 'repositories/sequelize/actor'
import { Request } from 'types/express'
import { AccountVerificationUseCase } from '../account-verification'
import { NotFoundError, UnauthorizedError } from 'types/express/errors'

describe('AccountVerification UseCase', () => {
  const actor = createMock<ActorModel>({ email: 'teste@teste.com' })
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

  it('should update actor with verified true', async () => {
    const request = createMock<Request>({ body: { code: token } })
    const sut = new AccountVerificationUseCase(repo)

    const result = await sut.execute(request)

    expect(repo.update).toBeCalled()
    expect(result).toEqual(actor)
  })

  it('should throw UnauthorizedError if code is invalid', async () => {
    const invalidToken = jwt.sign({ data: {} }, process.env.JWT_SECRET_KEY, {
      expiresIn: '5m'
    })
    const request = createMock<Request>({ body: { code: invalidToken } })
    const sut = new AccountVerificationUseCase(repo)

    const shouldThrow = async () => {
      await sut.execute(request)
    }

    await expect(shouldThrow).rejects.toThrow(UnauthorizedError)
  })

  it('should throw NotFoundError if actor not found', async () => {
    const request = createMock<Request>({ body: { code: token } })
    const repo = createMock<IActorRepository>({
      findAll: jest.fn().mockResolvedValue([])
    })
    const sut = new AccountVerificationUseCase(repo)

    const shouldThrow = async () => {
      await sut.execute(request)
    }

    await expect(shouldThrow).rejects.toThrow(NotFoundError)
  })
})
