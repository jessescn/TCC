import { UserMock } from 'models/mocks/user-mock'
import User from 'models/user'
import { HttpStatusCode } from 'types/express'
import { AuthController } from '../auth'
import {
  makeRequest,
  makeResponse,
  makeStatusSpy,
  mockJwtSign
} from '../../jest/helpers/controllers'

describe('AuthController', () => {
  const sut = AuthController

  const mockUserFindOne = (value: any) => {
    jest.spyOn(User, 'findOne').mockResolvedValue(value)
  }

  const credenciais = { email: 'teste@teste.com', password: '1234' }

  beforeAll(() => {
    mockUserFindOne(null)
  })

  test('me: retorna as credenciais do usuário presentes no token', async () => {
    const user = new UserMock().build()

    const responseSpy = jest.fn()

    const request = makeRequest({ user })
    const response = makeResponse({
      json: responseSpy
    })

    await sut.me(request, response)

    expect(responseSpy).toHaveBeenCalledWith(user)
  })

  test('me: deve responder com status 500 caso ocorra algum erro', async () => {
    const statusSpy = makeStatusSpy()

    const request = makeRequest({})
    const response = makeResponse({
      status: statusSpy
    })

    await sut.me(request, response)

    expect(statusSpy).toHaveBeenCalledWith(HttpStatusCode.serverError)
  })

  test('token: deve retornar o token caso as credenciais do usuário estejam corretas', async () => {
    const user = {
      validPassword: jest.fn().mockResolvedValue(true)
    } as unknown as User

    const token = 'token test'

    const jsonSpy = jest.fn()

    mockUserFindOne(user)

    mockJwtSign(token)

    const request = makeRequest({ body: credenciais })
    const response = makeResponse({ json: jsonSpy })

    await sut.token(request, response)

    expect(jsonSpy).toHaveBeenCalledWith({
      token,
      expiresIn: process.env.JWT_TOKEN_EXPIRATION
    })
  })

  test('token: deve retornar status 400 caso não seja passado o email ou o password', async () => {
    const statusSpy = makeStatusSpy()

    const requestSemSenha = makeRequest({ body: { email: 'teste@teste.com' } })
    const requestSemEmail = makeRequest({ body: { password: '1234' } })
    const response = makeResponse({ status: statusSpy })

    await sut.token(requestSemSenha, response)

    await sut.token(requestSemEmail, response)

    expect(statusSpy).toHaveBeenNthCalledWith(1, HttpStatusCode.badRequest)
    expect(statusSpy).toHaveBeenNthCalledWith(2, HttpStatusCode.badRequest)
  })

  test('token: deve retornar status 404 caso o usuário não seja encontrado', async () => {
    const statusSpy = makeStatusSpy()

    mockUserFindOne(null)

    const request = makeRequest({ body: credenciais })
    const response = makeResponse({ status: statusSpy })

    await sut.token(request, response)

    expect(statusSpy).toHaveBeenCalledWith(HttpStatusCode.notFound)
  })

  test('token: deve retornar status 401 caso as senhas não correspondam', async () => {
    const statusSpy = makeStatusSpy()

    const user = {
      validPassword: jest.fn().mockResolvedValue(false)
    } as unknown as User

    mockUserFindOne(user)

    const request = makeRequest({ body: credenciais })
    const response = makeResponse({ status: statusSpy })

    await sut.token(request, response)

    expect(statusSpy).toHaveBeenCalledWith(HttpStatusCode.unauthorized)
  })

  test('token: deve retornar status 500 caso ocorra algum erro', async () => {
    const statusSpy = makeStatusSpy()

    const request = makeRequest({})
    const response = makeResponse({ status: statusSpy })

    await sut.token(request, response)

    expect(statusSpy).toHaveBeenCalledWith(HttpStatusCode.serverError)
  })
})
