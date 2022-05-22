import { UserController } from '../user'
import { RemoteUser, UserService } from 'services/user-service'
import {
  makeRequest,
  makeResponse,
  makeStatusSpy
} from '../../jest/__mocks__/controllers'
import { UserMockBuilder } from 'models/__mocks__/user-mock'
import { HttpStatusCode } from 'types/express'
import { ConflictError, NotFoundError } from 'types/express/errors'
import {
  mockServiceCreate,
  mockServiceUpdate,
  mockServiceDestroy,
  mockServiceGetAll,
  mockServiceGetById
} from '../../jest/__mocks__/services'

describe('UserController', () => {
  const newUser: RemoteUser = {
    email: 'teste@teste.com',
    name: 'teste',
    password: 'password'
  }

  const usersMock = new UserMockBuilder().generate(2)
  const [userMock] = new UserMockBuilder().generate()

  const sut = UserController

  test('create: deve criar um novo usuário e retorná-lo com status 201 (created)', async () => {
    const statusSpy = makeStatusSpy()

    const request = makeRequest({ body: newUser })
    const response = makeResponse({ status: statusSpy })

    mockServiceCreate(UserService, userMock)

    await sut.create(request, response)

    expect(statusSpy).toHaveBeenCalledWith(HttpStatusCode.created)
  })

  const testCreateWithWrongData = async (data: any) => {
    const statusSpy = makeStatusSpy()
    const request = makeRequest({ body: data })
    const response = makeResponse({ status: statusSpy })

    await sut.create(request, response)

    expect(statusSpy).toHaveBeenCalledWith(HttpStatusCode.badRequest)
  }

  test('create: deve retornar erro 400 (bad request) caso o email não seja passado', async () => {
    const { email, ...userSemEmail } = newUser

    await testCreateWithWrongData(userSemEmail)
  })

  test('create: deve retornar erro 400 (bad request) caso o name não seja passado', async () => {
    const { password, ...userSemPassword } = newUser

    await testCreateWithWrongData(userSemPassword)
  })

  test('create: deve retornar erro 400 (bad request) caso o password não seja passado', async () => {
    const { email, ...userSemName } = newUser

    await testCreateWithWrongData(userSemName)
  })

  test('create: deve retornar erro 500 (server error) caso seja lançada alguma exceção', async () => {
    const statusSpy = makeStatusSpy()
    const request = makeRequest({}) // should throw exception because req.body was not defined
    const response = makeResponse({ status: statusSpy })

    await sut.create(request, response)

    expect(statusSpy).toHaveBeenCalledWith(HttpStatusCode.serverError)
  })

  test('create: deve retornar status e mensagem do erro caso ele seja um RequestError', async () => {
    mockServiceCreate(UserService, Promise.reject(new ConflictError()))

    const statusSpy = makeStatusSpy()

    const request = makeRequest({ body: newUser })
    const response = makeResponse({ status: statusSpy })

    await sut.create(request, response)

    expect(statusSpy).toHaveBeenCalledWith(HttpStatusCode.conflict)
  })

  test('read: deve retornar todos os usuários', async () => {
    const jsonSpy = jest.fn()
    const request = makeRequest({ params: {} })
    const response = makeResponse({ json: jsonSpy })

    mockServiceGetAll(UserService, usersMock)

    await sut.read(request, response)

    expect(jsonSpy).toHaveBeenCalledWith(usersMock)
  })

  test('read: deve retornar status 500 caso seja lançado um erro', async () => {
    mockServiceGetAll(UserService, Promise.reject(new Error()))

    const statusSpy = makeStatusSpy()
    const request = makeRequest({ params: { id: 1 } })
    const response = makeResponse({ status: statusSpy })

    await sut.read(request, response)

    expect(statusSpy).toHaveBeenCalledWith(HttpStatusCode.serverError)
  })

  test('readById: deve retornar um usuário específico pelo id', async () => {
    const jsonSpy = jest.fn()
    const request = makeRequest({ params: { id: 1 } })
    const response = makeResponse({ json: jsonSpy })

    mockServiceGetById(UserService, userMock)

    await sut.readById(request, response)

    expect(jsonSpy).toHaveBeenCalledWith(userMock)
  })

  test('readById: deve retornar status 404 (not found) caso o usuário não exista', async () => {
    mockServiceGetById(UserService, Promise.reject(new NotFoundError()))

    const statusSpy = makeStatusSpy()
    const request = makeRequest({ params: { id: 1 } })
    const response = makeResponse({ status: statusSpy })

    await sut.readById(request, response)

    expect(statusSpy).toHaveBeenCalledWith(HttpStatusCode.notFound)
  })

  test('readById: deve retornar status 500 (server error) caso seja lançada uma exceção que não seja RequestError', async () => {
    const statusSpy = makeStatusSpy()
    const request = makeRequest({}) // should throw exception because params was not defined
    const response = makeResponse({ status: statusSpy })

    await sut.readById(request, response)

    expect(statusSpy).toHaveBeenCalledWith(HttpStatusCode.serverError)
  })

  test('update: deve atualizar um usuário pelo id', async () => {
    const jsonSpy = jest.fn()
    const userModifiedMock = { ...userMock, name: 'teste' }
    const request = makeRequest({ params: { id: 1 }, body: userModifiedMock })
    const response = makeResponse({ json: jsonSpy })

    mockServiceUpdate(UserService, userModifiedMock)

    await sut.update(request, response)

    expect(jsonSpy).toHaveBeenCalledWith(userModifiedMock)
  })

  test('update: deve retornar status 404 (not found) caso o usuário não seja encontrado', async () => {
    mockServiceUpdate(UserService, Promise.reject(new NotFoundError()))

    const statusSpy = makeStatusSpy()
    const request = makeRequest({ params: { id: 1 }, body: {} })
    const response = makeResponse({ status: statusSpy })

    await sut.update(request, response)

    expect(statusSpy).toHaveBeenCalledWith(HttpStatusCode.notFound)
  })

  test('update: deve retornar status 400 (bad request) não seja passado alterações', async () => {
    const statusSpy = makeStatusSpy()
    const request = makeRequest({ params: { id: 1 }, body: null })
    const response = makeResponse({ status: statusSpy })

    await sut.update(request, response)

    expect(statusSpy).toHaveBeenCalledWith(HttpStatusCode.badRequest)
  })

  test('delete: deve remover um usuário', async () => {
    const jsonSpy = jest.fn()
    const request = makeRequest({ params: { id: 1 } })
    const response = makeResponse({ json: jsonSpy })

    mockServiceDestroy(UserService, userMock)

    await sut.delete(request, response)

    expect(jsonSpy).toHaveBeenCalledWith(userMock)
  })

  test('delete: deve retornar status 404 (not found) caso o usuário não exista', async () => {
    mockServiceDestroy(UserService, Promise.reject(new NotFoundError()))

    const statusSpy = makeStatusSpy()

    const request = makeRequest({ params: { id: 1 } })
    const response = makeResponse({ status: statusSpy })

    await sut.delete(request, response)

    expect(statusSpy).toHaveBeenCalledWith(HttpStatusCode.notFound)
  })
})
