import { UserModel } from 'models/user'
import { ComentarioService } from 'services/comentario'
import { createMock } from 'ts-auto-mock'
import { HttpStatusCode, Request } from 'types/express'
import { bootstrap } from '../__mocks__'
import { ReadOneComentarioController } from '../read-one'

describe('ReadOneComentario Controller', () => {
  const { user, comentario, response, spies } = bootstrap('comentario_read')

  const makeSut = () => {
    const service = createMock<ComentarioService>({
      findOne: jest.fn().mockResolvedValue(comentario)
    })

    return { sut: new ReadOneComentarioController(service), service }
  }

  afterEach(() => {
    response.status.mockClear()
    spies.sendSpy.mockClear()
    spies.jsonSpy.mockClear()
  })

  it('should respond with a specific comentario by id', async () => {
    const request = createMock<Request>({ params: { id: '1' }, user })

    const { sut, service } = makeSut()

    await sut.exec(request, response as any)

    expect(service.findOne).toBeCalledWith(1)
    expect(response.json).toBeCalledWith(comentario)
  })

  it('should respond with unauthorized error if user have limited scope', async () => {
    const userWithLimitedPrivileges = createMock<UserModel>({
      permissoes: { comentario_read: 'owned' }
    })

    const request = createMock<Request>({
      params: { id: '1' },
      user: userWithLimitedPrivileges
    })

    const { sut } = makeSut()

    await sut.exec(request, response as any)

    expect(response.status).toBeCalledWith(HttpStatusCode.unauthorized)
  })

  it('should respond with unauthorized error if user hasnt access privileges', async () => {
    const userWithoutPrivileges = createMock<UserModel>({
      permissoes: { comentario_read: 'not_allowed' }
    })

    const request = createMock<Request>({
      params: { id: '1' },
      user: userWithoutPrivileges
    })

    const { sut } = makeSut()

    await sut.exec(request, response as any)

    expect(response.status).toBeCalledWith(HttpStatusCode.unauthorized)
  })
})
