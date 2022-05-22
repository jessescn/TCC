import { RemoteUser, UserController } from '../user'
import { UserService } from 'services/user-service'
import {
  makeRequest,
  makeResponse,
  makeStatusSpy
} from '../../jest/helpers/controllers'
import { UserMock } from 'models/mocks/user-mock'
import { HttpStatusCode } from 'types/express'

describe('UserController', () => {
  const newUser: RemoteUser = {
    email: 'teste@teste.com',
    name: 'teste',
    password: 'password'
  }

  const usersMock = new UserMock().generate(2)
  const [userMock] = new UserMock().generate()

  const sut = UserController

  const mockUserGetByEmail = (value: any) => {
    jest.spyOn(UserService, 'getByEmail').mockResolvedValue(value)
  }

  const mockUserCreate = (value: any) => {
    jest.spyOn(UserService, 'create').mockResolvedValue(value)
  }

  const mockUserUpdate = (value: any) => {
    jest.spyOn(UserService, 'update').mockResolvedValue(value)
  }

  const mockUserDestroy = (value: any) => {
    jest.spyOn(UserService, 'destroy').mockResolvedValue(value)
  }

  const mockUserGetAll = (value: any) => {
    jest.spyOn(UserService, 'getAll').mockResolvedValue(value)
  }

  const mockUserGetById = (value: any) => {
    jest.spyOn(UserService, 'getById').mockResolvedValue(value)
  }

  test('create: deve criar um novo usuário e retorná-lo com status 201 (created)', async () => {
    const jsonSpy = jest.fn()

    const request = makeRequest({ body: newUser })
    const response = makeResponse({ json: jsonSpy })

    mockUserGetByEmail(null) // email not used yet
    mockUserCreate(userMock)

    await sut.create(request, response)

    expect(jsonSpy).toHaveBeenCalledWith(userMock)
  })

  test('create: deve retornar 400 (bad request) caso o email já exista', async () => {
    const sendSpy = jest.fn()
    const statusSpy = makeStatusSpy(sendSpy)

    const request = makeRequest({ body: newUser })
    const response = makeResponse({ status: statusSpy })

    mockUserGetByEmail(userMock) // email already exists

    await sut.create(request, response)

    expect(statusSpy).toHaveBeenCalledWith(HttpStatusCode.badRequest)
    expect(sendSpy).toHaveBeenCalledWith('email already used')
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

  test('read: deve retornar todos os usuários caso um id não seja passado nos parâmetros', async () => {
    const jsonSpy = jest.fn()
    const request = makeRequest({ params: {} })
    const response = makeResponse({ json: jsonSpy })

    mockUserGetAll(usersMock)

    await sut.read(request, response)

    expect(jsonSpy).toHaveBeenCalledWith(usersMock)
  })

  test('read: deve retornar um usuário específico pelo id', async () => {
    const jsonSpy = jest.fn()
    const request = makeRequest({ params: { id: 1 } })
    const response = makeResponse({ json: jsonSpy })

    mockUserGetById(userMock)

    await sut.read(request, response)

    expect(jsonSpy).toHaveBeenCalledWith(userMock)
  })

  test('read: deve retornar status 404 (not found) caso o usuário não exista', async () => {
    const statusSpy = makeStatusSpy()
    const request = makeRequest({ params: { id: 1 } })
    const response = makeResponse({ status: statusSpy })

    mockUserGetById(null)

    await sut.read(request, response)

    expect(statusSpy).toHaveBeenCalledWith(HttpStatusCode.notFound)
  })

  test('read: deve retornar status 500 (server error) caso seja lançada uma exceção', async () => {
    const statusSpy = makeStatusSpy()
    const request = makeRequest({}) // should throw exception because params was not defined
    const response = makeResponse({ status: statusSpy })

    await sut.read(request, response)

    expect(statusSpy).toHaveBeenCalledWith(HttpStatusCode.serverError)
  })

  test('update: deve atualizar um usuário pelo id', async () => {
    const jsonSpy = jest.fn()
    const userModifiedMock = { ...userMock, name: 'teste' }
    const request = makeRequest({ params: { id: 1 }, body: userModifiedMock })
    const response = makeResponse({ json: jsonSpy })

    mockUserUpdate(userModifiedMock)

    await sut.update(request, response)

    expect(jsonSpy).toHaveBeenCalledWith(userModifiedMock)
  })

  test('update: deve retornar status 404 (not found) caso o usuário não seja encontrado', async () => {
    const statusSpy = makeStatusSpy()
    const request = makeRequest({ params: { id: 1 }, body: {} })
    const response = makeResponse({ status: statusSpy })

    mockUserUpdate(null)

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

  test('update: deve retornar status 500 (server error) caso seja lançada uma exceção', async () => {
    const statusSpy = makeStatusSpy()
    const request = makeRequest({}) // should throw exception because params was not defined
    const response = makeResponse({ status: statusSpy })

    await sut.update(request, response)

    expect(statusSpy).toHaveBeenCalledWith(HttpStatusCode.serverError)
  })

  test('delete: deve remover um usuário', async () => {
    const jsonSpy = jest.fn()
    const request = makeRequest({ params: { id: 1 } })
    const response = makeResponse({ json: jsonSpy })

    mockUserDestroy(userMock)

    await sut.delete(request, response)

    expect(jsonSpy).toHaveBeenCalledWith(userMock)
  })

  test('delete: deve retornar status 404 (not found) caso o usuário não exista', async () => {
    const statusSpy = makeStatusSpy()

    const request = makeRequest({ params: { id: 1 } })
    const response = makeResponse({ status: statusSpy })

    mockUserDestroy(null)

    await sut.delete(request, response)

    expect(statusSpy).toHaveBeenCalledWith(HttpStatusCode.notFound)
  })

  test('delete: deve retornar status 500 (server error) caso seja lançada uma exceção', async () => {
    const statusSpy = makeStatusSpy()

    const request = makeRequest() // should throw error because req.params was not defined
    const response = makeResponse({ status: statusSpy })

    await sut.delete(request, response)

    expect(statusSpy).toHaveBeenCalledWith(HttpStatusCode.serverError)
  })
})
