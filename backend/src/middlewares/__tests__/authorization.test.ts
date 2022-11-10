import { createMock } from 'ts-auto-mock'
import { AuthTokenMiddleware } from 'middlewares/authorization'
import jwt from 'jsonwebtoken'
import { HttpStatusCode, Request, Response } from 'types/express'
import { ActorModel } from 'domain/models/actor'

describe('AuthToken Middleware', () => {
  const actor = createMock<ActorModel>()
  const service = {
    findAll: jest.fn().mockResolvedValue([actor])
  }
  const sut = new AuthTokenMiddleware(service as any)

  it('should validate the request and append the parsed actor', async () => {
    const token = jwt.sign({ data: actor }, process.env.JWT_SECRET_KEY)
    const request = createMock<Request>({
      headers: { authorization: `Bearer ${token}` }
    })
    const response = createMock<Response>()
    const next = jest.fn()

    await sut.exec(request, response, next)

    expect(request.actor).toEqual(actor)
    expect(next).toBeCalled()
  })

  it('should throw UnauthorizedError if user not found', async () => {
    const service = {
      findAll: jest.fn().mockResolvedValue([])
    }
    const sut = new AuthTokenMiddleware(service as any)
    const token = jwt.sign({ data: actor }, process.env.JWT_SECRET_KEY)
    const request = createMock<Request>({
      headers: { authorization: `Bearer ${token}` }
    })
    const response = createMock<Response>()
    const next = jest.fn()

    await sut.exec(request, response, next)

    expect(response.status).toBeCalledWith(HttpStatusCode.unauthorized)
  })

  it('should throw UnauthorizedError if header doesn`t have authorization', async () => {
    const request = createMock<Request>({
      headers: {}
    })
    const response = createMock<Response>()
    const next = jest.fn()

    await sut.exec(request, response, next)

    expect(response.status).toBeCalledWith(HttpStatusCode.unauthorized)
  })

  it('should throw UnauthorizedError if token has invalid format', async () => {
    const token = jwt.sign({ data: actor }, process.env.JWT_SECRET_KEY)
    const request = createMock<Request>({
      headers: { authorization: `InvalidPrefix ${token}` }
    })
    const response = createMock<Response>()
    const next = jest.fn()

    await sut.exec(request, response, next)

    expect(response.status).toBeCalledWith(HttpStatusCode.unauthorized)
  })
})
