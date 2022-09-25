import { baseSetup } from 'controllers/__mocks__'
import { UserModel } from 'domain/models/user'
import { createMock, createMockList } from 'ts-auto-mock'
import { HttpStatusCode, Request } from 'types/express'
import { ReadUsuarioController } from '../read'

describe('ReadUsuario Controller', () => {
  const usuarios = createMockList<UserModel>(2)
  const { user, response, spies } = baseSetup('user_read')

  const makeSut = () => {
    const service = {
      findAll: jest.fn().mockResolvedValue(usuarios)
    }

    return { sut: new ReadUsuarioController(service as any), service }
  }

  afterEach(() => {
    response.status.mockClear()
    spies.sendSpy.mockClear()
    spies.jsonSpy.mockClear()
  })

  it('should respond with all usuarios', async () => {
    const request = createMock<Request>({ user })
    const { service, sut } = makeSut()

    await sut.exec(request, response as any)

    expect(service.findAll).toBeCalledWith({})
    expect(response.json).toBeCalledWith(usuarios)
  })

  it('should respond only with usuarios owned by user', async () => {
    const userWithLimitedScope = createMock<UserModel>({
      permissoes: { user_read: 'owned' }
    })
    const request = createMock<Request>({ user: userWithLimitedScope })
    const { sut, service } = makeSut()

    await sut.exec(request, response as any)

    expect(service.findAll).toBeCalledWith({ id: userWithLimitedScope.id })
    expect(response.json).toBeCalledWith(usuarios)
  })

  it('should respond with Unauthorized if user does not have permission', async () => {
    const userWithoutPermission = createMock<UserModel>({
      permissoes: { user_read: 'not_allowed' }
    })
    const request = createMock<Request>({ user: userWithoutPermission })
    const { sut } = makeSut()

    await sut.exec(request, response as any)

    expect(response.status).toBeCalledWith(HttpStatusCode.unauthorized)
  })
})
