import { RemoteUser, UserService } from 'services/user-service'
import User from 'models/user'
import {
  mockCreate,
  mockFindAll,
  mockFindByPk,
  mockFindOne
} from 'services/__mocks__/models-mock'
import { UserMockBuilder } from 'models/__mocks__/user-mock'
import { ConflictError, NotFoundError } from 'types/express/errors'

describe('Serviço de usuário', () => {
  const users = new UserMockBuilder().generate(3)
  const sut = UserService
  const newUserData: RemoteUser = {
    email: 'teste@teste.com',
    name: 'teste',
    password: 'pass@1234'
  }

  beforeEach(() => {
    mockCreate(User)
    mockFindAll(User)
    mockFindByPk(User)
    mockFindOne(User)
  })

  test('getAll: retorna todos os usuários', async () => {
    mockFindAll(User, users)

    const result = await sut.getAll()

    expect(result).toEqual(users)
  })

  test('getById: retorna um usuário pelo seu id', async () => {
    mockFindByPk(User, users[0])

    const result = await sut.getById(users[0].id)

    expect(result).toEqual(users[0])
  })

  test('getById: deve lançar um error NotFound caso o usuário não exista', async () => {
    mockFindByPk(User, null)

    const getByIdThrowError = async () => {
      await sut.getById(users[0].id)
    }

    await expect(getByIdThrowError).rejects.toThrow(NotFoundError)
  })

  test('getByEmail: deve retornar o usuário pelo seu email', async () => {
    mockFindOne(User, users[0])

    const result = await sut.getByEmail(users[0].email)

    expect(result.email).toEqual(users[0].email)
  })

  test('create: deve criar e retornar um novo usuário', async () => {
    mockFindOne(User, null)
    mockCreate(User, users[1])

    const result = await sut.create(newUserData)

    expect(result).toEqual(users[1])
  })

  test('create: deve lançar um ConflictError caso o usuário já exista', async () => {
    mockFindOne(User, users[0]) // user already exists

    const createThrowingError = async () => {
      await sut.create(newUserData)
    }

    await expect(createThrowingError).rejects.toThrow(ConflictError)
  })

  test('update: deve atualizar e retornar o usuário com as novas informações', async () => {
    const userWithSpies = { ...users[0], set: jest.fn(), save: jest.fn() }
    mockFindByPk(User, userWithSpies)

    await sut.update(users[0].id, { name: 'teste2' })

    expect(userWithSpies.set).toHaveBeenCalledWith({ name: 'teste2' })
    expect(userWithSpies.save).toBeCalled()
  })

  test('update: deve lançar erro NotFoundError caso o usuário não exista', async () => {
    mockFindByPk(User, null)

    const updateThrowingError = async () => {
      await sut.update(users[0].id, { name: 'teste2' })
    }

    await expect(updateThrowingError).rejects.toThrow(NotFoundError)
  })

  test('destroy: deve remover um usuário pelo id', async () => {
    const userWithSpy = { ...users[0], destroy: jest.fn() }

    mockFindByPk(User, userWithSpy)

    const result = await sut.destroy(users[0].id)

    expect(result).toEqual(userWithSpy)
    expect(userWithSpy.destroy).toBeCalled()
  })

  test('destroy: deve lançar um erro NotFoundError caso o usuário não exista', async () => {
    mockFindByPk(User, null)

    const destroyThrowingError = async () => {
      await sut.destroy(users[0].id)
    }

    await expect(destroyThrowingError).rejects.toThrow(NotFoundError)
  })
})
