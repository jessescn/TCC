import { baseSetup } from 'controllers/__mocks__'
import { UserModel } from 'models/user'
import { createMock } from 'ts-auto-mock'
import { HttpStatusCode, Request } from 'types/express'
import { PublicosUsuarioController } from '../publicos'

describe('PublicosUsuario Controller', () => {
  const publicos = ['publico1', 'publico2']
  const { user, response, spies } = baseSetup('user_publicos')

  const makeSut = () => {
    const service = {
      getPublicos: jest.fn().mockResolvedValue(publicos)
    }

    return { sut: new PublicosUsuarioController(service as any), service }
  }

  afterEach(() => {
    response.status.mockClear()
    spies.sendSpy.mockClear()
    spies.jsonSpy.mockClear()
  })

  it('should find an existing usuario by id', async () => {
    const request = createMock<Request>({ user, params: { id: '1' } })
    const { service, sut } = makeSut()

    await sut.exec(request, response as any)

    expect(service.getPublicos).toBeCalled()
    expect(response.json).toBeCalledWith(publicos)
  })

  it('should respond with Unauthorized if does not have permission', async () => {
    const userWithoutPermission = createMock<UserModel>({
      permissoes: { user_publicos: 'not_allowed' }
    })
    const request = createMock<Request>({ user: userWithoutPermission })
    const { sut } = makeSut()

    await sut.exec(request, response as any)

    expect(response.status).toBeCalledWith(HttpStatusCode.unauthorized)
  })
})
