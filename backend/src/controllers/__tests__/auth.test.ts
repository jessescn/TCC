import { ActorModel } from 'domain/models/actor'
import { createMock } from 'ts-auto-mock'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { AuthController } from 'controllers/auth'
import { HttpStatusCode, Request, Response } from 'types/express'

describe('Auth Controller', () => {
  describe('token', () => {
    it('should respond with generated token and a expirationTime', async () => {
      const password = 'teste1'
      const encrypted = await bcrypt.hash(password, 10)
      const actor = createMock<ActorModel>({ senha: encrypted })

      const service = {
        findAll: jest.fn().mockResolvedValue([actor])
      }

      const data = {
        email: 'user@user.com',
        senha: password
      }

      const token = jwt.sign({ data: actor }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_TOKEN_EXPIRATION
      })

      const request = createMock<Request>({ body: data })
      const response = createMock<Response>()

      const sut = new AuthController(service as any)

      await sut.token(request, response)

      expect(response.json).toBeCalledWith({
        token,
        expiresIn: process.env.JWT_TOKEN_EXPIRATION
      })
    })

    it('should respond with BadRequestError if email or senha is not in request', async () => {
      const actor = createMock<ActorModel>()

      const service = {
        findAll: jest.fn().mockResolvedValue([actor])
      }

      const sut = new AuthController(service as any)

      const data1 = {
        email: 'user@user.com'
      }

      const request1 = createMock<Request>({ body: data1 })
      const response1 = createMock<Response>()

      await sut.token(request1, response1)

      expect(response1.status).toBeCalledWith(HttpStatusCode.badRequest)

      const data2 = {
        senha: 'senha1'
      }

      const request2 = createMock<Request>({ body: data2 })
      const response2 = createMock<Response>()

      await sut.token(request2, response2)

      expect(response2.status).toBeCalledWith(HttpStatusCode.badRequest)
    })

    it('should respond with NotFoundError if actor does not exists', async () => {
      const password = 'teste1'

      const service = {
        findAll: jest.fn().mockResolvedValue([])
      }

      const data = {
        email: 'user@user.com',
        senha: password
      }

      const request = createMock<Request>({ body: data })
      const response = createMock<Response>()

      const sut = new AuthController(service as any)

      await sut.token(request, response)

      expect(response.status).toBeCalledWith(HttpStatusCode.notFound)
    })

    it('should respond with UnauthorizedError if password is not valid', async () => {
      const password = 'teste1'
      const encrypted = await bcrypt.hash(password, 10)
      const actor = createMock<ActorModel>({ senha: encrypted })

      const service = {
        findAll: jest.fn().mockResolvedValue([actor])
      }

      const data = {
        email: 'user@user.com',
        senha: 'invalidPassword'
      }

      const request = createMock<Request>({ body: data })
      const response = createMock<Response>()

      const sut = new AuthController(service as any)

      await sut.token(request, response)

      expect(response.status).toBeCalledWith(HttpStatusCode.unauthorized)
    })
  })

  describe('me', () => {
    const actor = createMock<ActorModel>()
    const service = {
      findAll: jest.fn().mockResolvedValue([actor])
    } as any

    it('should return info about user inside request', async () => {
      const request = createMock<Request>({ actor })
      const response = createMock<Response>()

      const sut = new AuthController(service)

      await sut.me(request, response)

      expect(response.json).toBeCalledWith(actor)
    })

    it('should throw an UnauthorizedError if request does not have actor', async () => {
      const request = createMock<Request>()
      const response = createMock<Response>()

      const sut = new AuthController(service)

      await sut.me(request, response)

      expect(response.status).toBeCalledWith(HttpStatusCode.unauthorized)
    })
  })
})
