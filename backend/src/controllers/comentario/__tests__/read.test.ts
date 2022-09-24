import { baseSetup } from 'controllers/__mocks__'
import { ComentarioModel } from 'models/comentario'
import { UserModel } from 'models/user'
import { createMock } from 'ts-auto-mock'
import { HttpStatusCode, Request } from 'types/express'
import { ReadComentarioController } from '../read'

describe('ReadComentario Controller', () => {
  const comentario = createMock<ComentarioModel>({ user: { id: 2 } })
  const { user, response, spies } = baseSetup('comentario_read')

  const makeSut = () => {
    const service = {
      findAll: jest.fn().mockResolvedValue([comentario])
    } as any

    return { sut: new ReadComentarioController(service), service }
  }

  afterEach(() => {
    response.status.mockClear()
    spies.sendSpy.mockClear()
    spies.jsonSpy.mockClear()
  })

  it('should respond with all comentarios', async () => {
    const request = createMock<Request>({ user })

    const { sut, service } = makeSut()

    await sut.exec(request, response as any)

    expect(service.findAll).toBeCalledWith({})
    expect(response.json).toBeCalledWith([comentario])
  })

  it('should respond with only comentario owned by user if scope is "owned"', async () => {
    const userWithLimitedScope = createMock<UserModel>({
      permissoes: { comentario_delete: 'owned' }
    })

    const request = createMock<Request>({ user: userWithLimitedScope })

    const { sut, service } = makeSut()

    await sut.exec(request, response as any)

    expect(service.findAll).toBeCalledWith({
      user: { id: userWithLimitedScope.id }
    })
    expect(response.json).toBeCalledWith([comentario])
  })

  it('should respond with unauthorized error if user hasnt privileges to access the resource', async () => {
    const userWithoutPrivilege = createMock<UserModel>({
      permissoes: { comentario_delete: 'not_allowed' }
    })

    const request = createMock<Request>({ user: userWithoutPrivilege })

    const { sut } = makeSut()

    await sut.exec(request, response as any)

    expect(response.status).toBeCalledWith(HttpStatusCode.unauthorized)
  })
})
