import { createMock } from 'ts-auto-mock'
import { AuthTokenMiddleware } from 'middlewares/authorization'
import jwt from 'jsonwebtoken'
import { HttpStatusCode, Request, Response } from 'types/express'
import { ActorModel } from 'domain/models/actor'

describe('AuthToken Middleware', () => {
  const actor = createMock<ActorModel>()
  const sut = new AuthTokenMiddleware()

  it('should validate the request and append the parsed actor', async () => {
    const token = jwt.sign({ data: actor }, process.env.JWT_SECRET_KEY)
    const request = createMock<Request>({
      headers: { authorization: `Bearer ${token}` }
    })
    const response = createMock<Response>()
    const next = jest.fn()

    sut.exec(request, response, next)

    expect(request.actor).toEqual(actor)
    expect(next).toBeCalled()
  })

  it('should throw UnauthorizedError if header doesn`t have authorization', () => {
    const request = createMock<Request>({
      headers: {}
    })
    const response = createMock<Response>()
    const next = jest.fn()

    sut.exec(request, response, next)

    expect(response.status).toBeCalledWith(HttpStatusCode.unauthorized)
  })

  it('should throw UnauthorizedError if token has invalid format', () => {
    const token = jwt.sign({ data: actor }, process.env.JWT_SECRET_KEY)
    const request = createMock<Request>({
      headers: { authorization: `InvalidPrefix ${token}` }
    })
    const response = createMock<Response>()
    const next = jest.fn()

    sut.exec(request, response, next)

    expect(response.status).toBeCalledWith(HttpStatusCode.unauthorized)
  })
})
