import { RemoteUser, UserController } from '../user'
import { UserService } from 'services/user-service'
import {
  makeRequest,
  makeResponse,
  makeStatusSpy
} from '../../jest/helpers/controllers'
import { UserMock } from 'models/mocks/user-mock'
import { HttpStatusCode } from 'types/express'
import { ConflictError, NotFoundError } from 'types/express/errors'

describe('UserController', () => {
  const newUser: RemoteUser = {
    email: 'teste@teste.com',
    name: 'teste',
    password: 'password'
  }

  const usersMock = new UserMock().generate(2)
  const [userMock] = new UserMock().generate()

  const sut = UserController

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

    mockUserCreate(userMock)

    await sut.create(request, response)

    expect(jsonSpy).toHaveBeenCalledWith(userMock)
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
    jest.spyOn(UserService, 'create').mockImplementation(() => {
      throw new ConflictError('user already exists')
    })

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

    mockUserGetAll(usersMock)

    await sut.read(request, response)

    expect(jsonSpy).toHaveBeenCalledWith(usersMock)
  })

  test('read: deve retornar status 500 caso seja lançado um erro', async () => {
    jest.spyOn(UserService, 'getAll').mockImplementation(() => {
      throw new Error()
    })

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

    mockUserGetById(userMock)

    await sut.readById(request, response)

    expect(jsonSpy).toHaveBeenCalledWith(userMock)
  })

  test('readById: deve retornar status 404 (not found) caso o usuário não exista', async () => {
    jest.spyOn(UserService, 'getById').mockImplementation(() => {
      throw new NotFoundError('user not found')
    })

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

    mockUserUpdate(userModifiedMock)

    await sut.update(request, response)

    expect(jsonSpy).toHaveBeenCalledWith(userModifiedMock)
  })

  test('update: deve retornar status 404 (not found) caso o usuário não seja encontrado', async () => {
    jest.spyOn(UserService, 'update').mockImplementation(() => {
      throw new NotFoundError('user not found')
    })

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

    mockUserDestroy(userMock)

    await sut.delete(request, response)

    expect(jsonSpy).toHaveBeenCalledWith(userMock)
  })

  test('delete: deve retornar status 404 (not found) caso o usuário não exista', async () => {
    jest.spyOn(UserService, 'destroy').mockImplementation(() => {
      throw new NotFoundError('user not found')
    })

    const statusSpy = makeStatusSpy()

    const request = makeRequest({ params: { id: 1 } })
    const response = makeResponse({ status: statusSpy })

    await sut.delete(request, response)

    expect(statusSpy).toHaveBeenCalledWith(HttpStatusCode.notFound)
  })
})
